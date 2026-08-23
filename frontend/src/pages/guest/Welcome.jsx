import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';

const BG_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAAF-xUcizD4frxayu9e0ePQ3R0-F-DG7lNgie8TVnCbIki7gcFMOZvj6exV0sULXL4SlD17ZF7YbOTCDg1asjX_xEXwr0QIYdL2JWOt63vWRT51ZZiIaCBYXPNAvY-XDaFUHD07vQLp-CkDdExrEAxsqLMPPsXx745f-emortAOMevtYfIw0-Lf-0KgVt6gRbUV2ujBYF23fS5s046UD5ViAl9nS3rpMZ83mW7hK4uffdoQodY6T_v';

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: 'relative',
        height: '100dvh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${BG_IMAGE})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, #fff8f3 10%, rgba(255,248,243,0.6) 45%, transparent 80%)',
        }}
      />

      <Box sx={{ position: 'relative', zIndex: 1, px: 4, pb: 8, textAlign: 'center', maxWidth: 480, mx: 'auto' }}>
        <Chip
          label="24 de Septiembre, 2024"
          sx={{ bgcolor: 'rgba(145,71,88,0.1)', color: 'secondary.main', fontWeight: 600, mb: 3 }}
        />
        <Typography variant="h1" sx={{ color: 'primary.main', mb: 3 }}>
          Ana &amp; Javier
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 5 }}>
          Bienvenidos a nuestra boda. Comparte, juega y guarda los mejores momentos.
        </Typography>
        <Button
          fullWidth
          size="large"
          variant="contained"
          onClick={() => navigate('/identificacion')}
          sx={{ bgcolor: 'primary.light', color: 'primary.dark', py: 2, fontSize: 16, boxShadow: '0 8px 24px rgba(181,101,118,0.2)' }}
        >
          Empezar
        </Button>
      </Box>
    </Box>
  );
}
