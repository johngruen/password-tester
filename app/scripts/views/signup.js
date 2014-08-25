// Filename: views/project/list
define([
  'jquery',
  'underscore',
  'backbone',
  'string',
  'views/base',
  'stache!templates/signup'
], function($, _, Backbone,S,BaseView,signupTemplate){

  var signupView = BaseView.extend({

    events: {
      'click #submit':'submit',
      'click .invalid,.invalid-row': 'clearInvalidEl',
      'focus .invalid,.invalid-row': 'clearInvalidEl',
      'change .show-password': 'recordPasswordVisibilityChange',
      'focus #password,#show-password': 'triggerPopUp',
      'click .flow-start':'triggerFlow'
    },

    template: signupTemplate,
    password: 'default',

    beforeRender: function() {
    },

    afterRender: function() {
      if (!UserMetadata.version || UserMetadata.version === 0) { 
        return; 
      }
      else if (UserMetadata.version === 1) {
        this.$el.find("#mnemonic").remove();
      }
      else if (UserMetadata.version === 2) {
        this.$el.find("#passphrase").remove();
      }
      this.initFlow();
    },

    triggerPopUp: function() {
      if(UserMetadata.version === 1 || UserMetadata.version === 2) {
        if(UserMetadata.flowComplete === 0) {
          this.showFlowStart();
          this.areSheetsVisible = 1;
        }
      }
    },

    initFlow:function() {
      this.sheet = this.$el.find('.modal').eq(0);
      if (UserMetadata.flowComplete === 1) {
        if(UserMetadata.email) {
          this.$el.find(".email").val(UserMetadata.email);
        }
        if(UserMetadata.version === 1) {
            var pp_2 = this.$el.find("#pp_2");
            pp_2.show();
            pp_2.parent().css('top',pp_2.attr('data-top'));
            this.$el.find("#test-wrapper").fadeIn(50);
            this.$el.find(".ppi_1").text(UserMetadata.pp1);
            this.$el.find(".ppi_2").text(UserMetadata.pp2);
            this.$el.find(".ppi_3").text(UserMetadata.pp3);
        }
        else if(UserMetadata.version === 2) {
             var mne_2 = this.$el.find("#mne_2");
             mne_2.show();
             mne_2.parent().css('top',mne_2.attr('data-top'));
             this.$el.find("#test-wrapper").fadeIn(50);
            $(UserMetadata.sillyString).appendTo(this.$el.find(".ta_sim"));
            this.$el.find(".ppi_2").text(UserMetadata.mn1);
            this.$el.find(".ppi_3").text(UserMetadata.mn2);
        }
      }
    },

    showFlowStart:function() {
      this.sheet.show();
      this.sheet.parent().css('top',this.sheet.attr('data-top'));
      $("#sheet").fadeIn(100);
      $("#test-wrapper").fadeIn(50);
      $("input[type='email'],input[type='password'],select,#submit").prop( "disabled", true );
    },

    recordPasswordVisibilityChange: function(event) {
      this.onPasswordVisibilityChange(event);
      UserMetadata.pwdStateChanged = 1;
    },

    generateData: function(pwd,coppa) {
      if(!UserMetadata.chunks) {
        UserMetadata.chunks = 0;
      }
      UserMetadata.demoAge = coppa.val();
      var pwdVal = pwd.val();
      var pwdLen = pwdVal.length;
      UserMetadata.password = pwdVal;
      UserMetadata.passwordLength = pwdLen;
      this.generateCharStats(pwdVal,pwdLen);
      this.checkCommonSubStrs(pwdVal);
      if(!UserMetadata.pwdStateChanged) {
        UserMetadata.pwdStateChanged = 0;
      }
      if($('input#show-password').is(':checked')) {
        UserMetadata.pwdStateFinal = 1;
      } else {
        UserMetadata.pwdStateFinal = 0;
      }
    },

    generateCharStats: function(pwdVal,pwdLen) {
      UserMetadata.totalLowerCase = 0;
      UserMetadata.totalUpperCase = 0;
      UserMetadata.totalNums = 0;
      UserMetadata.totalSpecial = 0;
      for (var i = 0; i < pwdLen; i++) {
        var c = pwdVal.charAt(i);
        if (S(c).isUpper()) {UserMetadata.totalUpperCase ++;}
        else if (S(c).isLower()) {UserMetadata.totalLowerCase ++;}
        else if (S(c).isNumeric()) {UserMetadata.totalNums ++;}
        else {UserMetadata.totalSpecial ++;}
      }
    },

    checkCommonSubStrs: function(pwdVal) {
      UserMetadata.commonSubStrs = 0;
      UserMetadata.longestCommonSubStrs = 0;
      for (var i = 0; i < commonStrings.length; i++) {
        if(S(pwdVal).contains(commonStrings[i])) {
          var l = commonStrings[i].length;
          if (l > UserMetadata.longestCommonSubStrs) {
            UserMetadata.longestCommonSubStrs = l;
          }
          UserMetadata.commonSubStrs ++;
        }
      }
    },

    generateMatchData: function() {
      var a = 0;
      if (UserMetadata.version === 1) {
        if(this.$el.find(".ppi_1").text() === UserMetadata.password) {a = 1;}
        else if (this.$el.find(".ppi_2").text() === UserMetadata.password) {a = 2;}
        else if (this.$el.find(".ppi_3").text() === UserMetadata.password) {a = 3;}
      }
      else if (UserMetadata.version === 2) {
        if(this.$el.find(".ppi_2").text() === UserMetadata.password) {a = 1;}
        else if (this.$el.find(".ppi_3").text() === UserMetadata.password) {a = 2;}
      }
      UserMetadata.flowPasswordMatches = a;
    },

    triggerFlow: function() {
      UserMetadata.email = $('.email').val();
      this.trigger('flowAdvance');
    },

    submit: function() {
      var email = $(".email");
      var coppa = $("#fxa-age-year");
      var password = $(".password");

      if(!this.validateEmail(email)) { return; }
      if(!this.validatePassword(password)) { return; }
      if(!this.validateSelect(coppa)) { return; }

      this.generateData(password,coppa);
      this.generateMatchData();
      this.debug();

      this.trigger('advance');

    },


   });

  return signupView;

});
