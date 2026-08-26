import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import MaterialSymbol from '../../components/MaterialSymbol';
import { getUser } from '../../data/api/users.js';
import { getUserPhotos } from "../../data/api/photo.js";
import { useEffect, useState } from "react";

const USER_ID_KEY = 'wedding_user_id';

function timeAgo(dateString) {
    const diffMs = Date.now() - new Date(dateString).getTime();
    const mins = Math.floor(diffMs / 60000);
    if (mins < 60) return `${mins} min`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours} h`;
    return `${Math.floor(hours / 24)} d`;
}

export default function Home() {
  const userId = localStorage.getItem(USER_ID_KEY);
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [photosUser, setPhotosUser] = useState(true);

  const [error, setError] = useState(null);

  // Carga los datos del usuario y su número de fotos
  useEffect(() => {
      if (!userId) {
          setLoadingUser(false);
          return;
      }

      setLoadingUser(true);

      Promise.all([
          getUser(userId),
          getUserPhotos(userId),
      ])
          .then(([userData, photos]) => {
              setUser(userData);
              setPhotosUser(photos);
          })
          .catch((err) => setError(err.message))
          .finally(() => setLoadingUser(false));
  }, [userId]);

  if (loadingUser) {
      return (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
              <CircularProgress />
          </Box>
      );
  }

  return (
    <Box sx={{ pb: 4 }}>
      <Stack direction="row" justifyContent="center" alignItems="center" sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h2" sx={{ fontSize: 28 }}>Hola, {user.name} 👋</Typography>
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
            <MaterialSymbol name="photo_library" sx={{ color: 'primary.main' }} /> Fotos propias
          </Typography>
          <Typography variant="body2" sx={{ color: 'primary.main', cursor: 'pointer' }} onClick={() => navigate('/fotos')}>Ver todas</Typography>
        </Stack>
        <Stack direction="row" spacing={2} sx={{ overflowX: 'auto', pb: 1 }}>
          {!photosUser.length > 0 && (
              <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center', mt: 4 }}>
                  Aún no has subido ninguna foto
              </Typography>
          )}
          {photosUser.map((p) => (
            <Card key={p.id} sx={{ minWidth: 220, flexShrink: 0 }}>
              <Box sx={{ height: 150, backgroundImage: `url(${p.url})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
              <Box sx={{ p: 1.5 }}>
                <Typography variant="body2" noWrap>Usuario: {p.userName}</Typography>
                <Typography variant="body3" noWrap>{p.caption}</Typography>
                  <Divider/>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>Hace {timeAgo(p.createdAt)}</Typography>
              </Box>
            </Card>
          ))}
        </Stack>
      </Box>

      <Snackbar open={Boolean(error)} autoHideDuration={4000} onClose={() => setError(null)}>
          <Alert severity="error" sx={{ bgcolor: 'white' }}>
              {error}
          </Alert>
      </Snackbar>
    </Box>
  );
}
