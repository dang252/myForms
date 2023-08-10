import { createSlice } from "@reduxjs/toolkit";

type loadingState = {
    isLoading: boolean,
}

const initialState = {
    isLoading: false,
} as loadingState

export const loadingSlice = createSlice({
    name: "loading",
    initialState,
    reducers: {
        loading: (state) => {
            state.isLoading = true;
        },
        doneLoading: (state) => {
            state.isLoading = false;
        },
    }
})

export default loadingSlice.reducer;
export const { loading, doneLoading } = loadingSlice.actions;