import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Fab from '@mui/material/Fab';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import MaterialSymbol from '../../components/MaterialSymbol';
import { galleryPhotos } from '../../data/mockData';

const FILTERS = ['Todas las Fotos', 'Recientes', 'Ceremonia', 'Fiesta'];

export default function Gallery() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState(FILTERS[0]);
  const [selected, setSelected] = useState(null);

  return (
    <Box>
      <Stack direction="row" spacing={1.5} sx={{ overflowX: 'auto', pb: 2, mb: 1 }}>
        {FILTERS.map((f) => (
          <Chip
            key={f}
            label={f}
            onClick={() => setFilter(f)}
            sx={{
              px: 1,
              fontWeight: 600,
              flexShrink: 0,
              bgcolor: filter === f ? 'secondary.main' : 'rgba(145,71,88,0.08)',
              color: filter === f ? 'white' : 'secondary.main',
              boxShadow: filter === f ? '0 4px 12px rgba(181,101,118,0.2)' : 'none',
            }}
          />
        ))}
      </Stack>

      <Box sx={{ columnCount: { xs: 2, md: 3 }, columnGap: 2 }}>
        {galleryPhotos.map((photo) => (
          <Box
            key={photo.id}
            onClick={() => setSelected(photo)}
            sx={{ breakInside: 'avoid', mb: 2, borderRadius: 3, overflow: 'hidden', bgcolor: 'white', boxShadow: '0 4px 12px rgba(181,101,118,0.08)', cursor: 'pointer' }}
          >
            <Box
              sx={{
                width: '100%',
                height: photo.height,
                backgroundImage: `url(${photo.url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 1.5 }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Avatar sx={{ width: 22, height: 22, fontSize: 11 }}>{photo.user[0]}</Avatar>
                <Typography variant="body2" sx={{ fontWeight: 600, fontSize: 13 }}>{photo.user}</Typography>
              </Stack>
              <Typography variant="caption" sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center', gap: 0.3 }}>
                <MaterialSymbol name="schedule" size={13} /> {photo.time}
              </Typography>
            </Stack>
          </Box>
        ))}

        {/* Skeleton de carga, como en el diseño original */}
        <Box sx={{ breakInside: 'avoid', mb: 2, borderRadius: 3, overflow: 'hidden', bgcolor: 'white', boxShadow: '0 4px 12px rgba(181,101,118,0.08)' }}>
          <Skeleton variant="rectangular" height={190} />
          <Box sx={{ p: 1.5 }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Skeleton variant="circular" width={22} height={22} />
              <Skeleton variant="text" width={60} />
            </Stack>
          </Box>
        </Box>
      </Box>

      <Fab
        color="primary"
        onClick={() => navigate('/fotos/subir')}
        sx={{ position: 'fixed', right: 24, bottom: 96, bgcolor: 'primary.light', color: 'primary.dark' }}
      >
        <MaterialSymbol name="photo_camera" fill size={26} />
      </Fab>

      <Dialog open={Boolean(selected)} onClose={() => setSelected(null)} maxWidth="sm" fullWidth>
        {selected && (
          <Box sx={{ position: 'relative', bgcolor: 'black' }}>
            <IconButton onClick={() => setSelected(null)} sx={{ position: 'absolute', top: 8, right: 8, color: 'white', bgcolor: 'rgba(0,0,0,0.4)' }}>
              <MaterialSymbol name="close" />
            </IconButton>
            <Box component="img" src={selected.url} alt={selected.user} sx={{ width: '100%', maxHeight: '70vh', objectFit: 'contain', display: 'block' }} />
            <Box sx={{ p: 2, bgcolor: 'background.paper' }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{selected.user}</Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>Hace {selected.time}</Typography>
            </Box>
          </Box>
        )}
      </Dialog>
    </Box>
  );
}
