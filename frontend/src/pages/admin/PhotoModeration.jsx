import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Skeleton from '@mui/material/Skeleton';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import MaterialSymbol from '../../components/MaterialSymbol';
import { getAllPhotos } from '../../data/api/photo.js';

function timeAgo(dateString) {
    const diffMs = Date.now() - new Date(dateString).getTime();
    const mins = Math.floor(diffMs / 60000);
    if (mins < 60) return `${mins} min`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours} h`;
    return `${Math.floor(hours / 24)} d`;
}

export default function PhotoModeration() {
    const [photos, setPhotos] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Debounce del buscador: espera a que el usuario deje de escribir
    // antes de disparar la petición, y vuelve a la página 0.
    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedSearch(search.trim());
            setPage(0);
        }, 400);

        return () => clearTimeout(timeout);
    }, [search]);

    useEffect(() => {
        setLoading(true);
        setError(null);

        getAllPhotos(page, 24, false, debouncedSearch || undefined)
            .then((data) => {
                setPhotos(data.content);
                setTotalPages(data.totalPages);
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [page, debouncedSearch]);

    return (
        <Stack direction="column" justifyContent="center" alignItems="center">
            <Typography variant="h1" sx={{ fontSize: { xs: 28, md: 36 }, mb: 4 }}>Fotos</Typography>

            <Stack direction={{ xs: 'column', lg: 'row' }} justifyContent="space-between" alignItems={{ lg: 'center' }} spacing={2} sx={{ mb: 3, width: '100%' }}>
                <TextField
                    size="small"
                    placeholder="Buscar por usuario..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    sx={{ width: { xs: '100%', lg: 280 } }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <MaterialSymbol name="search" size={20} />
                            </InputAdornment>
                        ),
                    }}
                />
            </Stack>

            <Grid container spacing={3}>
                {photos.map((photo) => (
                    <Grid item xs={12} sm={6} lg={4} key={photo.id}>
                        <Paper elevation={0} sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: '0 4px 12px rgba(181,101,118,0.08)' }}>
                            <Box sx={{ position: 'relative', height: 240, backgroundImage: `url(${photo.url})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                            <Box sx={{ p: 3 }}>
                                <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                                    <Typography variant="h3" sx={{ fontSize: 18 }}>{photo.userName}</Typography>
                                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>Hace {timeAgo(photo.createdAt)}</Typography>
                                </Stack>
                                {photo.caption && (
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>{photo.caption}</Typography>
                                )}
                            </Box>
                        </Paper>
                    </Grid>
                ))}

                {loading && photos.length === 0 && Array.from({ length: 6 }).map((_, i) => (
                    <Grid item xs={12} sm={6} lg={4} key={`skeleton-${i}`}>
                        <Paper elevation={0} sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: '0 4px 12px rgba(181,101,118,0.08)' }}>
                            <Skeleton variant="rectangular" height={240} />
                            <Box sx={{ p: 3 }}>
                                <Skeleton variant="text" width="60%" />
                            </Box>
                        </Paper>
                    </Grid>
                ))}

                {!loading && photos.length === 0 && (
                    <Grid item xs={12}>
                        <Stack alignItems="center" spacing={2} sx={{ py: 8 }}>
                            <MaterialSymbol name="photo_camera" size={48} sx={{ color: 'text.disabled' }} />
                            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                                {debouncedSearch ? `No hay fotos de "${debouncedSearch}"` : 'Todavía no hay fotos'}
                            </Typography>
                        </Stack>
                    </Grid>
                )}
            </Grid>

            {!loading && photos.length > 0 && totalPages > 1 && (
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} sx={{ my: 4 }}>
                    <IconButton onClick={() => setPage((p) => Math.max(p - 1, 0))} disabled={page === 0}>
                        <MaterialSymbol name="chevron_left" />
                    </IconButton>
                    <Typography variant="body2">Página {page + 1} de {totalPages}</Typography>
                    <IconButton onClick={() => setPage((p) => p + 1)} disabled={page + 1 >= totalPages}>
                        <MaterialSymbol name="chevron_right" />
                    </IconButton>
                </Stack>
            )}

            <Snackbar open={Boolean(error)} autoHideDuration={4000} onClose={() => setError(null)}>
                <Alert severity="error" sx={{ bgcolor: 'white' }}>
                    {error}
                </Alert>
            </Snackbar>
        </Stack>
    );
}
