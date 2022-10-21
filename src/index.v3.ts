import fs from 'fs';
export const runCalculation = () => {
  // Record start
  const start = performance.now();

  // Read file into string
  const wordsString = fs.readFileSync('./src/words_alpha_test.txt', {
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

  // Filter for anagrams
  // const anagramFilteredWords = filterAnagrams(filteredWords);
  const anagramFilteredWords = filteredWords;

  fs.writeFileSync('filtered.txt', anagramFilteredWords.join('\n'));

  console.log(`${anagramFilteredWords.length} values to search`);

  const solution = [];

  let current = 0;

  anagramFilteredWords.some((w1) => {
    current++;

    return anagramFilteredWords.some((w2, i2) => {
      current++;
      if (w1 === 'ambry' && w2 === 'fldxt') {
        console.log('solution:', w1, w2);
      }
      // Increase progress counter
      if (!hasNoRepeatingChars(w1, w2)) {
      } else {
        console.log(current);
        // Search for next word
        return anagramFilteredWords.some((w3, i3) => {
          current++;
          if (!hasNoRepeatingChars(w1, w2, w3)) {
          } else {
            // Search for next word
            return anagramFilteredWords.some((w4, i4) => {
              current++;
              if (!hasNoRepeatingChars(w1, w2, w3, w4)) {
              } else {
                // Search for next word
                return anagramFilteredWords.some((w5) => {
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

const filterAnagrams = (stringArray: string[]) => {
  const newArray = [];
  stringArray
    .map((element) => element.split('').sort())
    .forEach((element) => {
      if (element.join('') === 'spung') {
        console.log(element);
      }
      if (!newArray.includes(element.join(''))) {
        newArray.push(element.join(''));
      }
    });
  return newArray
    .map((element) => {
      const findMatch = stringArray.find((string) => {
        if (string.split('').sort().join('') === element) return string;
      });
      return findMatch;
    })
    .sort();
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
