/*================при использовании createAsyncThunk================*/

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// axios.defaults.baseURL = 'https://connections-api.herokuapp.com'; //тут можно не объявлять, достаточно один раз в auth-operations.js

export const addContact = createAsyncThunk(
  'inputsForm/addContact',
  //====c обработкой ошибок====//
  async ({name, number}, { rejectWithValue }) => {
    try {
      const response = await axios.post('/contacts', {name, number});
      // console.log('data: ', response.data)
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },

  //====без обработки ошибок====//
  // async ({name, number}) => {
  //   const response = await axios.post('/contacts', {name, number});
  //   return response.data;
  // }
);

export const delContact = createAsyncThunk(
  'contactData/delContact',
  //====c обработкой ошибок====//
  async (contactId, { rejectWithValue }) => {
    try {
      await axios.delete(`/contacts/${contactId}`); //удаляем контакт по id на сервере
      // const response = await axios.delete(`/contacts/${contactId}`);
      // console.log('id: ', response) //показивает пустой объект {}, потому, что удаленный, 
      return contactId //поэтому ретурним id, чтоб удалить в стейте
    } catch (error) {
      return rejectWithValue(error);
    }
  },
  
  //====без обработки ошибок====//
  // async (contactId) => {
  //   const response = await axios.delete(`/contacts/${contactId}`);
  //   return response.data.id
  // }
);

export const fetchContacts = createAsyncThunk(
  'contactList/fetchContacts',
  //====c обработкой ошибок====//
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/contacts');
      // console.log(response.data)
      return response.data
    } catch (error) {
      return rejectWithValue(error);
    }
  },

  //====без обработки ошибок====//
  // async () => {
  //   const response = await axios.get('/contacts');
  //   return response.data
  // }
);



