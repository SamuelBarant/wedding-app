import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import MaterialSymbol from '../../components/MaterialSymbol';
import { currentUser } from '../../data/mockData';

const stats = [
    {
        icon: 'stars',
        value: currentUser.points,
        label: 'Total Puntos',
    },
    {
        icon: 'task_alt',
        value: 4,
        label: 'Retos',
    },
    {
        icon: 'photo_camera',
        value: 12,
        label: 'Fotos',
    },
];

const options = [
    {
        icon: 'photo_library',
        label: 'Fotos subidas',
        to: '/fotos',
    },
    {
        icon: 'emoji_events',
        label: 'Mi Bingo',
        to: '/bingo',
    },
    {
        icon: 'edit',
        label: 'Editar Nombre',
        to: '/identificacion',
    },
];

export default function Profile() {
    const navigate = useNavigate();

    const cameraInputRef = useRef(null);
    const galleryInputRef = useRef(null);

    const [profilePhoto, setProfilePhoto] = useState(() => {
        return localStorage.getItem('profilePhoto') || null;
    });

    const [photoDialog, setPhotoDialog] = useState(false);

    /**
     * Seleccionar foto
     */
    const handlePhotoSelected = (event) => {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        // Comprobar que sea una imagen
        if (!file.type.startsWith('image/')) {
            return;
        }

        // Crear preview
        const previewUrl = URL.createObjectURL(file);

        setProfilePhoto((oldPhoto) => {
            if (oldPhoto && oldPhoto.startsWith('blob:')) {
                URL.revokeObjectURL(oldPhoto);
            }

            return previewUrl;
        });

        setPhotoDialog(false);

        // Guardamos temporalmente la URL
        localStorage.setItem('profilePhoto', previewUrl);

        // Permite volver a seleccionar la misma foto
        event.target.value = '';
    };

    /**
     * Limpiar preview cuando se desmonta
     */
    useEffect(() => {
        return () => {
            if (profilePhoto?.startsWith('blob:')) {
                URL.revokeObjectURL(profilePhoto);
            }
        };
    }, [profilePhoto]);

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

            <Stack
                alignItems="center"
                textAlign="center"
                sx={{ mb: 4 }}
            >
                <Box
                    sx={{
                        position: 'relative',
                        mb: 2,
                    }}
                >
                    <Avatar
                        src={profilePhoto || undefined}
                        onClick={() => setPhotoDialog(true)}
                        sx={{
                            width: 120,
                            height: 120,
                            bgcolor: 'primary.light',
                            fontSize: 42,
                            border: '4px solid white',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            cursor: 'pointer',

                            '&:hover': {
                                opacity: 0.85,
                            },
                        }}
                    >
                        {!profilePhoto && currentUser.name[0]}
                    </Avatar>

                    {/* BOTÓN EDITAR */}

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

                            '&:hover': {
                                bgcolor: 'primary.dark',
                            },
                        }}
                    >
                        <MaterialSymbol
                            name="photo_camera"
                            size={19}
                        />
                    </Box>
                </Box>

                <Typography
                    variant="h2"
                    sx={{
                        fontSize: 26,
                        mt: 1,
                    }}
                >
                    {currentUser.name}
                </Typography>
            </Stack>

            {/* ESTADÍSTICAS */}

            <Grid
                container
                spacing={2}
                sx={{ mb: 4 }}
            >
                {stats.map((s) => (
                    <Grid
                        item
                        xs={4}
                        key={s.label}
                    >
                        <Paper
                            elevation={0}
                            sx={{
                                p: 2,
                                borderRadius: 3,
                                textAlign: 'center',
                                boxShadow:
                                    '0 4px 12px rgba(181,101,118,0.08)',
                                height: 112,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <MaterialSymbol
                                name={s.icon}
                                sx={{
                                    color: 'primary.light',
                                    mb: 0.5,
                                }}
                                size={26}
                            />

                            <Typography
                                variant="h3"
                                sx={{
                                    fontSize: 22,
                                    color: 'primary.main',
                                }}
                            >
                                {s.value}
                            </Typography>

                            <Typography
                                variant="caption"
                                sx={{
                                    color: 'text.secondary',
                                    fontSize: 10,
                                    textTransform: 'uppercase',
                                    letterSpacing: 0.5,
                                }}
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
                sx={{
                    borderRadius: 3,
                    overflow: 'hidden',
                    boxShadow:
                        '0 4px 12px rgba(181,101,118,0.08)',
                    mb: 4,
                }}
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
                            borderBottom:
                                i < options.length - 1
                                    ? '1px solid'
                                    : 'none',
                            borderColor: 'divider',

                            '&:hover': {
                                bgcolor: 'background.default',
                            },
                        }}
                    >
                        <Stack
                            direction="row"
                            spacing={2}
                            alignItems="center"
                        >
                            <MaterialSymbol
                                name={opt.icon}
                                sx={{
                                    color: 'primary.main',
                                }}
                            />

                            <Typography>
                                {opt.label}
                            </Typography>
                        </Stack>

                        <MaterialSymbol
                            name="chevron_right"
                            sx={{
                                color: 'text.disabled',
                            }}
                        />
                    </Box>
                ))}
            </Paper>

            {/* CERRAR SESIÓN */}

            <Stack alignItems="center">
                <Button
                    variant="outlined"
                    color="error"
                    startIcon={
                        <MaterialSymbol
                            name="logout"
                            size={18}
                        />
                    }
                    onClick={() => navigate('/')}
                    sx={{
                        borderRadius: 999,
                        px: 4,
                    }}
                >
                    Cerrar sesión
                </Button>
            </Stack>

            {/* =============================== */}
            {/* DIALOG FOTO DE PERFIL */}
            {/* =============================== */}

            <Dialog
                open={photoDialog}
                onClose={() => setPhotoDialog(false)}
                fullWidth
                maxWidth="xs"
            >
                <DialogTitle
                    sx={{
                        textAlign: 'center',
                    }}
                >
                    Foto de perfil
                </DialogTitle>

                <DialogContent>
                    <Stack spacing={2} sx={{ pt: 1 }}>

                        <Button
                            variant="contained"
                            size="large"
                            startIcon={
                                <MaterialSymbol
                                    name="photo_camera"
                                />
                            }
                            onClick={() => {
                                cameraInputRef.current?.click();
                            }}
                        >
                            Tomar foto
                        </Button>

                        <Button
                            variant="outlined"
                            size="large"
                            startIcon={
                                <MaterialSymbol
                                    name="photo_library"
                                />
                            }
                            onClick={() => {
                                galleryInputRef.current?.click();
                            }}
                        >
                            Elegir de la galería
                        </Button>

                    </Stack>
                </DialogContent>

                <DialogActions>
                    <Button
                        onClick={() => setPhotoDialog(false)}
                    >
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>

        </Box>
    );
}