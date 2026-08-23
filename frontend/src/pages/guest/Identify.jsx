import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import MaterialSymbol from '../../components/MaterialSymbol';

export default function Identify() {
  const navigate = useNavigate();
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/inicio');
  };

  return (
    <Box
      sx={{
        position: 'relative',
        height: '100dvh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 3,
        background: 'linear-gradient(180deg, #fff8f3 0%, #f5ede4 100%)',
      }}
    >
      <Paper
        component="form"
        onSubmit={handleSubmit}
        elevation={0}
        sx={{ width: '100%', maxWidth: 420, p: 4, borderRadius: 3, boxShadow: '0 4px 24px rgba(181,101,118,0.08)' }}
      >
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <MaterialSymbol name="auto_awesome" size={36} sx={{ color: 'primary.light', mb: 1 }} />
          <Typography variant="h2" sx={{ fontSize: 26 }}>¿Cómo te llamas?</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
            Para personalizar tu experiencia
          </Typography>
        </Box>

        <TextField
          fullWidth
          required
          label="Escribe tu nombre"
          placeholder="Tu nombre aquí..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ mb: 3 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MaterialSymbol name="person" sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            ),
          }}
        />

        <Button
          type="submit"
          fullWidth
          size="large"
          variant="contained"
          endIcon={<MaterialSymbol name="arrow_forward" size={20} />}
          sx={{ bgcolor: 'primary.light', color: 'primary.dark', py: 1.75 }}
        >
          Continuar
        </Button>

        <Typography variant="caption" display="block" textAlign="center" sx={{ color: 'text.secondary', mt: 2 }}>
          Solo usaremos tu nombre para mostrarte información relevante.
        </Typography>
      </Paper>
    </Box>
  );
}
