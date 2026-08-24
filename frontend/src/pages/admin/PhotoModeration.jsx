import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import MaterialSymbol from '../../components/MaterialSymbol';
import { pendingModerationPhotos } from '../../data/mockData';

export default function PhotoModeration() {
  const [photos, setPhotos] = useState(pendingModerationPhotos);
  const [toast, setToast] = useState(null);

  return (
    <Stack direction="column" justifyContent="center" alignItems="center">
      <Typography variant="h1" sx={{ fontSize: { xs: 28, md: 36 }, mb: 4 }}>Fotos</Typography>

      <Stack direction={{ xs: 'column', lg: 'row' }} justifyContent="space-between" alignItems={{ lg: 'center' }} spacing={2} sx={{ mb: 3 }}>
        <TextField
          size="small"
          placeholder="Buscar por usuario..."
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
                  <Typography variant="h3" sx={{ fontSize: 18 }}>{photo.user}</Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>{photo.time} ago</Typography>
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
    </Stack>
  );
}
