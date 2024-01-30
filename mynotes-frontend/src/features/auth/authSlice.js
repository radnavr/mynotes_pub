import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const user = JSON.parse(localStorage.getItem("my-notes-user"));

const initialState = {
  user: user ? user : null,
  isAuthError: false,
  isAuthSuccess: false,
  isAuthLoading: false,
  authMessage: "",
};

// USER REGISTRATION
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      const authMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(authMessage);
    }
  }
);

// USER LOGIN
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    const authMessage =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(authMessage);
  }
});

// USER LOGOUT
export const logout = createAsyncThunk("auth/logout", () => {
  authService.logout();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.isAuthError = false;
      state.isAuthSuccess = false;
      state.isAuthLoading = false;
      state.authMessage = "";
    },
    throwAuthError: (state, action) => {
      state.isAuthError = true;
      state.authMessage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isAuthLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isAuthLoading = false;
        state.isAuthSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isAuthLoading = false;
        state.isAuthError = true;
        state.authMessage = action.payload;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isAuthLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthLoading = false;
        state.isAuthSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isAuthLoading = false;
        state.isAuthError = true;
        state.authMessage = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { resetAuthState, throwAuthError } = authSlice.actions;
export default authSlice.reducer;
