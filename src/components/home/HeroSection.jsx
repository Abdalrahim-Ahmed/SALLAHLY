import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Search, ArrowLeft } from 'lucide-react';
import Button from '../common/Button.jsx';
import { useApp } from '../../context/AppContext.jsx';
import HeroVideoPlayer from './HeroVideoPlayer.jsx';


const stats = [
  { v: '+12K', l: 'عميل سعيد' },
  { v: '+25K', l: 'خدمة مكتملة' },
  { v: '+500', l: 'فني محترف' },
  { v: '30', l: 'ضمان 30 يوم' },
];

export default function HeroSection() {
  const { t } = useApp();
  const navigate = useNavigate();
  const [q, setQ] = useState('');

  const submit = (e) => {
    e.preventDefault();
    navigate(q.trim() ? `/services?q=${encodeURIComponent(q.trim())}` : '/services');
  };

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="badge">
              <ShieldCheck size={15} /> {t('badge')}
            </span>
            <h1>{t('heroTitle')}</h1>
            <p className="lead">{t('heroText')}</p>
            <div className="hero-cta">
              <Button to="/booking" size="md">
                {t('requestService')} <ArrowLeft size={17} className="arrow" />
              </Button>
             
 
            </div>
            <div className="stats">
              {stats.map((s) => (
                <div className="stat" key={s.l}>
                  <strong>{s.v}</strong>
                  <span>{s.l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Replaced left element with embedded hero video player with smooth controls */}
          <HeroVideoPlayer />
        </div>
      </section>

      <form className="container search-box" onSubmit={submit} role="search">
        <div className="field">
          <Search size={18} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t('searchPlaceholder')}
            aria-label={t('search')}
          />
        </div>
        <Button type="submit">
          <Search size={16} /> {t('search')}
        </Button>
      </form>
    </>
  );
}
