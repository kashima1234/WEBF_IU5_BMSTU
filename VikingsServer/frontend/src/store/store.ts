import {configureStore, ThunkDispatch} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import placesReducer from "./slices/placesSlice.ts"

export const store = configureStore({
    reducer: {
        places: placesReducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppThunkDispatch = ThunkDispatch<RootState, never, never>

export const useAppDispatch = () => useDispatch<AppThunkDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;