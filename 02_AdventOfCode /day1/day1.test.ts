import { Effect } from "effect";
import {
  getCalibrationValueOfLine,
  parseDigitFromString,
  getSumOfAllCalibrationValuesFor,
  findFirstDigitReal,
  findLastDigit,
} from "./day1";

describe("day1", () => {
  describe("First digit of calibration value", () => {
    it("should return 1 if the provided line is 1", () => {
      const line = "1";

      const result: number = Effect.runSync(getCalibrationValueOfLine(line));

      const firstDigit = Number(result.toString()[0]);
      expect(firstDigit).toBe(1);
    });

    it("should return 1 if the provided line is f1", () => {
      const line = "f1";

      const result: number = Effect.runSync(getCalibrationValueOfLine(line));

      const firstDigit = Number(result.toString()[0]);
      expect(firstDigit).toBe(1);
    });
  });

  describe("Calibration value of a line", () => {
    it("should return 11 if the provided line is 1abc", () => {
      const line = "1abc";

      const result: number = Effect.runSync(getCalibrationValueOfLine(line));

      expect(result).toBe(11);
    });

    it("should return 12 if the provided line is 1abc2", () => {
      const line = "1abc2";

      const result: number = Effect.runSync(getCalibrationValueOfLine(line));

      expect(result).toBe(12);
    });

    it("should return 38 if the provided line is pqr3stu8vwx", () => {
      const line = "pqr3stu8vwx";

      const result: number = Effect.runSync(getCalibrationValueOfLine(line));

      expect(result).toBe(38);
    });

    it("should return 15 if the provided line is a1b2c3d4e5f", async () => {
      const line = "a1b2c3d4e5f";

      const result: number = await Effect.runSync(
        getCalibrationValueOfLine(line)
      );

      expect(result).toBe(15);
    });

    it("should return 77 if the provided line is treb7uchet", () => {
      const line = "treb7uchet";

      const result: number = Effect.runSync(getCalibrationValueOfLine(line));

      expect(result).toBe(77);
    });
  });

  describe("Sum of calibration values of given lines", () => {
    it("should return 142 if the provided lines of the exemple exercice", async () => {
      const lines = ["1abc2", "pqr3stu8vwx", "a1b2c3d4e5f", "treb7uchet"];

      const result: number = await getSumOfAllCalibrationValuesFor(lines);

      expect(result).toBe(142);
    });
  });

  describe("Parse digit from string", () => {
    it("should return 1 if the provided string is 'oned21'", () => {
      const value = "oned21";

      const result: number = Effect.runSync(parseDigitFromString(value));

      expect(result).toBe(1);
    });

    it("should return 2 if the provided string is 'twoone'", () => {
      const value = "twoone";

      const result: number = Effect.runSync(parseDigitFromString(value));

      expect(result).toBe(2);
    });

    it("should return 3 if the provided string is 'threesd'", () => {
      const value = "threesd";

      const result: number = Effect.runSync(parseDigitFromString(value));

      expect(result).toBe(3);
    });

    it("should return 4 if the provided string is 'four21az'", () => {
      const value = "four21az";

      const result: number = Effect.runSync(parseDigitFromString(value));

      expect(result).toBe(4);
    });

    it("should return 5 if the provided string is 'fiveqsd22'", () => {
      const value = "fiveqsd22";

      const result: number = Effect.runSync(parseDigitFromString(value));

      expect(result).toBe(5);
    });

    it("should return 6 if the provided string is 'sixdsqd4'", () => {
      const value = "six";

      const result: number = Effect.runSync(parseDigitFromString(value));

      expect(result).toBe(6);
    });

    it("should return 7 if the provided string is 'seven213s'", () => {
      const value = "seven";

      const result: number = Effect.runSync(parseDigitFromString(value));

      expect(result).toBe(7);
    });

    it("should return 8 if the provided string is 'eightsqd121'", () => {
      const value = "eightsqd121";

      const result: number = Effect.runSync(parseDigitFromString(value));

      expect(result).toBe(8);
    });

    it("should return 9 if the provided string is 'ninesqd122'", () => {
      const value = "ninesqd122";

      const result: number = Effect.runSync(parseDigitFromString(value));

      expect(result).toBe(9);
    });
  });

  describe("First digit of calibration value with string digit", () => {
    it("should return 1 if the provided string is 'oned21'", () => {
      const value = "oned21";

      const result: number = Effect.runSync(findFirstDigitReal(value));

      expect(result).toBe(1);
    });
  });

  describe("Last digit of calibration value with string digit", () => {
    it("should return 3 if the provided string is 'oned213'", () => {
      const value = "oned213";

      const result: number = Effect.runSync(findLastDigit(value));

      expect(result).toBe(3);
    });
  });

  describe("Calibration value of a line with string digit", () => {
    it("should return 29 if the provided string is 'two1nine'", () => {
      const value = "two1nine";

      const result: number = Effect.runSync(getCalibrationValueOfLine(value));

      expect(result).toBe(29);
    });
  });

  describe("Sum of calibration values of an array of string values", () => {
    it("should return 281 with the given provided array", async () => {
      const values = [
        "two1nine",
        "eightwothree",
        "abcone2threexyz",
        "xtwone3four",
        "4nineeightseven2",
        "zoneight234",
        "7pqrstsixteen",
      ];

      const result: number = await getSumOfAllCalibrationValuesFor(values);
      expect(result).toBe(281);
    });
  });
});
