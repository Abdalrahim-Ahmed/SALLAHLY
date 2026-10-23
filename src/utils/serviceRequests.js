import { FEES, getServiceById } from '../data/services.js';

const REQUESTS_KEY = 'salla7ly-service-requests';
const AUTH_USER_KEY = 'salla7ly-auth-user';

function readRequests() {
  const raw = localStorage.getItem(REQUESTS_KEY);
  if (!raw) return [];

  let requests;
  try {
    requests = JSON.parse(raw);
  } catch {
    throw new Error('تعذر قراءة طلبات الخدمة المحفوظة. لم يتم تأكيد الطلب.');
  }
  if (!Array.isArray(requests)) {
    throw new Error('تعذر قراءة طلبات الخدمة المحفوظة.');
  }
  return requests;
}

function makeRequestId(existingIds) {
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const random = globalThis.crypto?.randomUUID?.().replace(/-/g, '').slice(0, 8)
      || Math.random().toString(36).slice(2, 10);
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const requestId = `SLH-${date}-${random.toUpperCase()}`;
    if (!existingIds.has(requestId)) return requestId;
  }
  throw new Error('تعذر إنشاء رقم فريد لطلب الخدمة. حاول مرة أخرى.');
}

export function createServiceRequest(data, user) {
  if (!user?.id) {
    throw new Error('سجّل الدخول قبل تأكيد طلب الخدمة.');
  }

  let savedUser;
  try {
    savedUser = JSON.parse(localStorage.getItem(AUTH_USER_KEY) || 'null');
  } catch {
    throw new Error('تعذر التحقق من جلسة الدخول. سجّل الدخول مرة أخرى.');
  }
  if (!savedUser?.id || savedUser.id !== user.id) {
    throw new Error('انتهت جلسة الدخول. سجّل الدخول مرة أخرى قبل تأكيد الطلب.');
  }

  const service = getServiceById(data.serviceId);
  if (!service || !data.problem?.trim() || !data.address?.trim() || !data.date || !data.time) {
    throw new Error('بيانات الطلب غير مكتملة. راجع التفاصيل وحاول مرة أخرى.');
  }

  const requests = readRequests();
  const requestId = makeRequestId(new Set(requests.map((request) => request.requestId)));
  const request = {
    requestId,
    userId: user.id,
    serviceId: service.id,
    servicePrice: service.price,
    inspectionFee: FEES.inspection,
    transportFee: FEES.transport,
    name: user.name,
    email: user.email,
    phone: user.phone,
    problem: data.problem.trim(),
    address: data.address.trim(),
    date: data.date,
    time: data.time,
    createdAt: new Date().toISOString(),
  };

  try {
    localStorage.setItem(REQUESTS_KEY, JSON.stringify([...requests, request]));
  } catch {
    throw new Error('تعذر حفظ طلب الخدمة. تحقق من مساحة التخزين وحاول مرة أخرى.');
  }
  return request;
}

export function getServiceRequest(requestId, userId) {
  if (!requestId || !userId) return null;
  let savedUser;
  try {
    savedUser = JSON.parse(localStorage.getItem(AUTH_USER_KEY) || 'null');
  } catch {
    throw new Error('تعذر التحقق من جلسة الدخول. سجّل الدخول مرة أخرى.');
  }
  if (savedUser?.id !== userId) return null;

  return readRequests().find(
    (request) => request.requestId === requestId && request.userId === userId
  ) || null;
}
