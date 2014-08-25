define([
  'jquery',
  'underscore',
  'backbone',
  'views/base',
  'stache!templates/surveyOne'
], function($, _, Backbone,BaseView,surveyOneTemplate){

  var surveyOneView = BaseView.extend({

    events: {

      'click #submit-btn':'submit',
      'click .invalid': 'clearInvalidEl',
      'focus .invalid': 'clearInvalidEl'
    },

    template: surveyOneTemplate,
    selected:[],

    generateData: function(a,b,c,d) {
      UserMetadata.devices1 = a.val();
      UserMetadata.devices2 = b.val();
      UserMetadata.devices3 = c.val();
      UserMetadata.devices4 = d.val();
    },

    submit: function(){

      var msg = "please complete the survey";
      var input_1 = $("input:eq(0)");
      var input_2 = $("input:eq(1)");
      var input_3 = $("input:eq(2)");
      var input_4 = $("input:eq(3)");

      if(!this.validateSomething(input_1,msg)) { return; }
      if(!this.validateSomething(input_2,msg)) { return; }
      if(!this.validateSomething(input_3,msg)) { return; }
      if(!this.validateSomething(input_4,msg)) { return; }

      this.generateData(input_1,input_2,input_3,input_4);
      this.debug();

      this.trigger('advance');
    
    }

   });

  return surveyOneView;

});
