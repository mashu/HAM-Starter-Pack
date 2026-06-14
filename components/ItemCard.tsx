import { CATEGORIES, CURRENCY, type GearItem, type Lang } from "@/data/gear";
import { UI } from "@/data/content";

export default function ItemCard({ item, lang }: { item: GearItem; lang: Lang }) {
  const color = CATEGORIES[item.category].color;
  return (
    <article className="card" style={{ ["--cat" as any]: color }}>
      <div className="card__media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.image} alt={item.name[lang]} loading="lazy" />
        <span className="card__chip">{CATEGORIES[item.category].label[lang]}</span>
      </div>

      <div className="card__body">
        <h3 className="card__name">{item.name[lang]}</h3>

        <div className="specs">
          <span className="spec spec--price">
            <span className="k">{UI.byPrice[lang]}</span>
            <span className="v mono">
              {Math.round(item.pricePln)} {CURRENCY.symbol}
            </span>
            {item.estimate && <span className="est">~</span>}
          </span>
          <span className="spec spec--weight">
            <span className="k">{UI.byWeight[lang]}</span>
            <span className="v mono">{item.weightG} g</span>
            {item.estimate && <span className="est">~</span>}
          </span>
        </div>

        <p className="card__purpose">{item.purpose[lang]}</p>

        {item.note && <p className="card__note">{item.note[lang]}</p>}

        <a className="card__link" href={item.url} target="_blank" rel="noopener noreferrer">
          {UI.viewItem[lang]} <span className="arrow">↗</span>
        </a>
      </div>
    </article>
  );
}
