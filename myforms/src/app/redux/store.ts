import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./slices/authSlice"
import LoadingReducer from "./slices/loadingSlice"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"

export const store = configureStore({
    reducer: {
        AuthReducer,
        LoadingReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
//define hook
// export const useAppDispatch: () => AppDispatch = useDispatch;
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector