"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

const navGroups = [
  {
    label: "Visão geral",
    items: [{ id: "radar", name: "Radar de Produtos" }],
  },
  {
    label: "Criação",
    items: [
      { id: "boost", name: "Viral Boost" },
      { id: "studio", name: "Lab Studio" },
      { id: "avatar", name: "Personalize IA" },
    ],
  },
] as const;

const radarProducts = [
  { name: "Conjunto de panelas", sales: 4820, commission: 18, growth: 142, channel: "TikTok Shop", image: "/assets/videos/creation-gallery-cookware-poster.jpg" },
  { name: "Massageador portátil", sales: 3175, commission: 22, growth: 96, channel: "Shopee", image: "/assets/voomi-outcome-product.webp" },
  { name: "Jaqueta oversized", sales: 2614, commission: 15, growth: 71, channel: "Instagram", image: "/assets/creator-lab-product.jpeg" },
  { name: "Tênis lifestyle", sales: 1988, commission: 12, growth: 54, channel: "Mercado Livre", image: "/assets/proofs/proof-feedback-tenis.jpeg" },
];

const boostStories = [
  { id: "frutas", title: "Historinhas de fruta", hook: "Você ainda lava uma panela por vez?" },
  { id: "rotina", title: "Rotina de 15 segundos", hook: "Eu troquei o estoque por comissão." },
  { id: "prova", title: "Prova social rápida", hook: "Primeira venda sem aparecer na câmera." },
];

const avatars = [
  { name: "Maya", image: "/assets/avatar-ai-01.webp" },
  { name: "Leo", image: "/assets/creator-lab-avatar.png" },
  { name: "Nina", image: "/assets/avatar-ai-02.webp" },
  { name: "Caio", image: "/assets/avatar-ai-03.webp" },
];

const scenes = [
  { name: "Garagem", image: "/assets/creator-lab-scenario.png" },
  { name: "Estúdio", image: "/assets/scene-studio-ai.webp" },
  { name: "Cozinha", image: "/assets/scene-kitchen-ai.webp" },
  { name: "Rua", image: "/assets/scene-street-ai.webp" },
];

const formats = [
  { id: "9:16", label: "TikTok / Reels", ratio: "9 / 16" },
  { id: "1:1", label: "Feed", ratio: "1 / 1" },
  { id: "16:9", label: "YouTube", ratio: "16 / 9" },
] as const;

function money(value: number) {
  return `R$ ${(value / 100).toFixed(2)}`;
}

export function ProductPreview({
  activeId,
  onNavigate,
}: {
  activeId: "radar" | "boost" | "avatar" | "studio";
  onNavigate: (id: "radar" | "boost" | "avatar" | "studio") => void;
}) {
  return (
    <div className="app-preview">
      <aside className="app-preview__sidebar" aria-label="Menu da prévia">
        <b>Voomi</b>
        {navGroups.map((group) => (
          <div key={group.label}>
            <small>{group.label}</small>
            {group.items.map((item) => (
              <button
                type="button"
                key={item.id}
                className={activeId === item.id ? "is-active" : ""}
                onClick={() => onNavigate(item.id)}
              >
                {item.name}
              </button>
            ))}
          </div>
        ))}
      </aside>
      <div className="app-preview__stage">
        <div className="app-preview__topbar">
          <strong>Prévia da plataforma</strong>
          <span>Clique, filtre e teste. Nada é enviado.</span>
          <button type="button">+ Criar</button>
        </div>
        {activeId === "radar" && <RadarPreview />}
        {activeId === "boost" && <BoostPreview />}
        {activeId === "avatar" && <AvatarPreview />}
        {activeId === "studio" && <StudioPreview />}
      </div>
    </div>
  );
}

function RadarPreview() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"sales" | "growth" | "commission">("sales");
  const [selected, setSelected] = useState(0);
  const products = useMemo(() => {
    const filtered = radarProducts.filter((product) => product.name.toLowerCase().includes(query.trim().toLowerCase()));
    return [...filtered].sort((a, b) => b[sort] - a[sort]);
  }, [query, sort]);
  const current = products[selected] ?? products[0];

  return (
    <div className="app-preview__module">
      <header>
        <div>
          <small>Radar de produtos</small>
          <h4>Oportunidades validadas</h4>
        </div>
        <p>{products.length} produtos em alta agora</p>
      </header>
      <div className="app-preview__toolbar">
        <input value={query} onChange={(event) => { setQuery(event.target.value); setSelected(0); }} placeholder="Buscar produto..." aria-label="Buscar produto" />
        {(["sales", "growth", "commission"] as const).map((key) => (
          <button type="button" key={key} className={sort === key ? "is-active" : ""} onClick={() => setSort(key)}>
            {key === "sales" ? "Faturamento" : key === "growth" ? "Crescimento" : "Comissão"}
          </button>
        ))}
      </div>
      <div className="app-preview__cards">
        {products.map((product, index) => (
          <button type="button" key={product.name} className={current?.name === product.name ? "is-active" : ""} onClick={() => setSelected(index)}>
            <Image src={product.image} alt="" width={72} height={72} />
            <span>
              <b>{product.name}</b>
              <small>{product.channel} · {money(product.sales)}</small>
            </span>
            <em>+{product.growth}%</em>
          </button>
        ))}
        {products.length === 0 && <p className="app-preview__empty">Nenhum produto com esse nome. Tente “panela” ou “jaqueta”.</p>}
      </div>
      {current && (
        <footer className="app-preview__status">
          <div>
            <small>Selecionado</small>
            <strong>{current.name}</strong>
          </div>
          <span>Comissão {current.commission}% · pronto para o Creator Lab</span>
        </footer>
      )}
    </div>
  );
}

