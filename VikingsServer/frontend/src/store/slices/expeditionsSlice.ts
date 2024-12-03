import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {T_Expedition, T_Place} from "src/utils/types.ts";
import {AsyncThunkConfig} from "@reduxjs/toolkit/dist/createAsyncThunk";
import {api} from "modules/api.ts";
import {AxiosResponse} from "axios";
import {NEXT_YEAR, PREV_YEAR} from "utils/consts.ts";

type T_expeditionsSlice = {
    draft_expedition_id: number | null,
    places_count: number | null,
    expedition: T_Expedition | null,
    expeditions: T_Expedition[],
    filters: T_expeditionsFilters,
    save_mm: boolean
}

export type T_expeditionsFilters = {
    date_formation_start: string
    date_formation_end: string
    status: number
}

const initialState:T_expeditionsSlice = {
    draft_expedition_id: null,
    places_count: null,
    expedition: null,
    expeditions: [],
    filters: {
        status: 0,
        date_formation_start: PREV_YEAR.toISOString().split('T')[0],
        date_formation_end: NEXT_YEAR.toISOString().split('T')[0]
    },
    save_mm: false
}

export const fetchExpedition = createAsyncThunk<T_Expedition, string, AsyncThunkConfig>(
    "expeditions/expedition",
    async function(expedition_id) {
        const response = await api.expeditions.expeditionsRead(expedition_id) as AxiosResponse<T_Expedition>
        return response.data
    }
)

export const fetchExpeditions = createAsyncThunk<T_Expedition[], object, AsyncThunkConfig>(
    "expeditions/expeditions",
    async function(_, thunkAPI) {
        const state = thunkAPI.getState()

        const response = await api.expeditions.expeditionsList({
            status: state.expeditions.filters.status,
            date_formation_start: state.expeditions.filters.date_formation_start,
            date_formation_end: state.expeditions.filters.date_formation_end
        }) as AxiosResponse<T_Expedition[]>
        return response.data
    }
)

export const removePlaceFromDraftExpedition = createAsyncThunk<T_Place[], string, AsyncThunkConfig>(
    "expeditions/remove_place",
    async function(place_id, thunkAPI) {
        const state = thunkAPI.getState()
        const response = await api.expeditions.expeditionsDeletePlaceDelete(state.expeditions.expedition.id, place_id) as AxiosResponse<T_Place[]>
        return response.data
    }
)

export const deleteDraftExpedition = createAsyncThunk<void, object, AsyncThunkConfig>(
    "expeditions/delete_draft_expedition",
    async function(_, {getState}) {
        const state = getState()
        await api.expeditions.expeditionsDeleteDelete(state.expeditions.expedition.id)
    }
)

export const sendDraftExpedition = createAsyncThunk<void, object, AsyncThunkConfig>(
    "expeditions/send_draft_expedition",
    async function(_, {getState}) {
        const state = getState()
        await api.expeditions.expeditionsUpdateStatusUserUpdate(state.expeditions.expedition.id)
    }
)

export const updateExpedition = createAsyncThunk<void, object, AsyncThunkConfig>(
    "expeditions/update_expedition",
    async function(data, {getState}) {
        const state = getState()
        await api.expeditions.expeditionsUpdateUpdate(state.expeditions.expedition.id, {
            ...data
        })
    }
)

export const updatePlaceValue = createAsyncThunk<void, object, AsyncThunkConfig>(
    "expeditions/update_mm_value",
    async function({place_id, order},thunkAPI) {
        const state = thunkAPI.getState()
        await api.expeditions.expeditionsUpdatePlaceUpdate(state.expeditions.expedition.id, place_id, {order})
    }
)

const expeditionsSlice = createSlice({
    name: 'expeditions',
    initialState: initialState,
    reducers: {
        saveExpedition: (state, action) => {
            state.draft_expedition_id = action.payload.draft_expedition_id
            state.places_count = action.payload.places_count
        },
        removeExpedition: (state) => {
            state.expedition = null
        },
        triggerUpdateMM: (state) => {
            state.save_mm = !state.save_mm
        },
        updateFilters: (state, action) => {
            state.filters = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchExpedition.fulfilled, (state:T_expeditionsSlice, action: PayloadAction<T_Expedition>) => {
            state.expedition = action.payload
        });
        builder.addCase(fetchExpeditions.fulfilled, (state:T_expeditionsSlice, action: PayloadAction<T_Expedition[]>) => {
            state.expeditions = action.payload
        });
        builder.addCase(removePlaceFromDraftExpedition.rejected, (state:T_expeditionsSlice) => {
            state.expedition = null
        });
        builder.addCase(removePlaceFromDraftExpedition.fulfilled, (state:T_expeditionsSlice, action: PayloadAction<T_Place[]>) => {
            (state.expedition as T_Expedition).places = action.payload
        });
        builder.addCase(sendDraftExpedition.fulfilled, (state:T_expeditionsSlice) => {
            state.expedition = null
        });
    }
})

export const { saveExpedition, removeExpedition, triggerUpdateMM, updateFilters } = expeditionsSlice.actions;

export default expeditionsSlice.reducer