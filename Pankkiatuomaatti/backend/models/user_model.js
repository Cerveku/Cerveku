const db = require("../database");

const user = {
  getById: function (id, callback) {
    return db.query("select * from user where iduser=?", [id], callback);
  },
  getAll: function (callback) {
    return db.query("select * from user", callback);
  },

  add: function (add_data, callback) {
    return db.query(
      "insert into user values(null,?,?)",
      [add_data.fname, add_data.lname],
      callback
    );
  },
  delete: function (id, callback) {
    return db.query("delete from user where iduser=?", [id], callback);
  },
  update: function (id, update_data, callback) {
    return db.query(
      "update user set fname=?,lname=? where iduser=?",
      [update_data.fname, update_data.lname, id],
      callback
    );
  },
};
module.exports = user;
