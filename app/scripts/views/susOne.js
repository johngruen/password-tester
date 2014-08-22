define([
  'jquery',
  'underscore',
  'backbone',
  'views/base',
  'stache!templates/susOne'
], function($, _, Backbone,BaseView,susOneTemplate){

  var susOneView = BaseView.extend({

    events: {
      'click #submit-btn':'submit',
      'click input[type=radio]': 'clearInvalidRadio'
    },

    template: susOneTemplate,
    selected:[],

    generateData:function (els) {
      var a = [];
      els.each(function(){
         a.push($(this).find('input:checked').val());
      });
      console.log(a);
      UserMetadata.sus1 = a[0];
      UserMetadata.sus2 = a[1];
      UserMetadata.sus3 = a[2];
      UserMetadata.sus4 = a[3];
      UserMetadata.sus5 = a[4];
    },

    submit: function(){
      var likerts = $(".likert");
      if(!this.validateRadio(likerts)) { return; }

      this.generateData(likerts);
      this.debug();

      this.trigger('advance');
    }

  });

  return susOneView;

});
