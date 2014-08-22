define([
  'jquery',
  'underscore',
  'backbone',
  'views/base',
  'stache!templates/mnemonic/mne2'
], function($, _, Backbone,BaseView,mneTwoTemplate){

  var mneTwoView = BaseView.extend({

    events: {
      'click #submit-btn':'submit',
      'keyup .mne-textarea': 'fillString'
    },
    
    template: mneTwoTemplate,

    mnString: '',

    afterRender:function() {
      this.ta = this.$el.find(".mne-textarea");
      this.sim = this.$el.find(".ta_sim");
      this.mn1 = this.$el.find('.ppi_2');
      this.mn2 = this.$el.find('.ppi_3');
    },

    fillString: function() {
      this.mnString = this.ta.val();
      this.convertToSpans();
      this.fillPwds();
      this.showPassPhrase();
      this.ta.removeClass('invalid');
    },

    showPassPhrase: function() {
      $(".flow-hidden").slideDown(400);
    },

    convertToSpans: function() {
      this.splitString = this.mnString.split(' ');
      var sillyString = '';
      for(var i = 0; i < this.splitString.length; i++) {
        sillyString += ('<span>' + this.splitString[i] + '&nbsp;' + '</span>');
      }
      this.sim.empty();
      $(sillyString).appendTo(this.sim);
      UserMetadata.sillyString = sillyString;
    },

    fillPwds: function() {
      var acronym = [];
       for(var k = 0; k < this.splitString.length; k++) { 
        acronym.push(this.splitString[k].charAt(0));
       }
      UserMetadata.mn1 = acronym.join('');
      for (var i = 0; i < acronym.length; i ++) {
        var rand = Math.floor(Math.random() * 2);
        if (rand === 1) {
          for (var j = 0; j < substitutes.length; j++) {
            if( acronym[i] === substitutes[j][0]) {
                  acronym[i] = substitutes[j][1];
            }
          } 
        }
      }
      UserMetadata.mn2 = acronym.join('');
      this.mn1.val(UserMetadata.mn1);
      this.mn2.val(UserMetadata.mn2);
  },

  validateMne:function() {
    if (!this.splitString || this.splitString.length < 8) {
      $("label:eq(0)").addClass("label-error");
      this.ta.addClass('invalid');
      return false;
    }
    return true;
  },

    submit: function(){

      if(!this.validateMne()) {return;}
      UserMetadata.flowComplete = 1;
      this.debug();
      this.trigger('advance');
    }
    
  });
  
  return mneTwoView;

});
