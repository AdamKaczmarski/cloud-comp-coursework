import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    guessesDone:[]
}
const previousGuesses = JSON.parse(localStorage.getItem("guesses"));
if (previousGuesses){
  if (previousGuesses.date===new Date().setHours(0,0,0,0)) {
    initialState = {
        guessesDone:previousGuesses.guessesDone
    };
  } else {
      localStorage.removeItem("guesses")
  }
}

export const guesses = createSlice({
    name:"guess",
    initialState,
    reducers: {
        setGuesses(state,action){
            state.guessesDone = [...state.guessesDone, action.payload];
            const store = {date: new Date().setHours(0,0,0,0), guessesDone: state.guessesDone}
            localStorage.setItem("guesses",JSON.stringify(store))
        }
    }
})
export const { setGuesses} = guesses.actions;

export default guesses.reducer;
