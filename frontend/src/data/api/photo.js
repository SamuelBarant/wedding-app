import apiClient from './client';

export function getAllPhotos(page = 0, size = 20) {
    return apiClient.get('/photos', {
        params: { page, size },
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