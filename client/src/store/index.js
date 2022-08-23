
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userInfoReducer, { countReducer } from './user/userInfo';

// import logger from 'redux-logger';

const info = combineReducers({
    count : countReducer,
    userInfo : userInfoReducer
});

export const store = configureStore({
    reducer : { 
        user : info
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck : false
    })
    // .concat(logger)
})

