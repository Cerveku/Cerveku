const db = require("../database");
const bcrypt = require("bcryptjs");

const saltRounds = 10;

const card = {
  getById: function (id, callback) {
    return db.query("select * from card where cardnum=?", [id], callback);
  },

  getAll: function (callback) {
    return db.query("select * from card", callback);
  },

  add: function (add_data, callback) {
    bcrypt.hash(add_data.cardpin, saltRounds, function (err, hashedPin) {
      return db.query(
        "insert into card values(?,?,?,?,0)",
        [add_data.cardnum, hashedPin, add_data.iduser, add_data.credit],
        callback
      );
    });
  },

  delete: function (id, callback) {
    return db.query("delete from card where cardnum=?", [id], callback);
  },

  update: function (id, update_data, callback) {
    bcrypt.hash(update_data.cardpin, saltRounds, function (err, hashedPin) {
      return db.query(
        "update card set cardnum=?,cardpin=?,iscredit=? where cardnum=?",
        [update_data.cardnum, hashedPin, update_data.iscredit, id],
        callback
      );
    });
  },

  checkCardPin: function (cardnum, callback) {
    return db.query(
      "select cardpin from card where cardnum=?",
      cardnum,
      callback
    );
  },

  checkLocked: function (cardnum, callback) {
    return db.query(
      "select pin_tries from card where cardnum=?",
      cardnum,
      callback
    );
  },

  addFail: function (cardnum, callback) {
    return db.query(
      "update card set pin_tries=pin_tries+1 where cardnum=?",
      cardnum,
      callback
    );
  },

  resetFail: function (cardnum, callback) {
    return db.query(
      "update card set pin_tries=0 where cardnum=?",
      cardnum,
      callback
    );
  },
};
module.exports = card;
