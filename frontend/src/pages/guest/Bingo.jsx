import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import MaterialSymbol from '../../components/MaterialSymbol';
import { currentUser, bingoCells } from '../../data/mockData';

const STATUS_STYLES = {
    pending: { bg: 'surface.paper', border: '#d1c5b422' },
    completed: { bg: 'primary.main', border: 'primary.main' },
    review: { bg: '#e9e1d8', border: '#d1c5b4' },
    uploading: { bg: '#f5ede4', border: '#d1c5b4' },
    free: { bg: 'gradient', border: '#e9c176' },
};

function BingoCell({ cell, onClick }) {
    if (cell.status === 'free') {
        return (
            <Paper
                onClick={() => onClick(cell)}
                elevation={0}
                sx={{
                    aspectRatio: '1/1',
                    borderRadius: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #c5a059, #775a19)',
                    color: 'white',
                    transform: 'scale(1.05)',
                    boxShadow: '0 6px 16px rgba(119,90,25,0.3)',
                    cursor: 'default',
                }}
            >
                <MaterialSymbol name="star" fill size={26} />
                <Typography
                    sx={{
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: 1,
                        mt: 0.5,
                    }}
                >
                    LIBRE
                </Typography>
            </Paper>
        );
    }

    if (cell.status === 'completed') {
        return (
            <Paper
                onClick={() => onClick(cell)}
                elevation={0}
                sx={{
                    aspectRatio: '1/1',
                    borderRadius: 2,
                    bgcolor: 'primary.main',
                    color: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 3px 8px rgba(119,90,25,0.25)',
                }}
            >
                <MaterialSymbol name="check_circle" fill size={24} />

                <Typography
                    sx={{
                        fontSize: 9,
                        fontWeight: 700,
                        mt: 0.5,
                    }}
                >
                    Completado
                </Typography>
            </Paper>
        );
    }

    if (cell.status === 'review') {
        return (
            <Paper
                elevation={0}
                sx={{
                    aspectRatio: '1/1',
                    borderRadius: 2,
                    bgcolor: '#e9e1d8',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 0.5,
                }}
            >
                <MaterialSymbol
                    name="hourglass_empty"
                    sx={{ color: 'secondary.main' }}
                    size={20}
                />

                <Chip
                    label="En revisión"
                    size="small"
                    sx={{
                        height: 18,
                        fontSize: 8,
                        bgcolor: 'rgba(145,71,88,0.1)',
                        color: 'secondary.main',
                    }}
                />
            </Paper>
        );
    }

    if (cell.status === 'uploading') {
        return (
            <Paper
                elevation={0}
                sx={{
                    aspectRatio: '1/1',
                    borderRadius: 2,
                    bgcolor: 'surface.container',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 0.5,
                }}
            >
                <CircularProgress size={22} thickness={5} />

                <Typography
                    sx={{
                        fontSize: 8,
                        color: 'text.secondary',
                    }}
                >
                    Subiendo...
                </Typography>
            </Paper>
        );
    }

    return (
        <Paper
            onClick={() => onClick(cell)}
            elevation={0}
            sx={{
                aspectRatio: '1/1',
                borderRadius: 2,
                bgcolor: 'white',
                border: '1px solid #d1c5b433',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                position: 'relative',
                transition: 'transform 0.15s',
                '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 10px rgba(119,90,25,0.1)',
                },
            }}
        >
            <MaterialSymbol
                name={cell.icon}
                sx={{
                    color: 'text.secondary',
                    mb: 0.5,
                }}
                size={22}
            />

            <Typography
                sx={{
                    fontSize: 9,
                    textAlign: 'center',
                    px: 0.5,
                }}
            >
                {cell.label}
            </Typography>

            {cell.points > 0 && (
                <Typography
                    sx={{
                        position: 'absolute',
                        top: 4,
                        right: 6,
                        fontSize: 8,
                        fontWeight: 700,
                        color: 'text.secondary',
                        opacity: 0.5,
                    }}
                >
                    {cell.points}
                </Typography>
            )}
        </Paper>
    );
}

