"use client";

import { useMemo, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Sector,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import {
  GEAR,
  CATEGORIES,
  CURRENCY,
  type Lang,
  type CategoryId,
} from "@/data/gear";
import { UI } from "@/data/content";

type Metric = "price" | "weight";

const ORDERED = (Object.keys(CATEGORIES) as CategoryId[]).sort(
  (a, b) => CATEGORIES[a].order - CATEGORIES[b].order
);

function fmtPrice(v: number) {
  return `${Math.round(v)} ${CURRENCY.symbol}`;
}
function fmtWeight(v: number) {
  return v >= 1000 ? `${(v / 1000).toFixed(2)} kg` : `${Math.round(v)} g`;
}
function fmt(metric: Metric, v: number) {
  return metric === "price" ? fmtPrice(v) : fmtWeight(v);
}

const axisTick = {
  fill: "#5d747c",
  fontSize: 11,
  fontFamily: "var(--font-mono)",
};

export default function Charts({ lang }: { lang: Lang }) {
  const [metric, setMetric] = useState<Metric>("price");
  const [active, setActive] = useState<number | null>(null);

  const donutData = useMemo(
    () =>
      ORDERED.map((id) => {
        const items = GEAR.filter((g) => g.category === id);
        const value = items.reduce(
          (s, g) => s + (metric === "price" ? g.pricePln : g.weightG),
          0
        );
        return { id, name: CATEGORIES[id].label[lang], value, color: CATEGORIES[id].color };
      }),
    [metric, lang]
  );

  const total = donutData.reduce((s, d) => s + d.value, 0);

  const scatterByCat = useMemo(
    () =>
      ORDERED.map((id) => ({
        id,
        color: CATEGORIES[id].color,
        name: CATEGORIES[id].label[lang],
        points: GEAR.filter((g) => g.category === id).map((g) => ({
          x: g.weightG,
          y: g.pricePln,
          z: g.pricePln,
          name: g.name[lang],
        })),
      })),
    [lang]
  );

  const center =
    active != null && donutData[active]
      ? { label: donutData[active].name, value: donutData[active].value, pct: total ? Math.round((donutData[active].value / total) * 100) : 0 }
      : { label: UI.totalCenter[lang], value: total, pct: 100 };

  return (
    <>
      <div className="metric-toggle" role="group" aria-label="metric">
        <button aria-pressed={metric === "price"} onClick={() => setMetric("price")}>
          {UI.byPrice[lang]}
        </button>
        <button aria-pressed={metric === "weight"} onClick={() => setMetric("weight")}>
          {UI.byWeight[lang]}
        </button>
      </div>

      <div className="charts">
        {/* Donut */}
        <div className="chartcard">
          <h3>{UI.donutTitle[lang]}</h3>
          <p className="hint">{metric === "price" ? UI.byPrice[lang] : UI.byWeight[lang]}</p>
          <div className="donut-wrap">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donutData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius="62%"
                  outerRadius="86%"
                  paddingAngle={2}
                  stroke="none"
                  activeIndex={active ?? undefined}
                  activeShape={renderActiveShape}
                  onMouseEnter={(_, i) => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  isAnimationActive={false}
                >
                  {donutData.map((d) => (
                    <Cell key={d.id} fill={d.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="donut-center">
              <div className="dc-label">{center.label}</div>
              <div className="dc-value" style={{ color: active != null ? donutData[active].color : "var(--text)" }}>
                {fmt(metric, center.value)}
              </div>
              <div className="dc-sub">{center.pct}%</div>
            </div>
          </div>
          <div className="legend">
            {donutData.map((d, i) => (
              <span
                key={d.id}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                style={{ cursor: "default" }}
              >
                <i style={{ background: d.color }} />
                {d.name} · <span className="mono">{fmt(metric, d.value)}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Scatter */}
        <div className="chartcard">
          <h3>{UI.scatterTitle[lang]}</h3>
          <p className="hint">{UI.scatterIntro[lang]}</p>
          <div style={{ width: "100%", height: 290 }}>
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 12, right: 16, bottom: 28, left: 6 }}>
                <CartesianGrid stroke="rgba(120,200,214,0.10)" />
                <XAxis
                  type="number"
                  dataKey="x"
                  name={UI.axisWeight[lang]}
                  unit=" g"
                  tick={axisTick}
                  stroke="#2c3a40"
                  label={{ value: UI.axisWeight[lang], position: "insideBottom", offset: -16, fill: "#5d747c", fontSize: 11, fontFamily: "var(--font-mono)" }}
                />
                <YAxis
                  type="number"
                  dataKey="y"
                  name={UI.axisPrice[lang]}
                  unit=" zł"
                  tick={axisTick}
                  stroke="#2c3a40"
                  width={48}
                />
                <ZAxis type="number" dataKey="z" range={[50, 360]} />
                <Tooltip cursor={{ stroke: "rgba(245,166,35,0.4)", strokeDasharray: "4 4" }} content={<ScatterTip lang={lang} />} />
                {scatterByCat.map((s) => (
                  <Scatter key={s.id} name={s.name} data={s.points} fill={s.color} fillOpacity={0.82} />
                ))}
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <div className="legend">
            {scatterByCat.map((s) => (
              <span key={s.id}>
                <i style={{ background: s.color }} />
                {s.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function renderActiveShape(props: any) {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 7}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={outerRadius + 10}
        outerRadius={outerRadius + 12}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        opacity={0.5}
      />
    </g>
  );
}

function ScatterTip({
  active,
  payload,
  lang,
}: {
  active?: boolean;
  payload?: any[];
  lang: Lang;
}) {
  if (!active || !payload || !payload.length) return null;
  const p = payload[0].payload;
  return (
    <div className="tt">
      <b>{p.name}</b>
      <div className="row">
        {UI.axisPrice[lang]}: <span className="mono">{fmtPrice(p.y)}</span>
      </div>
      <div className="row">
        {UI.axisWeight[lang]}: <span className="mono">{fmtWeight(p.x)}</span>
      </div>
    </div>
  );
}
