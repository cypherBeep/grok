/*
 In our solution, we make four decisions:

    We use a class. This allows us to tie our methods together, calling them on instances of our class instead of passing references.
    To handle duplicate words with different cases, we choose to make a word uppercase in our map only if it is always uppercase in the original string. While this is a reasonable approach, it is imperfect (consider proper nouns that are also lowercase words, like "Bill" and "bill").
    We build our own splitWords() method instead of using a built-in one. This allows us to pass each word to our addWordToMap() method as it was split, and to split words and eliminate punctuation in one iteration.
    We make our own isLetter() method instead of using regular expressions. Either approach would work for this challenge.

To split the words in the input string and populate a map of the unique words to the number of times they occurred, we:

    Split words by spaces, em dashes, and ellipses—making sure to include hyphens surrounded by characters. We also include all apostrophes (which will handle contractions nicely but will break possessives into separate words).
    Populate the words in our map as they are identified, checking if the word is already in our map in its current case or another case.

If the input word is uppercase and there's a lowercase version in the map, we increment the lowercase version's count. If the input word is lowercase and there's an uppercase version in the map, we "demote" the uppercase version by adding the lowercase version and giving it the uppercase version's count. 
*/

class WordCloudData {
  constructor(inputString) {
    this.wordsToCounts = new Map();
    this.populateWordsToCounts(inputString);
  }

  populateWordsToCounts(inputString) {

    // Iterates over each character in the input string, splitting
    // words and passing them to this.addWordToMap()

    let currentWordStartIndex = 0;
    let currentWordLength = 0;

    for (let i = 0; i < inputString.length; i++) {
      const character = inputString.charAt(i);

      // If we reached the end of the string we check if the last
      // character is a letter and add the last word to our map
      if (i === inputString.length - 1) {
        if (this.isLetter(character)) {
          currentWordLength += 1;
        }
        if (currentWordLength > 0) {
          const word = inputString.slice(currentWordStartIndex,
            currentWordStartIndex + currentWordLength);
          this.addWordToMap(word);
        }

        // If we reach a space or emdash we know we're at the end of a word
        // so we add it to our map and reset our current word
      } else if (character === ' ' || character === '\u2014') {
        if (currentWordLength > 0) {
          const word = inputString.slice(currentWordStartIndex,
            currentWordStartIndex + currentWordLength);
          this.addWordToMap(word);
          currentWordLength = 0;
        }

        // We want to make sure we split on ellipses so if we get two periods in
        // a row we add the current word to our map and reset our current word
      } else if (character === '.') {
        if (i < inputString.length - 1 && inputString.charAt(i + 1) === '.') {
          if (currentWordLength > 0) {
            const word = inputString.slice(currentWordStartIndex,
              currentWordStartIndex + currentWordLength);
            this.addWordToMap(word);
            currentWordLength = 0;
          }
        }

        // If the character is a letter or an apostrophe, we add it to our current word
      } else if (this.isLetter(character) || character === '\'') {
        if (currentWordLength === 0) {
          currentWordStartIndex = i;
        }
        currentWordLength += 1;

        // If the character is a hyphen, we want to check if it's surrounded by letters
        // if it is, we add it to our current word
      } else if (character === '-') {
        if (i > 0 && this.isLetter(inputString.charAt(i - 1)) &&
          this.isLetter(inputString.charAt(i + 1))) {
          currentWordLength += 1;
        } else {
          if (currentWordLength > 0) {
            const word = inputString.slice(currentWordStartIndex,
              currentWordStartIndex + currentWordLength);
            this.addWordToMap(word);
            currentWordLength = 0;
          }
        }
      }
    }
  }

  addWordToMap(word) {
    let newCount;

    // If the word is already in the map we increment its count
    if (this.wordsToCounts.has(word)) {
      newCount = this.wordsToCounts.get(word) + 1;
      this.wordsToCounts.set(word, newCount);

      // If a lowercase version is in the map, we know our input word must be uppercase
      // but we only include uppercase words if they're always uppercase
      // so we just increment the lowercase version's count
    } else if (this.wordsToCounts.has(word.toLowerCase())) {
      newCount = this.wordsToCounts.get(word.toLowerCase()) + 1;
      this.wordsToCounts.set(word.toLowerCase(), newCount);

      // If an uppercase version is in the map, we know our input word must be lowercase.
      // since we only include uppercase words if they're always uppercase, we add the
      // lowercase version and give it the uppercase version's count
    } else if (this.wordsToCounts.has(this.capitalize(word))) {
      newCount = this.wordsToCounts.get(this.capitalize(word)) + 1;
      this.wordsToCounts.set(word, newCount);
      this.wordsToCounts.delete(this.capitalize(word));

      // Otherwise, the word is not in the map at all, lowercase or uppercase
      // so we add it to the map
    } else {
      this.wordsToCounts.set(word, 1);
    }
  }

  capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  isLetter(character) {
    return 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(character) >= 0;
  }
}

	  
	  
	    
