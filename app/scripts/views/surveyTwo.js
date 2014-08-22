define([
  'jquery',
  'underscore',
  'backbone',
  'views/base',
  'stache!templates/surveyTwo'
], function($, _, Backbone,BaseView,surveyTwoTemplate){

  var surveyTwoView = BaseView.extend({

    events: {
      'click #submit-btn':'submit',
      'click input[type=radio]': 'clearInvalidRadio'
    },

    template: surveyTwoTemplate,
    selected:[],

    generateData: function(els) {
      var a = [];
      els.each(function(){
         a.push($(this).find('input:checked').val());
      });
      UserMetadata.csSurvey1 = a[0];
      UserMetadata.csSurvey2 = a[1];
      var b = $('textarea:eq(0)').val();
      if(b) {
        UserMetadata.freeResponse1 = b;
      } else {
        UserMetadata.freeResponse1 = 'na';
      }
      var c = $('textarea:eq(1)').val();
      if(c) {
        UserMetadata.freeResponse2 = c;
      } else {
        UserMetadata.freeResponse2 = 'na';
      }
    },



    submit: function(){
      var likerts = $(".likert");
      if(!this.validateRadio(likerts)) { return; }
      this.generateData(likerts);
      this.debug();

      this.trigger('advance');
    }

  });

  return surveyTwoView;

});
