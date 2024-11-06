import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: localStorage.getItem('token') || null,
    userName: localStorage.getItem('username') ? localStorage.getItem('usesrname') : '',
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            localStorage.setItem('token', actions.payload);
        },

        setUserName: (state, action) => {
            state.userName = action.payload;
            localStorage.setItem('username', action.payload);
        },

        logout: (state) => {
            state.token = null;
            state.userName = '',
                localStorage.removeItem('token');
            localStorage.removeItem('usernmae');
        },
    },
});

export const { setToken, setUserName, logout } = authSlice.actions;

export default authSlice.reducer;