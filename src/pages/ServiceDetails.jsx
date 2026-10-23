import { Link, useParams } from 'react-router-dom';
import { CheckCircle2, AlertTriangle, Clock, ShieldCheck, ArrowLeft } from 'lucide-react';
import Button from '../components/common/Button.jsx';
import { FEES, getServiceById, FALLBACK_SERVICE_IMAGE, handleImageError } from '../data/services.js';
import { formatPrice } from '../utils/formatters.js';
import ServiceCard from '../components/common/ServiceCard.jsx';
import NotFound from './NotFound.jsx';

export default function ServiceDetails() {
  const { id } = useParams();
  const service = getServiceById(id);
  if (!service) return <NotFound />;
  const related = service.related.map(getServiceById).filter(Boolean);
  const total = service.price + FEES.inspection + FEES.transport;

  return (
    <>
      <div className="page-head pt-10">
        <div className="container">
          <nav aria-label="مسار التصفح">
            <ol className="crumbs">
              <li><Link to="/services" className='font-bold text-xl'>الخدمات</Link></li>
              <li className="sep">/</li>
              <li aria-current="page" className=' font-semibold'>{service.title}</li>
            </ol>
          </nav>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <span className="icon-box solid">
              <img src={service.icon} alt="" width={30} height={30} style={{ objectFit: 'contain' }} />
            </span>
            <h1>{service.title}</h1>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container detail-grid">
          <div className="grid">
            {/* Service Image with fallback container */}
            <div className="card service-detail-image">
              <img
                src={service.image || FALLBACK_SERVICE_IMAGE}
                alt={service.title}
                loading="lazy"
                onError={handleImageError}
              />
            </div>

            <div className="card">
              <h2>عن الخدمة</h2>
              <p className="muted" style={{ marginTop: '0.5rem', fontSize: '1rem', lineHeight: '1.8' }}>
                {service.description}
              </p>
              <h3 style={{ marginTop: '1.6rem' }}>مميزات الخدمة</h3>
              <ul className="check-list">
                {service.features.map((f) => (
                  <li key={f}>
                    <CheckCircle2 size={18} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card">
              <h3>المشاكل الشائعة التي نعالجها</h3>
              <ul className="check-list warn">
                {service.problems.map((p) => (
                  <li key={p}>
                    <AlertTriangle size={18} />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="card sticky" aria-label="تفاصيل التكلفة التقديرية">
            <h3 style={{ marginBottom: '1rem', fontSize: '1.15rem' }}>تفاصيل التكلفة التقديرية</h3>
            <div className="row"><span>سعر الخدمة</span><b>{formatPrice(service.price)}</b></div>
            <div className="row"><span>رسوم المعاينة</span><b>{formatPrice(FEES.inspection)}</b></div>
            <div className="row"><span>رسوم الانتقال</span><b>{formatPrice(FEES.transport)}</b></div>
            <div className="total-row"><span>الإجمالي التقديري</span><span>{formatPrice(total)}</span></div>
            <p className="muted" style={{ margin: '1rem 0', fontSize: '0.9rem' }}>
              <Clock size={15} style={{ verticalAlign: '-2px', marginInlineEnd: '4px' }} />
              مدة الخدمة التقريبية: {service.duration}
            </p>
            <div className="guarantee-strip">
              <ShieldCheck size={18} /> ضمان معتمد لمدة 30 يوم
            </div>
            <Button to={`/booking?service=${service.id}`} size="lg" className="mt mt-3" style={{ width: '100%' }}>
              احجز هذه الخدمة الآن
            </Button>
          </aside>
        </div>
      </section>

      {/* Mobile Sticky Booking Bar */}
      <div className="mobile-booking-bar" aria-label="حجز الخدمة">
        <div className="m-price">
          <small>الإجمالي التقديري</small>
          <b>{formatPrice(total)}</b>
        </div>
        <Button to={`/booking?service=${service.id}`} size="md">
          احجز الآن <ArrowLeft size={16} className="arrow" />
        </Button>
      </div>

      {related.length > 0 && (
        <section className="section alt">
          <div className="container">
            <h2 style={{ marginBottom: '1.5rem' }}>خدمات مرتبطة</h2>
            <div className="grid grid-2">
              {related.map((s) => (
                <ServiceCard key={s.id} service={s} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
