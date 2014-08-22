define([
  'jquery',
  'underscore',
  'backbone',
  'views/base',
  'stache!templates/susTwo'
], function($, _, Backbone,BaseView,susTwoTemplate){

  var susTwoView = BaseView.extend({

    events: {
      'click #submit-btn':'submit',
      'click input[type=radio]': 'clearInvalidRadio'
    },

    template: susTwoTemplate,
    selected:[],

    generateData:function (els) {
      var a = [];
      els.each(function(){
         a.push($(this).find('input:checked').val());
      });
      console.log(a);
      UserMetadata.sus6 = a[0];
      UserMetadata.sus7 = a[1];
      UserMetadata.sus8 = a[2];
      UserMetadata.sus9 = a[3];
      UserMetadata.sus10 = a[4];
    },

    submit: function(){
      var likerts = $(".likert");
      if(!this.validateRadio(likerts)) { return; }

      this.generateData(likerts);
      this.debug();

      this.trigger('advance');
    }

  });

  return susTwoView;

});
