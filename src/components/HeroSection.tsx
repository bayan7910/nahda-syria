import { ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-reconstruction.jpg";
import "./HeroSection.css";

const HeroSection = () => (
  <section className="hero">
    <img src={heroImage} alt="إعادة إعمار سوريا" className="hero__image" width={1920} height={1080} />
    <div className="hero__overlay" />
    <div className="hero__content">
      <h1 className="hero__title">
        معاً نعيد بناء
        <br />
        <span className="hero__title-accent">سوريا</span>
      </h1>
      <p className="hero__description">
        منصة رقمية تربط المتضررين بالمتبرعين والمهندسين، وتعرض المشاريع على خريطة تفاعلية تتبّع مراحل البناء لحظة بلحظة
      </p>
      <div className="hero__actions">
        <Link to="/donate" className="hero__btn-primary">ساهم الآن</Link>
        <a href="#map" className="hero__btn-secondary">استكشف الخريطة</a>
      </div>
    </div>
    <a href="#about" className="hero__scroll">
      <ArrowDown size={28} />
    </a>
  </section>
);

export default HeroSection;
