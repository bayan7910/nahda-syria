import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./MapSection.css";
import MapFilters, { FilterStatus } from "./MapFilters";

type Status = "completed" | "in_progress" | "urgent";
interface Project {
  id: number;
  name: string;
  city: string;
  lat: number;
  lng: number;
  status: Status;
  progress: number;
}

const projects: Project[] = [
  { id: 1, name: "ترميم مدرسة الأمل", city: "حلب", lat: 36.2021, lng: 37.1343, status: "in_progress", progress: 65 },
  { id: 2, name: "إعادة بناء مجمع سكني", city: "حمص", lat: 34.7308, lng: 36.7090, status: "completed", progress: 100 },
  { id: 3, name: "ترميم مستوصف صحي", city: "إدلب", lat: 35.9333, lng: 36.6333, status: "urgent", progress: 10 },
  { id: 4, name: "بناء جسر القرية", city: "اللاذقية", lat: 35.5407, lng: 35.7836, status: "in_progress", progress: 40 },
  { id: 5, name: "ترميم منازل عائلات", city: "دمشق", lat: 33.5138, lng: 36.2765, status: "completed", progress: 100 },
  { id: 6, name: "إعادة تأهيل مسجد", city: "درعا", lat: 32.6189, lng: 36.1021, status: "urgent", progress: 5 },
  { id: 7, name: "بناء مركز تأهيل", city: "الرقة", lat: 35.9528, lng: 39.0079, status: "in_progress", progress: 50 },
  { id: 8, name: "ترميم شبكة مياه", city: "دير الزور", lat: 35.3359, lng: 40.1408, status: "completed", progress: 100 },
];

const statusConfig: Record<Status, { color: string; label: string }> = {
  completed: { color: "hsl(145, 35%, 28%)", label: "مكتمل" },
  in_progress: { color: "hsl(38, 75%, 55%)", label: "قيد التنفيذ" },
  urgent: { color: "hsl(0, 65%, 50%)", label: "عاجل" },
};

const MapSection = () => {
  const [status, setStatus] = useState<FilterStatus>("all");
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("");
  

  useEffect(() => {
    // Force leaflet to recalc size after mount
    window.dispatchEvent(new Event("resize"));
  }, []);

  const cities = useMemo(() => Array.from(new Set(projects.map((p) => p.city))), []);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      if (status !== "all" && p.status !== status) return false;
      if (city && p.city !== city) return false;
      if (q && !p.name.toLowerCase().includes(q) && !p.city.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [status, query, city]);
  const counts = {
    completed: filtered.filter((p) => p.status === "completed").length,
    in_progress: filtered.filter((p) => p.status === "in_progress").length,
    urgent: filtered.filter((p) => p.status === "urgent").length,
  };

  return (
    <section id="map" className="map">
      <div className="map__container">
        <div className="map__header">
          <span className="map__tag">الميزة الأساسية</span>
          <h2 className="map__title">الخريطة التفاعلية لتتبّع المشاريع</h2>
          <p className="map__description">
            استكشف مشاريع إعادة الإعمار حول سوريا، وتابع نسبة الإنجاز ومراحل البناء لكل مشروع
          </p>
        </div>

        <div className="map__layout">
          <div className="map__wrapper">
            <MapFilters
              status={status} onStatus={setStatus}
              query={query} onQuery={setQuery}
              city={city} cities={cities} onCity={setCity}
            
            />
            <MapContainer
              center={[34.8021, 38.9968]}
              zoom={6}
              scrollWheelZoom={false}
              className="map__leaflet"
            >
              <TileLayer
                attribution='&copy; OpenStreetMap'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {filtered.map((p) => (
                <CircleMarker
                  key={p.id}
                  center={[p.lat, p.lng]}
                  
                  pathOptions={{
                    color: "#fff",
                    weight: 2,
                    fillColor: statusConfig[p.status].color,
                    fillOpacity: 0.95,
                  }}
                >
                  <Popup>
                    <div className="map-popup">
                      <strong className="map-popup__name">{p.name}</strong>
                      <span className="map-popup__city">📍 {p.city}</span>
                      <div className="map-popup__bar">
                        <div style={{ width: `${p.progress}%`, background: statusConfig[p.status].color }} />
                      </div>
                      <span className="map-popup__status" style={{ color: statusConfig[p.status].color }}>
                        {statusConfig[p.status].label} — {p.progress}%
                      </span>
                      
                      <div className="map-popup__actions">
                        <Link to={`/projects/${p.id}`} className="map-popup__btn">عرض التفاصيل</Link>
                        <Link to={`/donate?projectId=${p.id}`} className="map-popup__btn map-popup__btn--primary">
                          تبرّع
                        </Link>
                      </div>
                    </div>
                  </Popup>
                </CircleMarker>
              ))}
            </MapContainer>
          </div>

          <aside className="map__sidebar">
            <h3 className="map__sidebar-title">حالة المشاريع</h3>
            <ul className="map__legend">
              <li>
                <span className="map__dot" style={{ background: statusConfig.completed.color }} />
                <span>مكتمل</span>
                <strong>{counts.completed}</strong>
              </li>
              <li>
                <span className="map__dot" style={{ background: statusConfig.in_progress.color }} />
                <span>قيد التنفيذ</span>
                <strong>{counts.in_progress}</strong>
              </li>
              <li>
                <span className="map__dot" style={{ background: statusConfig.urgent.color }} />
                <span>حالات عاجلة</span>
                <strong>{counts.urgent}</strong>
              </li>
            </ul>
            <div className="map__divider" />
            <ul className="map__features">
              <li>📍 موقع كل مشروع بدقة</li>
              <li>📊 نسبة الإنجاز ومراحل البناء</li>
              <li>💰 إجمالي التبرعات المطلوبة والمحصّلة</li>
              <li>👷 المهندس المسؤول والفريق</li>
              <li>📷 صور حيّة قبل وأثناء وبعد</li>
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
