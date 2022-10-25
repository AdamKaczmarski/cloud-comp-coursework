import {configureStore} from '@reduxjs/toolkit';
import chosenWordReducer from './chosenWordReducer';
import guessesReducer from './guessesReducer';

export const cuolWordleStore = configureStore({
    reducer: {
        chosenWord:chosenWordReducer,
        guesses:guessesReducer
    }
});

