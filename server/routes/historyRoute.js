const express = require("express");
const moment = require("moment");
const history = express.Router();

const Action = require("../models/Action");

history
  .route("/")
  .get((req, res) => {
    Action.find()
      .populate("activityId")
      .exec((err, actions) => {
        if (err) res.status(500).send({ err });
        else {
          const response = {
            page: 1,
            pages: 1,
            actions
          };
          if (req.query.sort) {
            switch (req.query.sort) {
              case "date":
                const newActions = {};
                for (action of response.actions) {
                  if (newActions[moment(action.endTime).format("L")])
                    newActions[moment(action.endTime).format("L")].push(action);
                  else
                    newActions[moment(action.endTime).format("L")] = [action];
                }
                response.actions = newActions;
                break;
            }
          }
          if (response.actions.length > 50) {
            // Return 50 results per page, starting at the page sent by user
            response.actions = actions.splice(
              (req.query.page && req.query.page * 50 < actions.length
                ? req.query.page * 50
                : 0) + 1,
              50
            );
            response.page =
              req.query.page && req.query.page * 50 < actions.length
                ? req.query.page
                : 1;
            response.pages = Math.ceil(actions.length / 50);
          }
          res.send(response);
        }
      });
  })
  .post((req, res) => {
    const newAction = new Action(req.body);
    newAction.save((err, action) => {
      if (err) res.status(500).send({ err });
      else res.status(201).send(action);
    });
  });

history
  .route("/:id")
  .get((req, res) => {
    Action.findById(req.params.id)
      .populate("activityId")
      .exec((err, action) => {
        if (err) res.status(404).send({ err });
        else res.send(action);
      });
  })
  .delete((req, res) => {
    Action.findByIdAndRemove(req.params.id, (err, action) => {
      if (err) res.status(404).send({ err });
      else res.sendStatus(204);
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

module.exports = history;
