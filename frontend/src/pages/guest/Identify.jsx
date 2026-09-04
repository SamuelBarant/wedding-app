import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import MaterialSymbol from '../../components/MaterialSymbol';
import { createUser, getUser } from '../../data/api/users.js';

const STORAGE_KEY = 'wedding_user_id';

export default function Identify() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [userId, setUserId] = useState(null);
    const [loadingExisting, setLoadingExisting] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    // Al montar, comprueba si ya hay un usuario guardado (viene a editar el nombre)
    useEffect(() => {
        const storedId = localStorage.getItem(STORAGE_KEY);

        if (!storedId) {
            setLoadingExisting(false);
            return;
        }

        getUser(storedId)
            .then((user) => {
                setUserId(storedId);
                setName(user.name);
            })
            .catch(() => {
                // El id guardado ya no existe en el backend (se limpió la BD, etc.)
                localStorage.removeItem(STORAGE_KEY);
            })
            .finally(() => setLoadingExisting(false));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const trimmedName = name.trim();
        if (!trimmedName) return;

        setSubmitting(true);
        setError(null);

        try {
            // createUser busca por nombre (case-insensitive) y reutiliza el
            // usuario si ya existe. Así, si el nombre introducido es distinto
            // al de la sesión actual, esto cambia de usuario (o crea uno
            // nuevo) en vez de renombrar la cuenta con la que se entró.
            const user = await createUser(trimmedName);
            localStorage.setItem(STORAGE_KEY, user.id);

            navigate('/inicio');
        } catch (err) {
            setError(err.message || 'No se pudo guardar tu nombre');
            setSubmitting(false);
        }
    };

    if (loadingExisting) {
        return (
            <Box
                sx={{
                    height: '100dvh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box
            sx={{
                position: 'relative',
                height: '100dvh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                px: 3,
                background: 'linear-gradient(180deg, #fff8f3 0%, #f5ede4 100%)',
            }}
        >
            <Paper
                component="form"
                onSubmit={handleSubmit}
                elevation={0}
                sx={{ width: '100%', maxWidth: 420, p: 4, borderRadius: 3, boxShadow: '0 4px 24px rgba(181,101,118,0.08)' }}
            >
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <MaterialSymbol name="auto_awesome" size={36} sx={{ color: 'primary.light', mb: 1 }} />
                    <Typography variant="h2" sx={{ fontSize: 26 }}>
                        {userId ? 'Cambiar de usuario' : '¿Cómo te llamas?'}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                        {userId
                            ? 'Si escribes un nombre distinto, entrarás en esa cuenta'
                            : 'Para saber quien eres'}
                    </Typography>
                </Box>

                <TextField
                    fullWidth
                    required
                    label="Escribe tu nombre y apellido"
                    placeholder="Tu nombre y apellidos aquí..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={submitting}
                    sx={{ mb: 3 }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <MaterialSymbol name="person" sx={{ color: 'text.secondary' }} />
                            </InputAdornment>
                        ),
                    }}
                />

                <Button
                    type="submit"
                    fullWidth
                    size="large"
                    variant="contained"
                    disabled={submitting || !name.trim()}
                    endIcon={!submitting && <MaterialSymbol name="arrow_forward" size={20} />}
                    sx={{ bgcolor: 'primary.light', color: 'primary.dark', py: 1.75 }}
                >
                    {submitting ? <CircularProgress size={22} sx={{ color: 'primary.dark' }} /> : 'Continuar'}
                </Button>

                <Typography variant="caption" display="block" textAlign="center" sx={{ color: 'text.secondary', mt: 2 }}>
                    Solo usaremos tu nombre y apellidos para mostrarnos quien eres.
                </Typography>
            </Paper>

            <Snackbar open={Boolean(error)} autoHideDuration={4000} onClose={() => setError(null)}>
                <Alert severity="error" sx={{ bgcolor: 'white' }}>
                    {error}
                </Alert>
            </Snackbar>
        </Box>
    );
}