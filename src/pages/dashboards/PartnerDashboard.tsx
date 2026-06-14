const PartnerDashboard = () => (
  <>
    <div className="dash__header">
      <h1 className="dash__title">لوحة الشريك</h1>
      <p className="dash__subtitle">مشاريعكم الممولة وتقارير الأثر</p>
    </div>
    <div className="kpi-grid">
      <div className="kpi"><p className="kpi__label">مشاريع ممولة</p><p className="kpi__value">5</p></div>
      <div className="kpi"><p className="kpi__label">إجمالي التمويل</p><p className="kpi__value">125,000 $</p></div>
      <div className="kpi"><p className="kpi__label">نسبة الإنجاز</p><p className="kpi__value">68%</p></div>
    </div>
    <div className="panel">
      <h2 className="panel__title">المشاريع الممولة</h2>
      <table className="dtable">
        <thead><tr><th>#</th><th>المشروع</th><th>الميزانية</th><th>الإنجاز</th><th>التقرير</th></tr></thead>
        <tbody>
          <tr><td>#P01</td><td>مدرسة حلب</td><td>45,000 $</td><td>80%</td><td><span className="badge badge--ok">متاح</span></td></tr>
          <tr><td>#P02</td><td>حي السكري</td><td>50,000 $</td><td>55%</td><td><span className="badge badge--pending">قريباً</span></td></tr>
          <tr><td>#P03</td><td>مشفى إدلب</td><td>30,000 $</td><td>72%</td><td><span className="badge badge--ok">متاح</span></td></tr>
        </tbody>
      </table>
    </div>
  </>
);

export default PartnerDashboard;