import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slices/updateUserDetails';

 const store = configureStore({
    reducer:{
        userProfile : userReducer
    }
})

export default store