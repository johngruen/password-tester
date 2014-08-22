define([
  'jquery',
  'underscore',
  'backbone',
  'views/base',
  'stache!templates/intro'
], function($, _, Backbone,BaseView,introTemplate){

  var introView = BaseView.extend({

    events: {
      'click #submit-btn':'submit'
    },
    
    template: introTemplate,

    submit: function(){
      this.trigger('advance');
    }
    
  });
  
  return introView;

});
