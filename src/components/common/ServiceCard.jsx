import { Link } from 'react-router-dom';
import { ArrowLeft, Clock3, ShieldCheck, Wrench } from 'lucide-react';
import { formatPrice } from '../../utils/formatters.js';
import { FALLBACK_SERVICE_IMAGE, handleImageError } from '../../data/services.js';

export function ServiceIcon({ name, size = 22, title = '' }) {
  if (name && typeof name === 'string' && (name.startsWith('/') || name.startsWith('http') || name.includes('.'))) {
    return <img src={name} alt={title} width={size} height={size} style={{ objectFit: 'contain' }} />;
  }
  const Icon = Wrench;
  return <Icon size={size} />;
}

export default function ServiceCard({ service }) {
  return (
    <Link
      to={`/services/${service.id}`}
      className="card service-card"
      aria-label={`عرض تفاصيل خدمة ${service.title}`}
    >
      {/* Service Image Thumbnail */}
      <div className="service-card-image">
          <img
            src={service.image || FALLBACK_SERVICE_IMAGE}
            alt={service.title}
            loading="lazy"
            onError={handleImageError}
          />
        </div>
      <div className="service-card-body">
        <div className="service-card-heading">
          <span className="service-card-icon">
            <ServiceIcon name={service.icon} size={30} title="" />
          </span>
          <span className="service-card-category">خدمة منزلية</span>
        </div>
        <h3>{service.title}</h3>
        <p className="service-card-description">{service.short}</p>
        <div className="service-card-meta">
          <span><Clock3 size={15} /> {service.duration}</span>
          <span><ShieldCheck size={15} /> ضمان 30 يوم</span>
        </div>
        <div className="foot">
          <span className="service-card-price">
            <small>السعر يبدأ من</small>
            <strong>{formatPrice(service.price)}</strong>
          </span>
          <span className="service-card-action">
            عرض التفاصيل <ArrowLeft size={17} className="arrow" />
          </span>
        </div>
      </div>
    </Link>
  );
}
