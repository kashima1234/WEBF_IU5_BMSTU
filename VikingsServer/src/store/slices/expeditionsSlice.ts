import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {T_Expedition, T_ExpeditionsFilters, T_Place} from "modules/types.ts";
import {NEXT_MONTH, PREV_MONTH} from "modules/consts.ts";
import {api} from "modules/api.ts";
import {AsyncThunkConfig} from "@reduxjs/toolkit/dist/createAsyncThunk";
import {AxiosResponse} from "axios";

type T_ExpeditionsSlice = {
    draft_expedition_id: number | null,
    places_count: number | null,
    expedition: T_Expedition | null,
    expeditions: T_Expedition[],
    filters: T_ExpeditionsFilters,
    save_mm: boolean
}

const initialState:T_ExpeditionsSlice = {
    draft_expedition_id: null,
    places_count: null,
    expedition: null,
    expeditions: [],
    filters: {
        status: 0,
        date_formation_start: PREV_MONTH.toISOString().split('T')[0],
        date_formation_end: NEXT_MONTH.toISOString().split('T')[0],
        owner: ""
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

export const fetchDraftExpedition = createAsyncThunk<T_Expedition, void, AsyncThunkConfig>(
    "expeditions/expedition_draft",
    async function(_, thunkAPI) {
        const state = thunkAPI.getState()
        const response = await api.expeditions.expeditionsRead(state.expeditions.expedition.id) as AxiosResponse<T_Expedition>
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

        return response.data.filter(expedition => expedition.owner.includes(state.expeditions.filters.owner))
    }
)

export const removePlaceFromDraftExpedition = createAsyncThunk<T_Place[], string, AsyncThunkConfig>(
    "expeditions/remove_place",    "expeditions/expedition",
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

export const acceptExpedition = createAsyncThunk<void, string, AsyncThunkConfig>(
    "expeditions/accept_expedition",
    async function(expedition_id,{dispatch}) {
        await api.expeditions.expeditionsUpdateStatusAdminUpdate(expedition_id, {status: 3})
        await dispatch(fetchExpeditions)
    }
)

export const rejectExpedition = createAsyncThunk<void, string, AsyncThunkConfig>(
    "expeditions/accept_expedition",
    async function(expedition_id,{dispatch}) {
        await api.expeditions.expeditionsUpdateStatusAdminUpdate(expedition_id, {status: 4})
        await dispatch(fetchExpeditions)
    }
)

export const updatePlaceOrder = createAsyncThunk<void, string, AsyncThunkConfig>(
    "collections/update_mm_value",
    async function(place_id,thunkAPI) {
        const state = thunkAPI.getState()
        await api.expeditions.expeditionsUpdatePlaceUpdate(state.expeditions.expedition.id, place_id)
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
        builder.addCase(fetchExpedition.fulfilled, (state:T_ExpeditionsSlice, action: PayloadAction<T_Expedition>) => {
            state.expedition = action.payload
        });
        builder.addCase(fetchDraftExpedition.fulfilled, (state:T_ExpeditionsSlice, action: PayloadAction<T_Expedition>) => {
            state.expedition = action.payload
        });
        builder.addCase(fetchExpeditions.fulfilled, (state:T_ExpeditionsSlice, action: PayloadAction<T_Expedition[]>) => {
            state.expeditions = action.payload
        });
        builder.addCase(removePlaceFromDraftExpedition.rejected, (state:T_ExpeditionsSlice) => {
            state.expedition = null
        });
        builder.addCase(removePlaceFromDraftExpedition.fulfilled, (state:T_ExpeditionsSlice, action: PayloadAction<T_Place[]>) => {
            if (state.expedition) {
                state.expedition.places = action.payload as T_Place[]
            }
        });
        builder.addCase(sendDraftExpedition.fulfilled, (state:T_ExpeditionsSlice) => {
            state.expedition = null
        });
    }
})

export const { saveExpedition, removeExpedition, triggerUpdateMM, updateFilters } = expeditionsSlice.actions;

export default expeditionsSlice.reducer