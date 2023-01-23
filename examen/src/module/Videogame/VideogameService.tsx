import httpService from "../../service/HttpService";
import ApiConfig from "../../service/ApiConfig";
import { IVideogame, IVideogameForm } from "./Videogame.type";

export const getVideogameListApi = async () => {
    return await httpService.get<IVideogame[]>(ApiConfig.videogame);
};

export const createVideogameApi = async (data: IVideogameForm) => {
    return await httpService.post<IVideogame>(ApiConfig.videogame, data);
};

export const deleteVideogameApi = async (id: number) => {
    const url = `${ApiConfig.videogame}/${id}`;
    return await httpService.delete(url);
};

export const updateVideogameApi = async (id: number, data: IVideogameForm) => {
    const url = `${ApiConfig.videogame}/${id}`;
    return await httpService.put(url, data);
};