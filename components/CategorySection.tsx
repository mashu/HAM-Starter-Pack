import { CATEGORIES, CURRENCY, GEAR, type CategoryId, type Lang } from "@/data/gear";
import { UI } from "@/data/content";
import ItemCard from "./ItemCard";

export default function CategorySection({
  id,
  lang,
}: {
  id: CategoryId;
  lang: Lang;
}) {
  const meta = CATEGORIES[id];
  const items = GEAR.filter((g) => g.category === id);
  const price = items.reduce((s, g) => s + g.pricePln, 0);
  const weight = items.reduce((s, g) => s + g.weightG, 0);

  return (
    <section className="cat" id={id} style={{ ["--cat" as any]: meta.color }}>
      <div className="cat__head">
        <div className="cat__bar" style={{ background: meta.color }} />
        <div className="cat__titles">
          <div className="cat__name">{meta.label[lang]}</div>
          <div className="cat__tag">{meta.tagline[lang]}</div>
        </div>
        <div className="cat__meta">
          <b>{items.length}</b> · <b className="mono">{Math.round(price)} {CURRENCY.symbol}</b> ·{" "}
          <b className="mono">{weight} g</b>
        </div>
      </div>

      <div className="grid">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} lang={lang} />
        ))}
      </div>
    </section>
  );
}
