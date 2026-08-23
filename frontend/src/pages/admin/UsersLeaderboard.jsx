import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import MaterialSymbol from '../../components/MaterialSymbol';
import { leaderboard, adminUsers } from '../../data/mockData';

export default function UsersLeaderboard() {
  const top3 = leaderboard.slice(0, 3);

  return (
    <Box>
      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ md: 'flex-end' }} spacing={2} sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h1" sx={{ fontSize: { xs: 28, md: 36 } }}>Guest Leaderboard</Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mt: 1, maxWidth: 640 }}>
            Manage your guests&apos; engagement, track photo uploads, and moderate activity all in one place.
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<MaterialSymbol name="download" size={18} />}>Export CSV</Button>
      </Stack>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {top3.map((entry, i) => (
          <Grid item xs={12} md={4} key={entry.rank} sx={{ order: i === 0 ? 1 : i === 1 ? 0 : 2 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                textAlign: 'center',
                boxShadow: i === 0 ? '0 8px 24px rgba(197,160,89,0.25)' : '0 4px 12px rgba(181,101,118,0.06)',
                border: i === 0 ? '1px solid' : 'none',
                borderColor: 'primary.light',
                mt: i === 1 ? { md: 4 } : i === 2 ? { md: 6 } : 0,
              }}
            >
              <Avatar sx={{ width: i === 0 ? 88 : 64, height: i === 0 ? 88 : 64, mx: 'auto', mb: 1.5, bgcolor: i === 0 ? 'primary.main' : i === 1 ? 'outline.main' : 'secondary.light', fontSize: 28 }}>
                {entry.name[0]}
              </Avatar>
              <Typography variant="h3" sx={{ fontSize: i === 0 ? 22 : 18 }}>{entry.name}</Typography>
              <Typography variant="body2" sx={{ color: i === 0 ? 'primary.main' : 'text.secondary', fontWeight: 700, mt: 0.5 }}>{entry.points} Points</Typography>
              <Chip label={`#${entry.rank} lugar`} size="small" sx={{ mt: 1.5, bgcolor: 'rgba(253,162,180,0.2)', fontWeight: 600 }} />
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Paper elevation={0} sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: '0 4px 12px rgba(181,101,118,0.08)' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Typography variant="h3" sx={{ fontSize: 20 }}>All Guests</Typography>
          <TextField
            size="small"
            placeholder="Search guests..."
            InputProps={{ startAdornment: <InputAdornment position="start"><MaterialSymbol name="search" size={18} /></InputAdornment> }}
          />
        </Stack>
        <Box sx={{ overflowX: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'background.default' }}>
                <TableCell>Guest</TableCell>
                <TableCell align="center">Rank</TableCell>
                <TableCell align="center">Points</TableCell>
                <TableCell align="center">Photos</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {adminUsers.map((u) => (
                <TableRow key={u.id} hover sx={{ opacity: u.status === 'blocked' ? 0.6 : 1 }}>
                  <TableCell>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Avatar sx={{ width: 36, height: 36 }}>{u.name[0]}</Avatar>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600, textDecoration: u.status === 'blocked' ? 'line-through' : 'none' }}>{u.name}</Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>{u.email}</Typography>
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell align="center">{u.rank ? `#${u.rank}` : '-'}</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 700, color: 'primary.main' }}>{u.points}</TableCell>
                  <TableCell align="center">{u.photos}</TableCell>
                  <TableCell align="center">
                    <Chip
                      label={u.status === 'active' ? 'Active' : 'Blocked'}
                      size="small"
                      sx={{
                        bgcolor: u.status === 'active' ? 'rgba(143,165,214,0.25)' : 'error.light',
                        color: u.status === 'active' ? 'tertiary.main' : 'error.main',
                        fontWeight: 700,
                        fontSize: 10,
                        textTransform: 'uppercase',
                      }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small"><MaterialSymbol name="visibility" size={18} /></IconButton>
                    {u.status === 'active' ? (
                      <>
                        <IconButton size="small"><MaterialSymbol name="edit" size={18} /></IconButton>
                        <IconButton size="small"><MaterialSymbol name="block" size={18} /></IconButton>
                      </>
                    ) : (
                      <IconButton size="small"><MaterialSymbol name="lock_open" size={18} /></IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Paper>
    </Box>
  );
}
