import { Effect, Option, pipe } from "effect";
import { findFirst, flatMap } from "effect/Effect";

export const getSumOfAllCalibrationValuesFor: (
  lines: string[]
) => Promise<number> = (lines: string[]) =>
  Effect.runPromise(
    pipe(
      lines,
      Effect.forEach((line) => getCalibrationValueOfLine(line)),
      Effect.map((calibrationValues) =>
        calibrationValues.reduce((sum, value) => sum + value, 0)
      )
    )
  );

export const getCalibrationValueOfLine: (
  line: string
) => Effect.Effect<number, string, never> = (line: string) =>
  pipe(
    Effect.all([findFirstDigitReal(line), findLastDigit(line)]),
    Effect.map(([firstDigit, secondDigit]) =>
      concatDigits(firstDigit, secondDigit)
    )
  );

export const findFirstDigit: (
  line: string[]
) => Effect.Effect<number, string, never> = (line: string[]) =>
  pipe(
    line,
    findFirst((char) => Effect.succeed(isDigit(char))),
    flatMap(
      Option.match({
        onNone: () => Effect.fail("No digit found"),
        onSome: (char) => Effect.succeed(parseInt(char)),
      })
    )
  );

export const findFirstDigitReal: (
  line: string
) => Effect.Effect<number, string, never> = (line: string) =>
  pipe(
    parseDigitFromString(line),
    Effect.catchAll(() =>
      line.length > 1
        ? findFirstDigitReal(line.substring(1))
        : fail("No digit found")
    )
  );

export const findLastDigit: (
  line: string
) => Effect.Effect<number, string, never> = (line: string) =>
  pipe(
    parseDigitFromString(line),
    Effect.flatMap((digit) =>
      pipe(
        line.length > 1
          ? findLastDigit(line.substring(1))
          : Effect.succeed(digit),
        Effect.catchAll(() => Effect.succeed(digit))
      )
    ),
    Effect.catchAll(() =>
      line.length > 1
        ? findLastDigit(line.substring(1))
        : Effect.fail("No digit found : " + line)
    )
  );

export const parseDigitFromString: (
  value: string
) => Effect.Effect<number, string, never> = (value: string) => {
  const matchingKey = Object.keys(digitMap).find((key) =>
    value.toLowerCase().startsWith(key)
  );
  const firstChar = value.split("")[0];

  if (matchingKey) {
    return Effect.succeed(digitMap[matchingKey]);
  }
  if (isDigit(firstChar)) {
    return Effect.succeed(parseInt(firstChar));
  }
  return Effect.fail("No digit found");
};

const isDigit: (value: string) => boolean = (value: string) =>
  /^\d$/.test(value);

const concatDigits: (firstDigit: number, secondDigit: number) => number = (
  firstDigit: number,
  secondDigit: number
) => {
  const concatenated = firstDigit.toString() + secondDigit.toString();
  return Number(concatenated);
};

const digitMap: Record<string, number> = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};
