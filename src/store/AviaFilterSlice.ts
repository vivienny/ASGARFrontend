
import { createSlice } from "@reduxjs/toolkit";


export interface FilterType {
    search?: string;
    min_price?: string;
    max_price?: string;
    start_date?: string;
    end_date?: string;
    sort_order?: 'asc' | 'desc';
}

// Состояние фильтров
interface FiltersState {
    appliedFilters: FilterType;  // фильтры, по которым реально загружены данные
    tempFilters: FilterType;     // временные значения из полей ввода
    loading: boolean;            // состояние загрузки
    error: string | null;        // ошибка
}

const initialState: FiltersState = {
    appliedFilters: {},
    tempFilters: {},
    loading: false,
    error: null
};

const filtersSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        // Установить временные фильтры (когда пользователь вводит данные)
        setTempFilters(state, { payload }: { payload: FilterType }) {
            state.tempFilters = payload;
        },
        
        // Применить фильтры (когда нажали кнопку "Применить")
        applyFilters(state) {
            state.appliedFilters = { ...state.tempFilters };
        },
        
        // Сбросить все фильтры
        resetFilters(state) {
            state.appliedFilters = {};
            state.tempFilters = {};
        },
        
        // Установить состояние загрузки
        setLoading(state, { payload }: { payload: boolean }) {
            state.loading = payload;
        },
        
        // Установить ошибку
        setError(state, { payload }: { payload: string | null }) {
            state.error = payload;
        }
    }
});

// Экспорт действий
export const {
    setTempFilters,
    applyFilters,
    resetFilters,
    setLoading,
    setError
} = filtersSlice.actions;

// Экспорт редьюсера
export default filtersSlice.reducer;