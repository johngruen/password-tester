define([
  'socketio',
  'jquery',
  'underscore',
  'backbone',
  'views/base',
  'stache!templates/consent'
], function(io,$, _, Backbone,BaseView,consentTemplate){

  var consentView = BaseView.extend({

    events: {
      'click #submit-btn':'submit'
    },
    
    template: consentTemplate,

    afterRender: function() {
      var socket = io.connect();
      socket.emit('requestType');
      socket.on('version',function(data){
        UserMetadata.version = data;
      });
    var psid = this.getParameterByName('psid');
    if(psid) {
      console.log(psid);
      UserMetadata.psid = psid;
    }
    },
    
    getParameterByName:function (name) {
      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search); //jshint ignore:line
      return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
   },

    validateRadio: function(els) {
      var allClear = 0;
      var that = this;
      els.each(function(){
        var a = $(this).find('input:checked').val();
        if (!a) {
          $(this).addClass('invalid-row');
          allClear++;
          $(".error").html('please complete the survey').slideDown(200);
          }
        else if (a === '2') {
          that.fail();
        }
      }); 
      if (allClear !== 0) {
        return false;
      }
      return true;
    },
    


    submit: function(){
      
      var els = $(".survey-element");
      if(!this.validateRadio(els)) { return; }
      this.trigger('advance');

    }
    
  });
  
  return consentView;

});
