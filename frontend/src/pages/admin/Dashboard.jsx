import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MaterialSymbol from '../../components/MaterialSymbol';

const stats = [
  { icon: 'photo_library', label: 'Fotos subidas', value: '1,284', delta: '+42 today', color: 'primary.main' },
  { icon: 'group', label: 'Usuarios', value: '112', delta: '/ 150 invited', color: 'tertiary.main' },
];

export default function Dashboard() {
    return (
    <Stack direction="column" justifyContent="center" alignItems="center">
      <Typography variant="h1" sx={{ fontSize: { xs: 28, md: 36 }, marginBottom: 4 }}>Dashboard</Typography>

      <Grid container spacing={2.5} sx={{ mb: 4, justifyContent: 'center', alignItems: 'center' }}>
        {stats.map((s) => (
          <Grid item xs={12} sm={6} lg={3} key={s.label}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 3, boxShadow: '0 4px 24px rgba(181,101,118,0.08)' }}>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                <Typography variant="subtitle1" sx={{ textTransform: 'none', letterSpacing: 0, color: 'text.secondary' }}>{s.label}</Typography>
                <MaterialSymbol name={s.icon} fill sx={{ color: s.color }} />
              </Stack>
              <Stack direction="row" alignItems="baseline" spacing={1} sx={{ mt: 2 }}>
                <Typography variant="h2" sx={{ fontSize: 30 }}>{s.value}</Typography>
                <Typography variant="caption" sx={{ color: s.color, fontWeight: 600 }}>{s.delta}</Typography>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
