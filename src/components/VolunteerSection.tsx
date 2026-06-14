import volunteersImage from "@/assets/volunteers.jpg";
import { Link } from "react-router-dom";
import "./VolunteerSection.css";

const roles = ["مهندسون ومعماريون", "معلمون ومدربون", "أخصائيون اجتماعيون", "دعم لوجستي وإداري"];

const VolunteerSection = () => (
  <section id="volunteer" className="volunteer">
    <div className="volunteer__container">
      <div className="volunteer__grid">
        <div>
          <span className="volunteer__tag">انضم إلينا</span>
          <h2 className="volunteer__title">كن جزءاً من التغيير</h2>
          <p className="volunteer__desc">
            نحتاج متطوعين في مجالات البناء والهندسة والتعليم والدعم النفسي. سجّل معنا وكن جزءاً من فريق يصنع المستقبل.
          </p>
          <ul className="volunteer__list">
            {roles.map((item) => (
              <li key={item} className="volunteer__list-item">
                <div className="volunteer__list-dot" />
                {item}
              </li>
            ))}
          </ul>
          <Link to="/register?role=volunteer" className="volunteer__btn">سجّل كمتطوع</Link>
        </div>
        <div className="volunteer__image-wrapper">
          <img src={volunteersImage} alt="متطوعون في سوريا" className="volunteer__image" loading="lazy" width={800} height={600} />
        </div>
      </div>
    </div>
  </section>
);

export default VolunteerSection;
