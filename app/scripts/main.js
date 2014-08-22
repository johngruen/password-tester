require.config({
   paths: {
    jquery: 'vendor/jquery/dist/jquery.min',
    backbone: 'vendor/backbone/backbone',
    underscore: 'vendor/underscore/underscore',
    mustache: 'vendor/mustache/mustache',
    text: 'vendor/requirejs-text/text',
    stache: 'vendor/requirejs-mustache/stache',
    string: 'vendor/string/lib/string',
    socketio: 'vendor/socket.io'
   },
   shim: {
     'socketio': {
      exports: 'io',
    },
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: [
        'socketio',
        'underscore',
        'jquery'
      ],
      exports: 'Backbone'
    }
  },
  stache: {
    extension: '.mustache'
  }
});

require([
  'app'
], function(App){

  App.initialize();
});
