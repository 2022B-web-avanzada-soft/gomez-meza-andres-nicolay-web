import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ApiStatus, IUpdateVideogameActionProps, IVideogameForm, IVideogameState} from "./Videogame.type";
import {createVideogameApi, deleteVideogameApi, getVideogameListApi, updateVideogameApi} from "./VideogameService";
import {toastError, toastSuccess} from "../../components/ToastifyConfig";

const initialState: IVideogameState = {
    list: [],
    listStatus: ApiStatus.ideal,
    createVideogameFormStatus: ApiStatus.ideal,
    updateVideogameFormStatus: ApiStatus.ideal,
};

export const getVideogameListAction = createAsyncThunk(
    "videogame/getVideogameListAction",
    async () => {
        const response = await getVideogameListApi();
        return response.data;
    }
);

export const createVideogameAction = createAsyncThunk(
    "videogame/createVideogameAction",
    async (data: IVideogameForm) => {
        const response = await createVideogameApi(data);
        return response.data;
    }
);

export const deleteVideogameAction = createAsyncThunk(
    "videogame/deleteVideogameAction",
    async (id: number) => {
        await deleteVideogameApi(id);
        return id;
    }
);

export const updateVideogameAction = createAsyncThunk(
    "videogame/updateVideogameAction",
    async ({ id, data }: IUpdateVideogameActionProps) => {
        const response = await updateVideogameApi(id, data);
        return response.data;
    }
);

const videogameSlice = createSlice({
    name: "videogame",
    initialState,
    reducers: {
        resetCreateListStatus: (state) => {
            state.createVideogameFormStatus = ApiStatus.ideal;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getVideogameListAction.pending, (state) => {
            state.listStatus = ApiStatus.loading;
        });
        builder.addCase(getVideogameListAction.fulfilled, (state, action) => {
            state.listStatus = ApiStatus.ideal;
            state.list = action.payload;
        });
        builder.addCase(getVideogameListAction.rejected, (state) => {
            state.listStatus = ApiStatus.error;
        });
        builder.addCase(createVideogameAction.pending, (state) => {
            state.createVideogameFormStatus = ApiStatus.loading;
        });
        builder.addCase(createVideogameAction.fulfilled, (state) => {
            state.createVideogameFormStatus = ApiStatus.success;
            toastSuccess("Videogame created");
        });
        builder.addCase(createVideogameAction.rejected, (state) => {
            state.createVideogameFormStatus = ApiStatus.error;
            toastSuccess("Error while creating videogame");
        });
        builder.addCase(deleteVideogameAction.fulfilled, (state, action) => {
            const newList = state.list.filter((x) => x.id !== action.payload);
            state.list = newList;
        });
        builder.addCase(updateVideogameAction.pending, (state) => {
            state.updateVideogameFormStatus = ApiStatus.loading;
        });
        builder.addCase(updateVideogameAction.fulfilled, (state) => {
            state.updateVideogameFormStatus = ApiStatus.ideal;
            toastSuccess("Videogame updated");
        });
        builder.addCase(updateVideogameAction.rejected, (state) => {
            state.updateVideogameFormStatus = ApiStatus.error;
            toastError("Error while updating videogame");
        });
    },
});

export default videogameSlice.reducer;
export const { resetCreateListStatus } = videogameSlice.actions;