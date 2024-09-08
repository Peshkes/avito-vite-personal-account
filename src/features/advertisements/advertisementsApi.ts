const BASE_URL = import.meta.env.VITE_API_URL;

export const getAdvertisements = async (page: number, pageSize: number) => {
    try {
        const start = (page - 1) * pageSize;
        const response = await fetch(`${BASE_URL}/advertisements?_start=${start}&_limit=${pageSize}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching advertisements:', error);
        throw error;
    }
};

export const getAdvertisement = async (id: string) => {
    try {
        const response = await fetch(`${BASE_URL}/advertisements/${id}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching advertisement:', error);
        throw error;
    }
};

export const addAdvertisement = async (data: {
    imageUrl?: string;
    title: string;
    description?: string;
    price: number;
}) => {
    try {
        const response = await fetch(`${BASE_URL}/advertisements`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error creating advertisement:', error);
        throw error;
    }
};

export const putAdvertisement = async (id: string, data: {
    imageUrl?: string;
    title?: string;
    description?: string;
    price?: number;
}) => {
    try {
        const response = await fetch(`${BASE_URL}/advertisements/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating advertisement:', error);
        throw error;
    }
};

export const removeAdvertisement = async (id: string) => {
    try {
        const response = await fetch(`${BASE_URL}/advertisements/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error deleting advertisement:', error);
        throw error;
    }
};
