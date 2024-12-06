import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login, register } from '../services/authService';

interface User {
  id: string;
  name: string;
  email: string;
  // Add any other user properties you expect to receive
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  token: null,
};

// Async thunk for login
export const loginAsync = createAsyncThunk(
  'auth/login',
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await login(email, password); // Calls the login service
      return response.data; // Assuming the response contains the user and token in `data`
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Login failed');
    }
  }
);

// Async thunk for register
export const registerAsync = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }: { name: string, email: string, password: string }) => {
    try {
      const response = await register(name, email, password);
      return response.data;
    } catch (error: any) {
      throw error.response?.data?.message || 'Registration failed';
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action for logout
    logout(state) {
      state.user = null;
      state.token = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle login action states
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user; // Assuming response contains user data
        state.token = action.payload.token; // Assuming response contains token
        state.error = null;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Capture the error message
      })

      // Handle register action states
      .addCase(registerAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user; 
        state.token = action.payload.token; 
        state.error = null;
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; 
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
