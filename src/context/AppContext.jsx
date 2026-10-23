import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { translations } from '../i18n.js';

const AppContext = createContext(null);

const read = (key, fallback) => {
  try {
    return localStorage.getItem(key) || fallback;
  } catch {
    return fallback;
  }
};

const readUser = () => {
  try {
    const raw = localStorage.getItem('salla7ly-auth-user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export function AppProvider({ children }) {
  const [lang, setLang] = useState(() => read('salahny-lang', 'ar'));
  const [theme, setTheme] = useState(() => read('salahny-theme', 'light'));
  const [user, setUser] = useState(() => readUser());
  const [authModal, setAuthModal] = useState({ isOpen: false, mode: 'login' });

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = lang === 'ar' ? 'rtl' : 'ltr';
    root.dataset.theme = theme;
    try {
      localStorage.setItem('salahny-lang', lang);
      localStorage.setItem('salahny-theme', theme);
    } catch {
      /* storage unavailable */
    }
  }, [lang, theme]);

  const t = useCallback((key) => translations[lang][key] ?? translations.ar[key] ?? key, [lang]);

  const login = (email, password, name = '') => {
    const newUser = {
      id: `usr_${Date.now()}`,
      email: email.trim().toLowerCase(),
      name: name.trim() || email.split('@')[0],
      phone: '01000000000',
      token: `tok_${Math.random().toString(36).substring(2)}`,
      loggedInAt: new Date().toISOString(),
    };
    setUser(newUser);
    try {
      localStorage.setItem('salla7ly-auth-user', JSON.stringify(newUser));
    } catch {
      /* storage unavailable */
    }
    setAuthModal({ isOpen: false, mode: 'login' });
    return newUser;
  };

  const signup = (name, email, phone, password) => {
    const newUser = {
      id: `usr_${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      token: `tok_${Math.random().toString(36).substring(2)}`,
      loggedInAt: new Date().toISOString(),
    };
    setUser(newUser);
    try {
      localStorage.setItem('salla7ly-auth-user', JSON.stringify(newUser));
    } catch {
      /* storage unavailable */
    }
    setAuthModal({ isOpen: false, mode: 'login' });
    return newUser;
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem('salla7ly-auth-user');
    } catch {
      /* storage unavailable */
    }
  };

  // const openAuthModal = (mode = 'login') => {
  //   setAuthModal({ isOpen: true, mode });
  // };
  const openAuthModal = (options = 'login') => {
  const mode =
    typeof options === 'string' ? options : options.mode;

  const role =
    typeof options === 'string' ? null : options.role;

  setAuthModal({
    isOpen: true,
    mode,
    role,
  });
};

  const closeAuthModal = () => {
    setAuthModal((prev) => ({ ...prev, isOpen: false }));
  };

  const value = {
    lang,
    theme,
    t,
    toggleLang: () => setLang((l) => (l === 'ar' ? 'en' : 'ar')),
    toggleTheme: () => setTheme((m) => (m === 'light' ? 'dark' : 'light')),
    user,
    login,
    signup,
    logout,
    authModal,
    openAuthModal,
    closeAuthModal,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => useContext(AppContext);
