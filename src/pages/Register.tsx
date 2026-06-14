import { useState, FormEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { authApi, ApiError } from "@/services/api";
import PhoneInput from "@/components/PhoneInput/PhoneInput";
import "./Login.css";

type Role = "affected" | "donor" | "volunteer" | "partner";

const ROLES: Array<{ id: Role; icon: string; label: string; desc: string }> = [
  { id: "affected", icon: "🏚️", label: "متضرر", desc: "أحتاج ترميم أو إعمار" },
  { id: "donor", icon: "💰", label: "متبرّع", desc: "أرغب بدعم المشاريع" },
  { id: "volunteer", icon: "👷", label: "متطوّع / مهندس", desc: "أساهم بخبرتي" },
  { id: "partner", icon: "🤝", label: "شريك", desc: "منظمة أو شركة داعمة" },
];

const Register = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialRole = (searchParams.get("role") as Role) || null;
  const validRoles: Role[] = ["affected", "donor", "volunteer", "partner"];
  const [role, setRole] = useState<Role | null>(
    initialRole && validRoles.includes(initialRole) ? initialRole : null
  );
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Common fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+963");
  const [password, setPassword] = useState("");

  // Role-specific fields
  const [extra, setExtra] = useState<Record<string, string>>({});

  const updateExtra = (k: string, v: string) => setExtra((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!role) return;
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      // .NET endpoint expected: POST /auth/register with { role, fullName, email, password, phone, profile }
      await authApi.register({ fullName, email, password, phone, role, profile: extra });
      setSuccess("تم إنشاء الحساب بنجاح! يمكنك تسجيل الدخول الآن.");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      if (err instanceof ApiError) setError(err.message);
      else setError("تعذّر الاتصال بالخادم. تأكد من تشغيل الـ Backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="auth-page">
        <div className="auth-page__card">
          <h1 className="auth-page__title">إنشاء حساب جديد</h1>
          <p className="auth-page__subtitle">
            {role ? "أكمل بياناتك أدناه" : "اختر نوع حسابك للبدء"}
          </p>

          {!role && (
            <div className="role-grid">
              {ROLES.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  className="role-grid__btn"
                  onClick={() => setRole(r.id)}
                >
                  <div className="role-grid__icon">{r.icon}</div>
                  <span className="role-grid__label">{r.label}</span>
                  <span className="role-grid__desc">{r.desc}</span>
                </button>
              ))}
            </div>
          )}

          {role && (
            <form onSubmit={handleSubmit} noValidate>
              {error && <div className="auth-form__error">{error}</div>}
              {success && <div className="auth-form__success">{success}</div>}

              <div className="role-grid" style={{ gridTemplateColumns: "1fr" }}>
                <div className={`role-grid__btn role-grid__btn--active`} onClick={() => setRole(null)} role="button">
                  <span className="role-grid__icon">
                    {ROLES.find((r) => r.id === role)?.icon}
                  </span>
                  <span className="role-grid__label">
                    {ROLES.find((r) => r.id === role)?.label}
                  </span>
                  <span className="role-grid__desc">اضغط للتغيير</span>
                </div>
              </div>

              {/* Common fields */}
              <div className="auth-form__row">
                <div className="auth-form__group">
                  <label className="auth-form__label">الاسم الكامل</label>
                  <input className="auth-form__input" required
                    value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </div>
                <div className="auth-form__group">
                  <label className="auth-form__label">رقم الهاتف</label>
                  <PhoneInput value={phone} onChange={setPhone} required />
                </div>
              </div>

              <div className="auth-form__group">
                <label className="auth-form__label">البريد الإلكتروني</label>
                <input className="auth-form__input" type="email" required
                  value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>

              <div className="auth-form__group">
                <label className="auth-form__label">كلمة المرور</label>
                <input className="auth-form__input" type="password" required minLength={6}
                  value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>

              {/* Role-specific */}
              {role === "affected" && (
                <>
                  <div className="auth-form__group">
                    <label className="auth-form__label">المحافظة والمنطقة</label>
                    <input className="auth-form__input" required
                      value={extra.location || ""} onChange={(e) => updateExtra("location", e.target.value)}
                      placeholder="مثال: حلب - حي السكري" />
                  </div>
                  <div className="auth-form__group">
                    <label className="auth-form__label">نوع الضرر</label>
                    <select className="auth-form__select" required
                      value={extra.damageType || ""} onChange={(e) => updateExtra("damageType", e.target.value)}>
                      <option value="">اختر...</option>
                      <option>دمار كلي</option>
                      <option>دمار جزئي</option>
                      <option>أضرار طفيفة</option>
                    </select>
                  </div>
                  <div className="auth-form__group">
                    <label className="auth-form__label">وصف الحالة</label>
                    <textarea className="auth-form__textarea"
                      value={extra.description || ""} onChange={(e) => updateExtra("description", e.target.value)}
                      placeholder="اشرح حالة المنزل/المنشأة بإيجاز..." />
                  </div>
                </>
              )}

              {role === "donor" && (
                <>
                  <div className="auth-form__group">
                    <label className="auth-form__label">نبذة عنك (تظهر في بروفايلك)</label>
                    <textarea className="auth-form__textarea"
                      value={extra.bio || ""} onChange={(e) => updateExtra("bio", e.target.value)}
                      placeholder="مثال: متبرّع منتظم يؤمن بأهمية إعادة الإعمار..." />
                  </div>
                  <div className="auth-form__row">
                    <div className="auth-form__group">
                      <label className="auth-form__label">البلد والمدينة</label>
                      <input className="auth-form__input"
                        value={extra.city || ""} onChange={(e) => updateExtra("city", e.target.value)}
                        placeholder="دمشق، سوريا" />
                    </div>
                    <div className="auth-form__group">
                      <label className="auth-form__label">طريقة التبرع المفضّلة</label>
                      <select className="auth-form__select"
                        value={extra.preferredMethod || ""} onChange={(e) => updateExtra("preferredMethod", e.target.value)}>
                        <option value="">اختر...</option>
                        <option>بطاقة ائتمانية</option>
                        <option>تحويل بنكي</option>
                        <option>عملات رقمية</option>
                      </select>
                    </div>
                  </div>
                  <div className="auth-form__group">
                    <label className="auth-form__label">اهتماماتك (اختر أكثر من واحد)</label>
                    <div className="role-grid" style={{ gridTemplateColumns: "repeat(4, 1fr)", gap: "0.4rem" }}>
                      {["تعليم", "صحة", "مياه", "إيواء", "أطفال", "كهرباء", "بنية تحتية", "مساجد"].map((t) => {
                        const selected = (extra.interests || "").split(",").filter(Boolean);
                        const isActive = selected.includes(t);
                        return (
                          <button key={t} type="button"
                            className={`role-grid__btn ${isActive ? "role-grid__btn--active" : ""}`}
                            style={{ padding: "0.55rem 0.4rem", fontSize: "0.85rem" }}
                            onClick={() => {
                              const next = isActive ? selected.filter((x) => x !== t) : [...selected, t];
                              updateExtra("interests", next.join(","));
                            }}>
                            <span className="role-grid__label" style={{ marginBottom: 0 }}>{t}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <label className="donate-check" style={{ display: "flex", gap: "0.5rem", alignItems: "center", fontSize: "0.9rem", color: "hsl(30, 8%, 45%)", marginBottom: "1rem" }}>
                    <input type="checkbox"
                      checked={extra.publicProfile === "1"}
                      onChange={(e) => updateExtra("publicProfile", e.target.checked ? "1" : "0")} />
                    أوافق على إظهار اسمي في صفحة "أبرز المتبرّعين"
                  </label>
                </>
              )}

              {role === "volunteer" && (
                <>
                  <div className="auth-form__group">
                    <label className="auth-form__label">التخصص</label>
                    <select className="auth-form__select" required
                      value={extra.specialty || ""} onChange={(e) => updateExtra("specialty", e.target.value)}>
                      <option value="">اختر...</option>
                      <option>هندسة مدنية</option>
                      <option>هندسة معمارية</option>
                      <option>هندسة كهربائية</option>
                      <option>عامل بناء</option>
                      <option>إدارة مشاريع</option>
                      <option>أخرى</option>
                    </select>
                  </div>
                  <div className="auth-form__row">
                    <div className="auth-form__group">
                      <label className="auth-form__label">سنوات الخبرة</label>
                      <input className="auth-form__input" type="number" min={0}
                        value={extra.years || ""} onChange={(e) => updateExtra("years", e.target.value)} />
                    </div>
                    <div className="auth-form__group">
                      <label className="auth-form__label">المدينة المتاح فيها</label>
                      <input className="auth-form__input"
                        value={extra.city || ""} onChange={(e) => updateExtra("city", e.target.value)} />
                    </div>
                  </div>
                  <div className="auth-form__group">
                    <label className="auth-form__label">رابط السيرة الذاتية (اختياري)</label>
                    <input className="auth-form__input" type="url"
                      value={extra.cvUrl || ""} onChange={(e) => updateExtra("cvUrl", e.target.value)}
                      placeholder="https://..." />
                  </div>
                </>
              )}

              {role === "partner" && (
                <>
                  <div className="auth-form__group">
                    <label className="auth-form__label">اسم المنظمة / الشركة</label>
                    <input className="auth-form__input" required
                      value={extra.orgName || ""} onChange={(e) => updateExtra("orgName", e.target.value)} />
                  </div>
                  <div className="auth-form__row">
                    <div className="auth-form__group">
                      <label className="auth-form__label">نوع الجهة</label>
                      <select className="auth-form__select" required
                        value={extra.orgType || ""} onChange={(e) => updateExtra("orgType", e.target.value)}>
                        <option value="">اختر...</option>
                        <option>منظمة غير ربحية</option>
                        <option>شركة خاصة</option>
                        <option>جهة حكومية</option>
                        <option>وقف خيري</option>
                      </select>
                    </div>
                    <div className="auth-form__group">
                      <label className="auth-form__label">الموقع الإلكتروني</label>
                      <input className="auth-form__input" type="url"
                        value={extra.website || ""} onChange={(e) => updateExtra("website", e.target.value)} />
                    </div>
                  </div>
                  <div className="auth-form__group">
                    <label className="auth-form__label">نوع الدعم المقدّم</label>
                    <textarea className="auth-form__textarea"
                      value={extra.supportType || ""} onChange={(e) => updateExtra("supportType", e.target.value)}
                      placeholder="مالي، مواد بناء، استشارات هندسية..." />
                  </div>
                </>
              )}

              <button type="submit" className="auth-form__submit" disabled={loading}>
                {loading ? "جارٍ التسجيل..." : "إنشاء الحساب"}
              </button>
            </form>
          )}

          <p className="auth-form__footer">
            عندك حساب؟ <Link to="/login">تسجيل الدخول</Link>
          </p>
        </div>
      </main>
    </>
  );
};

export default Register;