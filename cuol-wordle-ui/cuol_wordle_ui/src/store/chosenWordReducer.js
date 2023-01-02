import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//We get the length of chosen word from the server. We check with the server whether the guess is correct in WordInput.
export const fetchChosenWordInfo = createAsyncThunk(
  "fetchChosenWordInfo",
  async (token) => {
        const url = process.env.REACT_APP_SERVER_URL;
    try {
      const response = await axios.get(
        `${url}/cuol_wordle/get_length`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  chosenLength: 5, //5 for testing, the length should be set tp 0 by default and update by the API call above
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
    builder.addCase(fetchChosenWordInfo.fulfilled, (state, action) => {
      state.chosenLength = action.payload;
    });
  },
});

export const { setChosenWord } = chosenWordSlice.actions;

export default chosenWordSlice.reducer;
