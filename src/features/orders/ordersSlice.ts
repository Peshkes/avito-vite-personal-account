import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Order, OrderStatusValue, SortType} from "./types";
import {fetchOrders} from "./ordersAsyncFuncions.ts";
import {Status} from "../advertisements/types.ts";

export type OrdersState = {
    orders: Order[];
    page: number;
    pageSize: number;
    sort: SortType | undefined;
    statusFilter: OrderStatusValue | undefined;
    status: Status;
    error: string | undefined;
}

const initialState: OrdersState = {
    orders: [],
    page: 1,
    pageSize: 10,
    sort: undefined,
    statusFilter: undefined,
    status: undefined,
    error: undefined,
};

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        setSort(state, action: PayloadAction<SortType | undefined>) {
            state.sort = action.payload;
        },
        setFilters(state, action: PayloadAction<OrderStatusValue | undefined>) {
            state.statusFilter = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.status = 'loading';
                state.error = undefined;
            })
            .addCase(fetchOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
                state.status = 'succeeded';
                state.orders = action.payload;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Error fetching orders';
            });
    },
});

export const { setSort, setFilters } = ordersSlice.actions;
export default ordersSlice.reducer;
