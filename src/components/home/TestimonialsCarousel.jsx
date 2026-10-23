import { useState, useEffect, useRef } from 'react';
import { Star, ChevronRight, ChevronLeft, Quote } from 'lucide-react';
import { testimonials } from '../../data/testimonials.js';
import { useApp } from '../../context/AppContext.jsx';

export default function TestimonialsCarousel() {
  const { lang } = useApp();
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartRef = useRef(0);

  // Auto-play timer
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const prev = () => {
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const handleTouchStart = (e) => {
    touchStartRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const diff = touchStartRef.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        // swipe left
        lang === 'ar' ? prev() : next();
      } else {
        // swipe right
        lang === 'ar' ? next() : prev();
      }
    }
  };

  const item = testimonials[current];

  return (
    <div
      className="carousel-wrapper"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="آراء وتجارب العملاء"
    >
      {/* Navigation Buttons */}
      <button
        type="button"
        className="carousel-nav-btn prev"
        onClick={lang === 'ar' ? next : prev}
        aria-label="السابق"
      >
        <ChevronRight size={22} />
      </button>

      <button
        type="button"
        className="carousel-nav-btn next"
        onClick={lang === 'ar' ? prev : next}
        aria-label="التالي"
      >
        <ChevronLeft size={22} />
      </button>

      {/* Active Testimonial Card */}
      <div className="carousel-card" key={item.id}>
        <div style={{ display: 'inline-flex', padding: '0.5rem', background: 'var(--tint)', borderRadius: '50%', color: 'var(--primary)', marginBottom: '0.75rem' }}>
          <Quote size={24} />
        </div>

        <div className="carousel-stars" aria-label={`تقييم: ${item.rating} من 5`}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} size={18} className={star > item.rating ? 'off' : ''} />
          ))}
        </div>

        <p className="carousel-text">"{item.text}"</p>

        <div className="carousel-author">
          <div className="carousel-avatar">{item.name[0]}</div>
          <div style={{ textAlign: 'start' }}>
            <strong style={{ display: 'block', fontSize: '1rem', color: 'var(--headings)' }}>
              {item.name}
            </strong>
            <small style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>{item.city}</small>
          </div>
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="carousel-dots" role="tablist">
        {testimonials.map((t, idx) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={current === idx}
            aria-label={`الانتقال لرأي ${t.name}`}
            className={`carousel-dot ${current === idx ? 'active' : ''}`}
            onClick={() => setCurrent(idx)}
          />
        ))}
      </div>
    </div>
  );
}
