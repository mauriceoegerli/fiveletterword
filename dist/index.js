import fs from "fs";
export const runCalculation = () => {
  const start = performance.now();
  const wordsString = fs.readFileSync("./src/words_alpha_test.txt", {
    encoding: "utf-8"
  });
  const words = wordsString.split("\n").map((word) => word.replace("\r", ""));
  const filteredWords = words.filter((word) => {
    if (word.length === 5) {
      return !word.split("").some((char) => word.replace(char, "").includes(char));
    }
  });
  const anagramFilteredWords = filteredWords;
  fs.writeFileSync("filtered.txt", anagramFilteredWords.join("\n"));
  console.log(`${anagramFilteredWords.length} values to search`);
  const solution = [];
  let current = 0;
  anagramFilteredWords.some((w1) => {
    current++;
    return anagramFilteredWords.some((w2, i2) => {
      current++;
      if (w1 === "ambry" && w2 === "fldxt") {
        console.log("solution:", w1, w2);
      }
      if (!hasNoRepeatingChars(w1, w2)) {
      } else {
        console.log(current);
        return anagramFilteredWords.some((w3, i3) => {
          current++;
          if (!hasNoRepeatingChars(w1, w2, w3)) {
          } else {
            return anagramFilteredWords.some((w4, i4) => {
              current++;
              if (!hasNoRepeatingChars(w1, w2, w3, w4)) {
              } else {
                return anagramFilteredWords.some((w5) => {
                  current++;
                  if (hasNoRepeatingChars(w1, w2, w3, w4, w5)) {
                    console.log("solution:", w1, w2, w3, w4, w5);
                    solution.push([w1, w2, w3, w4, w5]);
                    return true;
                  }
                });
              }
            });
          }
        });
      }
    });
  });
  fs.writeFileSync("solution.txt", solution.join("\n"));
  const end = performance.now();
  return end - start;
};
const filterAnagrams = (stringArray) => {
  const newArray = [];
  stringArray.map((element) => element.split("").sort()).forEach((element) => {
    if (element.join("") === "spung") {
      console.log(element);
    }
    if (!newArray.includes(element.join(""))) {
      newArray.push(element.join(""));
    }
  });
  return newArray.map((element) => {
    const findMatch = stringArray.find((string) => {
      if (string.split("").sort().join("") === element)
        return string;
    });
    return findMatch;
  }).sort();
};
const hasNoRepeatingChars = (...args) => {
  const comparator = args.splice(-1, 1)[0];
  return !args.join("").split("").some((char) => comparator.includes(char));
};
