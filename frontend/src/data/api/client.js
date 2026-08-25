const API_URL =
    import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

function buildUrl(endpoint, params) {
    if (!params) {
        return `${API_URL}${endpoint}`;
    }

    const query = new URLSearchParams(
        Object.entries(params).filter(([, value]) => value !== undefined && value !== null)
    );

    const queryString = query.toString();

    return queryString
        ? `${API_URL}${endpoint}?${queryString}`
        : `${API_URL}${endpoint}`;
}

async function request(
    endpoint,
    options = {}
) {
    const isFormData = options.body instanceof FormData;

    const response = await fetch(
        buildUrl(endpoint, options.params),
        {
            ...options,
            headers: {
                // Si es FormData, NO fijamos Content-Type: el navegador
                // añade el boundary correcto automáticamente.
                ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
                ...(options.headers || {}),
            },
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
    get(endpoint, { params } = {}) {
        return request(endpoint, { params });
    },

    post(endpoint, body, { params } = {}) {
        const isFormData = body instanceof FormData;

        return request(endpoint, {
            method: 'POST',
            body: isFormData ? body : JSON.stringify(body),
            params,
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