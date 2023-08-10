import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type AuthState = {
    username: string,
    uid: number,
}

const initialState = {
    username: "",
    uid: 0,
} as AuthState

export const authSlice = createSlice({
    name: 'Auth',
    initialState,
    reducers: {
        logout: () => {
            return initialState;
        },
        login: (state, action: PayloadAction<AuthState>) => {
            state.username = action.payload.username;
            state.uid = action.payload.uid;
        }
    },
});

export default authSlice.reducer;
export const { login, logout } = authSlice.actions;