var _ = require('underscore');
var mysql = require('mysql');

exports.storage = {
  initialize : function() {
    this.dbConnection = mysql.createConnection({
      user : "root",
      password : "",
      database : "chat"
    });
    this.dbConnection.connect();
    this.tablename = "messages";
  },
  getLength: function() {
    return this.storage.length;
  },
  push: function(msg) {
    // var msg = {
    //   username: username,
    //   message: message,
    //   roomname: roomname
    // };
    if(msg.roomname === null) {
      msg.roomname = undefined;
    }

    debugger;

    this.dbConnection.query('INSERT INTO messages SET ?', msg, function(err, result){
      if (err) {
        console.log("Error while insertion:", err);
      }
      debugger;
      console.log("Result", result);
    });
    // this.storage.push(msg);
  },

  // Returns an array with the containing results
  get: function(msg) {
    var query = {};
    for(var key in msg) {
      query[key] = msg[key];
    }

    return _.where(this.storage, query);
  },

  getAll: function() {
    return JSON.stringify({results: this.storage});
  }

};
