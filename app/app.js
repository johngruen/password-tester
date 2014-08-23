//NONONONONO
var express= require('express');
var app = express();
var path = require('path');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');
var url = require('url');
var users = [];


app.get('/',function(req,res){
 console.log(req.url);
 console.log(req.query);
  if(req.query.psid || req.query.test) {
    if(req.query.psid) {
      users.push(req.query.psid);
    }
    res.sendFile(__dirname + '/index.html');
  }
  else {
   res.sendFile(__dirname + '/fail.html');
  }

});

app.use(express.static(__dirname));

app.get('*', function(req, res){
  console.log(req.url);
  res.sendFile(__dirname + '/index.html');
});


var keys = [
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
    ];

var keyString = keys.join(',');

//data to determine user paths
var totalSuccess = 0;
var typeCount = [0,0,0];

fs.writeFile('data/version0.txt',keyString +  ',');
fs.writeFile('data/version1.txt',keyString  + ',');
fs.writeFile('data/version2.txt',keyString  + ',');
writeSuccessFile();



//pick user path
function init() {
  if(totalSuccess <= 150) {
    return generateType();
  }
};

function generateType() {
  var t = Math.floor(Math.random() * 3);
  if (typeCount[t] < 50) {
    return t;
  }
  else {
    generateType()
  }
}

function writeSuccessFile() {
  fs.writeFile('data/count.txt', totalSuccess + "/ " + typeCount.join(','));
}

function incSuccess(i) {
    typeCount[i] ++;
    totalSuccess ++;
    writeSuccessFile();
}


io.on('connection',function(socket){

  //the consent form requests a type
  socket.on('requestType',function(){
    var currentType = init();
    socket.emit('version',currentType);
  });


  socket.on('sendControlData',function(data){
    var dataString = data + ',';
    fs.appendFile('data/version0.txt',dataString,function(err) {
      if(err) {
        console.log('error');
        socket.emit('error');
      } else {
        console.log('success');
        socket.emit('success');
        incSuccess(0);
      }
    });
  });

  socket.on('sendPassphraseData',function(data){
    var dataString = data + ',';
    fs.appendFile('data/version1.txt',dataString,function(err) {
      if(err) {
        console.log('error');
        socket.emit('error');
      } else {
        console.log('success');
        socket.emit('success');
        typeCount[1] ++;
        totalSuccess ++;
        incSuccess(1);
      }
    });
  });

  socket.on('sendMnemonicData',function(data){
    var dataString = data + ',';
    fs.appendFile('data/version2.txt',dataString,function(err) {
      if(err) {
        console.log('error');
        socket.emit('error');
      } else {
        console.log('success');
        socket.emit('success');
        typeCount[2] ++;
        totalSuccess++;
        incSuccess(2);
      }
    });
  });


});


server.listen(3001);

