import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Check,
  CircleUserRound,
  LockKeyhole,
  LogIn,
  ShieldCheck,
} from 'lucide-react';
import BookingForm from '../components/booking/BookingForm.jsx';
import Button from '../components/common/Button.jsx';
import { getServiceById } from '../data/services.js';
import { emptyBooking, STEPS, validateStep } from '../utils/bookingValidation.js';
import { createServiceRequest } from '../utils/serviceRequests.js';
import { useApp } from '../context/AppContext.jsx';

const STEP_TITLES = [
  'اختار الخدمة المناسبة',
  'حدد تفاصيل الخدمة',
  'راجع طلبك وأكّد الحجز',
];

export default function Booking() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { user, openAuthModal } = useApp();
  const preset = getServiceById(params.get('service'))?.id || '';
  const [data, setData] = useState(() => ({ ...emptyBooking, serviceId: preset }));
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submittingRef = useRef(false);
  const authPrompted = useRef(false);

  useEffect(() => {
    if (user) {
      authPrompted.current = false;
      return;
    }
    if (!authPrompted.current) {
      authPrompted.current = true;
      openAuthModal('login');
    }
  }, [user, openAuthModal]);

  const update = (next) => {
    setData(typeof next === 'function' ? next : () => next);
    setErrors({});
    setSubmitError('');
  };

  const requireAuthentication = () => {
    if (user?.id) return true;
    setSubmitError('سجّل الدخول أو أنشئ حساباً لمتابعة طلب الخدمة.');
    openAuthModal('login');
    return false;
  };

  const next = () => {
    if (!requireAuthentication()) return;
    const validation = validateStep(step, data);
    setErrors(validation);
    setSubmitError('');
    if (Object.keys(validation).length) return;

    if (step < STEPS.length - 1) {
      setStep((current) => current + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const previous = () => {
    setErrors({});
    setSubmitError('');
    setStep((current) => Math.max(0, current - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const confirm = () => {
    if (submittingRef.current) return;
    if (!requireAuthentication()) return;

    const validation = validateStep(1, data);
    setErrors(validation);
    if (Object.keys(validation).length) {
      setStep(1);
      return;
    }

    submittingRef.current = true;
    setIsSubmitting(true);
    setSubmitError('');
    try {
      const request = createServiceRequest(data, user);
      navigate(`/booking/confirmation?requestId=${encodeURIComponent(request.requestId)}`, {
        state: { requestId: request.requestId },
      });
    } catch (error) {
      setSubmitError(error instanceof Error
        ? error.message
        : 'تعذر حفظ طلبك الآن. تحقق من اتصالك وحاول مرة أخرى.');
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  const progress = ((step + 1) / STEPS.length) * 100;

  if (!user?.id) {
    return (
      <>
        <div className="page-head">
          <div className="container pt-10">
            <h1 className='text-3xl'>احجز خدمتك</h1>
            <p>سجّل الدخول أولاً لحفظ طلب الخدمة على حسابك ومتابعة تفاصيله.</p>
          </div>
        </div>
        <section className="section booking-auth-section">
          <div className="container">
            <div className="card booking-auth-card">
              <span className="booking-auth-icon"><LockKeyhole size={25} /></span>
              <span className="booking-auth-kicker"><ShieldCheck size={16} /> طلبك محفوظ بحسابك</span>
              <h2>سجّل الدخول لمتابعة الحجز</h2>
              <p>بعد تسجيل الدخول، هتقدر تختار الخدمة وتكمل طلبك. اختيارك للخدمة هيفضل محفوظ.</p>
              {preset && (
                <span className="booking-auth-preset">
                  الخدمة المختارة: <strong>{getServiceById(preset)?.title}</strong>
                </span>
              )}
              <div className="booking-auth-actions">
                <Button onClick={() => openAuthModal('login')}>
                  <LogIn size={17} /> تسجيل الدخول
                </Button>
                <Button variant="outline" onClick={() => openAuthModal('signup')}>
                  إنشاء حساب جديد
                </Button>
              </div>
              {submitError && <p className="booking-submit-error" role="alert">{submitError}</p>}
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <div className="page-head booking-page-head">
        <div className="container">
          <span className="booking-page-kicker"><CircleUserRound size={16} /> طلب خدمة جديد</span>
          <h1>احجز خدمتك</h1>
          <p>ثلاث خطوات بسيطة لتوصيل فني متخصص لحد باب بيتك.</p>
        </div>
      </div>

      <section className="section booking-section">
        <div className="container booking-container">
          <ol className="booking-stepper" aria-label={`الخطوة ${step + 1} من ${STEPS.length}`}>
            {STEPS.map((label, index) => (
              <li
                key={label}
                className={`booking-step ${index < step ? 'done' : ''} ${index === step ? 'current' : ''}`}
                aria-current={index === step ? 'step' : undefined}
              >
                <span className="booking-step-number">
                  {index < step ? <Check size={17} /> : index + 1}
                </span>
                <span className="booking-step-label">{label}</span>
              </li>
            ))}
          </ol>
          <div className="booking-stepper-mobile">
            <div><span>الخطوة {step + 1} من {STEPS.length}</span><strong>{STEPS[step]}</strong></div>
            <div className="booking-progress-track">
              <span style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div className="card booking-panel">
            <div className="booking-panel-heading">
              <div>
                <span>مرحباً {user.name || 'بك'}</span>
                <h2>{STEP_TITLES[step]}</h2>
              </div>
              <span className="booking-panel-count">{String(step + 1).padStart(2, '0')} / 03</span>
            </div>

            {submitError && (
              <div className="booking-submit-error" role="alert">
                <AlertCircle size={18} /> {submitError}
              </div>
            )}

            <BookingForm step={step} data={data} setData={update} errors={errors} user={user} />

            <div className="booking-navigation">
              <Button variant="outline" onClick={previous} disabled={step === 0 || isSubmitting}>
                <ArrowRight size={17} /> السابق
              </Button>
              {step < STEPS.length - 1 ? (
                <Button onClick={next}>
                  التالي <ArrowLeft size={17} />
                </Button>
              ) : (
                <Button onClick={confirm} disabled={isSubmitting}>
                  {isSubmitting ? (
                    <><span className="btn-spinner" /> جاري حفظ الطلب...</>
                  ) : (
                    <>تأكيد طلب الخدمة <Check size={17} /></>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
