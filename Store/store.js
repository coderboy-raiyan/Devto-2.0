import { configureStore } from "@reduxjs/toolkit";
import miniProfileReducer from "../reducers/miniProfileSlice";
import userReducer from "../reducers/userSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        miniProfile: miniProfileReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;
