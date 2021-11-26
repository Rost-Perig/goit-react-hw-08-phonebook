import { createSlice } from '@reduxjs/toolkit';
import { register, logIn, logOut, fetchCurrentUser } from './auth-operations';
import { badReq } from './auth-actions';

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  badRequest: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [register.fulfilled](state, action) {
      state.user = (action.payload ? action.payload.user : state.user);
      state.token = (action.payload ? action.payload.token : state.token);
      state.isLoggedIn = (action.payload ? true : state.isLoggedIn);
      state.badRequest = (action.payload ? state.badRequest : true);
    },
    [logIn.fulfilled](state, action) {
      state.user = (action.payload ? action.payload.user : state.user);
      state.token = (action.payload ? action.payload.token : state.token);
      state.isLoggedIn = (action.payload ? true : state.isLoggedIn);
      state.badRequest = (action.payload ? state.badRequest : true);
    },
    [logOut.fulfilled](state, action) {
      state.user = { name: null, email: null };
      state.token = null;
      state.isLoggedIn = false;
      state.badRequest = false;
    },
    [fetchCurrentUser.fulfilled](state, action) {
      state.user = action.payload;
      state.isLoggedIn = true;
    },

    [badReq](state, action) {
      state.badRequest = false;
    }
  },
});

export const authReducer = authSlice.reducer;
  
  