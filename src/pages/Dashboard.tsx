import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, Role } from "@/hooks/useAuth";
import AffectedDashboard from "./dashboards/AffectedDashboard";
import DonorDashboard from "./dashboards/DonorDashboard";
import DonorProfile from "./dashboards/DonorProfile";
import VolunteerDashboard from "./dashboards/VolunteerDashboard";
import PartnerDashboard from "./dashboards/PartnerDashboard";
import AdminDashboard from "./dashboards/AdminDashboard";
import "./Dashboard.css";

const ROLE_LABEL: Record<Role, string> = {
  affected: "متضرر",
  donor: "متبرّع",
  volunteer: "متطوّع / مهندس",
  partner: "شريك",
  admin: "مشرف",
};

type NavItem = { label: string; icon: string };
const NAV_BY_ROLE: Record<Role, NavItem[]> = {
  affected: [
    { label: "الرئيسية", icon: "🏠" },
    { label: "طلباتي", icon: "📋" },
    { label: "رفع طلب جديد", icon: "➕" },
    { label: "الإشعارات", icon: "🔔" },
  ],
  donor: [
    { label: "الرئيسية", icon: "🏠" },
    { label: "تبرعاتي", icon: "💝" },
    { label: "الإيصالات", icon: "🧾" },
    { label: "مشاريع مقترحة", icon: "✨" },
    { label: "بروفايلي", icon: "👤" },
  ],
  volunteer: [
    { label: "الرئيسية", icon: "🏠" },
    { label: "مهامي", icon: "🛠️" },
    { label: "تقارير ميدانية", icon: "📸" },
    { label: "ملفي الشخصي", icon: "👤" },
  ],
  partner: [
    { label: "الرئيسية", icon: "🏠" },
    { label: "مشاريعي", icon: "🏗️" },
    { label: "تقارير الأثر", icon: "📊" },
    { label: "الفوترة", icon: "💳" },
  ],
  admin: [
    { label: "الرئيسية", icon: "📊" },
    { label: "المستخدمون", icon: "👥" },
    { label: "الموافقات", icon: "✅" },
    { label: "المشاريع", icon: "🏗️" },
        { label: "الإعدادات", icon: "⚙️" },
  ],
};

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [active, setActive] = useState(0);

  if (!user) return null;
  const items = NAV_BY_ROLE[user.role] ?? [];
  const initials = (user.fullName || user.email || "?")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const renderView = () => {
    if (user.role === "donor" && items[active]?.label === "بروفايلي") return <DonorProfile />;
    switch (user.role) {
      case "affected": return <AffectedDashboard />;
      case "donor": return <DonorDashboard />;
      case "volunteer": return <VolunteerDashboard />;
      case "partner": return <PartnerDashboard />;
      case "admin": return <AdminDashboard />;
      default: return <div className="empty">لا توجد لوحة متاحة لهذا الدور</div>;
    }
  };

  return (
    <div className="dash">
      <aside className="dash__sidebar">
        <Link to="/" className="dash__brand">نهضة سوريا</Link>
        <div className="dash__user">
          <div className="dash__user-avatar">{initials}</div>
          <div className="dash__user-info">
            <span className="dash__user-name">{user.fullName}</span>
            <span className="dash__user-role">{ROLE_LABEL[user.role]}</span>
          </div>
        </div>
        <nav className="dash__nav">
          <div className="dash__nav-section">القائمة الرئيسية</div>
          {items.map((item, i) => (
            <button
              key={item.label}
              className={`dash__nav-btn ${i === active ? "dash__nav-btn--active" : ""}`}
              onClick={() => setActive(i)}
            >
              <span className="dash__nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <button className="dash__logout" onClick={handleLogout}>تسجيل الخروج</button>
      </aside>
      <main className="dash__main">{renderView()}</main>
    </div>
  );
};

export default Dashboard;