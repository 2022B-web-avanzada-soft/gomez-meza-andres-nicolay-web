import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import companyReducer from "../module/Company/CompanySlice";
import videogameReducer from "../module/Videogame/VideogameSlice";

export const store = configureStore({
  reducer: {
    videogame: videogameReducer,
    company: companyReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
