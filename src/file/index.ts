import { IBatteryData } from "../../data";
import fs from "fs";
import path from "path";

export default function file(fileName: string) {
  return {
    save: (object: IBatteryData) => {
      return save(fileName, object);
    },
    read: () => {
      return read(fileName);
    },
  };
}

function save(fileName: string, object: IBatteryData) {
  try {
    const jsonFilePath = path.resolve("data", fileName);
    fs.writeFileSync(jsonFilePath, JSON.stringify(object));
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

function read(fileName: string): IBatteryData | null {
  try {
    const jsonFilePath = path.resolve("data", fileName);
    const data = fs.readFileSync(jsonFilePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
    return null;
  }
}
