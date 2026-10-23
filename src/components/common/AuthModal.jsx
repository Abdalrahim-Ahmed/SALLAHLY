import { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Check,
  CircleUserRound,
  Clock3,
  FileCheck2,
  FileImage,
  HardHat,
  ImagePlus,
  LogIn,
  ShieldCheck,
  UserPlus,
  X,
} from 'lucide-react';
import { useApp } from '../../context/AppContext.jsx';
import { categories } from '../../data/services.js';
import Button from './Button.jsx';
import Logo from './Logo.jsx';

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const TECHNICIAN_STEPS = ['بياناتك', 'توثيق الهوية', 'اختبار المهارات'];

const emptyRegistration = {
  name: '',
  phone: '',
  email: '',
  password: '',
  confirmPassword: '',
  specialty: '',
  additionalSpecialties: [],
  bio: '',
};

const emptyUploads = { front: null, back: null, portrait: null };

const specialtyOptions = categories
  .filter(({ id }) => id !== 'all')
  .map(({ id, label }) => ({
    id,
    label: id === 'ac'
      ? 'التكييف'
      : id === 'electric'
        ? 'الكهرباء'
        : id === 'plumbing'
          ? 'السباكة'
          : 'صيانة الأجهزة الكهربائية',
  }));

const uploadFields = [
  { id: 'front', label: 'الوجه الأمامي للبطاقة' },
  { id: 'back', label: 'الوجه الخلفي للبطاقة' },
  { id: 'portrait', label: 'صورة شخصية حديثة' },
];

function getFieldErrors(form, { includeSpecialty = false } = {}) {
  const errors = {};
  if (form.name.trim().length < 3) errors.name = 'اكتب الاسم الكامل (3 أحرف على الأقل).';
  if (!/^01[0125]\d{8}$/.test(form.phone.replace(/\s|-/g, ''))) {
    errors.phone = 'اكتب رقم هاتف مصرياً صحيحاً، مثال: 01012345678.';
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'اكتب بريداً إلكترونياً صحيحاً.';
  }
  if (form.password.length < 8) errors.password = 'كلمة المرور يجب ألا تقل عن 8 أحرف.';
  if (form.confirmPassword !== form.password) errors.confirmPassword = 'تأكيد كلمة المرور غير مطابق.';
  if (includeSpecialty && !form.specialty) errors.specialty = 'اختر تخصصك الأساسي.';
  return errors;
}

function IdentityUpload({ field, upload, error, onChange }) {
  const inputId = `technician-${field.id}`;
  return (
    <div className={`technician-upload ${error ? 'invalid' : ''}`}>
      <input
        id={inputId}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={(event) => onChange(field.id, event.target.files?.[0] || null)}
        aria-label={field.label}
      />
      <label htmlFor={inputId} className="technician-upload-label">
        {upload ? (
          <img src={upload.preview} alt={`معاينة ${field.label}`} />
        ) : (
          <span className="technician-upload-placeholder"><ImagePlus size={23} /></span>
        )}
        <span className="technician-upload-copy">
          <strong>{field.label}</strong>
          <small>{upload ? 'اضغط لاستبدال الصورة' : 'صورة واضحة · JPG أو PNG أو WebP · حتى 5 ميجابايت'}</small>
        </span>
        <FileImage size={19} className="technician-upload-trailing-icon" />
      </label>
      {error && <span className="error-msg" role="alert">{error}</span>}
    </div>
  );
}

