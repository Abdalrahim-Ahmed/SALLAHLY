import { ShieldCheck } from 'lucide-react';
import Button from '../common/Button.jsx';

export default function GuaranteeBanner() {
  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="banner">
          <div className="icon-wrap"><ShieldCheck size={40} /></div>
          <h2>ضمان 30 يوم</h2>
          <p>ضمان 30 يوم على الخدمة بعد إتمامها. لو ظهرت مشكلة مرتبطة بنفس الإصلاح خلال فترة الضمان، تقدر تقدم طلب مراجعة أو إصلاح وفقاً لشروط الضمان.</p>
          <Button to="/contact" variant="accent" size="lg">تقديم مطالبة</Button>
        </div>
      </div>
    </section>
  );
}
