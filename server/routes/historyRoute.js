const express = require("express");
const history = express.Router();

const Action = require("../models/Action");

history
  .route("/")
  .get((_, res) => {
    Action.find((err, actions) => {
      if (err) res.status(500).send({ err });
      else res.send(actions);
    });
  })
  .post((_, res) => {
    const newAction = new Action(req.body);
    newAction.save((err, action) => {
      if (err) res.status(500).send({ err });
      else res.status(201).send(action);
    });
  });

history
  .route("/:id")
  .get((req, res) => {
    Action.findById(req.params.id, (err, action) => {
      if (err) res.status(404).send({ err });
      else res.send(action);
    });
  })
  .delete((req, res) => {
    Action.findByIdAndRemove(req.params.id, (err, action) => {
      if (err) res.status(404).send({ err });
      else res.send(204);
    });
  })
  .put((req, res) => {
    Action.findByIdAndUpdate(
      req.params.id,
      req.body,
      { runValidators: true, new: true },
      (err, action) => {
        if (err) res.status(400).send({ err });
        else res.send(action);
      }
    );
  });
