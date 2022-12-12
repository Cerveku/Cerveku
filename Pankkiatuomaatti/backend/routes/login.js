const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const card = require("../models/card_model");

router.post("/", function (request, response) {
  if (request.body.cardnum && request.body.cardpin) {
    const cardnum = request.body.cardnum;
    const cardpin = request.body.cardpin;
    console.log(cardnum + " , " + cardpin);
    card.checkCardPin(cardnum, function (dbError, dbResult) {
      if (dbError) {
        response.json(dbError.errno);
      } else {
        if (dbResult.length > 0) {
          card.checkLocked(cardnum, function (dbError, dbResult1) {
            //jos vääriä yrityksiä on 3 tai enemmän, kirjautuminen estetty
            if (dbResult1[0].pin_tries >= 3) {
              console.log(dbResult1[0].pin_tries);
              response.send("locked");
            } else {
              bcrypt.compare(
                cardpin,
                dbResult[0].cardpin,
                (err, compareResult) => {
                  if (compareResult) {
                    card.resetFail(cardnum);
                    console.log("login successful and pin fails set to 0");
                    card.getById(cardnum, function (dbError, dbResult) {
                      let credit = dbResult[0].iscredit;
                      let iduser = dbResult[0].iduser;

                      const token = generateAccessToken({ card: cardnum });
                      //palautetaan json objektina token ja tieto onko korttissa credit ominaisuus
                      response.json({
                        token: token,
                        credit: credit,
                        iduser: iduser,
                      });
                    });
                  } else {
                    response.send(false);
                    //väärän pin koodin jälkeen kirjataan ylös väärä yritys
                    card.addFail(cardnum);
                    console.log("wrong pin, increased pin_tries by 1");
                  }
                }
              );
            }
          });
        } else {
          console.log("card does not exists");
          response.send(false);
        }
      }
    });
  } else {
    console.log("cardnum or cardpin missing");
    response.send(false);
  }
});

function generateAccessToken(card) {
  dotenv.config();
  return jwt.sign(card, process.env.TOKEN, { expiresIn: "1800s" });
}

module.exports = router;
