import { useState, useMemo } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/home/HeroSection.jsx';
import HowItWorks from '../components/home/HowItWorks.jsx';
import PricingSection from '../components/home/PricingSection.jsx';
import TechniciansSection from '../components/home/TechniciansSection.jsx';
import GuaranteeBanner from '../components/home/GuaranteeBanner.jsx';
import VideoSection from '../components/home/VideoSection.jsx';
import TestimonialsCarousel from '../components/home/TestimonialsCarousel.jsx';
import SectionTitle from '../components/common/SectionTitle.jsx';
import ServiceCard from '../components/common/ServiceCard.jsx';
import FAQAccordion from '../components/common/FAQAccordion.jsx';
import { services, categories } from '../data/services.js';
import { faqs } from '../data/faqs.js';
import { useApp } from '../context/AppContext.jsx';

export default function Home() {
  const { t } = useApp();
  const [activeCategory, setActiveCategory] = useState('all');

  // Filter 4 core services by active category
  const filteredServices = useMemo(() => {
    const core = services.slice(0, 4);
    if (activeCategory === 'all') return core;
    return core.filter((s) => s.category === activeCategory);
  }, [activeCategory]);

  return (
    <>
      <HeroSection />

      {/* Services Section with 4 Core Services arranged side-by-side & interactive category filtering */}
      <section className="section">
        <div className="container">
          <SectionTitle
            title={t('ourServices')}
            subtitle="اختر من خدماتنا الأساسية الأربعة في التجمع الخامس مع أسعار تقديرية وضمان 30 يوم"
            action={
              <Link to="/services" className="text-link">
                {t('viewAll')} <ArrowLeft size={16} className="arrow" />
              </Link>
            }
          />

          {/* Interactive Category Filter Chips */}
          <div className="chips" style={{ marginBottom: '1.25rem' }} role="tablist" aria-label="تصفية الخدمات">
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={activeCategory === c.id}
                className={`chip ${activeCategory === c.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(c.id)}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* 4 Services Side-by-side Grid */}
          <div className={filteredServices.length === 4 ? 'grid grid-4' : 'grid grid-2'}>
            {filteredServices.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <VideoSection />

      {/* How It Works with highlighted step numbers & designated icons */}
      <HowItWorks />

      {/* Pricing Section */}
      <PricingSection />

      {/* Technicians Section */}
      <TechniciansSection />

      {/* Guarantee Banner */}
      <GuaranteeBanner />

      {/* Interactive Testimonials Carousel */}
      <section className="section alt">
        <div className="container">
          <SectionTitle title={t('testimonialsTitle')} subtitle={t('testimonialsSub')} />
          <TestimonialsCarousel />
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="section">
        <div className="container">
          <SectionTitle title={t('faqTitle')} subtitle={t('faqSub')} />
          <FAQAccordion items={faqs} />
        </div>
      </section>
    </>
  );
}
