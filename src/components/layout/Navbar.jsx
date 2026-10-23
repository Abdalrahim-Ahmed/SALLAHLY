
import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  Moon,
  Sun,
  Menu,
  X,
  LogIn,
  LogOut,
  User,
} from 'lucide-react';

import Button from '../common/Button.jsx';
import Logo from '../common/Logo.jsx';
import { useApp } from '../../context/AppContext.jsx';

export default function Navbar() {
  const {
    t,
    lang,
    theme,
    toggleTheme,
    user,
    logout,
    openAuthModal,
  } = useApp();

  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && open) {
        close();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  return (
    <>
      <div
        className={`nav-backdrop ${open ? 'active' : ''}`}
        onClick={close}
        aria-hidden="true"
      />

      <header className="navbar">
        <div className="container nav-inner">
          <Link
            to="/"
            className="logo"
            onClick={close}
            aria-label={t('brand')}
          >
            <Logo variant="auto" />
          </Link>

          <nav
            id="primary-nav"
            className={`nav-links ${open ? 'open' : ''}`}
            aria-label={
              lang === 'ar'
                ? 'التنقل الرئيسي'
                : 'Main navigation'
            }
          >
            <NavLink to="/" end onClick={close}>
              {t('home')}
            </NavLink>

            <NavLink to="/services" onClick={close}>
              {t('services')}
            </NavLink>

            <Link to="/#how" onClick={close}>
              {t('how')}
            </Link>

            <Link to="/#pricing" onClick={close}>
              {t('pricing')}
            </Link>

            <NavLink to="/contact" onClick={close}>
              {t('contact')}
            </NavLink>
          </nav>

          <div className="nav-actions">
            <button
              type="button"
              className="icon-btn"
              onClick={toggleTheme}
              aria-label={
                theme === 'dark'
                  ? 'تفعيل الوضع الفاتح'
                  : 'تفعيل الوضع الداكن'
              }
            >
              {theme === 'dark' ? (
                <Sun size={18} />
              ) : (
                <Moon size={18} />
              )}
            </button>

            {user ? (
              <div className="nav-user-menu">
                <span className="nav-user-name">
                  <User
                    size={15}
                    style={{ color: 'var(--primary)' }}
                  />
                  <span>{user.name}</span>
                </span>

                <button
                  type="button"
                  className="icon-btn"
                  onClick={logout}
                  title="تسجيل الخروج"
                  aria-label="تسجيل الخروج"
                  style={{ color: 'var(--danger)' }}
                >
                  <LogOut size={17} />
                </button>
              </div>
            ) : (
              <div className="nav-auth-buttons hide-mobile">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => openAuthModal('login')}
                >
                  <LogIn size={15} />
                  {t('login')}
                </Button>

                <Button
                  size="sm"
                  onClick={() => openAuthModal('signup')}
                >
                  {t('signup')}
                </Button>
              </div>
            )}

            <button
              type="button"
              className="icon-btn menu-toggle"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-controls="primary-nav"
              aria-label={
                open
                  ? 'إغلاق القائمة'
                  : 'فتح القائمة الرئيسية'
              }
            >
              {open ? (
                <X size={22} />
              ) : (
                <Menu size={22} />
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
