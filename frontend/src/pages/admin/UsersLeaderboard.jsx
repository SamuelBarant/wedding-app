import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import MaterialSymbol from '../../components/MaterialSymbol';
import { adminUsers } from '../../data/mockData';

export default function UsersLeaderboard() {

  return (
    <Box>
      <Stack alignItems="center" spacing={2} sx={{ mb: 4 }}>
          <Typography variant="h1" sx={{ fontSize: { xs: 28, md: 36 } }}>Usuarios</Typography>
      </Stack>

      <Paper elevation={0} sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: '0 4px 12px rgba(181,101,118,0.08)' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Typography variant="h3" sx={{ fontSize: 20 }}>Todos los usuarios</Typography>
          <TextField
            size="small"
            placeholder="Buscar por usuario..."
            InputProps={{ startAdornment: <InputAdornment position="start"><MaterialSymbol name="search" size={18} /></InputAdornment> }}
          />
        </Stack>
        <Box sx={{ overflowX: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'background.default' }}>
                <TableCell>Usuario</TableCell>
                <TableCell align="center">Fotos</TableCell>
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
                  <TableCell align="center">{u.photos}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Paper>
    </Box>
  );
}
