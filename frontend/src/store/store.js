import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../slices/authSlice';
import { channelsApi } from "../api/channelApi";
import currentChannelReducer from '../slices/channelSlice';
import messagesApi from "../api/messageApi";
import modalSliceReducer from '../slices/modalSlice';

export default configureStore({
    reducer: {
        auth: authReducer,
        [channelsApi.reducerPath]: channelsApi.reducer,
        [messagesApi.reducerPath]: messagesApi.reducer,
        currentChannel: currentChannelReducer,
        channelsModal: modalSliceReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        channelsApi.middleware,
        messagesApi.middleware
    )
});