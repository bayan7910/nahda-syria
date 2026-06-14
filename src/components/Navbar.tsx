import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
  <nav className="navbar">
    <div className="navbar__container">
      <Link to="/" className="navbar__logo">نهضة سوريا</Link>
      <div className="navbar__links">
        <a href="#about">من نحن</a>
        <a href="#stats">إنجازاتنا</a>
        <a href="#donate">تبرع</a>
        <a href="#volunteer">تطوع</a>
        <a href="#partners">شركاؤنا</a>
      </div>
      <div className="navbar__actions">
        {isAuthenticated ? (
          <>
            <Link to="/dashboard" className="navbar__login">{user?.fullName || "حسابي"}</Link>
            <button onClick={handleLogout} className="navbar__cta">خروج</button>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar__login">دخول</Link>
            <Link to="/register" className="navbar__cta">إنشاء حساب</Link>
          </>
        )}
      </div>
    </div>
  </nav>
  );
};

export default Navbar;
