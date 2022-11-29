import express from "express";
import file from "./file";
import { IBatteryData } from "../data";
import { format } from "timeago.js";

const app = express();
app.use(express.json());

app.post("/start-charging", async (req, res) => {
  const { percentage, date } = req.body;

  const data: IBatteryData = {
    percentage: percentage,
    date,
  };
  const { read, save } = file("data.json");
  const previousData = read();

  if (!previousData) {
    save(data);
    return res.json({
      message: `🔌 Started charging at ${percentage}% on ${date}.`,
    });
  }

  const percentageDiff = previousData.percentage - percentage;
  const humanReadableTime = format(date, "en_US", {
    relativeDate: previousData.date,
  });
  save(data);
  return res.json({
    message: `🔌 Started charging at ${percentage}% on ${date}.\n🔋 Last charge was ${humanReadableTime}.\n${percentageDiff}% of battery was used.`,
  });
});

app.post("/stop-charging", async (req, res) => {
  const { percentage, date } = req.body;
  const data: IBatteryData = {
    percentage,
    date,
  };
  const { save, read } = file("data.json");
  const previousData = read();
  if (!previousData) {
    save(data);
    return res.json({
      message: `Stopped charging at ${percentage}% on ${date}.`,
    });
  }
  const percentageDiff = data.percentage - previousData.percentage;
  const currentDate = new Date(data.date);
  const previousDate = new Date(previousData.date);
  const timeDiff = currentDate.getTime() - previousDate.getTime();
  save(data);
  return res.status(200).json({
    message: `📴 Disconnected from charger at ${percentage}% on ${date}.\n🔋 ${percentageDiff}% of battery was charged in ${
      timeDiff / 1000 / 60
    } minutes.`,
  });
});

app.listen(80, () => {
  console.log("Server started on port 80");
});
