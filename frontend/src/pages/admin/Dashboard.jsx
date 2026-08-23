import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MaterialSymbol from '../../components/MaterialSymbol';

const stats = [
  { icon: 'photo_library', label: 'Total Photos', value: '1,284', delta: '+42 today', color: 'primary.main' },
  { icon: 'gpp_maybe', label: 'Pending Review', value: '15', delta: 'Action needed', color: 'secondary.main' },
  { icon: 'group', label: 'Active Users', value: '112', delta: '/ 150 invited', color: 'tertiary.main' },
  { icon: 'grid_on', label: 'Bingo Lines', value: '48', delta: '+3 recently', color: 'primary.main' },
];

const quickMod = [
  { user: 'Sarah M.', time: '2m ago' },
  { user: 'David L.', time: '15m ago' },
  { user: 'Emma P.', time: '1h ago' },
];

const activity = [
  { icon: 'grid_view', text: 'Michael T. completed a Bingo Line!', time: 'Just now' },
  { icon: 'favorite', text: 'Jessica W. liked 3 photos.', time: '5 mins ago' },
  { icon: 'how_to_reg', text: 'The Smiths submitted their RSVP.', time: '12 mins ago' },
  { icon: 'photo_camera', text: 'Alex K. uploaded a new photo batch.', time: '34 mins ago' },
];

export default function Dashboard() {
  return (
    <Box>
      <Typography variant="h1" sx={{ fontSize: { xs: 28, md: 36 } }}>Dashboard Overview</Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary', mt: 1, mb: 4 }}>
        Manage wedding activities, moderate content, and monitor guest engagement.
      </Typography>

      <Grid container spacing={2.5} sx={{ mb: 4 }}>
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

      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 3, boxShadow: '0 4px 24px rgba(181,101,118,0.08)' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
              <Typography variant="h3" sx={{ fontSize: 22 }}>Quick Moderation</Typography>
              <Typography variant="body2" sx={{ color: 'primary.main', display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer' }}>
                View All <MaterialSymbol name="arrow_forward" size={16} />
              </Typography>
            </Stack>
            <Grid container spacing={2}>
              {quickMod.map((item) => (
                <Grid item xs={12} sm={4} key={item.user}>
                  <Paper elevation={0} sx={{ borderRadius: 2, border: '1px solid', borderColor: 'divider', overflow: 'hidden' }}>
                    <Box sx={{ height: 110, bgcolor: 'surface.variant' }} />
                    <Box sx={{ p: 1.5 }}>
                      <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                        <Typography variant="caption">By: {item.user}</Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>{item.time}</Typography>
                      </Stack>
                      <Stack direction="row" spacing={1}>
                        <Button fullWidth size="small" variant="contained" startIcon={<MaterialSymbol name="check" size={16} />}>
                          Approve
                        </Button>
                        <Button size="small" variant="outlined" color="error" sx={{ minWidth: 40, px: 0 }}>
                          <MaterialSymbol name="close" size={16} />
                        </Button>
                      </Stack>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 3, boxShadow: '0 4px 24px rgba(181,101,118,0.08)', height: '100%' }}>
            <Typography variant="h3" sx={{ fontSize: 20, mb: 2 }}>Live Activity</Typography>
            <Stack spacing={2} divider={<Box sx={{ borderBottom: '1px solid', borderColor: 'divider' }} />}>
              {activity.map((a, i) => (
                <Stack direction="row" spacing={1.5} key={i} alignItems="flex-start">
                  <Box sx={{ width: 32, height: 32, borderRadius: '50%', bgcolor: 'rgba(197,160,89,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'primary.main', flexShrink: 0 }}>
                    <MaterialSymbol name={a.icon} size={16} />
                  </Box>
                  <Box>
                    <Typography variant="body2">{a.text}</Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>{a.time}</Typography>
                  </Box>
                </Stack>
              ))}
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
