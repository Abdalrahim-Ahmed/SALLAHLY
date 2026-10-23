import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import AuthModal from '../common/AuthModal.jsx';
import { useApp } from '../../context/AppContext.jsx';

function RouteMetaManager() {
  const { pathname, hash } = useLocation();
  const { lang } = useApp();

  useEffect(() => {
    const titles = {
      ar: {
        '/': 'صلحلي | صيانة منزلية فورية وموثوقة بالتجمع الخامس',
        '/services': 'خدمات الصيانة المنزلية | صلحلي',
        '/booking': 'حجز خدمة صيانة | صلحلي',
        '/booking/confirmation': 'تم تأكيد حجزك | صلحلي',
        '/contact': 'تواصل معنا | صلحلي',
      },
      en: {
        '/': 'Salla7ly | Trusted Home Repairs in Fifth Settlement',
        '/services': 'Maintenance Services | Salla7ly',
        '/booking': 'Book a Service | Salla7ly',
        '/booking/confirmation': 'Booking Confirmed | Salla7ly',
        '/contact': 'Contact Us | Salla7ly',
      },
    };

    const currentTitles = titles[lang] || titles.ar;
    if (pathname.startsWith('/services/')) {
      document.title = lang === 'ar' ? 'تفاصيل الخدمة | صلحلي' : 'Service Details | Salla7ly';
    } else {
      document.title = currentTitles[pathname] || (lang === 'ar' ? 'صلحلي | صيانة منزلية' : 'Salla7ly');
    }

    if (hash) {
      const id = hash.slice(1);
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 60);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash, lang]);

  return null;
}

export default function MainLayout() {
  return (
    <>
      <RouteMetaManager />
      <Navbar />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
      <AuthModal />
    </>
  );
}
