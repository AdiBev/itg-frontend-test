import React from "react";
import { ThemeProvider } from "styled-components";

const theme = {
  colors: {
    black: "#000000",
    grey: "#d4d4d4",
    white: "#ffffff",
  },
  fonts: ["Roboto", "sans-serif"],
  fontSizes: {
    small: "16px",
    medium: "28px",
    large: "40px",
  },
  breakpoints: {
    xs: "320px",
    sm: "524px",
    md: "768px",
    lg: "1024px",
    xl: "1440px",
  },
};

interface Props {
  children: React.ReactNode;
}

const Theme: React.FunctionComponent<Props> = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
