import apiClient from './client';

/**
 * @param {number} page
 * @param {number} size
 * @param {boolean} [bustCache] - si true, fuerza saltarse el caché de 15s
 *   (Cache-Control del backend + caché del navegador). Úsalo justo
 *   después de subir una foto propia, para verla al momento.
 * @param {string} [userName] - filtra por nombre de usuario (contiene, sin mayúsculas/minúsculas)
 */
export function getAllPhotos(page = 0, size = 20, bustCache = false, userName = undefined) {
    return apiClient.get('/photos', {
        params: {
            page,
            size,
            userName,
            ...(bustCache ? { _: Date.now() } : {}),
        },
    });
}

export function getPhoto(photoId) {
    return apiClient.get(`/photos/${photoId}`);
}

export function getUserPhotos(userId) {
    return apiClient.get(`/photos/user/${userId}`);
}

export function uploadPhoto(userId, file, caption) {
    const formData = new FormData();
    formData.append('file', file);
    if (caption) formData.append('caption', caption);

    return apiClient.post('/photos', formData, {
        params: { userId },
    });
}