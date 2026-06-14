import { HeartHandshake, HardHat, MapPin } from "lucide-react";
import "./AboutSection.css";

const items = [
  { icon: HeartHandshake, title: "ربط المتضررين بالمتبرعين", desc: "نوثّق حالات الأضرار ونصل أصحابها مباشرة بمتبرعين موثوقين بشفافية كاملة" },
  { icon: HardHat, title: "إشراف المهندسين", desc: "شبكة من المهندسين المتطوعين تشرف على كل مشروع وتضمن جودة البناء" },
  { icon: MapPin, title: "خريطة تفاعلية", desc: "كل مشروع له موقعه على الخريطة مع تتبع مباشر لمراحل البناء حتى التسليم" },
];

const AboutSection = () => (
  <section id="about" className="about">
    <div className="about__container">
      <div className="about__header">
        <span className="about__tag">من نحن</span>
        <h2 className="about__title">منصة موحّدة لتنسيق جهود إعادة الإعمار</h2>
        <p className="about__description">
          نهضة سوريا منصة رقمية غير ربحية تنظّم جهود إعادة الإعمار في سوريا، من خلال ربط المتضررين بالمتبرعين والمهندسين، وعرض المشاريع على خريطة تفاعلية تتبّع مراحل البناء بشفافية كاملة.
        </p>
      </div>
      <div className="about__grid">
        {items.map((item) => (
          <div key={item.title} className="about__card">
            <div className="about__card-icon">
              <item.icon size={28} />
            </div>
            <h3 className="about__card-title">{item.title}</h3>
            <p className="about__card-desc">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default AboutSection;
