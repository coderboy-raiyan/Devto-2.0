import { configureStore } from "@reduxjs/toolkit";
import miniProfileReducer from "../reducers/miniProfileSlice";

const store = configureStore({
    reducer: {
        miniProfile: miniProfileReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;
