import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import MaterialSymbol from '../components/MaterialSymbol';

const drawerWidth = 260;

const NAV_ITEMS = [
  { label: 'Dashboard', icon: 'dashboard', path: '/admin' },
  { label: 'Fotos', icon: 'photo_library', path: '/admin/photos' },
  { label: 'Bingo', icon: 'grid_view', path: '/admin/bingo' },
  { label: 'Usuarios', icon: 'group', path: '/admin/users' },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentIndex = NAV_ITEMS.findIndex((item) => item.path === location.pathname);

  return (
    <Box sx={{ display: 'flex', minHeight: '100dvh', bgcolor: 'background.default' }}>
      {/* Sidebar desktop */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box', border: 'none', borderRight: '1px solid', borderColor: 'divider' },
        }}
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="h2" sx={{ fontSize: 24, color: 'primary.main' }}>Nuestra Boda</Typography>
          <Typography variant="subtitle1" sx={{ color: 'text.secondary', mt: 0.5, fontSize: 11 }}>Admin Portal</Typography>
        </Box>
        <List sx={{ px: 2 }}>
          {NAV_ITEMS.map((item) => (
            <ListItemButton
              key={item.path}
              selected={location.pathname === item.path}
              onClick={() => navigate(item.path)}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                '&.Mui-selected': { bgcolor: 'primary.light', color: 'primary.main', fontWeight: 700 },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <MaterialSymbol name={item.icon} fill={location.pathname === item.path} />
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      {/* Top bar móvil */}
      <AppBar position="fixed" elevation={0} color="transparent" sx={{ display: { xs: 'flex', md: 'none' } }}>
        <Toolbar sx={{ height: 64, minHeight: 64, justifyContent: 'space-between' }}>
          <IconButton sx={{ color: 'primary.main' }}>
            <MaterialSymbol name="menu" />
          </IconButton>
          <Typography variant="h3" sx={{ fontSize: 20, color: 'primary.main' }}>Nuestra Boda</Typography>
          <Avatar sx={{ width: 32, height: 32 }}>A</Avatar>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ flex: 1, pt: { xs: 9, md: 5 }, pb: { xs: 12, md: 5 }, px: { xs: 2.5, md: 5 }, maxWidth: 1200, mx: 'auto', width: '100%' }}>
        <Outlet />
      </Box>

      {/* Bottom nav móvil */}
      <Paper
        elevation={0}
        sx={{
          display: { xs: 'block', md: 'none' },
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
              icon={<MaterialSymbol name={item.icon} fill={location.pathname === item.path} />}
              sx={{ color: 'text.secondary', '&.Mui-selected': { color: 'primary.main' } }}
            />
          ))}
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
