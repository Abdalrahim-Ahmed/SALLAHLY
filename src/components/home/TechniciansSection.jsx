import { Star, BadgeCheck, MapPin } from 'lucide-react';
import SectionTitle from '../common/SectionTitle.jsx';
import { useApp } from '../../context/AppContext.jsx';
import { technicians } from '../../data/technicians.js';

export function TechnicianCard({ tech }) {
  return (
    <article className="card">
      <div className="tech-top">
        <span className="avatar">{tech.name[0]}</span>
        <div><strong>{tech.name}</strong><br /><small>{tech.role}</small></div>
      </div>
      <div className="tech-meta">
        <span className="rating"><Star size={16} /> {tech.rating}</span>
        <span className="pill"><BadgeCheck size={13} /> موثّق</span>
      </div>
      <div className="mini-stats">
        <div><b>{tech.jobs}</b><small>خدمة</small></div>
        <div><b>{tech.years}</b><small>سنوات خبرة</small></div>
      </div>
      <div className="tech-area"><MapPin size={14} /> {tech.area}</div>
    </article>
  );
}

export default function TechniciansSection() {
  const { t } = useApp();
  return (
    <section className="section">
      <div className="container">
        <SectionTitle title={t('techTitle')} subtitle={t('techSub')} />
        <div className="grid grid-4">
          {technicians.map((tech) => <TechnicianCard key={tech.id} tech={tech} />)}
        </div>
      </div>
    </section>
  );
}
