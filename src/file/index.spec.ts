import file from ".";
import path from "path";
import fs from "fs";
import { IBatteryData } from "../../data";

describe("file", () => {
  const testDataFileName = "test_data.json";
  const jsonFilePath = path.resolve("data", testDataFileName);
  const clearTestData = () => {
    fs.writeFileSync(jsonFilePath, JSON.stringify({}));
  };

  afterEach(() => clearTestData());
  describe("save", () => {
    it("should write the data from a received object to a specified JSON file", () => {
      // arrange
      const object: IBatteryData = {
        percentage: 50,
        date: new Date().toISOString(),
      };

      // act
      const { read, save } = file(jsonFilePath);
      save(object);

      // assert
      const jsonFile = read();
      expect(jsonFile).toStrictEqual(object);
    });

    it("should return true if the data was written successfully", () => {
      // arrange
      const object: IBatteryData = {
        percentage: 50,
        date: new Date().toISOString(),
      };

      // act
      const result = file(jsonFilePath).save(object);

      // assert
      expect(result).toBe(true);
    });
  });
});
