import SectionTitle from '../common/SectionTitle.jsx';
import { useApp } from '../../context/AppContext.jsx';

const steps = [
  {
    num: '01',
    icon: '/images/services/icons/maintenance-icon.png',
    title: 'اختر الخدمة المطلوبة',
    text: 'تصفح قائمة خدماتنا الأساسية الأربعة في التجمع الخامس وحدد نوع الصيانة التي يحتاجها بيتك.',
  },
  {
    num: '02',
    icon: '/images/services/icons/electric-icon.png',
    title: 'صف العطل وحدد الموعد',
    text: 'اكتب تفاصيل المشكلة واختر اليوم والساعة الأنسب لك من المواعيد المتاحة بضغطة زر واحدة.',
  },
  {
    num: '03',
    icon: '/images/services/icons/plumbing-icon.png',
    title: 'يصلك فني معتمد مع الضمان',
    text: 'يصلك فني متخصص في الموعد المحدد ومعه المعدات الأصلية، مع ضمان معتمد لمدة 30 يوماً.',
  },
];

export default function HowItWorks() {
  const { t } = useApp();
  return (
    <section id="how" className="section">
      <div className="container">
        <SectionTitle title={t('howTitle')} subtitle={t('howSub')} />
        <div className="grid grid-3">
          {steps.map((step) => (
            <div className="step-card" key={step.num}>
              <div className="step-header">
                {/* Highlighted Step Number */}
                <div className="step-number-badge">{step.num}</div>

                {/* Designated Icon from Drive Assets */}
                <div className="icon-box" style={{ width: '48px', height: '48px' }}>
                  <img
                    src={step.icon}
                    alt={step.title}
                    width={26}
                    height={26}
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </div>

              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
