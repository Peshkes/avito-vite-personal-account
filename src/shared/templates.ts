const BASE_URL = import.meta.env.VITE_API_URL;

export const sendRequest = async <T> (
    endpoint: string,
    method: string = 'GET',
    data?: T,
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
