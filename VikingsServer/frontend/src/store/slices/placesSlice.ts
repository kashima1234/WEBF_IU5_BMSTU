// @ts-nocheck
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IRequestResponse, T_Place} from "modules/types.ts";
import {PlaceMocks} from "modules/mocks.ts";

type T_PlacesSlice = {
    place_name: string
    selectedPlace: null | T_Place
    places: T_Place[]
    isMock: boolean
}

const initialState:T_PlacesSlice = {
    place_name: "",
    selectedPlace: null,
    places: [],
    isMock: false
}

export const fetchPlace = createAsyncThunk<IRequestResponse<T_Place>, string>(
    "fetch_place",
    async function(id) {
        try {
            const response = await fetch(`/api/places/${id}`, { signal: AbortSignal.timeout(1000) })
            const data = await response.json()
            return {
                success: true,
                data
            }
        } catch {
            return {
                success: false,
                data: PlaceMocks.find(place => place.id == id)
            }
        }
    }
)

export const fetchPlaces = createAsyncThunk<IRequestResponse<T_Place[]>, object>(
    "fetch_places",
    async function(_, thunkAPI) {
        const state = thunkAPI.getState();
        try {
            const response = await fetch(`/api/places/?place_name=${state.places.place_name}`, { signal: AbortSignal.timeout(1000) })
            const data = await response.json()
            return {
                success: true,
                data: data.places
            }
        } catch {
            return {
                success: false,
                data: PlaceMocks.filter(place => place.name.toLowerCase().includes(state.places.place_name.toLowerCase()))
            }
        }
    }
)

const placesSlice = createSlice({
    name: 'places',
    initialState: initialState,
    reducers: {
        updatePlaceName: (state, action) => {
            console.log("updatePlaceName")
            state.place_name = action.payload
        },
        removeSelectedPlace: (state) => {
            state.selectedPlace = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPlaces.fulfilled, (state:T_PlacesSlice, action: PayloadAction<IRequestResponse<T_Place[]>>) => {
            state.isMock = !action.payload.success
            state.places = action.payload.data
        });
        builder.addCase(fetchPlace.fulfilled, (state:T_PlacesSlice, action: PayloadAction<IRequestResponse<T_Place>>) => {
            state.isMock = !action.payload.success
            state.selectedPlace = action.payload.data
        });
    }
})

export const { updatePlaceName, removeSelectedPlace} = placesSlice.actions;

export default placesSlice.reducer