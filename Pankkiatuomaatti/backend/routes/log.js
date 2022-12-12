const express = require("express");
const router = express.Router();
const log = require("../models/log_model");

router.get("/:id?", function (request, response) {
  if (request.params.id) {
    log.getById(request.params.id, function (err, dbResult) {
      if (err) {
        response.json(err);
      } else {
        response.json(dbResult[0]);
      }
    });
  } else {
    log.getAll(function (err, dbResult) {
      if (err) {
        response.json(err);
      } else {
        response.json(dbResult);
      }
    });
  }
});

router.post("/", function (request, response) {
  log.add(request.body, function (err, dbResult) {
    if (err) {
      response.json(err);
    } else {
      response.json(request.body);
    }
  });
});

router.delete("/:id", function (request, response) {
  log.delete(request.params.id, function (err, dbResult) {
    if (err) {
      response.json(err);
    } else {
      response.json(dbResult);
    }
  });
});

router.put("/:id", function (request, response) {
  log.update(request.params.id, request.body, function (err, dbResult) {
    if (err) {
      response.json(err);
    } else {
      response.json(dbResult);
    }
  });
});
router.get("/logs/:id", function (request, response) {
  log.getLogs(request.params.id, function (err, dbResult) {
    if (err) {
      response.json(err);
    } else {
      var data = JSON.parse(JSON.stringify(dbResult[0]));
      response.json(data);
    }
  });
});
module.exports = router;
