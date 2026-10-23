const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const emptyBooking = {
  serviceId: '',
  address: '',
  problem: '',
  date: '',
  time: '',
};

export const STEPS = ['الخدمة', 'التفاصيل', 'التأكيد'];

export function validateStep(step, data) {
  const errors = {};
  if (step === 0 && !data.serviceId) errors.serviceId = 'اختر الخدمة المطلوبة';

  if (step === 1) {
    if (data.problem.trim().length < 10) errors.problem = 'اكتب وصفاً مختصراً (10 أحرف على الأقل)';
    if (data.address.trim().length < 6) errors.address = 'اكتب عنواناً واضحاً لتنفيذ الخدمة';
    if (!data.date) errors.date = 'اختر اليوم المناسب للزيارة';
    if (!data.time) errors.time = 'اختر التوقيت المناسب';
  }

  return errors;
}

export function validateContact({ name, email, message }) {
  const errors = {};
  if (name.trim().length < 3) errors.name = 'اكتب اسمك';
  if (!EMAIL_RE.test(email)) errors.email = 'البريد الإلكتروني غير صحيح';
  if (message.trim().length < 10) errors.message = 'الرسالة قصيرة جداً';
  return errors;
}
