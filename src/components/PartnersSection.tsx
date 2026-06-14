import "./PartnersSection.css";

const partners = ["الأمم المتحدة", "الهلال الأحمر", "يونيسف", "منظمة الصحة العالمية", "البنك الدولي", "أطباء بلا حدود"];

const PartnersSection = () => (
  <section id="partners" className="partners">
    <div className="partners__container">
      <span className="partners__tag">شركاؤنا</span>
      <h2 className="partners__title">نعمل مع أبرز المنظمات</h2>
      <div className="partners__grid">
        {partners.map((partner) => (
          <div key={partner} className="partners__item">
            <span className="partners__name">{partner}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default PartnersSection;
