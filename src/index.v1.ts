import fs from 'fs';
export const runCalculation = () => {
  // Record start
  const start = performance.now();

  // Read file into string
  const wordsString = fs.readFileSync('./src/words_alpha.txt', {
    encoding: 'utf-8',
  });

  // Convert to array
  const words = wordsString.split('\n');

  // Apply filtering
  const filteredWords = words.filter((word) => {
    // Only include words with five letters
    if (word.length === 5) {
      // Filter words with repeating letters
      return !word
        .split('')
        .some((char) => word.replace(char, '').includes(char));
    }
  });

  const solution = [];

  // First word
  filteredWords.some((firstWord) => {
    const potentialSolution = [];

    // Second word
    filteredWords.some((secondWord) => {
      if (hasNoRepeatingChars(firstWord, secondWord)) {
        console.log(firstWord, secondWord);

        return filteredWords.some((thirdWord) => {
          if (hasNoRepeatingChars(firstWord, secondWord, thirdWord)) {
            return filteredWords.some((fourthWord) => {
              if (
                hasNoRepeatingChars(
                  firstWord,
                  secondWord,
                  thirdWord,
                  fourthWord
                )
              ) {
                return filteredWords.some((fifthWord) => {
                  if (
                    hasNoRepeatingChars(
                      firstWord,
                      secondWord,
                      thirdWord,
                      fourthWord,
                      fifthWord
                    )
                  ) {
                    potentialSolution.push(
                      firstWord,
                      secondWord,
                      thirdWord,
                      fourthWord,
                      fifthWord
                    );
                    return true;
                  }
                });
              }
            });
          }
        });
      }
    });

    solution.push(potentialSolution);
  });

  fs.writeFileSync('solution.txt', solution.join('\n'));

  const end = performance.now();
  return end - start;
};

/**
 * Combines all arguments except for the last one, and compares against that
 * @param  {...any} args
 * @returns
 */
const hasNoRepeatingChars = (...args: string[]) => {
  const comparator = args.splice(-1, 1)[0];
  return !args
    .join('')
    .split('')
    .some((char) => comparator.includes(char));
};
