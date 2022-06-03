import React, { ReactNode } from "react";
import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

type ThemeProviderProps = { children: ReactNode };

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {

  const theme = createTheme();

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider >
  )
};

export default ThemeProvider
