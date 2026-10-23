import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import Logo from '../common/Logo.jsx';
import { useApp } from '../../context/AppContext.jsx';
import { socialLinks, contactInfo } from '../../data/contact.js';

export default function Footer() {
  const { t, lang } = useApp();
  const phoneHref = `tel:${contactInfo.phone.replace(/[^\d+]/g, '')}`;
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo">
              <Logo variant="light" className="footer-logo-img" />
            </div>
            <p className="footer-description">{t('footerText')}</p>
            <div className="socials">
              {socialLinks.map(({ id, label, href, Icon }) => (
                <a key={id} href={href} aria-label={label} title={label} target="_blank" rel="noreferrer"><Icon size={18} /></a>
              ))}
            </div>
          </div>
          <div className="footer-links">
            <h4>{t('quickLinks')}</h4>
            <ul>
              <li><Link to="/services">{t('services')}</Link></li>
              <li><Link to="/booking">{t('requestService')}</Link></li>
              <li><Link to="/contact">{t('contact')}</Link></li>
            </ul>
          </div>
          <div className="footer-contact">
            <h4>{t('contactUs')}</h4>
            <ul>
              <li><Phone size={16} /><a href={phoneHref} dir="ltr">{contactInfo.phone}</a></li>
              <li><Mail size={16} /><a href={`mailto:${contactInfo.email}`} dir="ltr">{contactInfo.email}</a></li>
              <li><MapPin size={16} /><span>{contactInfo.address}</span></li>
              <li><Clock size={16} /><span>{contactInfo.hours}</span></li>
            </ul>
          </div>
        </div>
        <div className="copy">© {new Date().getFullYear()} {lang === 'ar' ? 'صلحلي' : 'Salla7ly'} — {t('rights')}</div>
      </div>
    </footer>
  );
}
