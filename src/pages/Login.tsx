import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { authApi, ApiError } from "@/services/api";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await authApi.login(email, password);
      localStorage.setItem("auth_token", res.token);
      localStorage.setItem("auth_user", JSON.stringify(res.user));
      navigate("/dashboard");
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
          <h1 className="auth-page__title">تسجيل الدخول</h1>
          <p className="auth-page__subtitle">أهلاً بعودتك إلى نهضة سوريا</p>

          <form onSubmit={handleSubmit} noValidate>
            {error && <div className="auth-form__error">{error}</div>}

            <div className="auth-form__group">
              <label className="auth-form__label" htmlFor="email">البريد الإلكتروني</label>
              <input
                id="email" type="email" required
                className="auth-form__input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
              />
            </div>

            <div className="auth-form__group">
              <label className="auth-form__label" htmlFor="password">كلمة المرور</label>
              <input
                id="password" type="password" required minLength={6}
                className="auth-form__input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            <button type="submit" className="auth-form__submit" disabled={loading}>
              {loading ? "جارٍ الدخول..." : "دخول"}
            </button>
          </form>

          <p className="auth-form__footer">
            ليس لديك حساب؟ <Link to="/register">إنشاء حساب جديد</Link>
          </p>
        </div>
      </main>
    </>
  );
};

export default Login;