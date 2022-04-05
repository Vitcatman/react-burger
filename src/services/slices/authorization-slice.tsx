import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import { baseUrl } from "../../utils/data";
import { checkResponse } from "../../utils/check-response";

const initialState = {
  authorize: false,
  isLoading: false,
  hasError: false,
  user: {
    name: "",
    email: "",
    password: "",
  },
};


const authorizationSlice = createSlice({
  name: "authorization",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        state.user.email = action.payload.user.email;
        state.user.name = action.payload.user.name;
        state.user.password = action.payload.user.password;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        // @ts-ignore
        state.hasError = `Registration failed`;
      })
      .addCase(loginRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        state.user.email = action.payload.user.email;
        state.user.password = action.payload.user.password;
        state.authorize = true;
      })
      .addCase(loginRequest.rejected, (state) => {
        state.isLoading = false;
        // @ts-ignore
        state.hasError = `Login failed`;
      })
      .addDefaultCase(() => {});
  },
});

export const registerUser = createAsyncThunk(
  "authorization/registerUser",
  async (form, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const newData = await checkResponse(res);
      console.log(await newData)
      return newData;
     
    } catch (err) {
      // @ts-ignore
      return rejectWithValue(err.message);
    }
  }
);

export const loginRequest = createAsyncThunk(
  "authorization/loginRequest",
  async (form, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const newData = await checkResponse(res);
      return newData;
    } catch (err) {
      // @ts-ignore
      return rejectWithValue(err.message);
    }
  }
);

export const authorizationSelector = (state) => state.authorization;
export const authorizationReducer = authorizationSlice.reducer;
