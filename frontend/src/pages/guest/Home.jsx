import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import MaterialSymbol from '../../components/MaterialSymbol';
import { currentUser, galleryPhotos } from '../../data/mockData';

export default function Home() {
  const navigate = useNavigate();

  return (
    <Box sx={{ pb: 4 }}>
      <Stack direction="row" justifyContent="center" alignItems="center" sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h2" sx={{ fontSize: 28 }}>Hola, {currentUser.name} 👋</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>¡Qué alegría verte por aquí!</Typography>
        </Box>
      </Stack>

      <Stack direction="row" justifyContent="center" alignItems="center" sx={{ mb: 4 }}>
          <IconButton
              onClick={() => navigate('/fotos/subir')}
              aria-label="Subir foto"
              sx={{
                  width: 'auto',
                  height: 'auto',
                  minHeight: 190,
                  borderRadius: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  margin: '1%',
                  gap: 1,
                  background: 'linear-gradient(160deg, #c5a059 0%, #775a19 100%)',
                  color: 'white',
                  boxShadow: '0 8px 20px rgba(119,90,25,0.28)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: '0 12px 26px rgba(119,90,25,0.38)',
                      background: 'linear-gradient(160deg, #c5a059 0%, #775a19 100%)',
                  },
              }}
          >
              <MaterialSymbol name="photo_camera" fill size={60} />
              <Typography sx={{ fontFamily: '"Montserrat", sans-serif', fontWeight: 700, fontSize: '1em', letterSpacing: 0.2, mr: 4, ml: 4 }}>
                  Subir foto
              </Typography>
          </IconButton>
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
                <Typography variant="body2" noWrap>Usuario: {p.user}</Typography>
                <Typography variant="body3" noWrap>{p.caption}</Typography>
                  <Divider/>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>Hace {p.time}</Typography>
              </Box>
            </Card>
          ))}
        </Stack>
      </Box>


    </Box>
  );
}
