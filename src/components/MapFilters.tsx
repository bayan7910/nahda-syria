import "./MapFilters.css";

export type FilterStatus = "all" | "completed" | "in_progress" | "urgent";

interface Props {
  status: FilterStatus;
  onStatus: (s: FilterStatus) => void;
  query: string;
  onQuery: (q: string) => void;
  city: string;
  cities: string[];
  onCity: (c: string) => void;
 
}

const STATUSES: { id: FilterStatus; label: string }[] = [
  { id: "all", label: "الكل" },
  { id: "completed", label: "مكتمل" },
  { id: "in_progress", label: "قيد التنفيذ" },
  { id: "urgent", label: "عاجل" },
];

const MapFilters = ({ status, onStatus, query, onQuery, city, cities, onCity }: Props) => (
  <div className="mapfilters">
    <div className="mapfilters__row">
      <input
        className="mapfilters__search"
        type="search"
        placeholder="🔎 ابحث عن مشروع أو مدينة..."
        value={query}
        onChange={(e) => onQuery(e.target.value)}
      />
      <select className="mapfilters__city" value={city} onChange={(e) => onCity(e.target.value)}>
        <option value="">كل المحافظات</option>
        {cities.map((c) => <option key={c} value={c}>{c}</option>)}
      </select>
    </div>
    <div className="mapfilters__row">
      <div className="mapfilters__chips">
        {STATUSES.map((s) => (
          <button
            key={s.id}
            type="button"
            className={`mapfilters__chip ${status === s.id ? "is-active" : ""}`}
            onClick={() => onStatus(s.id)}
          >{s.label}</button>
        ))}
      </div>
      
    </div>
  </div>
);

export default MapFilters;