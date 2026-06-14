const AffectedDashboard = () => (
  <>
    <div className="dash__header">
      <h1 className="dash__title">لوحة المتضرر</h1>
      <p className="dash__subtitle">تابع حالة طلبات الترميم الخاصة بك</p>
    </div>
    <div className="kpi-grid">
      <div className="kpi"><p className="kpi__label">طلبات نشطة</p><p className="kpi__value">2</p></div>
      <div className="kpi"><p className="kpi__label">قيد التقييم</p><p className="kpi__value">1</p></div>
      <div className="kpi"><p className="kpi__label">مكتملة</p><p className="kpi__value">0</p></div>
    </div>
    <div className="panel">
      <h2 className="panel__title">طلباتي</h2>
      <table className="dtable">
        <thead><tr><th>#</th><th>الموقع</th><th>نوع الضرر</th><th>الحالة</th><th>المهندس</th></tr></thead>
        <tbody>
          <tr><td>#1023</td><td>حلب - السكري</td><td>دمار جزئي</td><td><span className="badge badge--pending">قيد التقييم</span></td><td>—</td></tr>
          <tr><td>#1041</td><td>حلب - السكري</td><td>أضرار طفيفة</td><td><span className="badge badge--ok">قيد التنفيذ</span></td><td>م. أحمد</td></tr>
        </tbody>
      </table>
    </div>
    <div className="panel">
      <h2 className="panel__title">إجراء سريع</h2>
      <button className="dash__cta">+ طلب ترميم جديد</button>
    </div>
  </>
);

export default AffectedDashboard;