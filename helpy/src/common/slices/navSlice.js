import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    phonenumber: '',
    username:'',
    message:'hey tp',
    origin:'',
    destination:'',
    travelTimeInfromation:'',
    //countryCode: null
};

export const navSlice = createSlice({
    name: 'nav',
    initialState,
    reducers: {
        setPhoneNumber: (state, action) => {
            state.phonenumber = action.payload;
        },
        setUsername: (state, action) => {
            state.username = action.payload;
        },
        setMessage: (state, action) => {
            state.message = action.payload;
        },
        setOrigin: (state, action) => {
            state.origin = action.payload;
        },
        setDestination: (state, action) => {
            state.destination = action.payload;
        },
        setTravelTimeInfromation: (state, action) => {
            state.travelTimeInfromation = action.payload;
        },
    },
});

export const { setPhoneNumber,setUsername,setMessage ,setOrigin,setDestination,setTravelTimeInfromation} = navSlice.actions;

export const selectPhoneNumber = (state) => state.nav.phonenumber;
export const selectUsername = (state) => state.nav.username;
export const selectMessage = (state) => state.nav.message;
export const selectOrigin = (state) => state.nav.origin;
export const selectDestination = (state) => state.nav.destination;
export const selectTravelTimeInfromation = (state) => state.nav.travelTimeInfromation;

export default navSlice.reducer;