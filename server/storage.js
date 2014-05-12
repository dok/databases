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
    var self = this;

    this.messages.findAll()
      .complete(function(err, results) {
        if(!!err) {
          console.log('Err: ', err);
        } else {
          callback(JSON.stringify({results: results}));
        }
      });
  }

};
