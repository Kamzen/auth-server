import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../adapters/xhr"

let initialState = { 
    userLoggedInData : null,
    isLoading : false,
    resp : {}
}

export const fetchUser = createAsyncThunk('/fetcUsers', async () => {

    try{

        const resp = await axiosInstance.get('/auth/getUserInfo');
        return await resp.data.message.user;
        

    }catch(e){

        return await e.response.data.message;
    }

})

const userInfoSlice = createSlice({
    name : 'userLoggedInData',
    initialState,
    extraReducers : {
        [fetchUser.pending] : (state) => {
            return {
                ...state,
                isLoading : true
            }
        },
        [fetchUser.fulfilled] : (state,action) => {
            // console.log(action)
            return {
                ...state,
                userLoggedInData : action.payload,
                resp : { isLoggedIn : true, }
            }
        },
        [fetchUser.rejected] : (state,action) => {
            return{
                ...state,
                resp : { error : action.payload },
                isLoading : false
            }
        }
    }
})

initialState = {
    count : 1,
    resp : {}
}

const countInfoSplice = createSlice({
    name : 'count',
    initialState,
})

export const countReducer = countInfoSplice.reducer;

export const getAsync = payload => dispatch => {

}

export const { getUserInfo } = userInfoSlice.actions;

export default userInfoSlice.reducer;