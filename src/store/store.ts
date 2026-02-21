// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import filtersReducer from "./AviaFilterSlice";

export const store = configureStore({
    reducer: {
        filters: filtersReducer
    }
});

// Типы для Dispatch и State
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;