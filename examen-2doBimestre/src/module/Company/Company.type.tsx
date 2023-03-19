export interface ICompany {
    id: number;
    name: string;
    city: string;
    employees: number;
    website: string;
    president: string;
}

export enum ApiStatus {
    "loading",
    "ideal",
    "success",
    "error",
}

export interface ICompanyState {
    list: ICompany[];
    listStatus: ApiStatus;
    createCompanyFormStatus: ApiStatus;
    updateCompanyFormStatus: ApiStatus;
}

export interface ICompanyForm {
    name: string;
    city: string;
    employees: number;
    website: string;
    president: string;
}

export interface IUpdateCompanyActionProps {
    id: number;
    data: ICompanyForm;
}