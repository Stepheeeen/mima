"use client"
import React, { createContext, useContext, ReactNode } from "react";
import { theme } from "@/constant/theme";

type ThemeContextType = typeof theme;

const ThemeContext = createContext<ThemeContextType>(theme);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
