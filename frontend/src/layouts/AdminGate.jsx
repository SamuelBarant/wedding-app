import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import MaterialSymbol from '../components/MaterialSymbol';

const SESSION_KEY = 'wedding_admin_authenticated';

// La contraseña vive en una variable de entorno, NO en el código fuente.
// Añade en tu .env: VITE_ADMIN_PASSWORD=lo-que-quieras
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

export default function AdminGate() {
    const [authenticated, setAuthenticated] = useState(() => {
        return sessionStorage.getItem(SESSION_KEY) === 'true';
    });

    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!ADMIN_PASSWORD) {
            // Aviso de desarrollo: si no hay contraseña configurada, no dejamos pasar a nadie
            setError(true);
            return;
        }

        if (password === ADMIN_PASSWORD) {
            sessionStorage.setItem(SESSION_KEY, 'true');
            setAuthenticated(true);
        } else {
            setError(true);
            setPassword('');
        }
    };

    if (authenticated) {
        return <Outlet />;
    }

    return (
        <Box
            sx={{
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
                sx={{ width: '100%', maxWidth: 380, p: 4, borderRadius: 3, boxShadow: '0 4px 24px rgba(181,101,118,0.08)' }}
            >
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <MaterialSymbol name="lock" size={36} sx={{ color: 'primary.light', mb: 1 }} />
                    <Typography variant="h2" sx={{ fontSize: 22 }}>
                        Acceso de administrador
                    </Typography>
                </Box>

                <TextField
                    fullWidth
                    required
                    autoFocus
                    type={showPassword ? 'text' : 'password'}
                    label="Contraseña"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setError(false);
                    }}
                    error={error}
                    helperText={error ? 'Contraseña incorrecta' : ' '}
                    sx={{ mb: 1 }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowPassword((v) => !v)}
                                    edge="end"
                                    size="small"
                                >
                                    <MaterialSymbol name={showPassword ? 'visibility_off' : 'visibility'} size={20} />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                <Button
                    type="submit"
                    fullWidth
                    size="large"
                    variant="contained"
                    sx={{ bgcolor: 'primary.light', color: 'primary.dark', py: 1.5, mt: 1 }}
                >
                    Entrar
                </Button>

                {!ADMIN_PASSWORD && (
                    <Alert severity="warning" sx={{ mt: 2 }}>
                        No hay VITE_ADMIN_PASSWORD configurada en el .env
                    </Alert>
                )}
            </Paper>
        </Box>
    );
}