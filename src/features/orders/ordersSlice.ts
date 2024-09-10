import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order, SortType } from "./types";
import {fetchOrders} from "./ordersAsyncFuncions.ts";

export type OrdersState = {
    orders: Order[];
    sort: SortType | null;
    loading: boolean;
    error: string | null;
}

const initialState: OrdersState = {
    orders: [],
    sort: null,
    loading: false,
    error: null,
};

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        setSort(state, action: PayloadAction<SortType | null>) {
            state.sort = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Error fetching orders';
            });
    },
});

export const { setSort } = ordersSlice.actions;
export default ordersSlice.reducer;
