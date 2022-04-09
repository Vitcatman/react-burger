import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import { baseUrl } from "../../utils/data";
import { checkResponse } from "../../utils/check-response";
import { setCookie, getCookie, deleteCookie } from "../../utils/cookies";

const initialState = {
  isAuthorized: false,
  isLoading: false,
  hasError: "",
  forgotPasswordSuccess: false,
  resetPasswordSuccess: false,
  updateSuccess: false,
  user: {
    name: "",
    email: "",
    password: "",
  },
};

const authorizationSlice = createSlice({
  name: "authorization",
  initialState,
  reducers: {
    resetResetPassSuccess: (state) => {
      state.resetPasswordSuccess = false;
    },
    resetForgotPassSuccess: (state) => {
      state.forgotPasswordSuccess = false;
    },
    resetError: (state) => {
      state.hasError = "";
    },
    resetUpdateSuccess: (state) => {
      state.updateSuccess = false;
    },
  },

  extraReducers: (builder) => {
    builder
      //Registration
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user.email = action.payload.user.email;
        state.user.name = action.payload.user.name;
        state.user.password = action.payload.user.password;
        state.isAuthorized = true;
        setCookie("accessToken", action.payload.accessToken, {
          expires: 20 * 60,
        });
        // @ts-ignore
        setCookie("refreshToken", action.payload.refreshToken);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        // @ts-ignore
        state.hasError = `Registration failed: ${action.payload}`;
      })
      //Login
      .addCase(loginRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user.email = action.payload.user.email;
        state.user.name = action.payload.user.name;
        state.user.password = action.payload.user.password;
        state.isAuthorized = true;
        setCookie("accessToken", action.payload.accessToken, {
          expires: 1 * 60,
        });
        // @ts-ignore
        setCookie("refreshToken", action.payload.refreshToken);
      })
      .addCase(loginRequest.rejected, (state, action) => {
        state.isLoading = false;
        // @ts-ignore
        state.hasError = `Login Failed: ${action.payload}`;
      })
      //Forgot-password
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.isLoading = false;
        state.forgotPasswordSuccess = true;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        // @ts-ignore
        state.hasError = `Wrong E-mail: ${action.payload}`;
      })
      //Reset-password
      .addCase(resetPass.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPass.fulfilled, (state) => {
        state.isLoading = false;
        state.hasError = "";
        state.resetPasswordSuccess = true;
      })
      .addCase(resetPass.rejected, (state, action) => {
        state.isLoading = false;
        // @ts-ignore
        state.hasError = `Reset Failed: ${action.payload}`;
      })
      //LogOut
      .addCase(logOut.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logOut.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = "";
        state.isAuthorized = false;
        state.user.email = "";
        state.user.name = "";
        state.user.password = "";
        deleteCookie("accessToken");
        deleteCookie("refreshToken");
      })
      .addCase(logOut.rejected, (state, action) => {
        state.isLoading = false;
        // @ts-ignore
        state.hasError = `LogOut Failed: ${action.payload}`;
      })
      //Update Token
      .addCase(updateToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = "";
        setCookie("accessToken", action.payload.accessToken, {
          expires: 1 * 60,
        });
        // @ts-ignore
        setCookie("refreshToken", action.payload.refreshToken);
        state.isAuthorized = true;
      })
      .addCase(updateToken.rejected, (state, action) => {
        state.isLoading = false;
        // @ts-ignore
        state.hasError = `Token Update Failed: ${action.payload}`;
      })
      //Get user Data
      .addCase(getUserData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = "";
        state.user.name = action.payload.user.name;
        state.user.email = action.payload.user.email;
        state.user.password = "";
        state.isAuthorized = true;
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.isLoading = false;
        // @ts-ignore
        state.hasError = `User Data Has Not Been Received: ${action.payload}`;
      })
      //Update user Data
      .addCase(updateUserData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserData.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.hasError = "";
        state.updateSuccess = true;
        state.user.name = payload.user.name;
        state.user.email = payload.user.email;
        state.user.password = payload.user.password;
        state.isAuthorized = true;
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.isLoading = false;
        // @ts-ignore
        state.hasError = `User Data Has Not Been Updated: ${action.payload}`;
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

export const forgotPassword = createAsyncThunk(
  "authorization/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/password-reset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(email),
      });
      const newData = await checkResponse(res);
      return newData;
    } catch (err) {
      // @ts-ignore
      return rejectWithValue(err.message);
    }
  }
);

export const resetPass = createAsyncThunk(
  "authorization/resetPassword",
  async (form, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/password-reset/reset`, {
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

export const logOut = createAsyncThunk(
  "authorization/logOut",
  async (token, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/auth/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: getCookie("refreshToken") }),
      });
      const newData = await checkResponse(res);
      return newData;
    } catch (err) {
      // @ts-ignore
      return rejectWithValue(err.message);
    }
  }
);

export const updateToken = createAsyncThunk(
  "authorization/updateToken",
  async (token, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/auth/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: getCookie("refreshToken") }),
      });
      const newData = await checkResponse(res);
      return newData;
    } catch (err) {
      // @ts-ignore
      return rejectWithValue(err.message);
    }
  }
);

export const getUserData = createAsyncThunk(
  "authorization/getUserData",
  async (data, { rejectWithValue }) => {
    try {
      if (getCookie("accessToken")) {
        const res = await fetch(`${baseUrl}/auth/user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: getCookie("accessToken"),
          },
          body: JSON.stringify(data),
        });
        const newData = await checkResponse(res);
        return newData;
      } else {
        updateToken();
        await getUserData();
      }
    } catch (err) {
      // @ts-ignore
      return rejectWithValue(err.message);
    }
  }
);

export const updateUserData = createAsyncThunk(
  "authorization/updateUserData",
  async (data, { rejectWithValue }) => {
    try {
      if (getCookie("accessToken")) {
        const res = await fetch(`${baseUrl}/auth/user`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: getCookie("accessToken"),
          },
          body: JSON.stringify(data),
        });
        const newData = await checkResponse(res);
        return newData;
      } else {
        updateToken();
        getUserData();
      }
    } catch (err) {
      // @ts-ignore
      return rejectWithValue(err.message);
    }
  }
);

export const authorizationSelector = (state) => state.authorization;
export const authorizationReducer = authorizationSlice.reducer;
export const {
  resetResetPassSuccess,
  resetForgotPassSuccess,
  resetUpdateSuccess,
  resetError,
} = authorizationSlice.actions;
