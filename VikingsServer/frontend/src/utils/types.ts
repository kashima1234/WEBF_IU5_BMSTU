export type T_Place =  {
    id: number,
    name: string,
    description: string,
    square: number,
    image: string,
    status: number,
    order: number
}

export type T_Expedition = {
    id: string | null
    status: E_ExpeditionStatus
    date_complete: string
    date_created: string
    date_formation: string
    owner: string
    moderator: string
    places: T_Place[]
    viking: string
    date: string
}

export enum E_ExpeditionStatus {
    Draft=1,
    InWork,
    Completed,
    Rejected,
    Deleted
}

export type T_User = {
    id: number
    username: string
    email: string
    is_authenticated: boolean
    validation_error: boolean
    validation_success: boolean
    checked: boolean
}

export type T_LoginCredentials = {
    username: string
    password: string
}

export type T_RegisterCredentials = {
    name: string
    email: string
    password: string
}

export type T_PlacesListResponse = {
    places: T_Place[],
    draft_expedition_id: number,
    places_count: number
}