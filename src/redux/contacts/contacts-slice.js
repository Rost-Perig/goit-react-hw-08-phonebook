import { createSlice } from '@reduxjs/toolkit';
import { addContact, fetchContacts, delContact } from './contacts-operations';
import { search } from './contacts-actions';

const initialState = {
    items: [],
    filter: '',
    loadingSpinner: false
};

const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    extraReducers: {
        [addContact.pending](state, action) {
            state.loadingSpinner = true;
        },
        [addContact.fulfilled](state, action) {
            state.loadingSpinner = false;
            state.items = [...state.items, action.payload];
        },
        [addContact.rejected](state, action) {
            state.loadingSpinner = false;
         },
        
        [fetchContacts.pending](state, action) {
            state.loadingSpinner = true;
        },
        [fetchContacts.fulfilled](state, action) {
            state.loadingSpinner = false;
            state.items = action.payload;
        },
        [fetchContacts.rejected](state, action) {
            state.loadingSpinner = false;
        },
  
        [delContact.pending](state, action) {
            state.loadingSpinner = true;
        },
        [delContact.fulfilled](state, action) {
            state.loadingSpinner = false;
            state.items = state.items.filter(({ id }) => id !== action.payload);
        },
        [delContact.rejected](state, action) {
            state.loadingSpinner = false;
        },

        [search](state, action) {
            state.filter = action.payload;
        },
    },
});

export const contactsReducer = contactsSlice.reducer;