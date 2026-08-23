import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';
import Fab from '@mui/material/Fab';
import Stack from '@mui/material/Stack';
import MaterialSymbol from '../../components/MaterialSymbol';
import { currentUser, galleryPhotos } from '../../data/mockData';

const pendingChallenges = [
  { icon: 'group_add', label: 'Foto con los novios', points: 20 },
  { icon: 'local_bar', label: 'Brindis divertido', points: 15 },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <Box sx={{ pb: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h2" sx={{ fontSize: 28 }}>Hola, {currentUser.name} 👋</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>¡Qué alegría verte por aquí!</Typography>
        </Box>
        <Chip label={`Puesto #${currentUser.rank} 🥈`} sx={{ bgcolor: 'rgba(145,71,88,0.1)', color: 'secondary.main', fontWeight: 600 }} />
      </Stack>

      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 4 }}>
        <Card sx={{ p: 3, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 190 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
            <Box>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>Tu Puntuación</Typography>
              <Typography variant="h1" sx={{ fontSize: 40, color: 'primary.main', mt: 1 }}>
                {currentUser.points} <Typography component="span" variant="h3" sx={{ color: 'primary.light' }}>pts</Typography>
              </Typography>
            </Box>
            <Box sx={{ width: 48, height: 48, borderRadius: '50%', bgcolor: 'rgba(197,160,89,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MaterialSymbol name="star" fill size={26} sx={{ color: 'primary.main' }} />
            </Box>
          </Stack>
          <Box sx={{ mt: 3 }}>
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>Nivel Actual: {currentUser.role}</Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>15 pts para el próximo</Typography>
            </Stack>
            <LinearProgress variant="determinate" value={85} sx={{ height: 10, borderRadius: 5, bgcolor: 'surface.variant' }} />
          </Box>
        </Card>
      </Stack>

      <Box sx={{ mt: 5 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="h3" sx={{ fontSize: 20, display: 'flex', alignItems: 'center', gap: 1 }}>
            <MaterialSymbol name="photo_library" sx={{ color: 'primary.main' }} /> Últimas fotos
          </Typography>
          <Typography variant="body2" sx={{ color: 'primary.main', cursor: 'pointer' }} onClick={() => navigate('/fotos')}>Ver todas</Typography>
        </Stack>
        <Stack direction="row" spacing={2} sx={{ overflowX: 'auto', pb: 1 }}>
          {galleryPhotos.map((p) => (
            <Card key={p.id} sx={{ minWidth: 220, flexShrink: 0 }}>
              <Box sx={{ height: 150, backgroundImage: `url(${p.url})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
              <Box sx={{ p: 1.5 }}>
                <Typography variant="body2" noWrap>{p.user}</Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>Hace {p.time}</Typography>
              </Box>
            </Card>
          ))}
        </Stack>
      </Box>

      <Fab
        color="primary"
        onClick={() => navigate('/fotos/subir')}
        sx={{ position: 'fixed', right: 24, bottom: 96, bgcolor: 'primary.main', borderRadius: 3 }}
      >
        <MaterialSymbol name="photo_camera" fill size={26} />
      </Fab>
    </Box>
  );
}
