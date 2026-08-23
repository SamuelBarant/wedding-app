import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import MaterialSymbol from '../../components/MaterialSymbol';
import { pendingModerationPhotos } from '../../data/mockData';

const TABS = ['Pendientes', 'Aprobadas', 'Rechazadas'];

export default function PhotoModeration() {
  const [tab, setTab] = useState('Pendientes');
  const [photos, setPhotos] = useState(pendingModerationPhotos);
  const [toast, setToast] = useState(null);

  const resolve = (id, action) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
    setToast(action === 'approve' ? 'Foto aprobada y reto completado ✓' : 'Foto rechazada');
  };

  return (
    <Box>
      <Typography variant="h1" sx={{ fontSize: { xs: 28, md: 36 }, mb: 1.5 }}>Photo Moderation</Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 640, mb: 4 }}>
        Review and manage photos uploaded by guests. Approve content for the main gallery or reject inappropriate images.
      </Typography>

      <Stack direction={{ xs: 'column', lg: 'row' }} justifyContent="space-between" alignItems={{ lg: 'center' }} spacing={2} sx={{ mb: 3 }}>
        <Stack direction="row" spacing={1} sx={{ overflowX: 'auto' }}>
          {TABS.map((t) => (
            <Chip
              key={t}
              label={t}
              onClick={() => setTab(t)}
              sx={{
                px: 1,
                fontWeight: 600,
                bgcolor: tab === t ? 'primary.main' : 'transparent',
                color: tab === t ? 'white' : 'text.secondary',
                border: tab === t ? 'none' : '1px solid',
                borderColor: 'divider',
              }}
            />
          ))}
        </Stack>
        <TextField
          size="small"
          placeholder="Search guests..."
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
              <Box sx={{ position: 'relative', height: 240, backgroundImage: `url(${photo.url})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <Chip label="Pendiente" size="small" sx={{ position: 'absolute', top: 12, left: 12, bgcolor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(6px)' }} />
              </Box>
              <Box sx={{ p: 3 }}>
                <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                  <Typography variant="h3" sx={{ fontSize: 18 }}>{photo.user}</Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>{photo.time} ago</Typography>
                </Stack>
                <Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 0.5 }}>Bingo Challenge</Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>&quot;{photo.challenge}&quot;</Typography>
                <Stack direction="row" spacing={1.5} sx={{ pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
                  <Button fullWidth variant="outlined" color="error" startIcon={<MaterialSymbol name="close" size={16} />} onClick={() => resolve(photo.id, 'reject')}>
                    Rechazar
                  </Button>
                  <Button fullWidth variant="contained" startIcon={<MaterialSymbol name="check" size={16} />} onClick={() => resolve(photo.id, 'approve')}>
                    Aprobar
                  </Button>
                </Stack>
              </Box>
            </Paper>
          </Grid>
        ))}

        {photos.length === 0 && (
          <Grid item xs={12}>
            <Stack alignItems="center" spacing={2} sx={{ py: 8 }}>
              <MaterialSymbol name="check_circle" size={48} sx={{ color: 'text.disabled' }} />
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>¡Todo revisado! No hay más fotos pendientes.</Typography>
            </Stack>
          </Grid>
        )}
      </Grid>

      <Snackbar open={Boolean(toast)} autoHideDuration={2500} onClose={() => setToast(null)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity="success" onClose={() => setToast(null)}>{toast}</Alert>
      </Snackbar>
    </Box>
  );
}
