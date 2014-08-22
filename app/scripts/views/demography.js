// Filename: views/project/list
define([
  'jquery',
  'underscore',
  'backbone',
  'views/base',
  'stache!templates/demography'
], function($, _, Backbone,BaseView,demographyTemplate){

  var demographyView = BaseView.extend({

    events: {
      'click #submit-btn':'submit',
      'click .invalid,.invalid-row': 'clearInvalidEl',
      'focus .invalid,.invalid-row': 'clearInvalidEl'
    },
    
    template: demographyTemplate,

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
    
    
    generateData: function(a,b) {
      UserMetadata.demoLocation = a.val();
      var ar = [];
      b.each(function(){
         ar.push($(this).find('input:checked').val());
      });

      UserMetadata.demoEdu = ar[0];
      UserMetadata.demoIncome = ar[1];
    },

    submit: function(){
      var loc = $("#location");
      var eduIncome = $("#demog_1,#demog_2");

      if(!this.validateSelect(loc)) { return; }
      if(!this.validateRadio(eduIncome)) { return; }

      this.generateData(loc,eduIncome);
      
      this.debug();
      this.trigger('advance');
    }
    
  });
  
  return demographyView;

});
