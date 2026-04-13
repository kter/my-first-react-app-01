import { createTheme } from "@mui/material";
import { green, orange } from "@mui/material/colors";

// Default theme viewer
// https://mui.com/material-ui/customization/default-theme/
//
// Color palette
// https://mui.com/material-ui/customization/color/#color-palette
// ※primaryは500番台が推奨。secondaryはアクセントとしてprimaryから離れた色で500番台が推奨
//
// MUI Theme Creator
// https://zenoo.github.io/mui-theme-creator
const theme = createTheme({
  palette: {
    primary: {
      main: orange[500],
    },
    secondary: {
      main: green[500],
    }
  },
  spacing: 10,
});

export default theme;
