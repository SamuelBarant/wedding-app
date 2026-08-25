import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

import MaterialSymbol from '../../components/MaterialSymbol';
import { getUserPhotos } from '../../data/api/photo.js';
import { getUser, uploadProfilePhoto } from '../../data/api/users.js';

const options = [
    {
        icon: 'photo_library',
        label: 'Galeria',
        to: '/fotos',
    },
    {
        icon: 'edit',
        label: 'Editar Nombre',
        to: '/identificacion',
    },
];

const USER_ID_KEY = 'wedding_user_id';

export default function Profile() {
    const userId = localStorage.getItem(USER_ID_KEY);
    const navigate = useNavigate();

    const cameraInputRef = useRef(null);
    const galleryInputRef = useRef(null);

    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);
    const [photoCount, setPhotoCount] = useState(0);

    const [uploadingPhoto, setUploadingPhoto] = useState(false);
    const [photoDialog, setPhotoDialog] = useState(false);
    const [error, setError] = useState(null);

    // Carga los datos del usuario y su número de fotos
    useEffect(() => {
        if (!userId) {
            setLoadingUser(false);
            return;
        }

        setLoadingUser(true);

        Promise.all([
            getUser(userId),
            getUserPhotos(userId),
        ])
            .then(([userData, photos]) => {
                setUser(userData);
                setPhotoCount(photos.length);
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoadingUser(false));
    }, [userId]);

    /**
     * Seleccionar y subir nueva foto de perfil al backend.
     * Ya no se guarda en localStorage: el backend la persiste
     * y devuelve la URL real en user.profilePhoto.
     */
    const handlePhotoSelected = async (event) => {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        if (!file.type.startsWith('image/')) {
            return;
        }

        setPhotoDialog(false);
        setUploadingPhoto(true);
        setError(null);

        try {
            const updatedUser = await uploadProfilePhoto(userId, file);
            setUser(updatedUser);
        } catch (err) {
            setError(err.message || 'No se pudo actualizar la foto de perfil');
        } finally {
            setUploadingPhoto(false);
        }

        // Permite volver a seleccionar la misma foto
        event.target.value = '';
    };

    const stats = [
        {
            icon: 'photo_camera',
            value: photoCount,
            label: 'Fotos',
        },
    ];

    if (loadingUser) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto' }}>

            {/* INPUT CÁMARA */}
            <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="user"
                hidden
                onChange={handlePhotoSelected}
            />

            {/* INPUT GALERÍA */}
            <input
                ref={galleryInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handlePhotoSelected}
            />

            {/* PERFIL */}
            <Stack alignItems="center" textAlign="center" sx={{ mb: 4 }}>
                <Box sx={{ position: 'relative', mb: 2 }}>
                    <Avatar
                        src={user?.profilePhoto || undefined}
                        onClick={() => !uploadingPhoto && setPhotoDialog(true)}
                        sx={{
                            width: 120,
                            height: 120,
                            bgcolor: 'primary.light',
                            fontSize: 42,
                            border: '4px solid white',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            cursor: uploadingPhoto ? 'default' : 'pointer',
                            opacity: uploadingPhoto ? 0.6 : 1,
                            '&:hover': { opacity: uploadingPhoto ? 0.6 : 0.85 },
                        }}
                    >
                        {!user?.profilePhoto && user?.name?.[0]}
                    </Avatar>

                    {uploadingPhoto && (
                        <CircularProgress
                            size={40}
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                marginTop: '-20px',
                                marginLeft: '-20px',
                            }}
                        />
                    )}

                    {/* BOTÓN EDITAR */}
                    {!uploadingPhoto && (
                        <Box
                            onClick={() => setPhotoDialog(true)}
                            sx={{
                                position: 'absolute',
                                right: 2,
                                bottom: 2,
                                width: 38,
                                height: 38,
                                borderRadius: '50%',
                                bgcolor: 'primary.main',
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '3px solid white',
                                cursor: 'pointer',
                                '&:hover': { bgcolor: 'primary.dark' },
                            }}
                        >
                            <MaterialSymbol name="photo_camera" size={19} />
                        </Box>
                    )}
                </Box>

                <Typography variant="h2" sx={{ fontSize: 26, mt: 1 }}>
                    {user?.name}
                </Typography>
            </Stack>

            {/* ESTADÍSTICAS */}
            <Grid container spacing={2} sx={{ mb: 4, justifyContent: 'center' }}>
                {stats.map((s) => (
                    <Grid item xs={4} key={s.label}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 2,
                                borderRadius: 3,
                                textAlign: 'center',
                                boxShadow: '0 4px 12px rgba(181,101,118,0.08)',
                                height: 112,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <MaterialSymbol name={s.icon} sx={{ color: 'primary.light', mb: 0.5 }} size={26} />
                            <Typography variant="h3" sx={{ fontSize: 22, color: 'primary.main' }}>
                                {s.value}
                            </Typography>
                            <Typography
                                variant="caption"
                                sx={{ color: 'text.secondary', fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.5 }}
                            >
                                {s.label}
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            {/* OPCIONES */}
            <Paper
                elevation={0}
                sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: '0 4px 12px rgba(181,101,118,0.08)', mb: 4 }}
            >
                {options.map((opt, i) => (
                    <Box
                        key={opt.label}
                        onClick={() => navigate(opt.to)}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            px: 3,
                            py: 2,
                            cursor: 'pointer',
                            borderBottom: i < options.length - 1 ? '1px solid' : 'none',
                            borderColor: 'divider',
                            '&:hover': { bgcolor: 'background.default' },
                        }}
                    >
                        <Stack direction="row" spacing={2} alignItems="center">
                            <MaterialSymbol name={opt.icon} sx={{ color: 'primary.main' }} />
                            <Typography>{opt.label}</Typography>
                        </Stack>
                        <MaterialSymbol name="chevron_right" sx={{ color: 'text.disabled' }} />
                    </Box>
                ))}
            </Paper>

            {/* CERRAR SESIÓN */}
            <Stack alignItems="center">
                <Button
                    variant="outlined"
                    color="error"
                    startIcon={<MaterialSymbol name="logout" size={18} />}
                    onClick={() => {
                        localStorage.removeItem(USER_ID_KEY);
                        navigate('/');
                    }}
                    sx={{ borderRadius: 999, px: 4 }}
                >
                    Cerrar sesión
                </Button>
            </Stack>

            {/* DIALOG FOTO DE PERFIL */}
            <Dialog open={photoDialog} onClose={() => setPhotoDialog(false)} fullWidth maxWidth="xs">
                <DialogTitle sx={{ textAlign: 'center' }}>Foto de perfil</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{ pt: 1 }}>
                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<MaterialSymbol name="photo_camera" />}
                            onClick={() => cameraInputRef.current?.click()}
                        >
                            Tomar foto
                        </Button>
                        <Button
                            variant="outlined"
                            size="large"
                            startIcon={<MaterialSymbol name="photo_library" />}
                            onClick={() => galleryInputRef.current?.click()}
                        >
                            Elegir de la galería
                        </Button>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setPhotoDialog(false)}>Cancelar</Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={Boolean(error)} autoHideDuration={4000} onClose={() => setError(null)}>
                <Alert severity="error" sx={{ bgcolor: 'white' }}>
                    {error}
                </Alert>
            </Snackbar>

        </Box>
    );
}