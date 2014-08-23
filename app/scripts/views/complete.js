define([
  'jquery',
  'underscore',
  'backbone',
  'views/base',
  'socketio',
  'stache!templates/complete'
], function($, _, Backbone,BaseView,io,completeTemplate){

  var completeView = BaseView.extend({
    userData: {},
    orderedUserData: [],
    expectedKeys: [
      'psid',
      'version',
      'passwordLength',
      'flowPasswordMatches',
      'chunks',
      'totalLowerCase',
      'totalUpperCase',
      'totalNums',
      'totalSpecial',
      'commonSubStrs',
      'longestCommonSubStrs',
      'pwdStateChanged',
      'pwdStateFinal',
      'confirmPwdChanged',
      'confirmPwdStateFinal',
      'confirmPwdMatch',
      'demoAge',
      'demoLocation',
      'demoEdu',
      'demoIncome',
      'sus1',
      'sus2',
      'sus3',
      'sus4',
      'sus5',
      'sus6',
      'sus7',
      'sus8',
      'sus9',
      'sus10',
      'devices1',
      'devices2',
      'devices3',
      'devices4',
      'csSurvey1',
      'csSurvey2',
      'freeResponse1',
      'freeResponse2'
    ],

    template: completeTemplate,
    beforeRender: function() {
      // UserMetadata.psid = 666;
      // UserMetadata.version = 0;
      // UserMetadata.passwordLength=2;
      // UserMetadata.flowPasswordMatches=3;
      // UserMetadata.chunks=4;
      // UserMetadata.totalLowerCase=5;
      // UserMetadata.totalUpperCase=6;
      // UserMetadata.totalNums=7;
      // UserMetadata.totalSpecial=8;
      // UserMetadata.commonSubStrs=9;
      // UserMetadata.longestCommonSubStrs=10;
      // UserMetadata.pwdStateChanged=11;
      // UserMetadata.pwdStateFinal=12;
      // UserMetadata.confirmPwdChanged=13;
      // UserMetadata.confirmPwdStateFinal=14;
      // UserMetadata.confirmPwdMatch=15;
      // UserMetadata.demoAge=16;
      // UserMetadata.demoLocation=17;
      // UserMetadata.demoEdu=18;
      // UserMetadata.demoIncome=19;
      // UserMetadata.sus1=20;
      // UserMetadata.sus2=21;
      // UserMetadata.sus3=22;
      // UserMetadata.sus4=23;
      // UserMetadata.sus5=24;
      // UserMetadata.sus6=25;
      // UserMetadata.sus7=26;
      // UserMetadata.sus8=27;
      // UserMetadata.sus9=28;
      // UserMetadata.sus10=29;
      // UserMetadata.devices1=30;
      // UserMetadata.devices2=31;
      // UserMetadata.devices3=32;
      // UserMetadata.devices4=33;
      // UserMetadata.csSurvey1=34;
      // UserMetadata.csSurvey2=35;
      // UserMetadata.freeResponse1=36;
      // UserMetadata.freeResponse2=37;

      var a = this.bounceData();
      console.log(a);
      if (a) {
        console.log(this.orderedUserData.join(','));
        var that = this;
        var socket = io.connect();
        console.log(socket);
        if (this.orderedUserData[1] === 0) {
          socket.emit('sendControlData', this.orderedUserData.join(','));
        }
        else if (this.orderedUserData[1] === 1) {
          socket.emit('sendPassphraseData', this.orderedUserData.join(','));
        }
        else if (this.orderedUserData[1] === 2) {
          socket.emit('sendMnemonicData', this.orderedUserData.join(','));
        }
        socket.on('success',function(){
          that.pass();
        });
        socket.on('error'),function(){
          console.log('err')
        //that.fail();
        }
      }
    },

    bounceData: function() {
      for(var i = 0; i < this.expectedKeys.length; i ++) {
        var s = this.expectedKeys[i];
        if(typeof UserMetadata[s] === "undefined") {
          console.log(s);
          this.fail();
          return false;
        }
        else {
          this.orderedUserData.push(UserMetadata[s]);
        }
        
      }
      return true;
    }

  });


  return completeView;

});
