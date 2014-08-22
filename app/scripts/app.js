/* jshint ignore:start */
var UserMetadata = {};
UserMetadata.flowComplete = 0;
var symbols = ['-','+','_','^','#','.','*',':','=','~'];
var substitutes = [['t','7'],['T','7'],['l','1'],
                  ['L','l'],['e','3'],['E','3'],
                  ['a','@'],['A','@'],['S','5'],
                  ['s','$'],['i','!'],['o','0'],
                  ['O','0']];

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) === variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    //console.log('Query variable %s not found', variable);
}
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
