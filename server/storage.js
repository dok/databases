var _ = require('underscore');
var mysql = require('mysql');

exports.storage = {
  initialize : function() {
    this.dbConnection = mysql.createConnection({
      user : "root",
      password : "",
      database : "chat"
    });
    this.tablename = "messages";
  },
  getLength: function() {
    return this.storage.length;
  },
  push: function(msg) {
    this.dbConnection.connect();
    // var msg = {
    //   username: username,
    //   message: message,
    //   roomname: roomname
    // };
    if(msg.roomname === null) {
      msg.roomname = 'placeholder';
    }

    this.dbConnection.query('INSERT INTO messages SET ?', msg, function(err, result){
      if (err) {
        console.log("Error while insertion:", err);
      }
      console.log("Result", result);
    });
    // this.storage.push(msg);
    this.dbConnection.end();
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
    this.dbConnection.connect();
    console.log('getAll');
    debugger;
    this.dbConnection.query('SELECT * FROM chat.messages;', function(err, rows){
      if(err) {
        console.log("Error while select");
      }
      debugger;
      console.log('rows');
      var r = rows;
      // return {results: []};

      callback(JSON.stringify({results: []}));
      // this.dbConnection.end();
    });
    //return JSON.stringify({results: this.storage});
  }

};
