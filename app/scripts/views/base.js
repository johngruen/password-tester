define([
'underscore',
'jquery',
'backbone'
],
function(_,$,Backbone) {
  var BaseView = Backbone.View.extend({

    render: function() {
      this.beforeRender();

      $('html,body').scrollTop();
      $(".email").focus();

      var spinner = $(".spinner, .loader");
      if(spinner.length > 0) {
        spinner.fadeOut(100).remove();
      }
      this.$el.css('display','none').append(this.template);
      this.$el.show();
      this.setSize();

      this.afterRender();

    },

    afterRender: function() {
    },
    
    beforeRender: function() {
    },

    setSize: function() {
      var mainContent = this.$el.find(".main-content");
      if(this.password === 'default') {
         mainContent.css('width','360px');
      }
      else {
        mainContent.css('width','420px');
      }
    },

    destroy: function() {
      this.$el.fadeOut(1000);
      this.remove();
    },

    //Form validation utilities, probably could be put somewhere else
    validateEmail: function(email) {
      var val = email.val();
      var dotpos = val.lastIndexOf(".");
      var atpos = val.indexOf("@");
      if (atpos< 1 || dotpos<atpos+2 || dotpos+2>=val.length) {
        email.addClass('invalid');
        $(".error").hide().html('please use a valid email address').slideDown(200);
        return false;
      }
      return true;
    },

    validatePassword: function(pwd) {
      var password = pwd.val();
      if (password.length < 8) {
        pwd.addClass('invalid');
        $(".error").html('please use a valid password').slideDown(200);
        return false;
      }
      this.password = password;
      return true;
    },

    onPasswordVisibilityChange: function (e) {
      var target = this.$(e.target);
      var isVisible = target.is(':checked');
      var type = isVisible ? 'text' : 'password';
      this.$('.password').attr('type', type);
    },

    validateSelect: function(select)  {
      var val = select.val();
      if(val === 'none') {
        select.parent().addClass('invalid-row');
        $(".error").html('please choose an option').slideDown(200);
        return false;
      }
      return true;
    },

    validateRadio: function(els) {
      var allClear = 0;
      els.each(function(){
        var a = $(this).find('input:checked').val();
        if (!a) {
          $(this).addClass('invalid-row');
          allClear++;
          $(".error").html('please complete the survey').slideDown(200);
          }
      }); 
      if (allClear !== 0) {
        return false;
      }
      return true;
    },

    validateSomething: function(element,msg) {
      if(!element.val() || isNaN(element.val())) {
        element.addClass('invalid');
        $(".error").html(msg).slideDown(200);
        return false;
      }
      return true;
    },

    validateSomethingLite: function(element,msg) {
      if(!element.val()) {
        element.addClass('invalid');
        $(".error").html(msg).slideDown(200);
        return false;
      }
      return true;
    },
    
    
    clearInvalidRadio: function(event) {
      var $testEl = $(event.currentTarget).closest('.survey-element');
      if ($testEl.hasClass('invalid-row')) {
        $testEl.removeClass('invalid-row');
      }
    },

    clearInvalidEl: function() {
     $("input,div").removeClass('invalid').removeClass('invalid-row');
     $(".error").slideUp(200);
    },

    debug: function() {
      var debug = $("#debug");
      debug.html('');
      var pairs = _.pairs(UserMetadata);
      for(var i = 0; i < pairs.length; i++) {
        var a = pairs[i][0] + ': ' + pairs[i][1];
        debug.append(a + '<br>');
      }
    },

    fail:function() {
      window.location.href = "/fail.html";
    },

    pass: function() {
      window.location.href = "/pass.html";
    },

    full: function() {
      window.location.href = "/full.html";
    },


  });
  return BaseView;
});
