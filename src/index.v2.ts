import fs from 'fs';
export const runCalculation = () => {
  // Record start
  const start = performance.now();

  // Read file into string
  const wordsString = fs.readFileSync('./src/words_alpha.txt', {
    encoding: 'utf-8',
  });

  // Convert to array
  const words = wordsString.split('\n').map((word) => word.replace('\r', ''));

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

  fs.writeFileSync('filtered.txt', filteredWords.join('\n'));

  console.log(`${filteredWords.length} values to search`);

  let current = 0;

  const updateProgress = () => {
    console.log(`Current progress: ${current}`);
  };

  const solution = [];

  filteredWords.some((w1) => {
    const filteredWordsList = [...filteredWords];

    return filteredWordsList.some((w2, i2) => {
      // Increase progress counter
      current++;
      if (!hasNoRepeatingChars(w1, w2)) {
        // Delete faulty value
        filteredWordsList.splice(i2, 1);
      } else {
        // Search for next word
        // updateProgress();
        return filteredWordsList.some((w3, i3) => {
          current++;
          if (!hasNoRepeatingChars(w1, w2, w3)) {
            // Delete faulty value
            filteredWordsList.splice(i3, 1);
          } else {
            // Search for next word
            return filteredWordsList.some((w4, i4) => {
              current++;
              if (!hasNoRepeatingChars(w1, w2, w3, w4)) {
                // Delete faulty value
                filteredWordsList.splice(i4, 1);
              } else {
                // Search for next word
                return filteredWordsList.some((w5) => {
                  console.log(w1, w2, w3, w4, w5);
                  current++;
                  if (hasNoRepeatingChars(w1, w2, w3, w4, w5)) {
                    console.log('solution:', w1, w2, w3, w4, w5);
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
