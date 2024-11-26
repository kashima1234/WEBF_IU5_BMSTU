import {createSlice} from "@reduxjs/toolkit";
// for store filters oslog
type T_PlacesSlice = {
    place_name: string
}

const initialState:T_PlacesSlice = {
    place_name: "",
}


const placesSlice = createSlice({
    name: 'places',
    initialState: initialState,
    reducers: {
        updatePlaceName: (state, action) => {
            state.place_name = action.payload
        }
    }
})

export const { updatePlaceName} = placesSlice.actions;

export default placesSlice.reducer