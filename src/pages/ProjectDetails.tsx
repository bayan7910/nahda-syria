import { Link, useNavigate, useParams } from "react-router-dom";
import { MapContainer, TileLayer, CircleMarker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Navbar from "@/components/Navbar";
import "./ProjectDetails.css";

// Mock fallback that matches the MapSection hard-coded list until the API is live.
const FALLBACK: Record<string, {
  name: string; city: string; lat: number; lng: number; progress: number;
  status: "completed" | "in_progress" | "urgent"; budget: number; raised: number;
  description: string; manager: string; team: number;
}> = {
  "1": { name: "ترميم مدرسة الأمل", city: "حلب", lat: 36.2021, lng: 37.1343, progress: 65, status: "in_progress",
    budget: 80000, raised: 52000, manager: "م. أحمد الحلبي", team: 12,
    description: "ترميم كامل لمدرسة ابتدائية تستوعب 420 تلميذاً بعد تضرر بنيتها بشكل جزئي." },
  "2": { name: "إعادة بناء مجمع سكني", city: "حمص", lat: 34.7308, lng: 36.7090, progress: 100, status: "completed",
    budget: 250000, raised: 250000, manager: "م. ليلى ناصر", team: 25,
    description: "إعادة بناء 18 شقة سكنية في حي السكري لعائلات عادت من النزوح." },
};

const STATUS_COLORS = {
  completed: "hsl(145, 35%, 28%)",
  in_progress: "hsl(38, 75%, 55%)",
  urgent: "hsl(0, 65%, 50%)",
};
const STATUS_LABEL = { completed: "مكتمل", in_progress: "قيد التنفيذ", urgent: "عاجل" } as const;

const ProjectDetails = () => {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const p = FALLBACK[id];

  if (!p) {
    return (
      <>
        <Navbar />
        <main className="pd-empty">
          <h1>المشروع غير موجود</h1>
          <Link to="/" className="pd-btn">العودة للرئيسية</Link>
        </main>
      </>
    );
  }

  const stages = [
    { label: "التقييم الميداني", done: true },
    { label: "تأمين المواد", done: p.progress >= 30 },
    { label: "بدء التنفيذ", done: p.progress >= 50 },
    { label: "أعمال التشطيب", done: p.progress >= 80 },
    { label: "التسليم", done: p.progress >= 100 },
  ];

  return (
    <>
      <Navbar />
      <main className="pd">
        <header className="pd__hero">
          <div className="pd__hero-overlay" />
          <div className="pd__hero-text">
            <span className="pd__crumbs"><Link to="/">الرئيسية</Link> / المشاريع / {p.name}</span>
            <h1 className="pd__title">{p.name}</h1>
            <div className="pd__meta">
              <span>📍 {p.city}</span>
              <span className="pd__badge" style={{ background: STATUS_COLORS[p.status] }}>
                {STATUS_LABEL[p.status]} — {p.progress}%
              </span>
            </div>
          </div>
        </header>

        <div className="pd__layout">
          <section className="pd__main">
            <div className="pd__gallery">
              {["قبل", "أثناء", "بعد"].map((label) => (
                <div key={label} className="pd__shot">
                  <div className="pd__shot-ph">🏗️</div>
                  <span>{label}</span>
                </div>
              ))}
            </div>

            <article className="pd__card">
              <h2>وصف المشروع</h2>
              <p>{p.description}</p>
            </article>

            <article className="pd__card">
              <h2>مراحل التنفيذ</h2>
              <ol className="pd__stages">
                {stages.map((s) => (
                  <li key={s.label} className={s.done ? "is-done" : ""}>
                    <span className="pd__stage-dot">{s.done ? "✓" : "•"}</span>{s.label}
                  </li>
                ))}
              </ol>
            </article>

            <article className="pd__card">
              <h2>الموقع على الخريطة</h2>
              <div className="pd__map">
                <MapContainer center={[p.lat, p.lng]} zoom={11} scrollWheelZoom={false} style={{ height: "100%" }}>
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <CircleMarker center={[p.lat, p.lng]} radius={12}
                    pathOptions={{ color: "#fff", weight: 2, fillColor: STATUS_COLORS[p.status], fillOpacity: 0.95 }} />
                </MapContainer>
              </div>
            </article>
          </section>

          <aside className="pd__side">
            <div className="pd__card pd__donate">
              <h2>ادعم هذا المشروع</h2>
              <div className="pd__progress"><div style={{ width: `${p.progress}%` }} /></div>
              <div className="pd__amounts">
                <div><span>المُحصّل</span><strong>{p.raised.toLocaleString()} $</strong></div>
                <div><span>المطلوب</span><strong>{p.budget.toLocaleString()} $</strong></div>
              </div>
              <button className="pd-btn pd-btn--primary" onClick={() => navigate(`/donate?projectId=${id}`)}>
                💝 تبرّع الآن
              </button>
            </div>

            <div className="pd__card">
              <h3>الفريق</h3>
              <p>المشرف: <strong>{p.manager}</strong></p>
              <p>عدد المتطوعين: <strong>{p.team}</strong></p>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
};

export default ProjectDetails;