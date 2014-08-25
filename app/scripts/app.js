/* jshint ignore:start */
var UserMetadata = {};
UserMetadata.flowComplete = 0;
var symbols = ['-','+','_','^','#','.','*',':','=','~'];
var substitutes = [['t','7'],['T','7'],['l','1'],
                  ['L','l'],['e','3'],['E','3'],
                  ['a','@'],['A','@'],['S','5'],
                  ['s','$'],['i','!'],['o','0'],
                  ['O','0']];
/* jshint ignore:end */


define([
  'jquery',
  'underscore',
  'backbone',
  'router',
], function($, _, Backbone, Router){

  var initialize = function(){
    Router.initialize();
  };

  return {
    initialize: initialize
  };
});
