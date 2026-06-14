const DonorDashboard = () => (
  <>
    <div className="dash__header">
      <h1 className="dash__title">لوحة المتبرّع</h1>
      <p className="dash__subtitle">شكراً لمساهمتك في إعمار سوريا</p>
    </div>
    <div className="kpi-grid">
      <div className="kpi"><p className="kpi__label">إجمالي التبرعات</p><p className="kpi__value">4,250 $</p></div>
      <div className="kpi"><p className="kpi__label">مشاريع مدعومة</p><p className="kpi__value">7</p></div>
      <div className="kpi"><p className="kpi__label">عائلات مستفيدة</p><p className="kpi__value">23</p></div>
    </div>
    <div className="panel">
      <h2 className="panel__title">سجل التبرعات</h2>
      <table className="dtable">
        <thead><tr><th>التاريخ</th><th>المشروع</th><th>المبلغ</th><th>الطريقة</th><th>الإيصال</th></tr></thead>
        <tbody>
          <tr><td>2026/05/12</td><td>ترميم مدرسة حلب</td><td>500 $</td><td>بطاقة</td><td><span className="badge badge--ok">✓</span></td></tr>
          <tr><td>2026/04/02</td><td>إعمار حي السكري</td><td>1,200 $</td><td>تحويل</td><td><span className="badge badge--ok">✓</span></td></tr>
          <tr><td>2026/03/18</td><td>مشفى ميداني - إدلب</td><td>2,550 $</td><td>عملة رقمية</td><td><span className="badge badge--ok">✓</span></td></tr>
        </tbody>
      </table>
    </div>
    <div className="panel">
      <h2 className="panel__title">إجراء سريع</h2>
      <button className="dash__cta">+ تبرع جديد</button>
    </div>
  </>
);

export default DonorDashboard;