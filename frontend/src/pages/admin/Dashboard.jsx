import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import MaterialSymbol from '../../components/MaterialSymbol';
import { getDashboard } from '../../data/api/admin.js';

export default function Dashboard() {
    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);

        getDashboard()
            .then(setDashboard)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    const stats = [
        {
            icon: 'photo_library',
            label: 'Fotos subidas',
            value: dashboard?.totalPhotos,
            color: 'primary.main',
        },
        {
            icon: 'group',
            label: 'Usuarios registrados',
            value: dashboard?.totalUsers,
            color: 'tertiary.main',
        },
    ];

    return (
        <Stack direction="column" justifyContent="center" alignItems="center">
            <Typography variant="h1" sx={{ fontSize: { xs: 28, md: 36 }, marginBottom: 4 }}>Dashboard</Typography>

            <Grid container spacing={2.5} sx={{ mb: 4, justifyContent: 'center', alignItems: 'center' }}>
                {stats.map((s) => (
                    <Grid item xs={12} sm={6} lg={3} key={s.label}>
                        <Paper elevation={0} sx={{ p: 3, borderRadius: 3, boxShadow: '0 4px 24px rgba(181,101,118,0.08)' }}>
                            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                                <Typography variant="subtitle1" sx={{ textTransform: 'none', letterSpacing: 0, color: 'text.secondary' }}>
                                    {s.label}
                                </Typography>
                                <MaterialSymbol name={s.icon} fill sx={{ color: s.color }} />
                            </Stack>
                            <Stack direction="row" alignItems="baseline" spacing={1} sx={{ mt: 2 }}>
                                {loading ? (
                                    <Skeleton variant="text" width={60} height={40} />
                                ) : (
                                    <Typography variant="h2" sx={{ fontSize: 30 }}>{s.value ?? '—'}</Typography>
                                )}
                            </Stack>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            <Snackbar open={Boolean(error)} autoHideDuration={4000} onClose={() => setError(null)}>
                <Alert severity="error" sx={{ bgcolor: 'white' }}>
                    {error}
                </Alert>
            </Snackbar>
        </Stack>
    );
}
