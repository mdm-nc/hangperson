import { useEffect, useState, useCallback } from "react";

import words from "./wordList.json";
import { HangmanDrawing } from "./HangmanDrawing";
import { HangmanWord } from "./HangmanWord";
import { Keyboard } from "./Keyboard";

import "./styles.css";

function getWord() {
  const newWord = words[Math.floor(Math.random() * words.length)];
  //console.log("New random word: " + newWord);
  return newWord;
}

// May want to provide a hint button?

function App() {
  const [wordToGuess, setWordToGuess] = useState(getWord);

  // const [wordToGuess, setWordToGuess] = useState(() => {
  //   // get random word by getting random index (0-1) x # of random words, rounded down
  //   // return words[Math.floor(Math.random() * words.length)];
  //   return getWord();
  // });

  //letters as array of strings (w/ length =1)
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  //need to add key?
  const incorrectLetters = guessedLetters.filter(
    (letter) => !wordToGuess.includes(letter)
  );

  //number of body parts to guess is 6
  const isLoser = incorrectLetters.length >= 6;

  //check if winner -> split wordToGuess into letters and see if every letter
  const isWinner = wordToGuess
    .split("")
    .every((letter) => guessedLetters.includes(letter));

  const addGuessedLetter = useCallback(
    (letter: string) => {
      //console.log('Guessed letter is: ' + letter);
      if (guessedLetters.includes(letter) || isLoser || isWinner) return;

      setGuessedLetters((currentLetters) => [...currentLetters, letter]);
    },
    [guessedLetters, isWinner, isLoser]
  );

  // Replaced with above callback fn to keep it from re-running too many times?
  // function addGuessedLetter( letter: string) {
  //   // skip if already guessed
  //   if(guessedLetters.includes(letter)) return;

  //   setGuessedLetters( currentLetters => [...currentLetters, letter]);

  // }
  /* track keypresses - note use guessedLetters to trigger rerun of useEffect */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;

      //console.log('The key pressed is: ' + e.key);

      // ignore non alphabet key presses
      if (!key.match(/^[a-z]$/)) return;

      //prevent default action
      e.preventDefault();

      addGuessedLetter(key);
    };

    //console.log('Adding event listener...');
    document.addEventListener("keypress", handler);

    // remove handler when done
    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [guessedLetters]);

  /* track 'Enter' to get new word */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;

      //console.log('The key pressed is: ' + e.key);

      // only looking for enter key
      //?? maybe also check to see if in the middle of a word or haven't even started yet?
      if (key !== "Enter" || !(isLoser || isWinner)) return;

      //prevent default action
      e.preventDefault();

      //clear guessedLetters and get new word
      setGuessedLetters([]);
      setWordToGuess(getWord());
    };

    //console.log('Adding event listener...');
    document.addEventListener("keypress", handler);

    // remove handler when done
    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [guessedLetters]);

  function resetGame() {
    setGuessedLetters([]);
    setWordToGuess(getWord());
  }

  return (
    <div
      style={{
        maxWidth: "800px",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        alignItems: "center",
      }}
    >
      <div className="win-msg">       
        { isWinner && "You Win!  Reset or press ENTER to try again."}
        { isLoser && "Nice Try!  Reset or press ENTER to try again."} 
      </div>
      <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
      <HangmanWord
        reveal={isLoser}
        guessedLetters={guessedLetters}
        wordToGuess={wordToGuess}
      />
      {/* Don't want keyboard aligned in center */}
      <div style={{ alignSelf: "stretch" }}>
        <Keyboard
          isDisabled={isWinner || isLoser}
          activeLetters={guessedLetters.filter((letter) =>
            wordToGuess.includes(letter)
          )}
          inactiveLetters={incorrectLetters}
          addGuessedLetter={addGuessedLetter}
        />
      </div>
      <div>
        <button className="refresh-btn" onClick={() => resetGame()} key="Reset">
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;
