import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <div className="faq">
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <div key={item.q} className={`faq-item ${open ? 'open' : ''}`}>
            <button aria-expanded={open} onClick={() => setOpenIndex(open ? -1 : i)}>
              {item.q} <ChevronDown size={18} />
            </button>
            <div className="answer">{item.a}</div>
          </div>
        );
      })}
    </div>
  );
}
