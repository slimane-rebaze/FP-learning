import { promises as fs } from "fs";
import { getSumOfAllCalibrationValuesFor } from "./day1";

const processFile = async (filePath: string) => {
  try {
    const lines = await readFileAsLines(filePath);
    const totalSum = await getSumOfAllCalibrationValuesFor(lines);
    console.log("The sum of calibration values is :", totalSum);
  } catch (error) {
    console.error("Error processing file :", error);
  }
};

const readFileAsLines = async (filePath: string): Promise<string[]> => {
  try {
    const content = await fs.readFile(filePath, "utf-8");
    return content
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line !== "");
  } catch (error) {
    console.error("Error on reading file :", error);
    throw error;
  }
};

processFile("file.txt");
