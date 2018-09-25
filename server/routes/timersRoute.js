const express = require("express");
const moment = require("moment");
const timers = express.Router();

const Timer = require("../models/Timer");
const Action = require("../models/Action");

timers.route("/").get((_, res) => {
  Timer.find()
    .populate("activityId")
    .exec((err, timer) => {
      if (err) res.status(500).send({ err });
      else res.send(timer);
    });
});

timers
  .route("/:id")
  .get((req, res) => {
    Timer.findById(req.params.id, (err, timer) => {
      if (err) res.status(404).send({ err });
      else res.send(timer);
    });
  })
  .put((req, res) => {
    Timer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
      (err, timer) => {
        if (err) res.status(404).send({ err });
        else res.send(timer);
      }
    );
  })
  .delete((req, res) => {
    Timer.findByIdAndRemove(req.params.id, (err, timer) => {
      if (err) res.status(404).send({ err });
      else res.status(204).send();
    });
  });

// TODO: check to ensure activityId is valid
timers.route("/start").post((req, res) => {
  if (!req.body.startTime) req.body.startTime = moment();
  const newTimer = new Timer(req.body);
  delete newTimer._id;
  newTimer.save((err, timer) => {
    if (err) res.status(404).send({ err });
    else
      Timer.findById(timer._id)
        .populate("activityId")
        .exec((err, t) => {
          if (err) console.log(err);
          else res.status(201).send(t);
        });
  });
});

timers.route("/end/:id").get((req, res) => {
  Timer.findByIdAndRemove(req.params.id, (err, timer) => {
    if (err) return res.status(404).send();
    delete timer._doc._id;
    const newAction = new Action({ ...timer._doc, endTime: moment() });
    newAction.save((er, action) => {
      if (er) res.status(500).send({ er });
      else res.send(action);
    });
  });
});

module.exports = timers;
