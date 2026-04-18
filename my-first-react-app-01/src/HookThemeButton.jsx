import { use } from 'react';
import { Button } from '@mui/material';
import ThemeContext from './ThemeContext';

export default function HookThemeButton() {
  const { mode, toggleMode } = use(ThemeContext);
  return (
    <Button variant="contained" onClick={toggleMode}>
    Mode {mode}
    </Button>
  );
}
