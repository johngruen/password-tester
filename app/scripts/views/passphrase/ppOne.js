define([
  'jquery',
  'underscore',
  'backbone',
  'views/base',
  'stache!templates/passphrase/pp1'
], function($, _, Backbone,BaseView,ppOneTemplate){

  var ppOneView = BaseView.extend({

    events: {
      'click #submit-btn':'submit'
    },
    
    template: ppOneTemplate,

    submit: function(){
      this.trigger('advance');
    }
    
  });
  
  return ppOneView;

});
