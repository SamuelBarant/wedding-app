import apiClient from './client';

export function getDashboard() {
    return apiClient.get('/admin/dashboard');
}

/**
 * @param {Object} [options]
 * @param {string} [options.search] - filtra por nombre de usuario (contiene, sin mayúsculas/minúsculas)
 * @param {number} [options.page]
 * @param {number} [options.size]
 */
export function getAdminUsers({ search, page = 0, size = 20 } = {}) {
    return apiClient.get('/admin/users', {
        params: { search, page, size },
    });
}
