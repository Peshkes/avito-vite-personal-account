import {Advertisement, AdvertisementState, Status} from "./types.ts";


export const selectAdvertisements = (state: { advertisements: AdvertisementState }): Advertisement[] => state.advertisements.list;
export const selectAdvertisement = (state: { advertisements: AdvertisementState }): Advertisement | undefined => state.advertisements.current;
export const selectAdvertisementsStatus = (state: { advertisements: AdvertisementState }): Status => state.advertisements.status;
export const selectAdvertisementsError = (state: { advertisements: AdvertisementState }): string | undefined => state.advertisements.error;
export const selectAdvertisementsPageData = (state: { advertisements: AdvertisementState }) => ({
    page: state.advertisements.page,
    pageSize: state.advertisements.pageSize
});
