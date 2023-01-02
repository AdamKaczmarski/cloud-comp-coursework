# CUOL-Wordle Frontend - ReactJS

This directory contains _(link files are the most important ones to look at)_:

- The application code in [src/](src/) - highlight files: [WordInput](src/components/WordInput.js) \
  [WordInput](src/components/WordInput.js) - Handles the user input, cookies \
  [Guess](src/components/Guess.js) - Displays each guess \
  [Stats](src/components/Stats.js) - The stats modal \
   [guessesReducer](src/store/guessesReducer.js) - Manages the storage of guesses

- The production build in [build/](build/)
- .env files that specify the host of the requests \
  _.env has empty string because the app is served by django and the app will call itself by default_

## How to run

**Prerequisites**

- node 16.15+
- npm 8.12.1+

1. Install node packages `npm install`
1. Start the local server `npm start` or build the static files `npm run build`
