export type AdvertisementBase = {
    name: string,
    price: number
    imageUrl?: string,
    description?: string,
};

export type Advertisement = AdvertisementBase &{
    id: string;
    createdAt: string;
    views: number;
    likes: number;
};

export type Status = 'loading' | 'succeeded' | 'failed' | undefined;

export type RangeFilter = {
    min: number;
    max: number | undefined;
};

export type Filters = {
    priceRange: RangeFilter;
    viewsRange: RangeFilter;
    likesRange: RangeFilter;
};

export type AdvertisementState = {
    list: Advertisement[];
    current: Advertisement | undefined;
    page: number;
    pageSize: number;
    searchQuery: string,
    filters: Filters,
    status: Status,
    error: string | undefined,
};
