import { Check, Clock3, MapPin, Wrench } from 'lucide-react';
import { FEES, services, getServiceById } from '../../data/services.js';
import { formatPrice, formatArabicDate } from '../../utils/formatters.js';

const TIME_SLOTS = ['08:00 ص', '10:00 ص', '12:00 م', '02:00 م', '04:00 م', '06:00 م', '08:00 م'];

function nextDays(count = 7) {
  return Array.from({ length: count }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() + index + 1);
    const value = [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, '0'),
      String(date.getDate()).padStart(2, '0'),
    ].join('-');

    return {
      value,
      label: date.toLocaleDateString('ar-EG', { weekday: 'short', day: 'numeric', month: 'short' }),
    };
  });
}

function Field({ id, label, error, children }) {
  return (
    <div className="field-group booking-field">
      <label htmlFor={id}>{label}</label>
      {children}
      {error && <div className="error-msg" role="alert">{error}</div>}
    </div>
  );
}

export default function BookingForm({ step, data, setData, errors, user }) {
  const update = (key, value) => setData((current) => ({ ...current, [key]: value }));

  if (step === 0) {
    return (
      <div className="booking-service-grid" role="radiogroup" aria-label="اختر الخدمة المطلوبة">
        {services.map((service) => (
          <button
            type="button"
            key={service.id}
            role="radio"
            aria-checked={data.serviceId === service.id}
            className={`booking-service-option ${data.serviceId === service.id ? 'selected' : ''}`}
            onClick={() => update('serviceId', service.id)}
          >
            <span className="booking-service-icon">
              <img src={service.icon} alt="" width={32} height={32} />
            </span>
            <span className="booking-service-copy">
              <strong>{service.title}</strong>
              <small>{service.short}</small>
            </span>
            <span className="booking-service-price">{formatPrice(service.price)}</span>
            <span className="booking-service-check" aria-hidden="true">
              {data.serviceId === service.id && <Check size={16} />}
            </span>
          </button>
        ))}
        {errors.serviceId && <div className="error-msg booking-step-error" role="alert">{errors.serviceId}</div>}
      </div>
    );
  }

  if (step === 1) {
    return (
      <div className="booking-details-fields">
        <Field id="booking-problem" label="نوع المشكلة أو وصف مختصر للعطل" error={errors.problem}>
          <textarea
            id="booking-problem"
            className={`input ${errors.problem ? 'invalid' : ''}`}
            value={data.problem}
            onChange={(event) => update('problem', event.target.value)}
            placeholder="مثال: التكييف لا يبرد جيداً، أو يوجد تسريب تحت الحوض..."
            rows={3}
            aria-invalid={Boolean(errors.problem)}
          />
        </Field>

        <Field id="booking-address" label="عنوان تنفيذ الخدمة" error={errors.address}>
          <div className="booking-input-with-icon">
            <MapPin size={18} aria-hidden="true" />
            <input
              id="booking-address"
              className={`input ${errors.address ? 'invalid' : ''}`}
              value={data.address}
              onChange={(event) => update('address', event.target.value)}
              placeholder="المنطقة، الشارع، رقم المبنى والشقة"
              autoComplete="street-address"
              aria-invalid={Boolean(errors.address)}
            />
          </div>
        </Field>

        <Field id="booking-date" label="موعد مناسب للزيارة" error={errors.date}>
          <div className="booking-choice-list" role="group" aria-label="أيام الزيارة المتاحة">
            {nextDays().map((day) => (
              <button
                type="button"
                key={day.value}
                className={`booking-choice ${data.date === day.value ? 'selected' : ''}`}
                aria-pressed={data.date === day.value}
                onClick={() => update('date', day.value)}
              >
                {day.label}
              </button>
            ))}
          </div>
        </Field>

        <Field id="booking-time" label="التوقيت المفضل" error={errors.time}>
          <div className="booking-choice-list" role="group" aria-label="أوقات الزيارة">
            {TIME_SLOTS.map((time) => (
              <button
                type="button"
                key={time}
                className={`booking-choice booking-time-choice ${data.time === time ? 'selected' : ''}`}
                aria-pressed={data.time === time}
                onClick={() => update('time', time)}
              >
                <Clock3 size={15} /> {time}
              </button>
            ))}
          </div>
        </Field>
      </div>
    );
  }

  const service = getServiceById(data.serviceId);
  const rows = [
    ['اسم العميل', user?.name],
    ['المشكلة', data.problem],
    ['العنوان', data.address],
    ['موعد الزيارة', `${formatArabicDate(data.date)} — ${data.time}`],
  ];

  return (
    <div className="booking-review">
      <div className="booking-review-service">
        {service ? (
          <img src={service.icon} alt="" width={36} height={36} />
        ) : (
          <Wrench size={22} />
        )}
        <div>
          <small>الخدمة المختارة</small>
          <strong>{service?.title || 'لم يتم اختيار خدمة'}</strong>
        </div>
        <strong className="booking-review-price">{service ? formatPrice(service.price) : ''}</strong>
      </div>

      <dl className="booking-review-details">
        {rows.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value || '—'}</dd>
          </div>
        ))}
      </dl>

      {service && (
        <div className="booking-review-total">
          <div><span>سعر الخدمة</span><strong>{formatPrice(service.price)}</strong></div>
          <div><span>رسوم المعاينة</span><strong>{formatPrice(FEES.inspection)}</strong></div>
          <div><span>رسوم الانتقال</span><strong>{formatPrice(FEES.transport)}</strong></div>
          <div className="booking-review-grand-total">
            <span>الإجمالي التقديري</span>
            <strong>{formatPrice(service.price + FEES.inspection + FEES.transport)}</strong>
          </div>
        </div>
      )}
    </div>
  );
}
