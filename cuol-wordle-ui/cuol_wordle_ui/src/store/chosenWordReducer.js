import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchChosenWordInfo = createAsyncThunk("fetchChosenWordInfo", async () => {
  const response = await axios.get(
    "localhost:8000/get_chosen_info"
  );
  return response.data[0];
});

const initialState = {
    chosenLength:5 //5 for testing, the length should be set tp 0 by default and update by the API call above
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
