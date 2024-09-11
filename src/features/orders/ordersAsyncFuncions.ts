import {createAsyncThunk} from "@reduxjs/toolkit";
import {getOrder, getOrders} from "./ordersApi.ts";
import {OrderStatusValue, SortType} from "./types.ts";

export const fetchOrders = createAsyncThunk(
    'orders/getOrders',
    async ({page, pageSize, signal, status, sort}: {
        page: number,
        pageSize: number,
        signal: AbortSignal,
        status?: OrderStatusValue,
        sort?: SortType,
    }, {rejectWithValue}) => {
        try {
            return await getOrders(page, pageSize, signal, status, sort);
        } catch (error) {
            if (error instanceof Error) {
                if (error.name === 'AbortError') {
                    return rejectWithValue('Fetching orders request was aborted');
                } else {
                    return rejectWithValue('Error fetching orders: ' + error.message);
                }
            } else {
                return rejectWithValue('Unknown error fetching orders');
            }
        }
    }
);

export const fetchOrder = createAsyncThunk(
    'orders/getOrder',
    async ({id, signal}: { id: string, signal: AbortSignal }, {rejectWithValue}) => {
        try {
            return await getOrder(id, signal);
        } catch (error) {
            if (error instanceof Error) {
                if (error.name === 'AbortError') {
                    return rejectWithValue('Fetching order request was aborted');
                } else {
                    return rejectWithValue('Error fetching order: ' + error.message);
                }
            } else {
                return rejectWithValue('Unknown error fetching order');
            }
        }
    }
);
