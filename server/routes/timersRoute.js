const express = require("express");
const timers = express.Router();

const Timer = require("../models/Timer");
const Action = require("../models/Action");

timers.route("/").get((_, res) => {
  Timer.find((err, timer) => {
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
  if (!req.body.startTime) req.body.startTime = Date.now();
  const newTimer = new Timer(req.body);
  newTimer.save((err, timer) => {
    if (err) res.status(404).send({ err });
    else res.status(201).send(timer);
  });
});

timers.route("/end/:id").get((req, res) => {
  Timer.findById(req.params.id, (err, timer) => {
    if (err) return res.status(404).send();
    const newAction = new Action({ ...timer._doc, endTime: Date.now() });
    newAction.save((er, action) => {
      if (er) res.status(500).send({ er });
      else res.send(action);
    });
  });
});

module.exports = timers;
