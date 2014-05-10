var _ = require('underscore');
var mysql = require('mysql');
var Sequelize = require('sequelize');

exports.storage = {
  initialize : function() {
    this.sequelize = new Sequelize('chat', 'root', '');
    this.messages = this.sequelize.define('messages', {
      username: Sequelize.STRING,
      roomname: Sequelize.STRING,
      message: Sequelize.STRING
    });
    // this.dbConnection = mysql.createConnection({
    //   user : "root",
    //   password : "",
    //   database : "chat"
    // });
    //this.tablename = "messages";
  },
  getLength: function() {
    return this.storage.length;
  },
  push: function(msg) {
    //this.dbConnection.connect();
    // var msg = {
    //   username: username,
    //   message: message,
    //   roomname: roomname
    // };
    var self = this;
    if(msg.roomname === null) {
      msg.roomname = 'placeholder';
    }

    this.sequelize.sync().success(function(){
      debugger;
      self.messages.create(msg).success(function(msg){
        console.log(msg.values);
      });
    });

    // this.dbConnection.query('INSERT INTO messages SET ?', msg, function(err, result){
    //   if (err) {
    //     console.log("Error while insertion:", err);
    //   }
    //   console.log("Result", result);
    // });
    // // this.storage.push(msg);
    // this.dbConnection.end();
  },

  // Returns an array with the containing results
  get: function(msg) {
    var query = {};
    for(var key in msg) {
      query[key] = msg[key];
    }

    return _.where(this.storage, query);
  },

  getAll: function(callback) {
    //this.dbConnection.connect();
    //console.log('getAll');
    // debugger;
    // this.dbConnection.query('SELECT * FROM chat.messages;', function(err, rows){
    //   if(err) {
    //     console.log("Error while select");
    //   }
    //   var messages = [];
    //   //iterate through rows
    //   for(var i=0; i<rows.length; i++) {
    //   //  create a message
    //     var message = {
    //       message : rows[i].message,
    //       roomname : rows[i].roomname,
    //       username : rows[i].username
    //     };
    //   //  push it to message
    //     messages.push(message);
    //   }
    //   // debugger;
    //   console.log(messages);
    //   callback(JSON.stringify({results: messages}));
    //   // this.dbConnection.end();
    // });
    // this.dbConnection.end();
    //return JSON.stringify({results: this.storage});
  }

};
