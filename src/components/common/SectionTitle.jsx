export default function SectionTitle({ title, subtitle, action }) {
  return (
    <div className="section-head">
      <div className="section-title">
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
