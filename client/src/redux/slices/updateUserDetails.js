import { createSlice} from '@reduxjs/toolkit';


 const updateUserDetailsSlice = createSlice({
    name:'userProfile',
    initialState:{},
    reducers:{
        updateUserDetails:(state, action)=>{
            console.log('Payload print : ',action.payload)
            return {...state,...action.payload}
        },
        logout : (state) =>{
            return {}
        }
    }

});

export const {updateUserDetails ,logout} = updateUserDetailsSlice.actions

export default updateUserDetailsSlice.reducer;