import { CheckCircle2, Truck, ShieldCheck } from 'lucide-react';
import SectionTitle from '../common/SectionTitle.jsx';
import { useApp } from '../../context/AppContext.jsx';
import { FEES } from '../../data/services.js';
import { formatPrice } from '../../utils/formatters.js';

export default function PricingSection() {
  const { t } = useApp();
  const price = 120;
  return (
    <section id="pricing" className="section alt">
      <div className="container">
        <SectionTitle title={t('priceTitle')} subtitle={t('priceSub')} />
        <div className="grid grid-2 pricing-grid">
          <div className="card">
            <h3 style={{ marginBottom: '1rem' }}>مثال على تكلفة خدمة</h3>
            <div className="line-item">
              <span className="lbl">
                <img src="/images/services/icons/conditioner-icon.png" alt="تكييف" width={16} height={16} style={{ objectFit: 'contain' }} /> سعر الخدمة
              </span>
              <b>{formatPrice(price)}</b>
            </div>
            <div className="line-item"><span className="lbl"><CheckCircle2 size={16} /> رسوم المعاينة</span><b>{formatPrice(FEES.inspection)}</b></div>
            <div className="line-item"><span className="lbl"><Truck size={16} /> رسوم الانتقال</span><b>{formatPrice(FEES.transport)}</b></div>
            <div className="total-bar"><span>الإجمالي التقديري</span><span>{formatPrice(price + FEES.inspection + FEES.transport)}</span></div>
          </div>
          <div className="card price-panel">
            <div className="policy-heading">
              <span className="policy-heading-icon"><ShieldCheck size={21} /></span>
              <div>
                <h3>سياسة الإلغاء</h3>
                <span>رسوم الانتقال مستحقة بعد الإرسال</span>
              </div>
            </div>
            <p className="policy-description">
              رسوم الانتقال قد تُستحق عند إرسال الفني حتى لو لم تكتمل الإصلاح، وفق سياسة الإلغاء.
            </p>
            <div className="policy-items">
              <div className="policy-item">
                <span className="policy-icon green"><ShieldCheck size={18} /></span>
                <span className="policy-item-label">إلغاء قبل الإرسال</span>
                <strong className="policy-status free">مجاني</strong>
              </div>
              <div className="policy-item">
                <span className="policy-icon amber"><Truck size={18} /></span>
                <span className="policy-item-label">إلغاء بعد الإرسال</span>
                <strong className="policy-status chargeable">رسوم الانتقال مستحقة</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
