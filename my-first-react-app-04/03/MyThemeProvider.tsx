import { type ReactNode, useState } from 'react';
import { CssBaseline, type PaletteMode } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { amber, grey } from '@mui/material/colors';
import ThemeContext, { type ThemeContextType } from './ThemeContext';

type MyThemeProviderProps = {
  children: ReactNode
};

export default function MyThemeProvider({ children }: MyThemeProviderProps) {
  const [mode, setMode] = useState<PaletteMode>('light');
  const themeConfig: ThemeContextType = {
    mode,
    toggleMode: () => {
      setMode(prev =>
        prev === 'light' ? 'dark' : 'light'
      )
    }
  };
  ...
}

