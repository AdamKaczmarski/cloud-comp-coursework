import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    guessesDone:[],
    email: ""
}
const previousGuesses = JSON.parse(localStorage.getItem("guesses"));
if (previousGuesses){
  if (previousGuesses.date===new Date().setHours(0,0,0,0)) {
    initialState = {
        guessesDone:previousGuesses.guessesDone,
        email: previousGuesses.email
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
            const store = {date: new Date().setHours(0,0,0,0), guessesDone: state.guessesDone, email: state.email}
            localStorage.setItem("guesses",JSON.stringify(store))
        },
        setEmail(state,action){
            if (action.paylod !== state.email){
                state.email = action.payload
                state.guessesDone=[]
            }

        },
    }
})
export const { setGuesses, setEmail} = guesses.actions;

export default guesses.reducer;
