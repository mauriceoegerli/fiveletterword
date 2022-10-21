import fs from "fs";
export const runCalculation = () => {
  const start = performance.now();
  const wordsString = fs.readFileSync("./src/words_alpha.txt", {
    encoding: "utf-8"
  });
  const words = wordsString.split("\n");
  const filteredWords = words.filter((word) => {
    if (word.length === 5) {
      return !word.split("").some((char) => word.replace(char, "").includes(char));
    }
  });
  fs.writeFileSync("filtered.txt", filteredWords.join("\n"));
  const total = Math.pow(filteredWords.length, 5);
  let current = 0;
  const startTime = Date.now();
  const updateProgress = () => {
    const percentage = toFixed(current / total * 100);
    const solutionsCount = solution.length;
    const timePassed = Date.now() - startTime;
    const opsPerMS = current / timePassed;
    const opsPerS = current / (timePassed / 1e3);
    const years = opsPerMS * total / 1e3 / 60 / 60 / 24 / 7 / 52;
    console.log(
      `Current progress: ${percentage}%, solutions: ${solutionsCount}, opS: ${opsPerS}, ETA: ${years} years`
    );
  };
  const solution = [];
  filteredWords.some((w1) => {
    filteredWords.some((w2) => {
      current++;
      if (hasNoRepeatingChars(w1, w2)) {
        updateProgress();
        return filteredWords.some((w3) => {
          current++;
          if (hasNoRepeatingChars(w1, w2, w3)) {
            return filteredWords.some((w4) => {
              current++;
              if (hasNoRepeatingChars(w1, w2, w3, w4)) {
                return filteredWords.some((w5) => {
                  current++;
                  if (hasNoRepeatingChars(w1, w2, w3, w4, w5)) {
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
const hasNoRepeatingChars = (...args) => {
  const comparator = args.splice(-1, 1)[0];
  return !args.join("").split("").some((char) => comparator.includes(char));
};
function toFixed(x) {
  if (Math.abs(x) < 1) {
    var e = parseInt(x.toString().split("e-")[1]);
    if (e) {
      x *= Math.pow(10, e - 1);
      x = "0." + new Array(e).join("0") + x.toString().substring(2);
    }
  } else {
    var e = parseInt(x.toString().split("+")[1]);
    if (e > 20) {
      e -= 20;
      x /= Math.pow(10, e);
      x += new Array(e + 1).join("0");
    }
  }
  return x;
}
