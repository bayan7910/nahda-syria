import "./DonateSection.css";
import { Link } from "react-router-dom";

const donationTiers = [
  { amount: "$25", value: 25, desc: "توفير مواد بناء أساسية", highlight: false },
  { amount: "$100", value: 100, desc: "ترميم غرفة واحدة بالكامل", highlight: true },
  { amount: "$500", value: 500, desc: "المساهمة في إعادة بناء منزل", highlight: false },
];

const DonateSection = () => (
  <section id="donate" className="donate">
    <div className="donate__container">
      <div className="donate__header">
        <span className="donate__tag">ساهم معنا</span>
        <h2 className="donate__title">تبرعك يصنع الفرق</h2>
        <p className="donate__desc">اختر المبلغ الذي يناسبك وساهم في إعادة بناء حياة الآلاف</p>
      </div>
      <div className="donate__grid">
        {donationTiers.map((tier) => (
          <div key={tier.amount} className={`donate__card ${tier.highlight ? "donate__card--highlight" : ""}`}>
            <div className="donate__amount">{tier.amount}</div>
            <p className="donate__card-desc">{tier.desc}</p>
            <Link className="donate__btn" to={`/donate?amount=${tier.value}`}>تبرع الآن</Link>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default DonateSection;
