export interface IVideogame {
    id: number;
    name: string;
    gender: string;
    director: string;
    date: string;
    isMultiplayer: boolean;
}

export enum ApiStatus {
    "loading",
    "ideal",
    "success",
    "error",
}

export interface IVideogameState {
    list: IVideogame[];
    listStatus: ApiStatus;
    createVideogameFormStatus: ApiStatus;
    updateVideogameFormStatus: ApiStatus;
}

export interface IVideogameForm {
    name: string;
    gender: string;
    director: string;
    date: string;
    isMultiplayer: boolean;
}

export interface IUpdateVideogameActionProps {
    id: number;
    data: IVideogameForm;
}