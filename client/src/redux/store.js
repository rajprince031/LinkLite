import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slices/UserDetails';

 const store = configureStore({
    reducer:{
        userProfile : userReducer
    }
})

export default store