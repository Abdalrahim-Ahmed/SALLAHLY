import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  AirVent,
  ArrowLeft,
  CheckCircle2,
  Droplets,
  LayoutGrid,
  PlugZap,
  RotateCcw,
  Search,
  ShieldCheck,
  Sparkles,
  Wrench,
  X,
} from 'lucide-react';
import ServiceCard from '../components/common/ServiceCard.jsx';
import Button from '../components/common/Button.jsx';
import { services, categories, handleImageError } from '../data/services.js';

const categoryIcons = {
  all: LayoutGrid,
  ac: AirVent,
  electric: PlugZap,
  plumbing: Droplets,
  maintenance: Wrench,
};

export default function Services() {
  const [params, setParams] = useSearchParams();
  const [category, setCategory] = useState('all');
  const query = params.get('q') || '';

  const results = useMemo(() => {
    const term = query.trim().toLocaleLowerCase();
    return services.filter(
      (service) =>
        (category === 'all' || service.category === category) &&
        (!term ||
          service.title.toLocaleLowerCase().includes(term) ||
          service.short.toLocaleLowerCase().includes(term) ||
          service.description.toLocaleLowerCase().includes(term))
    );
  }, [query, category]);

  const updateQuery = (value) => {
    setParams((current) => {
      const next = new URLSearchParams(current);
      if (value) next.set('q', value);
      else next.delete('q');
      return next;
    }, { replace: true });
  };

  const resetAll = () => {
    setCategory('all');
    updateQuery('');
  };

  return (
    <div className="services-page">
      <section className="services-hero">
        <div className="container services-hero-inner">
          <div className="services-hero-copy">
            <span className="services-eyebrow">
              <ShieldCheck size={16} />
              <span>صيانة منزلية موثوقة في التجمع الخامس</span>
            </span>
            <h1>
              محتاج تصلّح حاجة
              <br />
              <span>في بيتك؟ إحنا معاك</span>
            </h1>
            <p className="services-hero-description">
              من التكييف والسباكة للكهرباء والصيانة العامة، اختار الخدمة المناسبة واحجزها بسهولة.
            </p>

            <form
              className="services-search"
              role="search"
              onSubmit={(event) => event.preventDefault()}
            >
              <Search size={21} aria-hidden="true" />
              <input
                type="search"
                value={query}
                onChange={(event) => updateQuery(event.target.value)}
                placeholder="بتدور على إيه؟ مثال: صيانة تكييف"
                aria-label="ابحث عن خدمة"
              />
              {query && (
                <button
                  className="services-search-clear"
                  type="button"
                  onClick={() => updateQuery('')}
                  aria-label="مسح البحث"
                >
                  <X size={18} />
                </button>
              )}
              <Button type="submit" size="md">
                ابحث الآن <ArrowLeft size={17} />
              </Button>
            </form>

            <div className="services-hero-points">
              <span><CheckCircle2 size={17} /> فنيون متخصصون</span>
              <span><ShieldCheck size={17} /> ضمان 30 يوم</span>
              <span><Sparkles size={17} /> أسعار واضحة</span>
            </div>
          </div>

          <div className="services-hero-visual">
            <img
              src="/images/services/photos/ac-maintenance.jpg"
              onError={handleImageError}
              alt="فني متخصص يعمل على صيانة جهاز تكييف"
            />
            <div className="services-visual-shade" />
            <div className="services-visual-badge">
              <span className="services-visual-icon"><ShieldCheck size={21} /></span>
              <span>
                <strong>راحة بالك أولويتنا</strong>
                <small>ضمان معتمد على كل خدمة</small>
              </span>
            </div>
            <div className="services-visual-caption">
              <span className="services-visual-dot" />
              <span>فنيين جاهزين لمساعدتك</span>
            </div>
          </div>
        </div>
      </section>

      <section className="services-catalog" aria-labelledby="services-heading">
        <div className="container">
          <div className="services-catalog-heading">
            <div>
              <span className="services-section-kicker">خدماتنا</span>
              <h2 id="services-heading">كل اللي بيتك محتاجه</h2>
              <p>خدمات منزلية أساسية، بأسعار تقديرية واضحة وخطوات حجز بسيطة.</p>
            </div>
            <span className="services-result-count" aria-live="polite">
              {results.length} {results.length === 1 ? 'خدمة متاحة' : 'خدمات متاحة'}
            </span>
          </div>

          <div className="services-filters" aria-label="تصفية الخدمات">
            <div className="services-filter-list">
              {categories.map((item) => {
                const Icon = categoryIcons[item.id] || Wrench;
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`services-filter ${category === item.id ? 'active' : ''}`}
                    aria-pressed={category === item.id}
                    onClick={() => setCategory(item.id)}
                  >
                    <Icon size={17} />
                    {item.label}
                  </button>
                );
              })}
            </div>
            {query && (
              <span className="services-search-summary">
                نتائج البحث عن: <strong>{query}</strong>
              </span>
            )}
          </div>

          {results.length ? (
            <div className="services-grid">
              {results.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          ) : (
            <div className="services-empty">
              <span className="services-empty-icon"><Search size={25} /></span>
              <h3>ما لقيناش خدمة مطابقة</h3>
              <p>جرّب كلمة بحث مختلفة أو اعرض كل الخدمات المتاحة.</p>
              <Button onClick={resetAll} variant="outline" size="md">
                <RotateCcw size={16} /> عرض كل الخدمات
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
