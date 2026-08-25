import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import MaterialSymbol from '../../components/MaterialSymbol';
import { getAllPhotos, getUserPhotos } from '../../data/api/photo.js';

const USER_ID_KEY = 'wedding_user_id';

function timeAgo(dateString) {
    const diffMs = Date.now() - new Date(dateString).getTime();
    const mins = Math.floor(diffMs / 60000);
    if (mins < 60) return `${mins} min`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours} h`;
    return `${Math.floor(hours / 24)} d`;
}

export default function Gallery() {
    const [selected, setSelected] = useState(null);
    const [photos, setPhotos] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [filter, setFilter] = useState('all'); // 'all' | 'mine'
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const userId = localStorage.getItem(USER_ID_KEY);

    // Al cambiar de filtro, siempre volvemos a la primera página
    const handleFilterChange = (event, newFilter) => {
        if (newFilter === null) return; // evita deseleccionar ambos botones
        setFilter(newFilter);
        setPage(0);
    };

    useEffect(() => {
        setLoading(true);
        setError(null);

        if (filter === 'mine') {
            if (!userId) {
                setPhotos([]);
                setError('No se ha podido identificar al usuario');
                setLoading(false);
                return;
            }

            // getUserPhotos no está paginado: devuelve el array completo
            getUserPhotos(userId)
                .then((data) => setPhotos(data))
                .catch((err) => setError(err.message))
                .finally(() => setLoading(false));

            return;
        }

        getAllPhotos(page, 20)
            .then((data) => {
                setPhotos(data.content);
                setTotalPages(data.totalPages);
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [page, filter, userId]);

    return (
        <Box>
            <Typography variant="h1" sx={{ fontSize: { xs: 28, md: 36 }, mt: 4, mb: 2, textAlign: 'center' }}>
                Galeria
            </Typography>

            <Stack direction="row" justifyContent="center" sx={{ mb: 3 }}>
                <ToggleButtonGroup
                    value={filter}
                    exclusive
                    onChange={handleFilterChange}
                    size="small"
                    sx={{
                        bgcolor: 'background.paper',
                        borderRadius: 999,
                        p: 0.5,
                        '& .MuiToggleButton-root': {
                            border: 'none',
                            borderRadius: 999,
                            px: 3,
                            textTransform: 'none',
                        },
                    }}
                >
                    <ToggleButton value="all">Todas</ToggleButton>
                    <ToggleButton value="mine">Mis fotos</ToggleButton>
                </ToggleButtonGroup>
            </Stack>

            {error && (
                <Typography variant="body2" sx={{ color: 'error.main', textAlign: 'center', mb: 2 }}>
                    {error}
                </Typography>
            )}

            {!loading && !error && photos.length === 0 && (
                <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center', mt: 4 }}>
                    {filter === 'mine' ? 'Aún no has subido ninguna foto' : 'Todavía no hay fotos'}
                </Typography>
            )}

            <Box sx={{ columnCount: { xs: 2, md: 3 }, columnGap: 2 }}>
                {photos.map((photo) => (
                    <Box
                        key={photo.id}
                        onClick={() => setSelected(photo)}
                        sx={{
                            breakInside: 'avoid',
                            mb: 2,
                            borderRadius: 3,
                            overflow: 'hidden',
                            bgcolor: 'white',
                            boxShadow: '0 4px 12px rgba(181,101,118,0.08)',
                            cursor: 'pointer',
                        }}
                    >
                        <Box
                            sx={{
                                width: '100%',
                                aspectRatio: '1 / 1', // el backend no manda altura, no hay masonry real
                                backgroundImage: `url(${photo.url})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        />
                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 1.5 }}>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <Avatar sx={{ width: 22, height: 22, fontSize: 11 }}>
                                    {photo.userName?.[0]}
                                </Avatar>
                                <Typography variant="body2" sx={{ fontWeight: 600, fontSize: 13 }}>
                                    {photo.userName}
                                </Typography>
                            </Stack>
                            <Typography
                                variant="caption"
                                sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center', gap: 0.3 }}
                            >
                                <MaterialSymbol name="schedule" size={13} /> {timeAgo(photo.createdAt)}
                            </Typography>
                        </Stack>
                    </Box>
                ))}

                {loading && (
                    <Box sx={{ breakInside: 'avoid', mb: 2, borderRadius: 3, overflow: 'hidden', bgcolor: 'white', boxShadow: '0 4px 12px rgba(181,101,118,0.08)' }}>
                        <Skeleton variant="rectangular" height={190} />
                        <Box sx={{ p: 1.5 }}>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <Skeleton variant="circular" width={22} height={22} />
                                <Skeleton variant="text" width={60} />
                            </Stack>
                        </Box>
                    </Box>
                )}
            </Box>

            {filter === 'all' && !loading && photos.length > 20 && (
                <Stack direction="row" justifyContent="center" spacing={2} sx={{ my: 3 }}>
                    <IconButton
                        onClick={() => setPage((p) => Math.max(p - 1, 0))}
                        disabled={page === 0}
                    >
                        <MaterialSymbol name="chevron_left" />
                    </IconButton>
                    <Typography variant="body2" sx={{ alignSelf: 'center' }}>
                        Página {page + 1}
                    </Typography>
                    <IconButton onClick={() => setPage((p) => p + 1)}>
                        <MaterialSymbol name="chevron_right" />
                    </IconButton>
                </Stack>
            )}

            <Dialog open={Boolean(selected)} onClose={() => setSelected(null)} maxWidth="sm" fullWidth>
                {selected && (
                    <Box sx={{ position: 'relative', bgcolor: 'black' }}>
                        <IconButton
                            onClick={() => setSelected(null)}
                            sx={{ position: 'absolute', top: 8, right: 8, color: 'white', bgcolor: 'rgba(0,0,0,0.4)' }}
                        >
                            <MaterialSymbol name="close" />
                        </IconButton>
                        <Box
                            component="img"
                            src={selected.url}
                            alt={selected.userName}
                            sx={{ width: '100%', maxHeight: '70vh', objectFit: 'contain', display: 'block' }}
                        />
                        <Box sx={{ p: 2, bgcolor: 'background.paper' }}>
                            <Typography variant="body2" noWrap>Usuario: {selected.userName}</Typography>
                            <Typography variant="body3" noWrap>{selected.caption}</Typography>
                            <Divider />
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                Hace {timeAgo(selected.createdAt)}
                            </Typography>
                        </Box>
                    </Box>
                )}
            </Dialog>
        </Box>
    );
}