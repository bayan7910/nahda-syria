const VolunteerDashboard = () => (
  <>
    <div className="dash__header">
      <h1 className="dash__title">لوحة المتطوّع / المهندس</h1>
      <p className="dash__subtitle">المهام الموكلة إليك ومشاريعك النشطة</p>
    </div>
    <div className="kpi-grid">
      <div className="kpi"><p className="kpi__label">مهام نشطة</p><p className="kpi__value">3</p></div>
      <div className="kpi"><p className="kpi__label">ساعات هذا الشهر</p><p className="kpi__value">48</p></div>
      <div className="kpi"><p className="kpi__label">مشاريع منجزة</p><p className="kpi__value">12</p></div>
    </div>
    <div className="panel">
      <h2 className="panel__title">مهامي</h2>
      <table className="dtable">
        <thead><tr><th>#</th><th>المشروع</th><th>المهمة</th><th>الموعد</th><th>الحالة</th></tr></thead>
        <tbody>
          <tr><td>#A12</td><td>ترميم مدرسة حلب</td><td>تقييم إنشائي</td><td>2026/06/15</td><td><span className="badge badge--pending">قيد التنفيذ</span></td></tr>
          <tr><td>#A18</td><td>إعمار حي السكري</td><td>مخطط معماري</td><td>2026/06/22</td><td><span className="badge badge--pending">قيد التنفيذ</span></td></tr>
          <tr><td>#A09</td><td>مشفى إدلب</td><td>إشراف موقع</td><td>2026/06/30</td><td><span className="badge badge--warn">متأخرة</span></td></tr>
        </tbody>
      </table>
    </div>
    <div className="panel">
      <h2 className="panel__title">إجراء سريع</h2>
      <button className="dash__cta">رفع تقرير ميداني</button>
    </div>
  </>
);

export default VolunteerDashboard;