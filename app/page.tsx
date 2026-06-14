"use client";

import { useMemo, useState } from "react";
import {
  GEAR,
  CATEGORIES,
  CURRENCY,
  type CategoryId,
  type Lang,
} from "@/data/gear";
import { UI } from "@/data/content";
import Charts from "@/components/Charts";
import CategorySection from "@/components/CategorySection";

const ORDERED = (Object.keys(CATEGORIES) as CategoryId[]).sort(
  (a, b) => CATEGORIES[a].order - CATEGORIES[b].order
);

export default function Page() {
  const [lang, setLang] = useState<Lang>("pl");

  const totals = useMemo(() => {
    const price = GEAR.reduce((s, g) => s + g.pricePln, 0);
    const weight = GEAR.reduce((s, g) => s + g.weightG, 0);
    return { price, weight, items: GEAR.length, groups: ORDERED.length };
  }, []);

  const weightStr =
    totals.weight >= 1000
      ? { v: (totals.weight / 1000).toFixed(2), u: "kg" }
      : { v: String(totals.weight), u: "g" };

  return (
    <>
      <header className="topbar">
        <div className="wrap topbar__inner">
          <div className="brand">
            <span className="brand__dot" aria-hidden />
            HAM&nbsp;Starter&nbsp;Pack
            <span className="brand__tag">/ QRP · HF · CW</span>
          </div>
          <div className="lang" role="group" aria-label="language">
            <button aria-pressed={lang === "pl"} onClick={() => setLang("pl")}>
              PL
            </button>
            <button aria-pressed={lang === "en"} onClick={() => setLang("en")}>
              EN
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="hero">
        <div className="hero__rings" aria-hidden />
        <div className="hero__sweep" aria-hidden />
        <div className="wrap hero__inner">
          <p className="kicker">{UI.kicker[lang]}</p>
          <h1>
            HAM <em>Starter</em> Pack
          </h1>
          <p className="lead">{UI.subtitle[lang]}</p>

          <div className="readouts">
            <div className="readout readout--price">
              <div className="readout__label">{UI.statPrice[lang]}</div>
              <div className="readout__value">
                {Math.round(totals.price)}
                <span className="unit">{CURRENCY.symbol}</span>
              </div>
            </div>
            <div className="readout readout--weight">
              <div className="readout__label">{UI.statWeight[lang]}</div>
              <div className="readout__value">
                {weightStr.v}
                <span className="unit">{weightStr.u}</span>
              </div>
            </div>
            <div className="readout">
              <div className="readout__label">{UI.statItems[lang]}</div>
              <div className="readout__value">{totals.items}</div>
            </div>
            <div className="readout">
              <div className="readout__label">{UI.statGroups[lang]}</div>
              <div className="readout__value">{totals.groups}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Numbers */}
      <section className="block wrap">
        <div className="sechead">
          <span className="idx">01</span>
          <h2>{UI.numbersHeading[lang]}</h2>
        </div>
        <p className="secintro">{UI.numbersIntro[lang]}</p>
        <Charts lang={lang} />
      </section>

      {/* Categories */}
      <section className="block wrap">
        <div className="sechead">
          <span className="idx">02</span>
          <h2>{lang === "pl" ? "Zawartość zestawu" : "What's in the kit"}</h2>
        </div>
        {ORDERED.map((id) => (
          <CategorySection key={id} id={id} lang={lang} />
        ))}

        <div className="disclaimer">
          <b>i</b>
          <span>{UI.disclaimer[lang]}</span>
        </div>
      </section>

      <footer className="foot">
        <div className="wrap foot__inner">
          <span>{UI.footer[lang]}</span>
          <span>
            {UI.sourceLabel[lang]}:{" "}
            <a href="https://lighterpack.com/r/3qyzhy" target="_blank" rel="noopener noreferrer">
              lighterpack.com/r/3qyzhy
            </a>
          </span>
        </div>
      </footer>
    </>
  );
}
