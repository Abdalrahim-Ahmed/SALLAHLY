import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, CheckCircle, ArrowLeft, Send, Headset } from 'lucide-react';
import Button from '../components/common/Button.jsx';
import { contactInfo, socialLinks } from '../data/contact.js';
import { validateContact } from '../utils/bookingValidation.js';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    const errs = validateContact(form);
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSent(true);
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setSent(false), 5000);
    }, 500);
  };

  const set = (k) => (e) => {
    setForm((current) => ({ ...current, [k]: e.target.value }));
    setErrors((current) => ({ ...current, [k]: '' }));
  };

  const info = [
    { Icon: Phone, label: 'الهاتف', value: contactInfo.phone, ltr: true, href: `tel:${contactInfo.phone.replace(/[^\d+]/g, '')}` },
    { Icon: Mail, label: 'البريد الإلكتروني', value: contactInfo.email, ltr: true, href: `mailto:${contactInfo.email}` },
    { Icon: MapPin, label: 'العنوان', value: contactInfo.address },
    { Icon: Clock, label: 'ساعات العمل', value: contactInfo.hours },
  ];

  return (
    <div className="contact-page">
      <section className="contact-heading">
        <div className="container">
          <span className="contact-kicker"><Headset size={16} /> إحنا هنا عشان نساعدك</span>
          <h1>تواصل معنا</h1>
          <p>عندك سؤال أو محتاج مساعدة؟ فريق صلحلي يسعده يسمع منك ويرد على استفسارك.</p>
        </div>
      </section>

      <section className="contact-main">
        <div className="container contact-layout">
          <form className="card contact-form-card" onSubmit={submit} noValidate aria-label="نموذج الاتصال">
            {sent && (
              <div className="contact-success" role="status">
                <CheckCircle size={18} /> تم استلام رسالتك بنجاح، وسنتواصل معك في أقرب وقت.
              </div>
            )}
            <div className="contact-form-heading">
              <span className="contact-form-icon"><Send size={20} /></span>
              <div>
                <h2>ابعتلنا رسالة</h2>
                <p>املأ البيانات التالية وهنرجعلك في أقرب وقت.</p>
              </div>
            </div>
            <div className="contact-fields">
              <div className="field-group contact-field">
                <label htmlFor="c-name">الاسم <span aria-hidden="true">*</span></label>
                <input
                  id="c-name"
                  className={`input ${errors.name ? 'invalid' : ''}`}
                  value={form.name}
                  onChange={set('name')}
                  placeholder="اسمك الكريم"
                  autoComplete="name"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'c-name-error' : undefined}
                />
                {errors.name && <div id="c-name-error" className="error-msg" role="alert">{errors.name}</div>}
              </div>
              <div className="field-group contact-field">
                <label htmlFor="c-email">البريد الإلكتروني <span aria-hidden="true">*</span></label>
                <input
                  id="c-email"
                  dir="ltr"
                  type="email"
                  className={`input ${errors.email ? 'invalid' : ''}`}
                  value={form.email}
                  onChange={set('email')}
                  placeholder="name@example.com"
                  autoComplete="email"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'c-email-error' : undefined}
                />
                {errors.email && <div id="c-email-error" className="error-msg" role="alert">{errors.email}</div>}
              </div>
              <div className="field-group contact-field contact-field-message">
                <label htmlFor="c-msg">رسالتك أو استفسارك <span aria-hidden="true">*</span></label>
                <textarea
                  id="c-msg"
                  className={`input ${errors.message ? 'invalid' : ''}`}
                  value={form.message}
                  onChange={set('message')}
                  placeholder="اكتب استفسارك هنا..."
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'c-msg-error' : undefined}
                />
                {errors.message && <div id="c-msg-error" className="error-msg" role="alert">{errors.message}</div>}
              </div>
            </div>
            <Button type="submit" className="contact-submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <span className="btn-spinner" /> جاري الإرسال...
                </>
              ) : (
                <>إرسال الرسالة <ArrowLeft size={17} /></>
              )}
            </Button>
          </form>

          <aside className="contact-aside">
            <div className="card contact-info-card">
              <span className="contact-aside-kicker">على تواصل دايم</span>
              <h2>يسعدنا تواصلك</h2>
              <p className="contact-info-intro">اختار الطريقة الأنسب لك، وفريقنا موجود لمساعدتك.</p>
              <div className="contact-info-list">
                {info.map(({ Icon, label, value, ltr, href }) => (
                  <div className="contact-info-row" key={label}>
                    <span className="contact-info-icon"><Icon size={19} /></span>
                    <div className="contact-info-copy">
                      <span className="contact-info-label">{label}</span>
                      {href ? (
                        <a href={href} dir={ltr ? 'ltr' : undefined}>{value}</a>
                      ) : (
                        <span dir={ltr ? 'ltr' : undefined}>{value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card contact-social-card">
              <div>
                <h3>تابعنا على منصات التواصل</h3>
                <p>خليك قريب من أخبارنا وخدماتنا.</p>
              </div>
              <div className="contact-social-links">
                {socialLinks.map(({ id, label, href, Icon }) => (
                  <a
                    key={id}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    title={label}
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
