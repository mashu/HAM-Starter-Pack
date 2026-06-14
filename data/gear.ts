// ─────────────────────────────────────────────────────────────────────────────
//  HAM Starter Pack — single source of truth
//
//  Source list:  https://lighterpack.com/r/3qyzhy
//
//  NOTE: the LighterPack export contains NO weights or prices (every field is 0),
//  so the numbers below are *starting estimates*. Replace `pricePln` and `weightG`
//  with the real figures from your suppliers — everything on the site (totals,
//  charts, sort order) recomputes automatically.
//
//  Currency is Polish złoty (PLN) to match the AliExpress / sp2fp links.
//  To switch currency, change CURRENCY below and convert the pricePln values.
// ─────────────────────────────────────────────────────────────────────────────

export type Lang = "pl" | "en";

export type CategoryId =
  | "operation"
  | "antenna"
  | "connectivity"
  | "measurements"
  | "power";

export interface Bi {
  pl: string;
  en: string;
}

export interface GearItem {
  id: string;
  name: Bi;
  category: CategoryId;
  image: string;
  url: string;
  pricePln: number;
  weightG: number;
  purpose: Bi;
  /** true => figure is a rough guess that especially wants checking */
  estimate?: boolean;
  /** optional caveat shown as a small note on the card */
  note?: Bi;
}

export const CURRENCY = { code: "PLN", symbol: "zł" } as const;

export const CATEGORIES: Record<
  CategoryId,
  { label: Bi; tagline: Bi; color: string; order: number }
> = {
  operation: {
    label: { pl: "Obsługa", en: "Operation" },
    tagline: { pl: "Radio i klucz", en: "The rig and the key" },
    color: "#F5A623",
    order: 1,
  },
  antenna: {
    label: { pl: "Antena", en: "Antenna" },
    tagline: { pl: "Sygnał w eter", en: "Getting RF into the air" },
    color: "#E2724B",
    order: 2,
  },
  connectivity: {
    label: { pl: "Połączenia", en: "Connectivity" },
    tagline: { pl: "Kable, wtyki, przejściówki", en: "Cables, plugs and adapters" },
    color: "#5BC8D6",
    order: 3,
  },
  measurements: {
    label: { pl: "Pomiary", en: "Measurements" },
    tagline: { pl: "Kontrola pracy stacji", en: "Knowing what the station does" },
    color: "#6BE38B",
    order: 4,
  },
  power: {
    label: { pl: "Zasilanie", en: "Power" },
    tagline: { pl: "Z dala od sieci", en: "Keeping it running off-grid" },
    color: "#E8C547",
    order: 5,
  },
};

