import { useEffect, useState } from 'react';
import { Navigate, useLocation, useSearchParams } from 'react-router-dom';
import { Check, Copy, CheckCheck, MessageSquare, AlertCircle } from 'lucide-react';
import Button from '../components/common/Button.jsx';
import { getServiceById } from '../data/services.js';
import { formatPrice, formatArabicDate } from '../utils/formatters.js';
import { getServiceRequest } from '../utils/serviceRequests.js';
import { useApp } from '../context/AppContext.jsx';

export default function BookingConfirmation() {
  const { state } = useLocation();
  const [params] = useSearchParams();
  const { user } = useApp();
  const [request, setRequest] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [copied, setCopied] = useState(false);
  const requestId = params.get('requestId') || state?.requestId;

  useEffect(() => {
    if (!user?.id || !requestId) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      setRequest(getServiceRequest(requestId, user.id));
    } catch {
      setLoadError('تعذر قراءة بيانات طلبك المحفوظة. ارجع لصفحة الحجز وحاول مرة أخرى.');
    } finally {
      setIsLoading(false);
    }
  }, [requestId, user]);

  if (!user?.id) return <Navigate to="/booking" replace />;

  if (isLoading) {
    return <section className="section"><div className="container center">جارٍ التحقق من حفظ الطلب...</div></section>;
  }

  if (loadError) {
    return (
      <section className="section">
        <div className="container booking-confirmation-failure">
          <AlertCircle size={24} />
          <h1>تعذر عرض تأكيد الطلب</h1>
          <p>{loadError}</p>
          <Button to="/booking">العودة للحجز</Button>
        </div>
      </section>
    );
  }

  if (!request) {
    return (
      <section className="section">
        <div className="container booking-confirmation-failure">
          <AlertCircle size={24} />
          <h1>لم يتم العثور على طلب محفوظ</h1>
          <p>لن نعرض رسالة تأكيد قبل حفظ الطلب. يمكنك الرجوع وإرسال طلبك مرة أخرى.</p>
          <Button to="/booking">العودة للحجز</Button>
        </div>
      </section>
    );
  }

  const service = getServiceById(request.serviceId);
  if (!service) {
    return (
      <section className="section">
        <div className="container booking-confirmation-failure">
          <AlertCircle size={24} />
          <h1>تعذر العثور على تفاصيل الخدمة</h1>
          <p>تم العثور على رقم الطلب، لكن بيانات الخدمة المرتبطة به غير متاحة.</p>
          <Button to="/booking">العودة للحجز</Button>
        </div>
      </section>
    );
  }

  const total = request.servicePrice + request.inspectionFee + request.transportFee;

  const copyRef = async () => {
    try {
      await navigator.clipboard.writeText(request.requestId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const shareWhatsApp = () => {
    const text = encodeURIComponent(
      `مرحباً صلحلي، طلبت خدمة: ${service.title}\nرقم الطلب: ${request.requestId}\nالموعد: ${formatArabicDate(request.date)} ${request.time}\nالعنوان: ${request.address}`
    );
    window.open(`https://wa.me/201000000000?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="section booking-confirmation-section">
      <div className="container booking-confirmation-container">
        <div className="card center booking-confirmation-card">
          <div className="success-icon"><Check size={42} /></div>
          <span className="booking-confirmation-kicker">تم حفظ طلبك بنجاح</span>
          <h1>شكراً لطلبك يا {request.name}</h1>
          <p className="muted">طلبك مربوط بحسابك، واحتفظ برقم الطلب للرجوع إليه.</p>

          <div className="booking-confirmation-ref">
            <span>رقم الطلب</span>
            <strong dir="ltr">{request.requestId}</strong>
            <button type="button" onClick={copyRef} title="نسخ رقم الطلب" aria-label="نسخ رقم الطلب">
              {copied ? <CheckCheck size={17} /> : <Copy size={17} />}
              {copied ? 'تم النسخ' : 'نسخ'}
            </button>
          </div>

          <dl className="booking-confirmation-details">
            <div><dt>الخدمة</dt><dd>{service.title}</dd></div>
            <div><dt>وصف المشكلة</dt><dd>{request.problem}</dd></div>
            <div><dt>عنوان الخدمة</dt><dd>{request.address}</dd></div>
            <div><dt>موعد الزيارة</dt><dd>{formatArabicDate(request.date)} — {request.time}</dd></div>
            <div><dt>سعر الخدمة</dt><dd>{formatPrice(request.servicePrice)}</dd></div>
            <div><dt>رسوم المعاينة والانتقال</dt><dd>{formatPrice(request.inspectionFee + request.transportFee)}</dd></div>
            <div className="booking-confirmation-total"><dt>الإجمالي التقديري</dt><dd>{formatPrice(total)}</dd></div>
          </dl>

          <div className="booking-confirmation-actions">
            <Button onClick={shareWhatsApp} variant="accent">
              <MessageSquare size={16} /> مشاركة عبر واتساب
            </Button>
            <Button to="/">العودة للرئيسية</Button>
            <Button to="/services" variant="outline">تصفح الخدمات</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
