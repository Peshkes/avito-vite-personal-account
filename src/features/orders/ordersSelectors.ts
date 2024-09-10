import {OrdersState} from "./ordersSlice.ts";
import {Order, SortType} from "./types.ts";

export const selectOrders = (state: { orders: OrdersState }): Order[] => state.orders.orders;
export const selectSort = (state: { orders: OrdersState }): SortType | null => state.orders.sort;
export const selectLoading = (state: { orders: OrdersState }): boolean => state.orders.loading;
export const selectError = (state: { orders: OrdersState }): string | null => state.orders.error;