export const GEAR: GearItem[] = [
  // ── Operation ──────────────────────────────────────────────────────────────
  {
    id: "qmx-plus",
    name: { pl: "QMX+", en: "QMX+" },
    category: "operation",
    image: "https://qrp-labs.com/images/qmxp/0/1.jpeg",
    url: "https://qrp-labs.com/qmxp.html",
    pricePln: 480,
    weightG: 200,
    estimate: true,
    purpose: {
      pl: "Serce stacji: wielopasmowy transceiver QRP CW/digital w postaci zestawu od QRP Labs. Obejmuje pasma KF mocą ok. 5 W, pobiera niewiele prądu i jest na tyle mały, że zniknie w plecaku — stworzony do POTA i SOTA.",
      en: "The heart of the station: a multi-band QRP CW/digital transceiver kit from QRP Labs. Covers the HF bands at around 5 W, sips power and is small enough to vanish into a daypack — built for POTA and SOTA.",
    },
  },
  {
    id: "cw-paddle",
    name: { pl: "Klucz sztorcowy (paddle)", en: "CW paddle" },
    category: "operation",
    image: "https://i.imgur.com/xAlNaTa.png",
    url: "https://pl.aliexpress.com/item/1005009303359579.html",
    pricePln: 85,
    weightG: 70,
    estimate: true,
    purpose: {
      pl: "Kompaktowy klucz iambic (dwudźwigniowy) do nadawania alfabetem Morse'a. Mały i lekki na tyle, by na stałe mieszkać w zestawie — zawsze gotowy do wywołania CQ.",
      en: "A compact iambic (dual-lever) paddle for sending Morse. Small and light enough to live in the kit permanently, so you are always ready to call CQ.",
    },
  },

  // ── Antenna ─────────────────────────────────────────────────────────────────
  {
    id: "ft140-43",
    name: { pl: "Rdzeń FT140-43 (unun / balun)", en: "FT140-43 core (UnUn / balun)" },
    category: "antenna",
    image:
      "https://sklep.sp2fp.profimot.pl/images/watermark/250wpx_a1252cfaad4ecc9d8666a3a9d0f145d6.jpg",
    url: "https://sklep.sp2fp.profimot.pl/rdzen-ferrytowy-ft140-43-amidon-p-1.html",
    pricePln: 22,
    weightG: 30,
    estimate: true,
    purpose: {
      pl: "Rdzeń ferrytowy Amidon, materiał typu 43. Nawiniesz na nim transformator 49:1 (unun) do zasilania anteny EFHW — sztandarowej anteny portable, która nie wymaga tunera i prawie nie potrzebuje przeciwwagi.",
      en: "An Amidon type-43 ferrite toroid. Wind a 49:1 UnUn on it to feed an End-Fed Half-Wave (EFHW) — the go-to portable antenna that needs no tuner and minimal counterpoise.",
    },
  },
  {
    id: "hv-caps",
    name: { pl: "Kondensatory HV 3 kV (zestaw)", en: "HV 3 kV capacitor kit" },
    category: "antenna",
    image: "https://i.imgur.com/NBWmxBb.png",
    url: "https://pl.aliexpress.com/item/1005006960053573.html",
    pricePln: 18,
    weightG: 20,
    estimate: true,
    purpose: {
      pl: "Kondensatory wysokonapięciowe (3 kV) do ununa EFHW. Antena end-fed half-wave wytwarza bardzo wysokie napięcie RF w punkcie zasilania, więc mały kondensator HV równolegle do transformatora wyrównuje SWR w paśmie.",
      en: "High-voltage (3 kV) capacitors for the EFHW UnUn. An end-fed half-wave develops very high RF voltage at the feed point, so a small HV cap across the transformer flattens SWR across the band.",
    },
  },
  {
    id: "bnc-post",
    name: { pl: "Adapter zaciskowy na BNC", en: "BNC binding-post adapter" },
    category: "antenna",
    image: "https://i.imgur.com/52wWcGZ.png",
    url: "https://pl.aliexpress.com/item/1005007267831887.html",
    pricePln: 12,
    weightG: 20,
    estimate: true,
    purpose: {
      pl: "Adapter z zaciskami na BNC. Pozwala podłączyć goły drut antenowy i przeciwwagę bezpośrednio do gniazda BNC w radiu — idealny do szybkiego rozłożenia anteny random-wire lub EFHW w terenie.",
      en: "Binding-post-to-BNC adapter. Clamp a bare antenna wire and a counterpoise straight onto the rig's BNC socket — perfect for quick random-wire or EFHW deployments in the field.",
    },
  },

  // ── Connectivity ────────────────────────────────────────────────────────────
  {
    id: "adapters-set",
    name: { pl: "Przejściówki SMA → BNC, UHF", en: "Adapters SMA → BNC, UHF" },
    category: "connectivity",
    image: "https://i.imgur.com/zFiPKDp.png",
    url: "https://pl.aliexpress.com/item/1005005081003986.html",
    pricePln: 30,
    weightG: 45,
    estimate: true,
    purpose: {
      pl: "Zestaw przejściówek koncentrycznych łączących złącza SMA, BNC i UHF/PL-259. Różny sprzęt ma różne gniazda — NanoVNA ma SMA, QMX+ ma BNC — więc przejściówki zapewniają zgodność.",
      en: "A set of coax adapters bridging SMA, BNC and UHF/PL-259. Different gear uses different sockets — the NanoVNA is SMA, the QMX+ is BNC — so these keep everything interoperable.",
    },
  },
  {
    id: "crimper",
    name: { pl: "Zaciskarka (crimper)", en: "Crimping pliers" },
    category: "connectivity",
    image: "https://i.imgur.com/cOR66s5.png",
    url: "https://pl.aliexpress.com/item/1005008961797521.html",
    pricePln: 55,
    weightG: 280,
    estimate: true,
    purpose: {
      pl: "Zaciskarka z mechanizmem zapadkowym do montażu zaciskanych złączy BNC/SMA na kablach RG174 i RG58. Zapadka gwarantuje powtarzalny, szczelny zacisk.",
      en: "Ratcheting crimp tool for terminating BNC/SMA crimp connectors onto RG174 and RG58 coax. The ratchet guarantees a consistent, gas-tight crimp every time.",
    },
  },
  {
    id: "bnc-rg174",
    name: { pl: "Wtyki BNC do RG174 (50 Ω)", en: "BNC connectors for RG174 (50 Ω)" },
    category: "connectivity",
    image: "https://i.imgur.com/WdBP0B2.png",
    url: "https://pl.aliexpress.com/item/1005008791719077.html",
    pricePln: 18,
    weightG: 30,
    estimate: true,
    note: { pl: "Sprawdź, czy 50 Ω", en: "Double-check they are 50 Ω" },
    purpose: {
      pl: "Zaciskane wtyki BNC dopasowane do cienkiego kabla RG174. Pozwalają wykonać własne przelotki i fidery o dokładnie potrzebnej długości.",
      en: "Crimp BNC plugs sized for thin RG174 coax. Make your own jumpers and feedlines to exactly the length you need.",
    },
  },
  {
    id: "rg174-10m",
    name: { pl: "RG174 — 10 m", en: "10 m of RG174" },
    category: "connectivity",
    image: "https://i.imgur.com/wnk6Yu2.png",
    url: "https://pl.aliexpress.com/item/1005011893249677.html",
    pricePln: 30,
    weightG: 110,
    estimate: true,
    purpose: {
      pl: "Cienki, lekki kabel koncentryczny 50 Ω. Ma większe tłumienie niż grubsze kable, ale waży ułamek tego — idealny na krótkie przelotki i lekkie fidery w wyprawach portable.",
      en: "Thin, lightweight 50 Ω coax. Higher loss than thicker cable but a fraction of the weight — the right choice for short jumpers and grams-count portable feedlines.",
    },
  },
  {
    id: "bnc-rg58",
    name: { pl: "Wtyki BNC do RG58 (50 Ω)", en: "BNC connectors for RG58 (50 Ω)" },
    category: "connectivity",
    image: "https://i.imgur.com/RIeR2is.png",
    url: "https://pl.aliexpress.com/item/1005008778864544.html",
    pricePln: 22,
    weightG: 55,
    estimate: true,
    note: { pl: "Sprawdź, czy 50 Ω", en: "Double-check they are 50 Ω" },
    purpose: {
      pl: "Zaciskane wtyki BNC do grubszego kabla RG58.",
      en: "Crimp BNC plugs for the thicker RG58 coax.",
    },
  },
  {
    id: "rg58-10m",
    name: { pl: "RG58 — 10 m", en: "10 m of RG58" },
    category: "connectivity",
    image: "https://i.imgur.com/4Ak6rZ1.png",
    url: "https://pl.aliexpress.com/item/1005004580323091.html",
    pricePln: 45,
    weightG: 380,
    estimate: true,
    purpose: {
      pl: "Standardowy kabel koncentryczny 50 Ω — mniejsze tłumienie niż RG174, wciąż elastyczny. Solidny, uniwersalny fider do pracy portable na KF.",
      en: "Standard 50 Ω coax — lower loss than RG174 and still flexible. A solid general-purpose feedline for HF portable work.",
    },
  },
  {
    id: "bnc-bnc",
    name: { pl: "Przelotka BNC → BNC", en: "BNC → BNC patch lead" },
    category: "connectivity",
    image: "https://i.imgur.com/nRQjPEC.png",
    url: "https://pl.aliexpress.com/item/1005006300358150.html",
    pricePln: 18,
    weightG: 60,
    estimate: true,
    purpose: {
      pl: "Gotowa przelotka BNC-BNC. Bez narzędzi — połączysz radio z anteną lub NanoVNA od razu po wyjęciu z torby.",
      en: "A ready-made BNC-to-BNC patch lead. No tools needed — connect the rig to an antenna or the NanoVNA straight out of the bag.",
    },
  },

  // ── Measurements ────────────────────────────────────────────────────────────
  {
    id: "nanovna",
    name: { pl: "NanoVNA H4", en: "NanoVNA H4" },
    category: "measurements",
    image: "https://i.imgur.com/pAQ3GwB.png",
    url: "https://pl.aliexpress.com/item/1005006784091627.html",
    pricePln: 180,
    weightG: 120,
    estimate: true,
    purpose: {
      pl: "Kieszonkowy analizator wektorowy z 4-calowym ekranem. Zmierzy SWR, impedancję i rezonans; pozwoli dostroić antenę i unun; sprawdzi kable i złącza. Najbardziej przydatny przyrząd przy pracy z antenami.",
      en: "A pocket vector network analyzer with a 4-inch screen. Measure SWR, impedance and resonance; tune your antenna and UnUn; check cables and connectors. The single most useful instrument for antenna work.",
    },
  },
  {
    id: "test-board",
    name: { pl: "Płytka testowa", en: "Test board" },
    category: "measurements",
    image: "https://i.imgur.com/mAI0k3F.png",
    url: "https://pl.aliexpress.com/item/1005008833953441.html",
    pricePln: 20,
    weightG: 40,
    estimate: true,
    note: { pl: "Doprecyzuj, co to dokładnie jest", en: "Confirm exactly which board this is" },
    purpose: {
      pl: "Płytka do prób warsztatowych — sprawdzanie podzespołów i prototypowanie połączeń przed lutowaniem. Przydatna do weryfikacji nawiniętego ununa lub złącza, zanim trafi w teren.",
      en: "A bench test board for checking components and prototyping connections before you commit to soldering — handy for verifying a UnUn winding or a connector before it goes into the field.",
    },
  },

  // ── Power ───────────────────────────────────────────────────────────────────
  {
    id: "lifepo4-18650",
    name: { pl: "Ogniwa LiFePO4 18650", en: "LiFePO4 18650 cells" },
    category: "power",
    image: "https://i.imgur.com/PpPm2Fy.png",
    url: "https://pl.aliexpress.com/item/1005007161419606.html",
    pricePln: 60,
    weightG: 170,
    estimate: true,
    purpose: {
      pl: "Ogniwa litowo-żelazowo-fosforanowe (LiFePO4) w rozmiarze 18650. Cztery w szeregu dają czyste, stabilne ~12,8 V — idealne zasilanie dla QMX+, przy bezpieczniejszej chemii i płaskiej krzywej rozładowania.",
      en: "Lithium iron phosphate cells in the 18650 size. Four in series give a clean, stable ~12.8 V — the ideal supply for the QMX+, with a safer chemistry and a flat discharge curve.",
    },
  },
  {
    id: "battery-holder",
    name: { pl: "Koszyk na ogniwa 18650", en: "18650 battery holder" },
    category: "power",
    image: "https://i.imgur.com/HZboVFb.png",
    url: "https://pl.aliexpress.com/item/1005008650446020.html",
    pricePln: 15,
    weightG: 35,
    estimate: true,
    note: { pl: "Potwierdź dokładny produkt", en: "Confirm the exact product" },
    purpose: {
      pl: "Koszyk/obudowa na ogniwa 18650, dzięki któremu zbudujesz schludny, wymienny pakiet zasilający.",
      en: "A holder/enclosure for the 18650 cells so you can build them into a tidy, swappable battery pack.",
    },
  },
  {
    id: "charger",
    name: { pl: "Ładowarka LiFePO4", en: "LiFePO4 charger" },
    category: "power",
    image: "https://i.imgur.com/S8OzjnQ.png",
    url: "https://pl.aliexpress.com/item/1005005848877101.html",
    pricePln: 40,
    weightG: 90,
    estimate: true,
    purpose: {
      pl: "Ładowarka z profilem LiFePO4. Używaj wyłącznie ładowarki dedykowanej do LFP — ładowarki Li-ion podają złe napięcie i uszkodzą te ogniwa.",
      en: "A charger set to the LiFePO4 profile. Use only an LFP-specific charger — Li-ion chargers apply the wrong voltage and will damage these cells.",
    },
  },
];
