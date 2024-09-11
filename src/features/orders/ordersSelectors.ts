import {OrdersState} from "./ordersSlice.ts";
import {Order, OrderStatusValue, SortType} from "./types.ts";

export const selectOrders = (state: { orders: OrdersState }): Order[] => state.orders.orders;
export const selectOrdersSort = (state: { orders: OrdersState }): SortType | undefined => state.orders.sort;
export const selectOrdersStatus = (state: { orders: OrdersState }): string | undefined => state.orders.status;
export const selectOrdersError = (state: { orders: OrdersState }): string | undefined => state.orders.error;

export const selectOrdersPageNumber = (state: { orders: OrdersState }): number => state.orders.page;
export const selectOrdersPageSize = (state: { orders: OrdersState }): number => state.orders.pageSize;
export const selectOrdersFilters = (state: { orders: OrdersState }): OrderStatusValue | undefined => state.orders.statusFilter;
