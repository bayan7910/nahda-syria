import { ClipboardList, HardHat, MapPinned, HandCoins, CheckCircle2 } from "lucide-react";
import "./HowItWorksSection.css";

const steps = [
  { icon: ClipboardList, title: "تسجيل الحالة", desc: "المتضرر يسجّل حالته مع توثيق الأضرار بالصور والموقع الجغرافي" },
  { icon: HardHat, title: "التقييم الهندسي", desc: "مهندس متطوّع يعاين الحالة ويضع خطة الترميم والتكلفة المقدّرة" },
  { icon: MapPinned, title: "عرض المشروع", desc: "المشروع يُنشر على الخريطة التفاعلية مع تفاصيله ومراحله" },
  { icon: HandCoins, title: "التمويل والتنفيذ", desc: "المتبرعون يموّلون المشروع وتُتابع مراحل البناء بأجهزة IoT" },
  { icon: CheckCircle2, title: "التسليم والتوثيق", desc: "إغلاق المشروع وتوثيق النتيجة النهائية للمتبرعين" },
];

const HowItWorksSection = () => (
  <section id="how" className="how">
    <div className="how__container">
      <div className="how__header">
        <span className="how__tag">آلية العمل</span>
        <h2 className="how__title">كيف تعمل المنصة؟</h2>
        <p className="how__description">
          خمس خطوات واضحة من تسجيل الحالة حتى تسليم المشروع للمستفيد
        </p>
      </div>
      <div className="how__timeline">
        {steps.map((step, i) => (
          <div key={step.title} className="how__step">
            <div className="how__step-number">{i + 1}</div>
            <div className="how__step-icon">
              <step.icon size={28} />
            </div>
            <h3 className="how__step-title">{step.title}</h3>
            <p className="how__step-desc">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorksSection;
