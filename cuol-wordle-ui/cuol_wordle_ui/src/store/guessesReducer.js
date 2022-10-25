import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    guessesDone:[]
}

export const guesses = createSlice({
    name:"guess",
    initialState,
    reducers: {
        setGuesses(state,action){
            state.guessesDone = [...state.guessesDone, action.payload];
                      
        }
    }
})

export const { setGuesses } = guesses.actions;

export default guesses.reducer;
