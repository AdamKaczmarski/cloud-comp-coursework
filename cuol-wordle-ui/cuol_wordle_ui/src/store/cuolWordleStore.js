import { configureStore } from "@reduxjs/toolkit";
import chosenWordReducer from "./chosenWordReducer";
import guessesReducer from "./guessesReducer";
import authReducer from "./authReducer";
export const cuolWordleStore = configureStore({
  reducer: {
    chosenWord: chosenWordReducer,
    guesses: guessesReducer,
    auth: authReducer,
  },
});
