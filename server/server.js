const express = require("express");
const morgan = require("morgan");

const activitiesRoute = require("./routes/activitiesRoute");
const historyRoute = require("./routes/historyRoute");
const timersRoute = require("./routes/timersRoute");

const server = express();
const PORT = 8080;

server
  .use(express.json())
  .use(morgan("dev"))
  .use("/activities", activitiesRoute)
  .use("/history", historyRoute)
  .use("/timers", timersRoute);

mongoose
  .connect(
    "mongodb://localhost:27017/lifetracker",
    { useNewUrlParser: true }
  )
  .then(() => console.log("Connected to DB"))
  .catch(err => console.error(err));

server.listen(PORT, () => console.log(`Server listening on ${PORT}`));
