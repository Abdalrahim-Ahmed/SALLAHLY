import { BadgeCheck, Receipt, ShieldCheck, Clock } from 'lucide-react';
import SectionTitle from '../common/SectionTitle.jsx';
import { useApp } from '../../context/AppContext.jsx';

const reasons = [
  { Icon: BadgeCheck, title: 'فنيون موثقون', text: 'نراجع مؤهلات وخبرة كل فني قبل انضمامه.' },
  { Icon: Receipt, title: 'أسعار تقديرية', text: 'تعرف التكلفة التقديرية قبل تأكيد الحجز.' },
  { Icon: ShieldCheck, title: 'ضمان 30 يوم', text: 'نصلح المشكلة المرتبطة بنفس الإصلاح خلال 30 يوم.' },
  { Icon: Clock, title: 'التزام بالموعد', text: 'تختار الوقت المناسب لك ونلتزم به.' },
];

export default function WhyChooseUs() {
  const { t } = useApp();
  return (
    <section className="section alt">
      <div className="container">
        <SectionTitle title={t('whyTitle')} subtitle={t('whySub')} />
        <div className="grid grid-4 values">
          {reasons.map(({ Icon, title, text }) => (
            <div className="card" key={title}>
              <span className="icon-box"><Icon size={22} /></span>
              <h3>{title}</h3>
              <p className="muted" style={{ fontSize: '0.92rem' }}>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
