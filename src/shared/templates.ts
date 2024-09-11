const BASE_URL = import.meta.env.VITE_API_URL;

/* eslint-disable @typescript-eslint/no-explicit-any */ //Чтобы сделать универсальную функцию
export const sendRequest = async (
    endpoint: string,
    method: string = 'GET',
    data?: any,
    signal?: AbortSignal) => {
    try {
        const response = await fetch(`${BASE_URL}/${endpoint}`, {
            method,
            headers: {'Content-Type': 'application/json'},
            body: data ? JSON.stringify(data) : undefined,
            signal,
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error(`Error ${method} ${endpoint}:`, error);
        throw error;
    }
};

export const getRandomImageURL = () => {
    return `https://picsum.photos/800/600?random=${Math.random()}`;
}
