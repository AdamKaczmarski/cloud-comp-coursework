import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//We get the length of chosen word from the server. We check with the server whether the guess is correct in WordInput.
export const fetchChosenWordInfo = createAsyncThunk("fetchChosenWordInfo", async () => {
let token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY5OTc2NTY5LCJpYXQiOjE2Njk4OTAxNjksImp0aSI6ImE0OGNjZjYzYmJkYTQ0MzU4MjI4ZjU1ZWIyYTk2NTg0IiwidXNlcl9pZCI6MX0.2ZCfMWDZOm5MHHMTuOXKGplb1IX2d5ILzxWxFN-jTUU"
  try{
  const response = await axios.get(
    "http://localhost:8000/cuol_wordle/get_length"
  , {
    headers:{
        Authorization: "Bearer "+token
    }
  });
    console.log(response.data)
  return response.data;
    }catch(error){console.log(error)}});

const initialState = {
    chosenLength:5, //5 for testing, the length should be set tp 0 by default and update by the API call above
};

export const chosenWordSlice = createSlice({
  name: "chosenWord",
  initialState,
  reducers: {
    setChosenWord(state, action) {
      state = action.payload;
      console.log("chosenLength: " + state);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChosenWordInfo.fulfilled,(state,action)=>{
        state.chosenLength = action.payload;
    })
  }
});

export const { setChosenWord } = chosenWordSlice.actions;

export default chosenWordSlice.reducer;
