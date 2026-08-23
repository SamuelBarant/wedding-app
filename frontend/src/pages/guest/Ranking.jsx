import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import MaterialSymbol from '../../components/MaterialSymbol';
import { leaderboard } from '../../data/mockData';

const podium = leaderboard.slice(0, 3);
const rest = leaderboard.slice(3);

function PodiumSpot({ entry, size, medal }) {
  return (
    <Stack alignItems="center" sx={{ flex: 1 }}>
      {medal === 1 && <MaterialSymbol name="crown" fill size={30} sx={{ color: 'primary.light', mb: -1 }} />}
      <Avatar sx={{ width: size, height: size, bgcolor: medal === 1 ? 'primary.light' : medal === 2 ? '#d1c5b4' : 'secondary.light', border: '3px solid white', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', fontSize: size / 2.5, mb: 1.5 }}>
        {entry.name[0]}
      </Avatar>
      <Typography variant={medal === 1 ? 'h3' : 'subtitle1'} sx={{ fontSize: medal === 1 ? 18 : 14, textTransform: 'none', letterSpacing: 0, color: medal === 1 ? 'primary.main' : 'text.primary' }}>
        {entry.name}
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 700, color: medal === 1 ? 'primary.main' : 'text.secondary', mt: 0.3 }}>
        {entry.points} pts
      </Typography>
    </Stack>
  );
}

export default function Ranking() {
  return (
    <Box>
      <Stack alignItems="center" textAlign="center" spacing={1} sx={{ mb: 4 }}>
        <Typography variant="h1" sx={{ fontSize: 34, color: 'primary.main' }}>Bingo Ranking</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 380 }}>
          ¡La competencia está que arde! Descubre quién se lleva la corona en el Bingo Nupcial.
        </Typography>
      </Stack>

      <Stack direction="row" alignItems="flex-end" justifyContent="center" spacing={2} sx={{ mb: 5 }}>
        <Box sx={{ mt: 4 }}><PodiumSpot entry={podium[1]} size={72} medal={2} /></Box>
        <PodiumSpot entry={podium[0]} size={96} medal={1} />
        <Box sx={{ mt: 6 }}><PodiumSpot entry={podium[2]} size={64} medal={3} /></Box>
      </Stack>

      <Typography variant="subtitle1" sx={{ textTransform: 'uppercase', color: 'text.secondary', mb: 1, ml: 1, fontSize: 12 }}>
        Resto de invitados
      </Typography>
      <Paper elevation={0} sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: '0 4px 12px rgba(181,101,118,0.08)' }}>
        {rest.map((entry, i) => (
          <Box
            key={entry.rank}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              p: 2,
              borderBottom: i < rest.length - 1 ? '1px solid' : 'none',
              borderColor: 'divider',
              bgcolor: entry.isCurrentUser ? 'rgba(197,160,89,0.06)' : 'transparent',
              borderLeft: entry.isCurrentUser ? '4px solid' : 'none',
              borderLeftColor: 'primary.light',
            }}
          >
            <Typography variant="h3" sx={{ fontSize: 20, width: 24, textAlign: 'center', color: entry.isCurrentUser ? 'primary.main' : 'text.disabled' }}>
              {entry.rank}
            </Typography>
            <Avatar sx={{ width: 40, height: 40, bgcolor: entry.isCurrentUser ? 'primary.light' : 'grey.300' }}>{entry.name[0]}</Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontWeight: entry.isCurrentUser ? 700 : 500 }}>{entry.name}</Typography>
              {entry.isCurrentUser && <Typography variant="caption" sx={{ color: 'primary.main' }}>Tu posición actual</Typography>}
            </Box>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: 13,
                px: 1.5,
                py: 0.5,
                borderRadius: 4,
                bgcolor: entry.isCurrentUser ? 'rgba(197,160,89,0.2)' : 'rgba(145,71,88,0.08)',
                color: entry.isCurrentUser ? 'primary.dark' : 'secondary.main',
              }}
            >
              {entry.points} pts
            </Typography>
          </Box>
        ))}
      </Paper>
    </Box>
  );
}
