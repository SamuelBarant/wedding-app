import Box from '@mui/material/Box';

/**
 * Envuelve la fuente "Material Symbols Outlined" (cargada en index.html)
 * para usar cualquier icono de Google por su nombre, igual que en las
 * pantallas originales de Stitch, sin depender de @mui/icons-material.
 */
export default function MaterialSymbol({ name, fill = false, size = 24, sx = {}, ...props }) {
  return (
    <Box
      component="span"
      className="material-symbols-outlined"
      sx={{
        fontSize: size,
        fontVariationSettings: `'FILL' ${fill ? 1 : 0}, 'wght' 400, 'GRAD' 0, 'opsz' 24`,
        lineHeight: 1,
        ...sx,
      }}
      {...props}
    >
      {name}
    </Box>
  );
}
