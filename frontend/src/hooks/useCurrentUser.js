import { useState, useEffect } from 'react';
import { createUser, getUser } from '../data/api/users.js';

const STORAGE_KEY = 'wedding_user_id';

export function useCurrentUser() {
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedId = localStorage.getItem(STORAGE_KEY);

        if (storedId) {
            // Verifica que el usuario sigue existiendo en el backend
            getUser(storedId)
                .then(() => setUserId(storedId))
                .catch(() => localStorage.removeItem(STORAGE_KEY))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const register = async (name) => {
        const response = await createUser(name);
        const newUserId = response.data.id;
        localStorage.setItem(STORAGE_KEY, newUserId);
        setUserId(newUserId);
        return newUserId;
    };

    return { userId, loading, register };
}