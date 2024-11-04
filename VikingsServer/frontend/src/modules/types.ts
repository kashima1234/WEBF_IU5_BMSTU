export type T_Place =  {
    id: number,
    name: string,
    description: string,
    square: number,
    image: string,
    status: number
}

export interface IRequestResponse<T> {
    success: boolean
    data: T
}