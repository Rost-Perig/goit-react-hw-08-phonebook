
import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import { addContact, fetchContacts, delContact } from './contacts-operations'; // c createAsyncThunk
import {search} from './contacts-actions';

const items = createReducer([], {
      //===== c createAsyncThunk =====//
    [addContact.fulfilled]: (state, action) => [...state, action.payload], //(state, { payload }) => [...state, payload],
    [fetchContacts.fulfilled]: (_, action) => action.payload, // (_, { payload }) => payload,
    [delContact.fulfilled]: (state, action) => state.filter(({ id }) => id !== action.payload), //(state, { payload }) => state.filter(({ id }) => id !== payload),
});

const filter = createReducer('', {
    [search]: (_, { payload }) => payload
});

const loadingSpinner = createReducer(false, {
    //===== c createAsyncThunk =====//
  [addContact.pending]: () => true,
  [addContact.fulfilled]: () => false,
  [addContact.rejected]: () => false,
    
  [fetchContacts.pending]: () => true,
  [fetchContacts.fulfilled]: () => false,
  [fetchContacts.rejected]: () => false,
  
  [delContact.pending]: () => true,
  [delContact.fulfilled]: () => false,
  [delContact.rejected]: () => false,
});

export default combineReducers({
    items,
    filter,
    loadingSpinner
});