export default function AuthModal() {
  const { authModal, closeAuthModal, login, theme } = useApp();
  const [mode, setMode] = useState(authModal.mode || 'login');
  const [form, setForm] = useState(emptyRegistration);
  const [errors, setErrors] = useState({});
  const [uploads, setUploads] = useState(emptyUploads);
  const [step, setStep] = useState(0);
  const [notice, setNotice] = useState('');


  const uploadedUrls = useMemo(
    () => Object.values(uploads).filter(Boolean).map(({ preview }) => preview),
    [uploads]
  );

  useEffect(() => {
    return () => uploadedUrls.forEach((url) => URL.revokeObjectURL(url));
  }, [uploadedUrls]);

  useEffect(() => {
    if (!authModal.isOpen) {
      setMode('login');
      setForm(emptyRegistration);
      setErrors({});
      setUploads(emptyUploads);
      setStep(0);
      setNotice('');
      return;
    }
    setMode(authModal.mode === 'signup' ? 'role-choice' : authModal.mode || 'login');
    setForm(emptyRegistration);
    setErrors({});
    setUploads(emptyUploads);
    setStep(0);
    setNotice('');
  }, [authModal.isOpen, authModal.mode]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && authModal.isOpen) closeAuthModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [authModal.isOpen, closeAuthModal]);

  if (!authModal.isOpen) return null;

  const close = () => {
    setUploads(emptyUploads);
    closeAuthModal();
  };

  const setField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: '' }));
    setNotice('');
  };

  const chooseRole = (nextMode) => {
    setForm(emptyRegistration);
    setErrors({});
    setUploads(emptyUploads);
    setStep(0);
    setNotice('');
    setMode(nextMode);
  };

  const selectUpload = (field, file) => {
    setErrors((current) => ({ ...current, [field]: '' }));
    setNotice('');
    if (!file) {
      setUploads((current) => ({ ...current, [field]: null }));
      return;
    }
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      setErrors((current) => ({ ...current, [field]: 'نوع الملف غير مدعوم. استخدم JPG أو PNG أو WebP.' }));
      return;
    }
    if (file.size > MAX_IMAGE_SIZE) {
      setErrors((current) => ({ ...current, [field]: 'حجم الصورة أكبر من 5 ميجابايت.' }));
      return;
    }
    const preview = URL.createObjectURL(file);
    setUploads((current) => ({
      ...current,
      [field]: { file, preview },
    }));
  };

  const submitLogin = (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = 'يرجى إدخال بريد إلكتروني صحيح.';
    if (form.password.length < 6) nextErrors.password = 'كلمة المرور يجب ألا تقل عن 6 أحرف.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    login(form.email, form.password);
  };

 const showUnavailableNotice = () => {
  setNotice('تم إنشاء الحساب بنجاح!');
};

  const submitCustomer = (event) => {
    event.preventDefault();
    const nextErrors = getFieldErrors(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    showUnavailableNotice();
  };

  const toggleAdditionalSpecialty = (id) => {
    const selected = form.additionalSpecialties.includes(id);
    setField(
      'additionalSpecialties',
      selected
        ? form.additionalSpecialties.filter((specialty) => specialty !== id)
        : [...form.additionalSpecialties, id]
    );
  };

  const nextTechnicianStep = () => {
    if (step === 0) {
      const nextErrors = getFieldErrors(form, { includeSpecialty: true });
      setErrors(nextErrors);
      if (Object.keys(nextErrors).length) return;
    }

    if (step === 1) {
      const nextErrors = {};
      if (!uploads.front) nextErrors.front = 'ارفع صورة الوجه الأمامي للبطاقة.';
      if (!uploads.back) nextErrors.back = 'ارفع صورة الوجه الخلفي للبطاقة.';
      if (!uploads.portrait) nextErrors.portrait = 'ارفع صورة شخصية حديثة.';
      if (form.bio.trim().length < 50) nextErrors.bio = 'اكتب نبذة لا تقل عن 50 حرفاً عن خبرتك.';
      setErrors(nextErrors);
      if (Object.keys(nextErrors).length) return;
    }

    setNotice('');
    setStep((current) => Math.min(current + 1, TECHNICIAN_STEPS.length - 1));
  };

  const submitTechnician = (event) => {
    event.preventDefault();
    if (step < TECHNICIAN_STEPS.length - 1) {
      nextTechnicianStep();
      return;
    }
    showUnavailableNotice();
  };

  const renderRegistrationFields = ({ includeSpecialty = false } = {}) => (
    <div className="account-form-grid">
      <div className="field-group">
        <label htmlFor="register-name">الاسم الكامل</label>
        <input id="register-name" className={`input ${errors.name ? 'invalid' : ''}`} value={form.name}
          onChange={(event) => setField('name', event.target.value)} autoComplete="name" />
        {errors.name && <span className="error-msg" role="alert">{errors.name}</span>}
      </div>
      <div className="field-group">
        <label htmlFor="register-phone">رقم الهاتف</label>
        <input id="register-phone" className={`input ${errors.phone ? 'invalid' : ''}`} type="tel" dir="ltr"
          value={form.phone} onChange={(event) => setField('phone', event.target.value)}
          placeholder="01012345678" autoComplete="tel" />
        {errors.phone && <span className="error-msg" role="alert">{errors.phone}</span>}
      </div>
      <div className="field-group">
        <label htmlFor="register-email">البريد الإلكتروني</label>
        <input id="register-email" className={`input ${errors.email ? 'invalid' : ''}`} type="email" dir="ltr"
          value={form.email} onChange={(event) => setField('email', event.target.value)}
          placeholder="name@example.com" autoComplete="email" />
        {errors.email && <span className="error-msg" role="alert">{errors.email}</span>}
      </div>
      {includeSpecialty && (
        <div className="field-group">
          <label htmlFor="technician-specialty">التخصص الأساسي</label>
          <select id="technician-specialty" className={`input ${errors.specialty ? 'invalid' : ''}`}
            value={form.specialty} onChange={(event) => setField('specialty', event.target.value)}>
            <option value="">اختر التخصص</option>
            {specialtyOptions.map((specialty) => (
              <option key={specialty.id} value={specialty.id}>{specialty.label}</option>
            ))}
          </select>
          {errors.specialty && <span className="error-msg" role="alert">{errors.specialty}</span>}
          {form.specialty && (
            <div className="additional-specialties">
              <span>تخصصات إضافية (اختياري)</span>
              {specialtyOptions.filter(({ id }) => id !== form.specialty).map((specialty) => (
                <label key={specialty.id}>
                  <input type="checkbox" checked={form.additionalSpecialties.includes(specialty.id)}
                    onChange={() => toggleAdditionalSpecialty(specialty.id)} />
                  {specialty.label}
                </label>
              ))}
            </div>
          )}
        </div>
      )}
      <div className="field-group">
        <label htmlFor="register-password">كلمة المرور</label>
        <input id="register-password" className={`input ${errors.password ? 'invalid' : ''}`} type="password"
          value={form.password} onChange={(event) => setField('password', event.target.value)}
          autoComplete="new-password" />
        {errors.password && <span className="error-msg" role="alert">{errors.password}</span>}
      </div>
      <div className="field-group">
        <label htmlFor="register-confirm-password">تأكيد كلمة المرور</label>
        <input id="register-confirm-password" className={`input ${errors.confirmPassword ? 'invalid' : ''}`}
          type="password" value={form.confirmPassword}
          onChange={(event) => setField('confirmPassword', event.target.value)} autoComplete="new-password" />
        {errors.confirmPassword && <span className="error-msg" role="alert">{errors.confirmPassword}</span>}
      </div>
    </div>
  );

  return (
    <div className="auth-backdrop" onClick={close} role="dialog" aria-modal="true" aria-labelledby="auth-title">
      <div className={`auth-modal ${mode === 'login' ? '' : 'auth-modal-registration'}`}
        onClick={(event) => event.stopPropagation()}>
        <button type="button" onClick={close} aria-label="إغلاق" className="auth-close">
          <X size={20} />
        </button>

        <div className="auth-modal-heading">
          <Logo variant="auto" className="auth-logo-img" />
          <h2 id="auth-title">
            {mode === 'login' ? 'تسجيل الدخول إلى صلحلي' : 'انضم إلى صلحلي'}
          </h2>
        </div>

        {mode === 'login' && (
          <>
            <div className="auth-tabs" role="tablist">
              <button type="button" role="tab" aria-selected="true" className="auth-tab active">تسجيل الدخول</button>
              <button type="button" role="tab" aria-selected="false" className="auth-tab"
                onClick={() => setMode('role-choice')}>حساب جديد</button>
            </div>
            <form onSubmit={submitLogin}>
              <div className="field-group auth-field">
                <label htmlFor="login-email">البريد الإلكتروني</label>
                <input id="login-email" type="email" dir="ltr" className={`input ${errors.email ? 'invalid' : ''}`}
                  value={form.email} onChange={(event) => setField('email', event.target.value)}
                  placeholder="name@example.com" autoComplete="email" />
                {errors.email && <span className="error-msg" role="alert">{errors.email}</span>}
              </div>
              <div className="field-group auth-field">
                <label htmlFor="login-password">كلمة المرور</label>
                <input id="login-password" type="password" className={`input ${errors.password ? 'invalid' : ''}`}
                  value={form.password} onChange={(event) => setField('password', event.target.value)}
                  autoComplete="current-password" />
                {errors.password && <span className="error-msg" role="alert">{errors.password}</span>}
              </div>
              <Button type="submit" size="md" className="auth-submit">
                <LogIn size={16} /> دخول
              </Button>
            </form>
          </>
        )}

        {mode === 'role-choice' && (
          <div className="account-role-screen">
            <p className="account-screen-intro">اختار نوع الحساب المناسب عشان نبدأ التسجيل.</p>
            <div className="account-role-grid">
              <article className="account-role-card">
                <span className="account-role-icon"><CircleUserRound size={25} /></span>
                <h3>أنا عميل</h3>
                <p>عايز أطلب خدمات الصيانة المنزلية بسهولة وأمان.</p>
                <Button onClick={() => chooseRole('customer-register')}>
                  التسجيل كعميل <ArrowLeft size={16} />
                </Button>
              </article>
              <article className="account-role-card technician-role">
                <span className="account-role-icon"><HardHat size={25} /></span>
                <h3>أنا فني</h3>
                <p>عايز أقدم خدماتي وأستقبل طلبات العملاء من خلال Salla7ly.</p>
                <Button onClick={() => chooseRole('technician-register')}>
                  التسجيل كفني <ArrowLeft size={16} />
                </Button>
              </article>
            </div>
            <button type="button" className="auth-back-link" onClick={() => setMode('login')}>
              <ArrowRight size={16} /> العودة لتسجيل الدخول
            </button>
          </div>
        )}

        {mode === 'customer-register' && (
          <form onSubmit={submitCustomer} className="customer-register-form">
            <button type="button" className="auth-back-link" onClick={() => chooseRole('role-choice')}>
              <ArrowRight size={16} /> تغيير نوع الحساب
            </button>
            <div className="account-form-title">
              <CircleUserRound size={20} />
              <div><h3>التسجيل كعميل</h3><p>املأ بياناتك الأساسية للبدء.</p></div>
            </div>
            {renderRegistrationFields()}
            {notice && <div className="registration-unavailable" role="alert">{notice}</div>}
            <Button type="submit" className="auth-submit"><UserPlus size={17} /> إنشاء حساب عميل</Button>
            <p className="registration-data-notice">لن يتم حفظ بياناتك في المتصفح أو إرسالها قبل ربط نظام مصادقة آمن.</p>
          </form>
        )}

        {mode === 'technician-register' && (
          <form onSubmit={submitTechnician} className="technician-register-form">
            <button type="button" className="auth-back-link" onClick={() => chooseRole('role-choice')}>
              <ArrowRight size={16} /> تغيير نوع الحساب
            </button>
            <div className="technician-progress" aria-label={`الخطوة ${step + 1} من ${TECHNICIAN_STEPS.length}`}>
              {TECHNICIAN_STEPS.map((label, index) => (
                <div key={label} className={`technician-progress-step ${index < step ? 'done' : ''} ${index === step ? 'active' : ''}`}>
                  <span>{index < step ? <Check size={14} /> : index + 1}</span>
                  <small>{label}</small>
                </div>
              ))}
            </div>

            {step === 0 && (
              <>
                <div className="account-form-title">
                  <BriefcaseBusiness size={20} />
                  <div><h3>بيانات الفني</h3><p>بياناتك وتخصصك المهني.</p></div>
                </div>
                {renderRegistrationFields({ includeSpecialty: true })}
              </>
            )}

            {step === 1 && (
              <div className="technician-identity-step">
                <div className="account-form-title">
                  <FileCheck2 size={20} />
                  <div><h3>توثيق الهوية</h3><p>ارفع الصور المطلوبة واكتب نبذة مهنية.</p></div>
                </div>
                <div className="identity-privacy-note">
                  <ShieldCheck size={19} />
                  <p>مستندات الهوية مخصصة لمراجعة فريق Salla7ly المخوّل فقط. في هذه النسخة لن تُرفع الصور أو تُحفظ؛ المعاينة مؤقتة داخل الصفحة.</p>
                </div>
                <div className="technician-uploads">
                  {uploadFields.map((field) => (
                    <IdentityUpload key={field.id} field={field} upload={uploads[field.id]}
                      error={errors[field.id]} onChange={selectUpload} />
                  ))}
                </div>
                <div className="field-group technician-bio-field">
                  <label htmlFor="technician-bio">نبذة عن خبرتك ومهاراتك</label>
                  <textarea id="technician-bio" className={`input ${errors.bio ? 'invalid' : ''}`}
                    value={form.bio} onChange={(event) => setField('bio', event.target.value)}
                    maxLength={1000} rows={4}
                    placeholder="اكتب عن سنوات خبرتك، المهارات التي تتقنها، ونماذج من أعمالك السابقة (50 حرفاً على الأقل)." />
                  <div className="technician-bio-footer">
                    {errors.bio ? <span className="error-msg" role="alert">{errors.bio}</span> : <span>لا تشارك معلومات حساسة إضافية.</span>}
                    <small>{form.bio.length}/1000</small>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="technician-assessment-step">
                <span className="technician-assessment-icon"><BadgeCheck size={27} /></span>
                <div className="account-form-title">
                  <HardHat size={20} />
                  <div><h3>اختبار المهارات</h3><p>اختبار عملي أمام فريق Salla7ly.</p></div>
                </div>
                <p className="technician-assessment-copy">
                  إكمال هذا النموذج لا يثبت المهارة العملية ولا يفعّل حساب الفني. بعد مراجعة الهوية، يحتاج الفريق إلى ترتيب اختبار عملي للتخصص المحدد.
                </p>
                <div className="technician-assessment-summary">
                  <span><Check size={16} /> التخصص الأساسي: <strong>{specialtyOptions.find(({ id }) => id === form.specialty)?.label}</strong></span>
                  <span><Clock3 size={16} /> موعد الاختبار يحدده الفريق بعد ربط نظام المراجعة.</span>
                  <span><ShieldCheck size={16} /> لا اعتماد تلقائياً؛ يلزم اجتياز الاختبار والموافقة النهائية.</span>
                </div>
                {notice && <div className="registration-unavailable" role="alert">{notice}</div>}
              </div>
            )}

            <div className="technician-form-actions">
              {step > 0 && (
                <Button type="button" variant="outline" onClick={() => { setNotice(''); setStep((current) => current - 1); }}>
                  <ArrowRight size={16} /> السابق
                </Button>
              )}
              {step < TECHNICIAN_STEPS.length - 1 ? (
                <Button type="button" onClick={nextTechnicianStep}>
                  التالي <ArrowLeft size={16} />
                </Button>
              ) : (
                <Button type="submit">
                  إرسال طلب المراجعة <ArrowLeft size={16} />
                </Button>
              )}
            </div>
            <p className="registration-data-notice">لا يتم إنشاء طلب أو حفظ بيانات الهوية قبل توفر خادم آمن ومراجعة إدارية.</p>
          </form>
        )}
      </div>
    </div>
  );
}
