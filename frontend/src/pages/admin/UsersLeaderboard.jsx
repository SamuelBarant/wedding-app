import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Skeleton from '@mui/material/Skeleton';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import MaterialSymbol from '../../components/MaterialSymbol';
import { getAdminUsers } from '../../data/api/admin.js';

export default function UsersLeaderboard() {
    const [users, setUsers] = useState([]);
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

        getAdminUsers({ search: debouncedSearch || undefined, page, size: 20 })
            .then((data) => {
                setUsers(data.content);
                setTotalPages(data.totalPages);
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [page, debouncedSearch]);

    return (
        <Box>
            <Stack alignItems="center" spacing={2} sx={{ mb: 4 }}>
                <Typography variant="h1" sx={{ fontSize: { xs: 28, md: 36 } }}>Usuarios</Typography>
            </Stack>

            <Paper elevation={0} sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: '0 4px 12px rgba(181,101,118,0.08)' }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
                    <Typography variant="h3" sx={{ fontSize: 20 }}>Todos los usuarios</Typography>
                    <TextField
                        size="small"
                        placeholder="Buscar por usuario..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        InputProps={{ startAdornment: <InputAdornment position="start"><MaterialSymbol name="search" size={18} /></InputAdornment> }}
                    />
                </Stack>
                <Box sx={{ overflowX: 'auto' }}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ bgcolor: 'background.default' }}>
                                <TableCell>Usuario</TableCell>
                                <TableCell align="center">Puntos</TableCell>
                                <TableCell align="center">Fotos</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((u) => (
                                <TableRow key={u.id} hover>
                                    <TableCell>
                                        <Stack direction="row" spacing={1.5} alignItems="center">
                                            <Avatar src={u.profilePhoto || undefined} sx={{ width: 36, height: 36 }}>{u.name[0]}</Avatar>
                                            <Box>
                                                <Typography variant="body2" sx={{ fontWeight: 600 }}>{u.name}</Typography>
                                                {u.role === 'ADMIN' && (
                                                    <Typography variant="caption" sx={{ color: 'primary.main' }}>Admin</Typography>
                                                )}
                                            </Box>
                                        </Stack>
                                    </TableCell>
                                    <TableCell align="center">{u.points}</TableCell>
                                    <TableCell align="center">{u.photoCount}</TableCell>
                                </TableRow>
                            ))}

                            {loading && users.length === 0 && Array.from({ length: 5 }).map((_, i) => (
                                <TableRow key={`skeleton-${i}`}>
                                    <TableCell>
                                        <Stack direction="row" spacing={1.5} alignItems="center">
                                            <Skeleton variant="circular" width={36} height={36} />
                                            <Skeleton variant="text" width={120} />
                                        </Stack>
                                    </TableCell>
                                    <TableCell align="center"><Skeleton variant="text" sx={{ mx: 'auto' }} width={30} /></TableCell>
                                    <TableCell align="center"><Skeleton variant="text" sx={{ mx: 'auto' }} width={30} /></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {!loading && users.length === 0 && (
                        <Stack alignItems="center" spacing={2} sx={{ py: 8 }}>
                            <MaterialSymbol name="group_off" size={48} sx={{ color: 'text.disabled' }} />
                            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                                {debouncedSearch ? `No hay usuarios llamados "${debouncedSearch}"` : 'Todavía no hay usuarios'}
                            </Typography>
                        </Stack>
                    )}
                </Box>
            </Paper>

            {!loading && users.length > 0 && totalPages > 1 && (
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
        </Box>
    );
}