export default function Bingo() {
    const [selected, setSelected] = useState(null);

    // Archivo seleccionado
    const [selectedFile, setSelectedFile] = useState(null);

    // Preview
    const [preview, setPreview] = useState(null);

    // Estado de subida
    const [uploaded, setUploaded] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    // Inputs ocultos
    const cameraInputRef = useRef(null);
    const galleryInputRef = useRef(null);

    const completedCount = bingoCells.filter(
        (c) => c.status === 'completed' || c.status === 'free'
    ).length;

    const progress = Math.round((completedCount / 25) * 100);

    /**
     * Seleccionar reto
     */
    const handleCellClick = (cell) => {
        // No permitir abrir retos ya enviados
        if (
            cell.status === 'review' ||
            cell.status === 'uploading'
        ) {
            return;
        }

        setSelected(cell);
        setSelectedFile(null);
        setPreview(null);
        setUploaded(false);
        setUploading(false);
        setUploadProgress(0);
    };

    /**
     * Seleccionar foto desde cámara o galería
     */
    const handleFileSelected = (event) => {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        // Comprobar que realmente sea una imagen
        if (!file.type.startsWith('image/')) {
            return;
        }

        // Guardamos el File
        setSelectedFile(file);

        // Creamos preview
        const previewUrl = URL.createObjectURL(file);

        setPreview(previewUrl);

        // Permite volver a seleccionar el mismo archivo
        event.target.value = '';
    };

    /**
     * Liberar la URL de la preview
     */
    useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

    /**
     * Eliminar foto seleccionada
     */
    const handleRemovePhoto = () => {
        if (preview) {
            URL.revokeObjectURL(preview);
        }

        setSelectedFile(null);
        setPreview(null);
    };

    /**
     * Subir foto
     *
     * Actualmente simulado.
     * Aquí posteriormente irá la llamada a tu API.
     */
    const handleUpload = () => {
        if (!selectedFile || !selected) {
            return;
        }

        setUploading(true);
        setUploadProgress(0);

        const interval = setInterval(() => {
            setUploadProgress((current) => {
                if (current >= 100) {
                    clearInterval(interval);

                    setUploading(false);
                    setUploaded(true);

                    return 100;
                }

                return current + 10;
            });
        }, 150);
    };

    /**
     * Cerrar dialog
     */
    const handleClose = () => {
        if (uploading) {
            return;
        }

        setSelected(null);
        setSelectedFile(null);
        setPreview(null);
        setUploaded(false);
        setUploading(false);
        setUploadProgress(0);
    };

    return (
        <Box>
            {/* CABECERA DEL USUARIO */}

            <Paper
                elevation={0}
                sx={{
                    p: 2,
                    borderRadius: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    bgcolor: 'surface.variant',
                    border: '1px solid rgba(255,255,255,0.5)',
                }}
            >
                <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                >
                    <Avatar
                        sx={{
                            width: 56,
                            height: 56,
                            bgcolor: 'primary.light',
                        }}
                    >
                        {currentUser.name[0]}
                    </Avatar>

                    <Box>
                        <Typography
                            variant="h3"
                            sx={{ fontSize: 20 }}
                        >
                            {currentUser.name}
                        </Typography>

                        <Typography
                            variant="body2"
                            sx={{
                                color: 'text.secondary',
                            }}
                        >
                            Jugador Invitado
                        </Typography>
                    </Box>
                </Stack>

                <Box
                    sx={{
                        px: 2,
                        py: 1,
                        borderRadius: 4,
                        border: '1px solid rgba(119,90,25,0.2)',
                        bgcolor: 'rgba(119,90,25,0.1)',
                        textAlign: 'center',
                    }}
                >
                    <Typography
                        variant="caption"
                        sx={{
                            color: 'primary.main',
                            display: 'block',
                        }}
                    >
                        Puntos
                    </Typography>

                    <Typography
                        sx={{
                            fontWeight: 700,
                            color: 'primary.main',
                            fontSize: 20,
                        }}
                    >
                        {currentUser.points}
                    </Typography>
                </Box>
            </Paper>

            {/* PROGRESO */}

            <Box sx={{ mt: 4 }}>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{ mb: 1 }}
                >
                    <Typography
                        variant="subtitle1"
                        sx={{
                            textTransform: 'none',
                            letterSpacing: 0,
                            color: 'text.secondary',
                        }}
                    >
                        Tu progreso: {completedCount} / 25 casillas
                    </Typography>

                    <Typography
                        variant="subtitle1"
                        sx={{
                            textTransform: 'none',
                            color: 'primary.main',
                        }}
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

            {/* BINGO */}

            <Box
                sx={{
                    mt: 4,
                    mb: 3,
                    p: {
                        xs: 1,
                        sm: 1.5,
                    },
                    borderRadius: 3,
                    bgcolor: 'rgba(245,237,228,0.5)',
                    border: '1px solid rgba(209,197,180,0.3)',
                }}
            >
                <Grid
                    container
                    spacing={{
                        xs: 0.75,
                        sm: 1,
                    }}
                    columns={5}
                >
                    {bingoCells.map((cell) => (
                        <Grid
                            item
                            xs={1}
                            key={cell.id}
                        >
                            <BingoCell
                                cell={cell}
                                onClick={handleCellClick}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>

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

            {/* DIALOG DEL RETO */}

            <Dialog
                open={Boolean(selected)}
                onClose={handleClose}
                fullWidth
                maxWidth="xs"
            >
                {selected && (
                    <DialogContent
                        sx={{
                            p: 4,
                            textAlign: 'center',
                        }}
                    >
                        <IconButton
                            onClick={handleClose}
                            disabled={uploading}
                            sx={{
                                position: 'absolute',
                                top: 8,
                                right: 8,
                            }}
                        >
                            <MaterialSymbol name="close" />
                        </IconButton>

                        {/* ICONO */}

                        <MaterialSymbol
                            name={selected.icon}
                            size={36}
                            sx={{
                                color: 'primary.main',
                                mb: 1,
                            }}
                        />

                        {/* TÍTULO */}

                        <Typography
                            variant="h3"
                            sx={{
                                fontSize: 20,
                            }}
                        >
                            {selected.label}
                        </Typography>

                        <Typography
                            variant="body2"
                            sx={{
                                color: 'text.secondary',
                                mt: 1,
                                mb: 2,
                            }}
                        >
                            Consigue una foto para completar este reto y
                            súbela para que el equipo de la boda la revise.
                        </Typography>

                        {/* PUNTOS */}

                        <Chip
                            label={`+${selected.points} puntos`}
                            sx={{
                                mb: 3,
                                bgcolor: 'primary.light',
                                color: 'primary.dark',
                                fontWeight: 700,
                            }}
                        />

                        {/* ================================= */}
                        {/* SIN FOTO */}
                        {/* ================================= */}

                        {!selectedFile && !uploaded && (
                            <Stack spacing={1.5}>

                                <Button
                                    variant="contained"
                                    startIcon={
                                        <MaterialSymbol
                                            name="photo_camera"
                                            size={20}
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
                                    startIcon={
                                        <MaterialSymbol
                                            name="image"
                                            size={20}
                                        />
                                    }
                                    onClick={() => {
                                        galleryInputRef.current?.click();
                                    }}
                                >
                                    Elegir de galería
                                </Button>

                            </Stack>
                        )}

                        {/* ================================= */}
                        {/* FOTO SELECCIONADA */}
                        {/* ================================= */}

                        {selectedFile && !uploading && !uploaded && (
                            <Stack spacing={2}>

                                {/* PREVIEW */}

                                <Box
                                    sx={{
                                        width: '100%',
                                        aspectRatio: '4/3',
                                        borderRadius: 3,
                                        overflow: 'hidden',
                                        position: 'relative',
                                        bgcolor: 'black',
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={preview}
                                        alt="Vista previa"
                                        sx={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                        }}
                                    />

                                    {/* ELIMINAR */}

                                    <IconButton
                                        onClick={handleRemovePhoto}
                                        sx={{
                                            position: 'absolute',
                                            top: 8,
                                            right: 8,
                                            bgcolor: 'rgba(0,0,0,0.6)',
                                            color: 'white',

                                            '&:hover': {
                                                bgcolor: 'rgba(0,0,0,0.8)',
                                            },
                                        }}
                                    >
                                        <MaterialSymbol name="close" />
                                    </IconButton>
                                </Box>

                                {/* INFORMACIÓN */}

                                <Typography
                                    variant="caption"
                                    sx={{
                                        color: 'text.secondary',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    {selectedFile.name}
                                </Typography>

                                {/* CONFIRMAR */}

                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={handleUpload}
                                >
                                    Subir foto
                                </Button>

                                {/* CAMBIAR */}

                                <Button
                                    variant="text"
                                    onClick={() => {
                                        galleryInputRef.current?.click();
                                    }}
                                >
                                    Cambiar foto
                                </Button>

                            </Stack>
                        )}

                        {/* ================================= */}
                        {/* SUBIENDO */}
                        {/* ================================= */}

                        {uploading && (
                            <Stack spacing={2}>

                                <Box
                                    sx={{
                                        width: '100%',
                                        aspectRatio: '4/3',
                                        borderRadius: 3,
                                        overflow: 'hidden',
                                        bgcolor: 'black',
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={preview}
                                        alt="Foto subiendo"
                                        sx={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            opacity: 0.7,
                                        }}
                                    />
                                </Box>

                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'text.secondary',
                                    }}
                                >
                                    Subiendo foto...
                                </Typography>

                                <LinearProgress
                                    variant="determinate"
                                    value={uploadProgress}
                                    sx={{
                                        height: 8,
                                        borderRadius: 4,
                                    }}
                                />

                                <Typography
                                    variant="caption"
                                    sx={{
                                        color: 'text.secondary',
                                    }}
                                >
                                    {uploadProgress}%
                                </Typography>

                            </Stack>
                        )}

                        {/* ================================= */}
                        {/* EN REVISIÓN */}
                        {/* ================================= */}

                        {uploaded && (
                            <Stack spacing={2}>

                                <Box
                                    sx={{
                                        width: '100%',
                                        aspectRatio: '4/3',
                                        borderRadius: 3,
                                        overflow: 'hidden',
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={preview}
                                        alt="Foto enviada"
                                        sx={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                        }}
                                    />
                                </Box>

                                <Chip
                                    icon={
                                        <MaterialSymbol
                                            name="hourglass_empty"
                                            size={16}
                                        />
                                    }
                                    label="En revisión"
                                    sx={{
                                        bgcolor: 'rgba(145,71,88,0.1)',
                                        color: 'secondary.main',
                                    }}
                                />

                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'text.secondary',
                                    }}
                                >
                                    Tu foto ha sido enviada al equipo de la
                                    boda. Cuando sea aprobada, completarás
                                    este reto.
                                </Typography>

                            </Stack>
                        )}

                    </DialogContent>
                )}
            </Dialog>
        </Box>
    );
}