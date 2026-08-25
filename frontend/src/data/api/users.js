import apiClient from './client';

export function getUser(userId) {
    return apiClient.get(`/users/${userId}`);
}

export function createUser(name) {
    return apiClient.post('/users', {
        name,
    });
}

export function updateUser(userId, name) {
    return apiClient.put(`/users/${userId}`, {
        name,
    });
}

export function uploadProfilePhoto(userId, photo) {
    const formData = new FormData();
    formData.append('photo', photo);

    return apiClient.post(`/users/${userId}/photo`, formData);
}