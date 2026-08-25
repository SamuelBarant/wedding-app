import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import MaterialSymbol from '../../components/MaterialSymbol';
import { uploadPhoto } from '../../data/api/photo.js';
import { useCurrentUser } from '../../hooks/useCurrentUser';

export default function UploadPhoto() {
    const navigate = useNavigate();
    const { userId } = useCurrentUser();

    // Inputs
    const cameraInputRef = useRef(null);
    const galleryInputRef = useRef(null);

    // Foto
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);

    // Formulario
    const [caption, setCaption] = useState('');

    // Upload
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);

    // UI
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [sourceDialog, setSourceDialog] = useState(false);

    /**
     * Cuando el usuario selecciona una foto
     */
    const handleFileSelected = (event) => {
        const selectedFile = event.target.files?.[0];

        if (!selectedFile) {
            return;
        }

        // Validar que sea una imagen
        if (!selectedFile.type.startsWith('image/')) {
            return;
        }

        setFile(selectedFile);

        // Crear preview
        const previewUrl = URL.createObjectURL(selectedFile);

        setPreview(previewUrl);

        // Cerrar diálogo
        setSourceDialog(false);

        // Permitir seleccionar nuevamente el mismo archivo
        event.target.value = '';
    };

    /**
     * Liberar memoria de la preview
     */
    useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

    /**
     * Eliminar foto
     */
    const handleRemovePhoto = () => {
        if (preview) {
            URL.revokeObjectURL(preview);
        }

        setFile(null);
        setPreview(null);
    };

    /**
     * Subir foto de verdad al backend.
     * El progreso es simulado hasta el 90% mientras esperamos
     * la respuesta (fetch/axios no dan progreso real sin config
     * extra de onUploadProgress), y salta a 100% solo si la
     * petición responde con éxito.
     */
    const handleUpload = async () => {
        if (!file) {
            return;
        }

        if (!userId) {
            setError('No se ha podido identificar al usuario. Vuelve a intentarlo.');
            return;
        }

        setUploading(true);
        setError(null);
        setProgress(0);

        const progressInterval = setInterval(() => {
            setProgress((currentProgress) => {
                if (currentProgress >= 90) {
                    return currentProgress;
                }
                return currentProgress + 10;
            });
        }, 150);

        try {
            await uploadPhoto(userId, file, caption);

            clearInterval(progressInterval);
            setProgress(100);
            setUploading(false);
            setSuccess(true);

            setTimeout(() => {
                navigate('/fotos');
            }, 1200);
        } catch (err) {
            clearInterval(progressInterval);
            setUploading(false);
            setProgress(0);
            setError(
                err.message ||
                'Error al subir la foto'
            );
        }
    };

    return (
        <Box sx={{ maxWidth: 560, mx: 'auto' }}>

            {/* HEADER */}
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ mb: 3 }}
            >
                <IconButton
                    onClick={() => navigate(-1)}
                    disabled={uploading}
                >
                    <MaterialSymbol name="close" />
                </IconButton>

                <Typography
                    variant="h3"
                    sx={{
                        fontSize: 20,
                        fontWeight: 600,
                    }}
                >
                    Subir Foto
                </Typography>

                <Box sx={{ width: 40 }} />
            </Stack>


            {/* INPUT CÁMARA */}
            <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                hidden
                onChange={handleFileSelected}
            />

            {/* INPUT GALERÍA */}
            <input
                ref={galleryInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handleFileSelected}
            />


            {/* PREVIEW */}
            <Box
                onClick={() => {
                    if (!uploading) {
                        setSourceDialog(true);
                    }
                }}
                sx={{
                    width: '100%',
                    aspectRatio: '4/3',
                    borderRadius: 3,
                    border: '2px dashed',
                    borderColor: preview ? 'transparent' : 'divider',

                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',

                    cursor: uploading ? 'default' : 'pointer',

                    bgcolor: preview
                        ? 'transparent'
                        : 'background.paper',

                    backgroundImage: preview
                        ? `url(${preview})`
                        : 'none',

                    backgroundSize: 'cover',
                    backgroundPosition: 'center',

                    position: 'relative',
                    overflow: 'hidden',

                    '&:hover': {
                        borderColor: uploading
                            ? 'divider'
                            : 'primary.light',
                    },
                }}
            >

                {!preview && (
                    <>
                        <MaterialSymbol
                            name="photo_camera"
                            size={40}
                            sx={{
                                color: 'primary.light',
                                mb: 1,
                            }}
                        />

                        <Typography
                            variant="body2"
                            sx={{
                                color: 'text.secondary',
                                textAlign: 'center',
                                px: 2,
                            }}
                        >
                            📸 Seleccionar o hacer foto
                        </Typography>
                    </>
                )}

                {/* BOTÓN ELIMINAR */}
                {preview && !uploading && (
                    <IconButton
                        onClick={(event) => {
                            event.stopPropagation();
                            handleRemovePhoto();
                        }}
                        sx={{
                            position: 'absolute',
                            top: 12,
                            right: 12,

                            bgcolor: 'rgba(0,0,0,0.6)',
                            color: 'white',

                            '&:hover': {
                                bgcolor: 'rgba(0,0,0,0.8)',
                            },
                        }}
                    >
                        <MaterialSymbol name="close" />
                    </IconButton>
                )}

            </Box>


            {/* INFORMACIÓN DEL ARCHIVO */}
            {file && (
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{
                        mt: 1,
                        px: 1,
                    }}
                >
                    <Typography
                        variant="caption"
                        sx={{
                            color: 'text.secondary',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {file.name}
                    </Typography>

                    <Typography
                        variant="caption"
                        sx={{
                            color: 'text.secondary',
                            ml: 2,
                            flexShrink: 0,
                        }}
                    >
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                    </Typography>
                </Stack>
            )}


            {/* FORMULARIO */}
            <Stack spacing={3} sx={{ mt: 4 }}>
                <TextField
                    label="Comentario"
                    placeholder="Escribe algo sobre esta foto..."
                    multiline
                    rows={2}
                    value={caption}
                    onChange={(event) => setCaption(event.target.value)}
                    fullWidth
                    disabled={uploading}
                />
            </Stack>


            {/* PROGRESO */}
            {uploading && (
                <Box sx={{ mt: 3 }}>

                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        sx={{ mb: 0.5 }}
                    >
                        <Typography
                            variant="caption"
                            sx={{ color: 'text.secondary' }}
                        >
                            Subiendo foto...
                        </Typography>

                        <Typography
                            variant="caption"
                            sx={{ color: 'text.secondary' }}
                        >
                            {progress}%
                        </Typography>
                    </Stack>

                    <LinearProgress
                        variant="determinate"
                        value={progress}
                        sx={{
                            height: 8,
                            borderRadius: 4,
                        }}
                    />

                </Box>
            )}


            {/* BOTÓN SUBIR */}
            <Button
                fullWidth
                size="large"
                variant="contained"
                disabled={!file || uploading}
                onClick={handleUpload}
                sx={{
                    mt: 4,
                    py: 1.75,
                    bgcolor: 'primary.light',
                    color: 'primary.dark',
                }}
            >
                {uploading
                    ? 'Subiendo...'
                    : 'Subir Foto'}
            </Button>


            {/* DIÁLOGO CÁMARA / GALERÍA */}
            <Dialog
                open={sourceDialog}
                onClose={() => setSourceDialog(false)}
                fullWidth
                maxWidth="xs"
            >

                <DialogTitle>
                    Seleccionar foto
                </DialogTitle>

                <DialogContent>

                    <Stack spacing={2} sx={{ pt: 1 }}>

                        <Button
                            variant="contained"
                            size="large"
                            startIcon={
                                <MaterialSymbol name="photo_camera" />
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
                                <MaterialSymbol name="photo_library" />
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
                        onClick={() => setSourceDialog(false)}
                    >
                        Cancelar
                    </Button>
                </DialogActions>

            </Dialog>


            {/* SUCCESS */}
            <Snackbar
                open={success}
                autoHideDuration={2000}
                onClose={() => setSuccess(false)}
            >
                <Alert
                    icon={
                        <MaterialSymbol
                            name="check_circle"
                            size={20}
                        />
                    }
                    severity="success"
                    sx={{ bgcolor: 'white' }}
                >
                    ¡Foto subida! 🎉
                </Alert>
            </Snackbar>

            {/* ERROR */}
            <Snackbar
                open={Boolean(error)}
                autoHideDuration={4000}
                onClose={() => setError(null)}
            >
                <Alert
                    severity="error"
                    sx={{ bgcolor: 'white' }}
                >
                    {error}
                </Alert>
            </Snackbar>

        </Box>
    );
}