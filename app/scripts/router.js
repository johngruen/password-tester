var commonStrings = [];

define([
  'socketio',
  'jquery',
  'underscore',
  'backbone',
  'views/consent',
  'views/intro',
  'views/signup',
  'views/susOne',
  'views/susTwo',
  'views/confirm',
  'views/demography',
  'views/surveyOne',
  'views/surveyTwo',
  'views/complete',
  'views/passphrase/ppOne',
  'views/passphrase/ppTwo',
  'views/mne/mne1',
  'views/mne/mne2'
], 
function (
  io,
  $,
  _,
  Backbone,
  consentView,
  introView,
  signupView,
  susOneView,
  susTwoView,
  confirmView,
  demographyView,
  surveyOneView,
  surveyTwoView,
  completeView,
  ppOneView,
  ppTwoView,
  mnOneView,
  mnTwoView
) {


  function prepView(View,advanceURL) {
    return function() {
      this.showView(new View(),advanceURL);
    };
  }

  function prepFlowView(View,advanceURL,flowURL) {
    return function() {
      this.showFlowView(new View(),advanceURL,flowURL);
    };
  }
  
  var BigRouter  = Backbone.Router.extend({
    routes: {
      '': prepView(consentView,'intro'),
      'intro': prepView(introView,'signup'),
      'signup': prepFlowView(signupView,'survey-one',UserMetadata.version),
      'pp-one':prepView(ppOneView,'pp-two'),
      'pp-two':prepView(ppTwoView,'signup'),
      'mn-one':prepView(mnOneView,'mn-two'),
      'mn-two':prepView(mnTwoView,'signup'),
      'survey-one': prepView(susOneView,'survey-two'),
      'survey-two': prepView(susTwoView,'confirm'),
      'confirm': prepView(confirmView,'survey-three'),
      'survey-three': prepView(demographyView,'survey-four'),
      'survey-four': prepView(surveyOneView,'survey-five'),
      'survey-five': prepView(surveyTwoView,'complete'),
      'complete': prepView(completeView,'')
    },

    initialize: function() {
      this.$stage = $("#stage");
    },

    showView: function(viewToShow,advanceURL) {
        if (this.currentView) {
          this.currentView.destroy();
        }
        viewToShow.render();
        this.$stage.append(viewToShow.el);
        var that = this;
        viewToShow.on('advance',function(){
          that.navigate(advanceURL,{trigger:true});
        });
        this.currentView = viewToShow;
      },

      showFlowView: function(viewToShow,advanceURL,flowURL) {
        if (this.currentView) {
          this.currentView.destroy();
        }
        viewToShow.render();
        this.$stage.append(viewToShow.el);
        var that = this;
        viewToShow.on('advance',function(){
          that.navigate(advanceURL,{trigger:true});
        });
        viewToShow.on('flowAdvance',function(){
          if (UserMetadata.version === 1) { 
            that.navigate('pp-one',{trigger:true})
          }
          else if (UserMetadata.version === 2) {
            that.navigate('mn-one',{trigger:true})
          }
        })
        this.currentView = viewToShow;
      }

  });


  var initialize = function() {

      //do async stuff
      var router;

      router = new BigRouter();
      router.name = 'my router';
        
        Backbone.history.start({pushState:true});
      $.ajax({
            url: "./data/common.txt",
            async: false,
            success: function (data){
                commonStrings = data.split(',');
            }
        });

      getQueryVariable('hey');
  };

  return {initialize:initialize};

});
