import { RotateCcw } from 'lucide-react';
import Button from '../components/common/Button.jsx';

export default function NotFound() {
  return (
    <section className="section">
      <div className="container center" style={{ maxWidth: '540px', paddingBlock: '3rem' }}>
        <h1 style={{ fontSize: '5rem', color: 'var(--btn)', fontWeight: 800, lineHeight: 1 }}>404</h1>
        <h2 style={{ fontSize: '1.5rem', marginBlock: '0.8rem 0.5rem' }}>الصفحة غير موجودة</h2>
        <p className="muted" style={{ marginBottom: '1.8rem', fontSize: '1rem' }}>
          عذراً، الصفحة التي تبحث عنها غير موجودة أو ربما تم تغيير مسارها. يمكنك دائماً العودة إلى الصفحة الرئيسية أو تصفح خدماتنا.
        </p>
        <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button to="/">
            <RotateCcw size={16} /> العودة للصفحة الرئيسية
          </Button>
          <Button to="/services" variant="outline">
            تصفح الخدمات
          </Button>
        </div>
      </div>
    </section>
  );
}
