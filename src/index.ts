import express from "express";
import file from "./file";
import { IBatteryData } from "../data";
import path from "path";
import previousData from "../data/data.json";

const app = express();
app.use(express.json());

app.post("/start-charging", async (req, res) => {
  const { currentPercentage, date } = req.body;
  console.log("start-charging", currentPercentage, date);
  const data: IBatteryData = {
    currentPercentage,
    date,
  };
  file("data.json").save(data);
  return res.status(200).send("OK");
});

app.post("/stop-charging", async (req, res) => {
  const { currentPercentage, date } = req.body;
  const data = {
    currentPercentage,
    date,
  };
  const percentageDiff =
    data.currentPercentage - previousData.currentPercentage;
  const currentDate = new Date(data.date);
  const previousDate = new Date(previousData.date);
  const timeDiff = currentDate.getTime() - previousDate.getTime();
  file("data.json").save(data);
  return res.status(200).json({
    percentageDiff,
    timeDiff,
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
