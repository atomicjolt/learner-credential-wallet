import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import type { ThemeProviderProps } from './ThemeProvider.d';
import { useAppDispatch } from '../../hooks';
import { selectWalletState, updateThemeName } from '../../store/slices/wallet';
import { defaultTheme, findThemeBy, ThemeContext, ThemeContextValue, themes } from '../../styles';

export default function ThemeProvider({ children }: ThemeProviderProps): JSX.Element {
  const dispatch = useAppDispatch();
  const { themeName } = useSelector(selectWalletState);

  const theme = useMemo(() => findThemeBy(themeName) || defaultTheme, [themeName]);
  const isDarkTheme = useMemo(() => theme === themes.darkTheme, [theme]);

  async function toggleTheme() {
    const nextThemeName = isDarkTheme ? themes.lightTheme.name : themes.darkTheme.name;
    await dispatch(updateThemeName(nextThemeName));
  }

  const value: ThemeContextValue = {
    theme,
    toggleTheme,
    isDarkTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}