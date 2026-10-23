import SectionTitle from '../common/SectionTitle.jsx';
import { useApp } from '../../context/AppContext.jsx';

export default function VideoSection() {
  const { lang } = useApp();

  return (
    <section className="section alt" id="video">
      <div className="container">
        <SectionTitle
          title={lang === 'ar' ? 'فيديو تعريفي عن صلحلي' : 'Discover Salla7ly'}
          subtitle={
            lang === 'ar'
              ? 'شاهد كيف نقدّم خدمات الصيانة المنزلية في التجمع الخامس بأعلى معايير الدقة والاحترافية'
              : 'Watch how we deliver top-tier home maintenance in Fifth Settlement with certified technicians'
          }
        />
        <div style={{ maxWidth: '920px', margin: '0 auto' }}>
          <div
            style={{
              position: 'relative',
              borderRadius: 'var(--radius)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow)',
              border: '1px solid var(--border)',
              background: '#090d16',
              aspectRatio: '16 / 9',
            }}
          >
            <video
              src="/videos/motion-1.mp4"
              title="فيديو تعريفي عن صلحلي"
              controls
              playsInline
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
