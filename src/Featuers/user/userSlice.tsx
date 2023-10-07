import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
interface IState {
  loading: boolean;
  data: {
    email: string;
    password: string;
  };
  error: string | null;
}
const initialState: IState = {
  loading: false,
  data: {
    email: "",
    password: "",
  },
  error: "",
};

// TODO: Write SetAsyncUserData
export const setAsyncUserData = createAsyncThunk<IState, void>(
  "user/setUserData",
  async (payload) => {
    const request = await axios.post("http://localhost:5000/user", payload);
    const response = await request.data;
    localStorage.setItem("user", JSON.stringify(response.data));
    return response;
  }
);
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setAsyncUserData.pending, (state: IState) => {
      state.data = { email: "", password: "" };
      state.error = null;
      state.loading = true;
    });
    builder.addCase(setAsyncUserData.fulfilled, (state: IState, action) => {
      state.data = action.payload.data;
      console.log(state);
      state.loading = false;
      state.error = null;
      console.log("payload Creator", action);
    });
    builder.addCase(setAsyncUserData.rejected, (state: IState, action) => {
      state.loading = false;

      console.log("Errrrrrrrr", action);
      if (action.error.message) {
        state.error = "Invalid Access Denied !";
      }
    });
  },
});

export default userSlice.reducer;
