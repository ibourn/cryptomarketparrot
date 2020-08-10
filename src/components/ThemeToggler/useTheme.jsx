import { useState } from 'react';

/************************************
 * 
 * isolation of the toggle function out of App.js
 * 
 * ******************************** */
export const useTheme = () => {

  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
      setTheme((theme === 'light') ? 'dark' : 'light');
  };

  return [theme, toggleTheme]
};