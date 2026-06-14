import "./StatsSection.css";

const stats = [
  { value: "1,200+", label: "منزل أُعيد بناؤه" },
  { value: "50+", label: "مدرسة تم ترميمها" },
  { value: "15,000+", label: "عائلة مستفيدة" },
  { value: "300+", label: "متطوع نشط" },
];

const StatsSection = () => (
  <section id="stats" className="stats">
    <div className="stats__container">
      <h2 className="stats__title">أثرنا بالأرقام</h2>
      <div className="stats__grid">
        {stats.map((stat) => (
          <div key={stat.label} className="stats__item">
            <div className="stats__value">{stat.value}</div>
            <div className="stats__label">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default StatsSection;
