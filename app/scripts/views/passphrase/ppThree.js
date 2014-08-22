define([
  'jquery',
  'underscore',
  'backbone',
  'views/base',
  'stache!templates/pp3'
], function($, _, Backbone,BaseView,ppThreeTemplate){

  var ppThreeView = BaseView.extend({

    events: {
      'click #submit-btn':'submit'
    },
    
    template: ppThreeTemplate,

    submit: function(){
      this.trigger('advance');
    }
    
  });
  
  return ppThreeView;

});
