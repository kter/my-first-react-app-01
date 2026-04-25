import { createContext } from 'react';
import type { PaletteMode } from '@mui/material';

export type ThemeContextType = {
  mode: PaletteMode,
  toggleMode: () => void
};

const ThemeContext = createContext<Partial<ThemeContextType>>({
  mode: 'light',
  toggleMode: () => { }
});

export default ThemeContext;

