import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ApiStatus, IUpdateCompanyActionProps, ICompanyForm, ICompanyState} from "./Company.type";
import {createCompanyApi, deleteCompanyApi, getCompanyListApi, updateCompanyApi} from "./CompanyService";
import {toastError, toastSuccess} from "../../components/ToastifyConfig";

const initialState: ICompanyState = {
    list: [],
    listStatus: ApiStatus.ideal,
    createCompanyFormStatus: ApiStatus.ideal,
    updateCompanyFormStatus: ApiStatus.ideal,
};

export const getCompanyListAction = createAsyncThunk(
    "company/getCompanyListAction",
    async () => {
        const response = await getCompanyListApi();
        return response.data;
    }
);

export const createCompanyAction = createAsyncThunk(
    "company/createCompanyAction",
    async (data: ICompanyForm) => {
        const response = await createCompanyApi(data);
        return response.data;
    }
);

export const deleteCompanyAction = createAsyncThunk(
    "company/deleteCompanyAction",
    async (id: number) => {
        await deleteCompanyApi(id);
        return id;
    }
);

export const updateCompanyAction = createAsyncThunk(
    "company/updateCompanyAction",
    async ({ id, data }: IUpdateCompanyActionProps) => {
        const response = await updateCompanyApi(id, data);
        return response.data;
    }
);

const companySlice = createSlice({
    name: "company",
    initialState,
    reducers: {
        resetCreateListStatus: (state) => {
            state.createCompanyFormStatus = ApiStatus.ideal;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getCompanyListAction.pending, (state) => {
            state.listStatus = ApiStatus.loading;
        });
        builder.addCase(getCompanyListAction.fulfilled, (state, action) => {
            state.listStatus = ApiStatus.ideal;
            state.list = action.payload;
        });
        builder.addCase(getCompanyListAction.rejected, (state) => {
            state.listStatus = ApiStatus.error;
        });
        builder.addCase(createCompanyAction.pending, (state) => {
            state.createCompanyFormStatus = ApiStatus.loading;
        });
        builder.addCase(createCompanyAction.fulfilled, (state) => {
            state.createCompanyFormStatus = ApiStatus.success;
            toastSuccess("Company created");
        });
        builder.addCase(createCompanyAction.rejected, (state) => {
            state.createCompanyFormStatus = ApiStatus.error;
            toastSuccess("Error while creating user");
        });
        builder.addCase(deleteCompanyAction.fulfilled, (state, action) => {
            const newList = state.list.filter((x) => x.id !== action.payload);
            state.list = newList;
        });
        builder.addCase(updateCompanyAction.pending, (state) => {
            state.updateCompanyFormStatus = ApiStatus.loading;
        });
        builder.addCase(updateCompanyAction.fulfilled, (state) => {
            state.updateCompanyFormStatus = ApiStatus.ideal;
            toastSuccess("Company updated");
        });
        builder.addCase(updateCompanyAction.rejected, (state) => {
            state.updateCompanyFormStatus = ApiStatus.error;
            toastError("Error while updating user");
        });
    },
});

export default companySlice.reducer;
export const { resetCreateListStatus } = companySlice.actions;