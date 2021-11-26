/*================при использовании createAsyncThunk================*/
import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import { register, logIn, logOut, fetchCurrentUser } from './auth-operations'; // c createAsyncThunk
import { badReq } from './auth-actions';

const initialUser = { name: null, email: null };

const user = createReducer(initialUser, {
    [register.fulfilled]: (_, action) => (action.payload ? action.payload.user : initialUser),
    [logIn.fulfilled]: (_, action) => (action.payload ? action.payload.user : initialUser),
    [logOut.fulfilled]: () => initialUser,
    [fetchCurrentUser.fulfilled]: (_, action) => action.payload,
});

const token = createReducer(null, {
    [register.fulfilled]: (_, action) => (action.payload ? action.payload.token : null),
    [logIn.fulfilled]: (_, action) => (action.payload ? action.payload.token : null),
    [logOut.fulfilled]: () => null,
});

const isLoggedIn = createReducer(false, {
    [register.fulfilled]: (_, action) => (action.payload ? true : false),
    [logIn.fulfilled]: (_, action) => (action.payload ? true : false),
    [logOut.fulfilled]: () => false,
    [fetchCurrentUser.fulfilled]: () => true
});

const badRequest = createReducer(false, {
    [logIn.fulfilled]: (_, action) => (action.payload ? false : true),
    [register.fulfilled]: (_, action) => (action.payload ? false : true),
    [logOut.fulfilled]: () => false,
    [badReq]: () => false
})

export default combineReducers({
    user,
    token,
    isLoggedIn,
    badRequest 
});