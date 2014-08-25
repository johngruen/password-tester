define([
  'jquery',
  'underscore',
  'backbone',
  'views/base',
  'stache!templates/confirm'
], function($, _, Backbone,BaseView,confirmTemplate){

  var confirmView = BaseView.extend({

    events: {
      'click #submit-btn':'submit',
      'change .show-password': 'recordPasswordVisibilityChange',
      'click .invalid': 'clearInvalidEl',
      'focus .invalid': 'clearInvalidEl',
      'input.password':'recordPaste'
    },

    template: confirmTemplate,

    recordPaste: function() {
      UserMetadata.confirmPwdPasted = 1;
    },

    recordPasswordVisibilityChange: function(event) {
      this.onPasswordVisibilityChange(event);
      UserMetadata.confirmPwdStateChanged = 1;
    },

    generateData: function(pwd) {
      if(!UserMetadata.confirmPwdPasted) {
        UserMetadata.confirmPwdPasted = 0;
      }
      if(!UserMetadata.confirmPwdChanged) {
        UserMetadata.confirmPwdChanged = 0;
      }
      
      if($('input#show-password').is(':checked')) {
        UserMetadata.confirmPwdStateFinal = 1;
      } else {
        UserMetadata.confirmPwdStateFinal = 0;
      }

      if (UserMetadata.password) {
        var val = pwd.val();
        if (UserMetadata.password === val) {
          UserMetadata.confirmPwdMatch = 1;
        } 
        else {
          UserMetadata.confirmPwdMatch = 0;
        }
      } else {
          UserMetadata.confirmPwdMatch = 0;
      }
    },

    submit: function(){
      var pwd = $('.password');
      if(!this.validateSomethingLite(pwd,'please enter a password')) { return; }


      this.generateData(pwd);
      this.debug();

      this.trigger('advance');
    
    }

  });

  return confirmView;
});

