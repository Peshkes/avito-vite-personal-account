import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import advertisements from '../features/advertisements/advertisementsSlice.ts';
import orders from '../features/orders/ordersSlice.ts';

export const store = configureStore({
    reducer: {
        advertisements,
        orders
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
