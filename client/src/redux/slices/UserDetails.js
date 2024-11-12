import { createSlice} from '@reduxjs/toolkit';


 const UserDetailsSlice = createSlice({
    name:'userProfile',
    initialState:{},
    reducers:{
        userDetails:(state, action)=>{
            return {...state,...action.payload}
        },
        logout : () =>{
            return {}
        }
    }

});

export const {userDetails ,logout} = UserDetailsSlice.actions

export default UserDetailsSlice.reducer;