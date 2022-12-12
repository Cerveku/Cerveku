const db = require("../database");

const log = {
  getById: function (idaccount, callback) {
    console.log();
    return db.query("select * from log where idaccount=?", idaccount, callback);
  },
  getAll: function (callback) {
    return db.query("select * from log", callback);
  },
  add: function (add_data, callback) {
    return db.query(
      "insert into log values(null,?,?,now())",
      [add_data.idaccount, add_data.withdraw_amount],
      callback
    );
  },
  delete: function (id, callback) {
    return db.query("delete from log where idlog=?", [id], callback);
  },
  update: function (id, update_data, callback) {
    return db.query(
      "update log set withdraw_amount=? where idlog=?",
      [update_data.withdraw_amount, id],
      callback
    );
  },
  getLogs: function (idaccount, callback) {
    return db.query("call event_log_100(?)", idaccount, callback);
  },
};

module.exports = log;
