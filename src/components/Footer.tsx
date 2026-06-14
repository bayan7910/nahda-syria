import "./Footer.css";

const Footer = () => (
  <footer className="footer">
    <div className="footer__container">
      <div className="footer__grid">
        <div>
          <span className="footer__logo">نهضة سوريا</span>
          <p className="footer__about">
            مؤسسة غير ربحية تعمل على
             إعادة بناء المجتمعات السورية 
             وتوفير حياة كريمة لكل مواطن.
          </p>
        </div>
        <div>
          <h4 className="footer__heading" >روابط سريعة</h4>
          <div className="footer__links">
            {["من نحن", "مشاريعنا", "تبرع", "تطوع", "تواصل معنا"].map((link) => (
              <a key={link} href="#">{link}</a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="footer__heading">تواصل معنا</h4>
          <div className="footer__contact">
            <p>info@nahda-syria.org</p>
            <p>+963 11 000 0000</p>
            <p>دمشق، سوريا</p>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        © 2026 نهضة سوريا. جميع الحقوق محفوظة.
      </div>
    </div>
  </footer>
);

export default Footer;
