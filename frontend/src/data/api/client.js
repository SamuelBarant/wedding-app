const API_URL =
    import.meta.env.VITE_API_URL || 'http://localhost:8080';

async function request(
    endpoint,
    options = {}
) {
    const response = await fetch(
        `${API_URL}${endpoint}`,
        {
            headers: {
                'Content-Type': 'application/json',
                ...(options.headers || {}),
            },
            ...options,
        }
    );

    let data = null;

    const contentType =
        response.headers.get('content-type');

    if (contentType?.includes('application/json')) {
        data = await response.json();
    }

    if (!response.ok) {
        throw new Error(
            data?.message ||
            `Error ${response.status}`
        );
    }

    return data;
}

const apiClient = {
    get(endpoint) {
        return request(endpoint);
    },

    post(endpoint, body) {
        return request(endpoint, {
            method: 'POST',
            body: JSON.stringify(body),
        });
    },

    put(endpoint, body) {
        return request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(body),
        });
    },

    delete(endpoint) {
        return request(endpoint, {
            method: 'DELETE',
        });
    },
};

export default apiClient;