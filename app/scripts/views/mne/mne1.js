define([
  'jquery',
  'underscore',
  'backbone',
  'views/base',
  'stache!templates/mnemonic/mne1'
], function($, _, Backbone,BaseView,mneOneTemplate){

  var mneOneView = BaseView.extend({

    events: {
      'click #submit-btn':'submit'
    },
    
    template: mneOneTemplate,

    submit: function(){
      this.trigger('advance');
    }
    
  });
  
  return mneOneView;

});
