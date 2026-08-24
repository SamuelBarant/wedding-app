import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import MaterialSymbol from '../../components/MaterialSymbol';
import { galleryPhotos } from '../../data/mockData';

export default function Gallery() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  return (
    <Box>
      <Typography variant="h1" sx={{ fontSize: { xs: 28, md: 36 }, m: 4, textAlign: 'center'  }}>Galeria</Typography>

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

      <Dialog open={Boolean(selected)} onClose={() => setSelected(null)} maxWidth="sm" fullWidth>
        {selected && (
          <Box sx={{ position: 'relative', bgcolor: 'black' }}>
            <IconButton onClick={() => setSelected(null)} sx={{ position: 'absolute', top: 8, right: 8, color: 'white', bgcolor: 'rgba(0,0,0,0.4)' }}>
              <MaterialSymbol name="close" />
            </IconButton>
            <Box component="img" src={selected.url} alt={selected.user} sx={{ width: '100%', maxHeight: '70vh', objectFit: 'contain', display: 'block' }} />
            <Box sx={{ p: 2, bgcolor: 'background.paper' }}>
                <Typography variant="body2" noWrap>Usuario: {selected.user}</Typography>
                <Typography variant="body3" noWrap>{selected.caption}</Typography>
                <Divider/>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>Hace {selected.time}</Typography>
            </Box>
          </Box>
        )}
      </Dialog>
    </Box>
  );
}
