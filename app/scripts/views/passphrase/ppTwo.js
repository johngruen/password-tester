define([
  'jquery',
  'underscore',
  'backbone',
  'views/base',
  'stache!templates/passphrase/pp2'
], function($, _, Backbone,BaseView,ppTwoTemplate){

  var ppTwoView = BaseView.extend({

    events: {
      'click #submit-btn':'submit',
      'click .add-a-word': 'addAWord',
      'keyup .pp-gen': 'fillArray'
    },
    
    template: ppTwoTemplate,
    ppArray: ['','','',''],
    ppHidden: true,
    symbol: symbols[Math.floor(Math.random() * 10)],

    afterRender: function() {
      this.inputs = this.$el.find(".pp-gen");
      this.pp1 = this.$el.find('.ppi_1');
      this.pp2 = this.$el.find('.ppi_2');
      this.pp3 = this.$el.find('.ppi_3');
    },

    addAWord:function() {
      var l = this.inputs.length;
      this.inputs.eq(l-1).after('<div class="input-row pp-gen"><input type="text" maxlength="10" placeholder="another word"/></div>');
      this.ppArray.push('');
      this.inputs = $('.pp-gen');
      if (l > 5) {
        $('.add-a-word').hide();
      }
    },

    fillArray: function(event) {
      var k = event.keyCode;
      if(k!== 9 && k !== 37 && k !== 39) {
        var that = this;
        this.inputs.each(function(){
          var element = $(this);
          var child = element.find('input');
          $(child).removeClass('invalid');
          var value = child.val();
          var index = element.index();
          value = that.blockSpaces(value);
          child.val(value);
          that.ppArray[index] = value;
        });
      }
      this.checkArrayForCompletion();
      this.makePP();
    },

    checkArrayForCompletion: function() {
      if (this.ppHidden) {
        for(var i = 0; i < 4; i ++) {
          if (this.ppArray[i] === "") { return; }
        }
        this.ppHidden = false;
        this.showPassPhrase();
      }
    },

    makePP: function() {
      UserMetadata.pp1 = this.ppArray.join(' ');
      UserMetadata.pp2 = this.ppArray.join(this.symbol);
      var pp3_temp = UserMetadata.pp2.split('');
      for (var i = 0; i < pp3_temp.length; i ++) {
        var rand = Math.floor(Math.random() * 2);
        if (rand === 1) {
          for (var j = 0; j < substitutes.length; j++) {
            if( pp3_temp[i] === substitutes[j][0]) {
                  pp3_temp[i] = substitutes[j][1];
            }
          } 
        }
      }
      UserMetadata.pp3 = pp3_temp.join('');
      this.pp1.val(UserMetadata.pp1);
      this.pp2.val(UserMetadata.pp2);
      this.pp3.val(UserMetadata.pp3);

    },

    showPassPhrase: function() {
      $(".flow-hidden").slideDown(1000);
    },

    blockSpaces: function(val) {
      if( val.match(/\s/g) || val.match(/\./g)  ){
        val= (val.replace(/\s/g,''));
        return val;
      }
      return val;

    },

    validatePP: function() {
      for(var i = 0; i < 4; i ++) {
        var curInput = this.inputs.eq(i).find('input');
        if(curInput.val()==='') {
          $("label:eq(0)").addClass('label-error');
          $(curInput).addClass('invalid');
          return false;
        } 
      }
      return true;
    },


    submit: function(){
      UserMetadata.flowComplete = 1;
      UserMetadata.chunks = this.ppArray.length;
      if(!this.validatePP()) {return;} 
      this.debug();

      this.trigger('advance');
    }
    
  });
  
  return ppTwoView;

});
