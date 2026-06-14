const AdminDashboard = () => (
  <>
    <div className="dash__header">
      <h1 className="dash__title">لوحة الإدارة</h1>
      <p className="dash__subtitle">إدارة المستخدمين والموافقات والمشاريع</p>
    </div>
    <div className="kpi-grid">
      <div className="kpi"><p className="kpi__label">مستخدمون</p><p className="kpi__value">1,248</p></div>
      <div className="kpi"><p className="kpi__label">طلبات قيد الموافقة</p><p className="kpi__value">17</p></div>
      <div className="kpi"><p className="kpi__label">مشاريع نشطة</p><p className="kpi__value">42</p></div>
      <div className="kpi"><p className="kpi__label">تبرعات الشهر</p><p className="kpi__value">82,300 $</p></div>
    </div>
    <div className="panel">
      <h2 className="panel__title">طلبات بانتظار الموافقة</h2>
      <table className="dtable">
        <thead><tr><th>النوع</th><th>الاسم</th><th>التاريخ</th><th>إجراء</th></tr></thead>
        <tbody>
          <tr><td>متطوع</td><td>أحمد محمود</td><td>2026/06/08</td><td><button className="dash__cta">مراجعة</button></td></tr>
          <tr><td>متضرر</td><td>فاطمة الحسن</td><td>2026/06/07</td><td><button className="dash__cta">مراجعة</button></td></tr>
          <tr><td>شريك</td><td>مؤسسة الأمل</td><td>2026/06/05</td><td><button className="dash__cta">مراجعة</button></td></tr>
        </tbody>
      </table>
    </div>
  </>
);

export default AdminDashboard;