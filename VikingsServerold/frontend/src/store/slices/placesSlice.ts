import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {T_Place, T_PlacesListResponse} from "src/utils/types.ts";
import {AsyncThunkConfig} from "@reduxjs/toolkit/dist/createAsyncThunk";
import {saveExpedition} from "store/slices/expeditionsSlice.ts";
import {api} from "modules/api.ts";
import {AxiosResponse} from "axios";

type T_PlacesSlice = {
    place_name: string
    selectedPlace: null | T_Place
    places: T_Place[]
}

const initialState:T_PlacesSlice = {
    place_name: "",
    selectedPlace: null,
    places: []
}

export const fetchPlace = createAsyncThunk<T_Place, string, AsyncThunkConfig>(
    "fetch_place",
    async function(id) {
        const response = await api.places.placesRead(id) as AxiosResponse<T_Place>
        return response.data
    }
)

export const fetchPlaces = createAsyncThunk<T_Place[], object, AsyncThunkConfig>(
    "fetch_places",
    async function(_, thunkAPI) {
        const state = thunkAPI.getState();
        const response = await api.places.placesList({
            place_name: state.places.place_name
        }) as AxiosResponse<T_PlacesListResponse>

        thunkAPI.dispatch(saveExpedition({
            draft_expedition_id: response.data.draft_expedition_id,
            places_count: response.data.places_count
        }))

        return response.data.places
    }
)

export const addPlaceToExpedition = createAsyncThunk<void, string, AsyncThunkConfig>(
    "places/add_place_to_expedition",
    async function(place_id) {
        await api.places.placesAddToExpeditionCreate(place_id)
    }
)

const placesSlice = createSlice({
    name: 'places',
    initialState: initialState,
    reducers: {
        updatePlaceName: (state, action) => {
            state.place_name = action.payload
        },
        removeSelectedPlace: (state) => {
            state.selectedPlace = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPlaces.fulfilled, (state:T_PlacesSlice, action: PayloadAction<T_Place[]>) => {
            state.places = action.payload
        });
        builder.addCase(fetchPlace.fulfilled, (state:T_PlacesSlice, action: PayloadAction<T_Place>) => {
            state.selectedPlace = action.payload
        });
    }
})

export const { updatePlaceName, removeSelectedPlace} = placesSlice.actions;

export default placesSlice.reducer