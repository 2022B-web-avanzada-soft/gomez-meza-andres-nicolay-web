import httpService from "../../service/HttpService";
import ApiConfig from "../../service/ApiConfig";
import { ICompany, ICompanyForm } from "./Company.type";

export const getCompanyListApi = async () => {
    return await httpService.get<ICompany[]>(ApiConfig.company);
};

export const createCompanyApi = async (data: ICompanyForm) => {
    return await httpService.post<ICompany>(ApiConfig.company, data);
};

export const deleteCompanyApi = async (id: number) => {
    const url = `${ApiConfig.company}/${id}`;
    return await httpService.delete(url);
};

export const updateCompanyApi = async (id: number, data: ICompanyForm) => {
    const url = `${ApiConfig.company}/${id}`;
    return await httpService.put(url, data);
};