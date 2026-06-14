import { useEffect, useMemo, useRef, useState } from "react";
import { COUNTRIES, Country, DEFAULT_COUNTRY } from "./countries";
import "./PhoneInput.css";

interface Props {
  value: string;                 // full E.164-like: "+963991234567"
  onChange: (full: string) => void;
  required?: boolean;
  id?: string;
  placeholder?: string;
}

function splitValue(full: string): { country: Country; rest: string } {
  if (full) {
    const match = COUNTRIES.find((c) => full.startsWith(c.dial));
    if (match) return { country: match, rest: full.slice(match.dial.length) };
  }
  return { country: DEFAULT_COUNTRY, rest: "" };
}

const PhoneInput = ({ value, onChange, required, id, placeholder = "9XXXXXXXX" }: Props) => {
  const initial = splitValue(value);
  const [country, setCountry] = useState<Country>(initial.country);
  const [local, setLocal] = useState<string>(initial.rest);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onChange(`${country.dial}${local.replace(/\D/g, "")}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country, local]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return COUNTRIES;
    return COUNTRIES.filter(
      (c) =>
        c.nameAr.includes(q) ||
        c.nameEn.toLowerCase().includes(q) ||
        c.dial.includes(q) ||
        c.code.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <div className="phone" ref={wrapRef}>
      <button
        type="button"
        className="phone__country"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="phone__flag">{country.flag}</span>
        <span className="phone__dial">{country.dial}</span>
        <span className="phone__caret">▾</span>
      </button>
      <input
        id={id}
        type="tel"
        className="phone__input"
        required={required}
        value={local}
        onChange={(e) => setLocal(e.target.value.replace(/[^\d\s-]/g, ""))}
        placeholder={placeholder}
        inputMode="numeric"
      />
      {open && (
        <div className="phone__menu" role="listbox">
          <input
            className="phone__search"
            placeholder="ابحث عن دولة..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
          <ul className="phone__list">
            {filtered.map((c) => (
              <li key={c.code}>
                <button
                  type="button"
                  className={`phone__option ${c.code === country.code ? "phone__option--active" : ""}`}
                  onClick={() => {
                    setCountry(c);
                    setOpen(false);
                    setSearch("");
                  }}
                >
                  <span className="phone__flag">{c.flag}</span>
                  <span className="phone__option-name">{c.nameAr}</span>
                  <span className="phone__option-dial">{c.dial}</span>
                </button>
              </li>
            ))}
            {filtered.length === 0 && <li className="phone__empty">لا توجد نتائج</li>}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PhoneInput;