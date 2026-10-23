import { Star } from 'lucide-react';

export default function TestimonialCard({ item }) {
  return (
    <article className="card t-card">
      <div className="stars" aria-label={`${item.rating} / 5`}>
        {[1, 2, 3, 4, 5].map((n) => <Star key={n} size={16} className={n > item.rating ? 'off' : ''} />)}
      </div>
      <p>{item.text}</p>
      <footer>
        <span className="avatar">{item.name[0]}</span>
        <div><strong>{item.name}</strong><small>{item.city}</small></div>
      </footer>
    </article>
  );
}
