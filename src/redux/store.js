// import { getDefaultMiddleware } from '@reduxjs/toolkit'; //как у Репеты, показывает ошибку
import { configureStore } from "@reduxjs/toolkit";
//для возможности записи в локал сторидж
import storage from 'redux-persist/lib/storage';  
//для записи в локал сторидж и небыло красного в консоли
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

//вариант без слайсa
import authReducer from './auth/auth-reducer';
import contactsReducer from './contacts/contacts-reducer';

//вариант со слайсом
// import { authReducer } from './auth/auth-slice';
// import {contactsReducer} from './contacts/contacts-slice';

//как у Репеты, показывает ошибку
// const middleware = [
//   ...getDefaultMiddleware({
//     serializableCheck: {
//       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//     },
//   }),
// ];

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

// const persistConfig = {
//     key: 'localStorageContacts',
//     storage,
// };

// const rootReducer = combineReducers({ contacts: contactsReducer });

// const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  // reducer: persistedReducer,
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    contacts: contactsReducer,
  },
  //как у Репеты, показывает ошибку
    // middleware: [
    //   ...getDefaultMiddleware({
    //     serializableCheck: {
    //       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    //     },
    //   }),
    // ],

  //такая запись не подсвечивает ошибку
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],},
    }).concat([]),
    
    devTools: process.env.NODE_ENV === 'development' //devTools будет доступно только в процессе разработки (как и надо)
});

export const persistor = persistStore(store);