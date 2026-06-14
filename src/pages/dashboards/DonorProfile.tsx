import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import "./DonorProfile.css";

const INTERESTS = ["تعليم", "صحة", "مياه", "إيواء", "أطفال", "كهرباء", "بنية تحتية", "مساجد ودور عبادة"];
const TIERS = [
  { id: "bronze", label: "متبرّع برونزي", min: 0, icon: "🥉" },
  { id: "silver", label: "متبرّع فضّي", min: 500, icon: "🥈" },
  { id: "gold", label: "متبرّع ذهبي", min: 2500, icon: "🥇" },
  { id: "diamond", label: "متبرّع ماسي", min: 10000, icon: "💎" },
];

const DonorProfile = () => {
  const { user } = useAuth();
  const total = 4250; // demo
  const tier = [...TIERS].reverse().find((t) => total >= t.min) || TIERS[0];
  const next = TIERS.find((t) => t.min > total);

  const [bio, setBio] = useState("متبرّع منتظم يؤمن أن إعادة الإعمار تبدأ من القلب.");
  const [city, setCity] = useState("دمشق، سوريا");
  const [tags, setTags] = useState<string[]>(["تعليم", "إيواء"]);
  const [publicProfile, setPublicProfile] = useState(true);
  const [monthly, setMonthly] = useState(false);
  const [emailNotif, setEmailNotif] = useState(true);

  const initials = (user?.fullName || "؟").split(/\s+/).slice(0, 2).map((w) => w[0]).join("");

  const toggleTag = (t: string) =>
    setTags((p) => (p.includes(t) ? p.filter((x) => x !== t) : [...p, t]));

  return (
    <div className="dprofile">
      <header className="dprofile__head">
        <div className="dprofile__avatar">{initials}</div>
        <div className="dprofile__head-info">
          <h1 className="dprofile__name">{user?.fullName}</h1>
          <p className="dprofile__bio">{bio}</p>
          <div className="dprofile__chips">
            <span className="dprofile__chip">📍 {city}</span>
            <span className="dprofile__chip dprofile__chip--gold">{tier.icon} {tier.label}</span>
            {publicProfile && <span className="dprofile__chip">🌐 بروفايل عام</span>}
          </div>
        </div>
        <button className="dprofile__edit">✏️ تعديل الصورة</button>
      </header>

      <section className="dprofile__tier">
        <div className="dprofile__tier-head">
          <span>{tier.icon} {tier.label}</span>
          {next && <span className="dprofile__tier-next">${total} / ${next.min} للوصول لـ {next.label}</span>}
        </div>
        <div className="dprofile__tier-bar">
          <div style={{ width: next ? `${Math.min(100, (total / next.min) * 100)}%` : "100%" }} />
        </div>
      </section>

      <div className="dprofile__grid">
        <article className="dprofile__card">
          <h2>بصمتي</h2>
          <div className="impact">
            <div className="impact__item"><span className="impact__v">$4,250</span><span>تبرعات</span></div>
            <div className="impact__item"><span className="impact__v">7</span><span>مشاريع</span></div>
            <div className="impact__item"><span className="impact__v">23</span><span>عائلة</span></div>
            <div className="impact__item"><span className="impact__v">340م²</span><span>تم ترميمها</span></div>
          </div>
        </article>

        <article className="dprofile__card">
          <h2>اهتماماتي</h2>
          <p className="dprofile__hint">اختر المجالات لنقترح عليك مشاريع مناسبة.</p>
          <div className="dprofile__tags">
            {INTERESTS.map((t) => (
              <button key={t} type="button"
                className={`dprofile__tag ${tags.includes(t) ? "is-active" : ""}`}
                onClick={() => toggleTag(t)}>{t}</button>
            ))}
          </div>
        </article>

        <article className="dprofile__card dprofile__card--span">
          <h2>عن نفسي</h2>
          <label className="dprofile__label">نبذة قصيرة</label>
          <textarea className="dprofile__textarea" value={bio} onChange={(e) => setBio(e.target.value)}
            rows={3} placeholder="عرّف بنفسك..." />
          <label className="dprofile__label">البلد والمدينة</label>
          <input className="dprofile__input" value={city} onChange={(e) => setCity(e.target.value)} />
        </article>

        <article className="dprofile__card dprofile__card--span">
          <h2>الإعدادات</h2>
          <label className="dprofile__row-toggle">
            <div>
              <strong>إظهار اسمي في "أبرز المتبرعين"</strong>
              <p>سيظهر اسمك وشارتك في الصفحات العامة.</p>
            </div>
            <input type="checkbox" checked={publicProfile} onChange={(e) => setPublicProfile(e.target.checked)} />
          </label>
          <label className="dprofile__row-toggle">
            <div>
              <strong>إشعارات بالبريد عند تقدّم مشاريعي</strong>
              <p>نُعلمك عند أي تحديث على مشروع دعمته.</p>
            </div>
            <input type="checkbox" checked={emailNotif} onChange={(e) => setEmailNotif(e.target.checked)} />
          </label>
          <label className="dprofile__row-toggle">
            <div>
              <strong>تبرّع شهري تلقائي</strong>
              <p>كرّم عطاءك بصورة مستدامة (يتم لاحقاً عبر بوابة الدفع).</p>
            </div>
            <input type="checkbox" checked={monthly} onChange={(e) => setMonthly(e.target.checked)} />
          </label>

          <div className="dprofile__save-row">
            <button className="dprofile__save">💾 حفظ التغييرات</button>
          </div>
        </article>
      </div>
    </div>
  );
};

export default DonorProfile;