function BoostPreview() {
  const [story, setStory] = useState(0);
  const [script, setScript] = useState("");
  const [busy, setBusy] = useState(false);
  const typeTimer = useRef<number | null>(null);
  const current = boostStories[story];

  useEffect(() => {
    return () => {
      if (typeTimer.current) window.clearInterval(typeTimer.current);
    };
  }, []);

  useEffect(() => {
    setScript("");
    setBusy(false);
    if (typeTimer.current) window.clearInterval(typeTimer.current);
  }, [story]);

  const generate = () => {
    const full = `${current.hook}\nCena: avatar apresenta o produto em 8 segundos.\nProva: close no resultado + preço.\nCTA: link na bio, TikTok Shop.`;
    if (typeTimer.current) window.clearInterval(typeTimer.current);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setBusy(false);
      setScript(full);
      return;
    }
    setBusy(true);
    setScript("");
    let index = 0;
    typeTimer.current = window.setInterval(() => {
      index += 2;
      setScript(full.slice(0, index));
      if (index >= full.length) {
        if (typeTimer.current) window.clearInterval(typeTimer.current);
        setBusy(false);
      }
    }, 18);
  };

  return (
    <div className="app-preview__module">
      <header>
        <div>
          <small>Viral Boost</small>
          <h4>De uma ideia ao roteiro</h4>
        </div>
        <p>Escolha um formato e gere a historinha</p>
      </header>
      <div className="app-preview__pills">
        {boostStories.map((item, index) => (
          <button type="button" key={item.id} className={story === index ? "is-active" : ""} onClick={() => setStory(index)}>
            0{index + 1} {item.title}
          </button>
        ))}
      </div>
      <div className="app-preview__script">
        <small>Roteiro gerado</small>
        <p>{script || "Clique em gerar para ver um roteiro curto, pronto para produção."}</p>
      </div>
      <button type="button" className="app-preview__cta" onClick={generate} disabled={busy}>
        {busy ? "Gerando roteiro..." : "Gerar historinha"}
      </button>
    </div>
  );
}

function AvatarPreview() {
  const [tab, setTab] = useState<"avatars" | "scenes">("avatars");
  const [avatar, setAvatar] = useState(0);
  const [scene, setScene] = useState(0);
  const items = tab === "avatars" ? avatars : scenes;
  const selected = tab === "avatars" ? avatar : scene;

  return (
    <div className="app-preview__module">
      <header>
        <div>
          <small>Personalize IA</small>
          <h4>Quem apresenta. Onde acontece.</h4>
        </div>
        <p>{avatars[avatar].name} em {scenes[scene].name}</p>
      </header>
      <div className="app-preview__pills">
        <button type="button" className={tab === "avatars" ? "is-active" : ""} onClick={() => setTab("avatars")}>Influencers</button>
        <button type="button" className={tab === "scenes" ? "is-active" : ""} onClick={() => setTab("scenes")}>Cenários</button>
      </div>
      <div className={`app-preview__grid${tab === "avatars" ? " app-preview__grid--avatars" : ""}`}>
        {items.map((item, index) => (
          <button
            type="button"
            key={item.name}
            className={selected === index ? "is-active" : ""}
            onClick={() => (tab === "avatars" ? setAvatar(index) : setScene(index))}
          >
            <Image src={item.image} alt="" width={160} height={200} />
            <b>{item.name}</b>
          </button>
        ))}
      </div>
      <footer className="app-preview__status">
        <div>
          <small>Identidade pronta</small>
          <strong>{avatars[avatar].name} + {scenes[scene].name}</strong>
        </div>
        <span>Consistência sem aparecer na câmera</span>
      </footer>
    </div>
  );
}

function StudioPreview() {
  const [loaded, setLoaded] = useState(false);
  const [format, setFormat] = useState<(typeof formats)[number]["id"]>("9:16");
  const [exported, setExported] = useState(false);
  const current = formats.find((item) => item.id === format) ?? formats[0];

  const loadVideo = () => {
    setLoaded(true);
    setExported(false);
  };

  return (
    <div className="app-preview__module">
      <header>
        <div>
          <small>Lab Studio</small>
          <h4>Ajuste e exporte o criativo</h4>
        </div>
        <p>Processamento local · sem armazenamento</p>
      </header>
      {!loaded ? (
        <button type="button" className="app-preview__drop" onClick={loadVideo}>
          <i>↑</i>
          <b>Arraste um vídeo ou clique para selecionar</b>
          <small>Nesta prévia carregamos um criativo de exemplo</small>
        </button>
      ) : (
        <div className="app-preview__editor">
          <div className="app-preview__canvas" style={{ aspectRatio: current.ratio }}>
            <Image src="/assets/videos/creation-gallery-cookware-poster.jpg" alt="Prévia do vídeo selecionado" fill sizes="280px" />
            <span>{format}</span>
          </div>
          <div>
            <small>Formato de publicação</small>
            <div className="app-preview__pills">
              {formats.map((item) => (
                <button type="button" key={item.id} className={format === item.id ? "is-active" : ""} onClick={() => { setFormat(item.id); setExported(false); }}>
                  {item.id}
                </button>
              ))}
            </div>
            <button type="button" className="app-preview__cta" onClick={() => setExported(true)}>
              {exported ? `Pronto para ${current.label}` : "Exportar criativo"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
