import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Fab from '@mui/material/Fab';
import MaterialSymbol from '../../components/MaterialSymbol';
import { bingoConfigChallenges } from '../../data/mockData';

export default function BingoConfig() {
  return (
    <Box>
      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ md: 'flex-end' }} spacing={2} sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h1" sx={{ fontSize: { xs: 28, md: 36 } }}>Bingo Management</Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mt: 1 }}>
            Manage your 25 wedding bingo challenges and monitor guest progress.
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<MaterialSymbol name="add" size={18} />} sx={{ display: { xs: 'none', md: 'inline-flex' } }}>
          Añadir nuevo reto
        </Button>
      </Stack>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} lg={8}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 3, boxShadow: '0 4px 12px rgba(181,101,118,0.08)' }}>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3 }}>
              <MaterialSymbol name="local_fire_department" sx={{ color: 'secondary.main' }} />
              <Typography variant="h3" sx={{ fontSize: 20 }}>Global Progress &amp; Popularity</Typography>
            </Stack>
            <Stack spacing={2.5}>
              {bingoConfigChallenges.map((c) => (
                <Box key={c.id}>
                  <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
                    <Typography variant="body2">{c.label}</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: 'primary.main' }}>{c.completion}%</Typography>
                  </Stack>
                  <LinearProgress variant="determinate" value={c.completion} sx={{ height: 8, borderRadius: 4 }} />
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 3, boxShadow: '0 4px 12px rgba(181,101,118,0.08)', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <MaterialSymbol name="stars" size={36} sx={{ color: 'primary.main', mb: 1 }} />
            <Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 1 }}>Total Completions</Typography>
            <Typography variant="h1" sx={{ fontSize: 42 }}>342</Typography>
            <Typography variant="caption" sx={{ color: 'secondary.main', mt: 1 }}>+12% since last hour</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Paper elevation={0} sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: '0 4px 12px rgba(181,101,118,0.08)' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Typography variant="h3" sx={{ fontSize: 20 }}>Challenges Registry</Typography>
          <TextField
            size="small"
            placeholder="Search challenges..."
            InputProps={{ startAdornment: <InputAdornment position="start"><MaterialSymbol name="search" size={18} /></InputAdornment> }}
          />
        </Stack>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: 'background.default' }}>
              <TableCell align="center">Icon</TableCell>
              <TableCell>Challenge Name</TableCell>
              <TableCell align="right">Points</TableCell>
              <TableCell sx={{ width: 220 }}>Completion</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bingoConfigChallenges.map((c) => (
              <TableRow key={c.id} hover>
                <TableCell align="center"><MaterialSymbol name={c.icon} sx={{ color: 'primary.main' }} /></TableCell>
                <TableCell>{c.label}</TableCell>
                <TableCell align="right" sx={{ color: 'primary.main', fontWeight: 700 }}>{c.points} pts</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <LinearProgress variant="determinate" value={c.completion} sx={{ flex: 1, height: 6, borderRadius: 3 }} />
                    <Typography variant="caption" sx={{ fontWeight: 700 }}>{c.completion}%</Typography>
                  </Stack>
                </TableCell>
                <TableCell align="right">
                  <IconButton size="small"><MaterialSymbol name="edit" size={18} /></IconButton>
                  <IconButton size="small"><MaterialSymbol name="delete" size={18} /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Fab color="primary" sx={{ display: { xs: 'flex', md: 'none' }, position: 'fixed', right: 24, bottom: 96 }}>
        <MaterialSymbol name="add" size={24} />
      </Fab>
    </Box>
  );
}
