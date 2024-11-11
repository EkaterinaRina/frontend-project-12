import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../slices/authSlice';
import { channelsApi } from "../api/channelApi";
import currentChannelReducer from '../slices/channelSlice';
import messagesApi from "../api/messageApi";

export default configureStore({
    reducer: {
        auth: authReducer,
        [channelsApi.reducerPath]: channelsApi.reducer,
        [messagesApi.reducerPath]: messagesApi.reducer,
        currentChannel: currentChannelReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        channelsApi.middleware,
        messagesApi.middleware
    )
});