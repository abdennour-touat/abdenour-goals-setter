import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
//Get user from localStorage

const user = JSON.parse(localStorage.getItem("user"));

//the initial state of a user
const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Register User
//this function calls the regiser from the authService that calls the api
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    //here we call the register function from the auth Service
    try {
      return await authService.register(user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
//the login function
export const logIn = createAsyncThunk("auth/logIn", async (user, thunkAPI) => {
  //here we call the logIn function from the auth Service
  try {
    return await authService.logIn(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
//logout function...
export const logOut = createAsyncThunk("auth/logout", async () => {
  await authService.logOut();
});
//exporting the slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //to reset the state
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        console.log(action.payload);
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        console.log(action.payload);
      })
      .addCase(logIn.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.user = null;
      });
  },
});

//exporting the reset function to use it in other places
export const { reset } = authSlice.actions;
//exporting the reducer
export default authSlice.reducer;
