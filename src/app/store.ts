import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import advertisements from '../features/advertisements/advertisementsSlice.ts';

export const store = configureStore({
    reducer: {
        advertisements,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
