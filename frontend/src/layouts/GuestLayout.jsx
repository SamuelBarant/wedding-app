import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import MaterialSymbol from '../components/MaterialSymbol';
import { currentUser } from '../data/mockData';

const NAV_ITEMS = [
  { label: 'Home', icon: 'home', path: '/inicio' },
  { label: 'Bingo', icon: 'grid_view', path: '/bingo' },
  { label: 'Photos', icon: 'photo_library', path: '/fotos' },
  { label: 'Profile', icon: 'person', path: '/perfil' },
];

export default function GuestLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentIndex = NAV_ITEMS.findIndex((item) => location.pathname.startsWith(item.path));

  return (
    <Box sx={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      <AppBar position="fixed" elevation={0} color="transparent">
        <Toolbar sx={{ height: 64, minHeight: 64, justifyContent: 'space-between' }}>
          <Typography variant="h3" sx={{ fontSize: 22, color: 'primary.main' }}>
            Nuestra Boda
          </Typography>
          <IconButton onClick={() => navigate('/perfil')}>
            <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.light' }}>
              {currentUser.name[0]}
            </Avatar>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ flex: 1, pt: 9, pb: 12, maxWidth: 1000, mx: 'auto', width: '100%', px: { xs: 2.5, md: 4 } }}>
        <Outlet />
      </Box>

      <Paper
        elevation={0}
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          borderTop: '1px solid',
          borderColor: 'divider',
          bgcolor: 'rgba(255,248,243,0.92)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <BottomNavigation
          showLabels
          value={currentIndex === -1 ? 0 : currentIndex}
          onChange={(e, newValue) => navigate(NAV_ITEMS[newValue].path)}
          sx={{ height: 76, bgcolor: 'transparent' }}
        >
          {NAV_ITEMS.map((item) => (
            <BottomNavigationAction
              key={item.path}
              label={item.label}
              icon={<MaterialSymbol name={item.icon} fill={location.pathname.startsWith(item.path)} />}
              sx={{
                color: 'text.secondary',
                '&.Mui-selected': { color: 'primary.main' },
              }}
            />
          ))}
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
