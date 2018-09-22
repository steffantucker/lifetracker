const Activity = require("./models/Activity");
const Action = require("./models/Action");
const Timer = require("./models/Timer");
const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb://localhost:27017/lifetracker",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Connected to DB");
    //insert filler function here
  })
  .catch(err => console.error(err));

function generateActivities() {
  [{ title: "toilet" }].forEach((v, i) => {
    Activity.create((err, activity) => {
      if (err) console.log(err);
      else console.log(`activity ${i} created`);
    });
  });
}

function generateActions() {
  const actions = [
    {
      description: "with someone"
    },
    {
      description: "blah"
    },
    {
      description: "boo"
    },
    {
      description: "boogie"
    },
    {
      description: "explosions"
    },
    {
      description: "magic"
    },
    {
      description: "quaint"
    },
    {
      description: "query"
    },
    {
      description: "queezy"
    }
  ];

  Activity.find((err, activity) => {
    if (err) console.log(err);
    else {
      actions.forEach((v, i) => {
        v.startTime = new Date(
          Math.random() * 3 + 2015,
          Math.random() * 12,
          Math.random() * 30 + 1,
          Math.random() * 24 + 1,
          Math.random() * 60 + 1
        );
        v.endTime = new Date(
          v.startTime.getTime() + Math.random() * 4 * 60 * 60 * 1000
        );
        v.activityId =
          activity[Math.floor(Math.random() * activity.length)]._id;
        Action.create(v, (err, action) => {
          if (err) console.log(err);
          else console.log(`action ${i} created`);
        });
      });
    }
  });
}

function generateTimers(count) {
  Activity.find((err, activity) => {
    if (err) console.log(err);
    else {
      console.log("here");
      Array.from({ length: count }, v => ({})).forEach((v, i) => {
        console.log(v);
        v.startTime = Date.now() - Math.random() * 4 * 60 * 60 * 1000;
        v.activityId = activity[Math.floor(Math.random() * activity.length)];
        Timer.create(
          v,
          (err, timer) =>
            err ? console.log(err) : console.log(`timer ${i} created`)
        );
      });
    }
  });
}
