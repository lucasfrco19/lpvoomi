"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { IconType } from "react-icons";
import { SiInstagram, SiMercadopago, SiShopee, SiTiktok, SiYoutube } from "react-icons/si";
import { FaAmazon } from "react-icons/fa";
import { FiBarChart2, FiBox, FiEyeOff, FiLayers, FiPlayCircle, FiShare2, FiShield, FiStar, FiTrendingUp, FiUserCheck, FiVideoOff, FiZap } from "react-icons/fi";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const nav = [
  ["Como funciona", "#plataforma"],
  ["Pra quem é", "#para-quem"],
  ["Provas", "#provas"],
  ["Planos", "#planos"],
  ["Dúvidas", "#faq"],
];

const pains = [
  ["Não tenho produto pra vender.", "Você se afilia. Vende o produto dos outros e fica com a comissão — sem estoque, sem risco."],
  ["Achei o produto. E agora, quem faz o vídeo?", "A Voomi cria o vídeo por você. Avatar, cenário, enquadramento — pronto pra postar. Seu rosto nunca aparece."],
  ["Nem consigo abrir minha loja no TikTok Shop.", "O Viral Boost cria historinhas que fazem sua conta crescer e ajudam a destravar a loja."],
  ["Tô preso só no TikTok.", "O mesmo vídeo trabalha em TikTok Shop, Shopee, Mercado Livre, Instagram Shop e mais."],
  ["As ferramentas só mostram o que vende. E daí?", "A Voomi não para na informação. Entrega o vídeo pronto — não mais uma análise."],
  ["Já gastei dinheiro e não deu em nada.", "Aqui é vitalício. Paga uma vez, é seu. Você só investe quando resolve criar."],
];

const features = [
  ["Radar de produtos", "Encontre produtos validados, comissão, vendas e crescimento. Um clique manda tudo para o Creator Lab.", "RADAR", "/assets/module-radar-full.webp"],
  ["Viral Boost", "Crie historinhas virais para crescer a conta e alcançar os primeiros seguidores que destravam sua loja.", "BOOST", "/assets/module-boost-full.webp"],
  ["Personalize IA", "Crie avatares e cenários ilimitados. Sua foto pode virar avatar — seu rosto real não precisa aparecer.", "AVATAR", "/assets/module-avatar-full.webp"],
  ["Lab Studio", "Corte, divida cenas, ajuste, legende e exporte no navegador. Sem CapCut. Sem Premiere.", "STUDIO", "/assets/module-studio-full.webp"],
];

const people = [
  ["01", "Quer uma renda a mais, mas não quer aparecer", "O avatar aparece por você. Você vende no anonimato."],
  ["02", "Não tem produto, estoque ou dinheiro pra investir", "Você se afilia, promove e fica com a comissão."],
  ["03", "Já tentou gravar e travou", "Aqui você não grava nada — nem precisa perder a vergonha."],
  ["04", "Não sabe editar e não quer aprender", "A Voomi monta o vídeo e ensina você do zero."],
  ["05", "Já vende e quer escalar sem virar refém do conteúdo", "Multiplique criativos em minutos, sem gravar."],
  ["06", "Cansou de ferramenta que só mostra o que vende", "A Voomi entrega o vídeo pronto na sua mão."],
];

const painIcons = [FiBox, FiVideoOff, FiTrendingUp, FiShare2, FiBarChart2, FiShield];
const peopleIcons = [FiEyeOff, FiBox, FiVideoOff, FiStar, FiLayers, FiZap];

const plans = [
  {
    name: "Plano Mensal",
    eyebrow: "COMECE NO SEU RITMO",
    price: "147,00",
    cycle: "/mês",
    description: "Crie todos os meses e aumente seu volume a cada renovação.",
    features: [
      ["Imagens ilimitadas", "Crie quantas imagens precisar"],
      ["15 vídeos por mês", "Créditos liberados mensalmente"],
      ["+3 vídeos por renovação", "Seu limite cresce enquanto você continua"],
    ],
    cta: "Quero começar no mensal",
  },
  {
    name: "Plano Vitalício",
    eyebrow: "MELHOR ESCOLHA",
    price: "697,00",
    cycle: "pagamento único",
    description: "Acesso definitivo para criar sem mensalidade e sem prazo para acabar.",
    features: [
      ["Imagens ilimitadas", "Crie sem limite sempre que precisar"],
      ["40 vídeos liberados", "Um pacote inicial maior para produzir"],
      ["Créditos em dobro", "No primeiro pacote de créditos que comprar"],
    ],
    cta: "Quero acesso vitalício",
    featured: true,
  },
];

const faqs = [
  ["Preciso aparecer nos vídeos?", "Não. Você escolhe um avatar — pronto ou criado do seu jeito — e ele aparece no seu lugar. Seu rosto nunca vai para a tela."],
  ["Funciona pra quem está começando do zero?", "Sim. Você não precisa de produto, estoque, seguidores ou experiência. A Lab Academy mostra o caminho."],
  ["Preciso saber editar vídeo?", "Não. A Voomi entrega o vídeo montado; o Lab Studio permite ajustes simples sem aprender outro programa."],
  ["Não tenho produto pra vender. E agora?", "Você se afilia a produtos que já vendem e ganha comissão. O Radar mostra quais merecem sua atenção."],
  ["Qual a diferença da Voomi para outras ferramentas?", "A maioria mostra o que vende e deixa você gravar. A Voomi acha o produto, cria o avatar e gera o vídeo pronto."],
  ["Só funciona para TikTok Shop?", "Não. O vídeo serve para TikTok Shop, Shopee, Mercado Livre, Instagram Shop e outros canais."],
  ["E se eu travar ou tiver dúvida?", "Um assistente inteligente responde 24h e, quando precisar, há suporte humano de verdade."],
];

const marketplaces: Array<[string, string, IconType, string]> = [
  ["TikTok Shop", "tiktok", SiTiktok, "TikTok Shop"],
  ["Shopee", "shopee", SiShopee, "Shopee"],
  ["Mercado Livre", "mercado", SiMercadopago, "mercado livre"],
  ["Instagram Shop", "instagram", SiInstagram, "Instagram Shop"],
  ["Amazon", "amazon", FaAmazon, "amazon"],
  ["YouTube Shopping", "youtube", SiYoutube, "YouTube Shopping"],
];

const carouselVideos = [
  { src: "/assets/videos/voomi-video-01.mp4", poster: "/assets/voomi-video-01-poster.jpg", label: "Resultado de criador 01" },
  { src: "/assets/videos/voomi-video-02.mp4", poster: "/assets/voomi-video-02-poster.jpg", label: "Resultado de criador 02" },
  { src: "/assets/videos/voomi-video-03.mp4", poster: "/assets/voomi-video-03-poster.jpg", label: "Resultado de criador 03" },
  { src: "/assets/videos/voomi-video-04.mp4", poster: "/assets/voomi-video-04-poster.jpg", label: "Resultado de criador 04" },
  { src: "/assets/videos/voomi-video-05.mp4", poster: "/assets/voomi-video-05-poster.jpg", label: "Resultado de criador 05" },
  { src: "/assets/videos/voomi-video-06.mp4", poster: "/assets/voomi-video-06-poster.jpg", label: "Resultado de criador 06" },
];

function MarketLogo({ name, brand, Icon, wordmark }: { name: string; brand: string; Icon: IconType; wordmark: string }) {
  return <span className={`market-logo market-logo--${brand}`} aria-label={name}><i><Icon aria-hidden="true" /></i><b>{wordmark}</b></span>;
}

function Brand() {
  return <a className="brand" href="#inicio" aria-label="Voomi — início"><img src="/favicon-512.png" alt="" /><span>voomi</span></a>;
}

function CTA({ children, href = "#oferta", compact = false }: { children: React.ReactNode; href?: string; compact?: boolean }) {
  return <a className={`cta ${compact ? "cta--compact" : ""}`} href={href}><span>{children}</span><b aria-hidden="true">↗</b></a>;
}

function Placeholder({ label, className = "", src }: { label: string; className?: string; src?: string }) {
  return <div className={`placeholder ${className} ${src ? "placeholder--media" : ""}`}>{src ? <><img src={src} alt={label} /><span className="placeholder__media-label">{label}</span></> : <><span className="placeholder__corners" /><div className="placeholder__icon">▶</div><small>ESPAÇO RESERVADO</small><strong>{label}</strong></>}</div>;
}

export default function Home() {
  const pageRef = useRef<HTMLElement>(null);
  const [menu, setMenu] = useState(false);
  const [faq, setFaq] = useState(0);
  const [compactCarousel, setCompactCarousel] = useState(false);
  const [mobileSlide, setMobileSlide] = useState(0);
  const [activeVideo, setActiveVideo] = useState<(typeof carouselVideos)[number] | null>(null);
  const [videoReady, setVideoReady] = useState(false);
  const warmedVideos = useRef(new Map<string, HTMLVideoElement>());

  const warmVideo = (src: string) => {
    if (warmedVideos.current.has(src) || warmedVideos.current.size >= 3) return;
    const video = document.createElement("video");
    video.preload = "auto";
    video.src = src;
    video.muted = true;
    warmedVideos.current.set(src, video);
    video.load();
  };

  const openVideo = (video: (typeof carouselVideos)[number]) => {
    setVideoReady(false);
    setActiveVideo(video);
  };

  useEffect(() => {
    const media = window.matchMedia("(max-width: 700px)");
    const updateCarouselSize = () => setCompactCarousel(media.matches);
    updateCarouselSize();
    media.addEventListener("change", updateCarouselSize);
    return () => media.removeEventListener("change", updateCarouselSize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = activeVideo ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [activeVideo]);

  useEffect(() => {
    const previews = Array.from(document.querySelectorAll<HTMLVideoElement>(".story-rail .story-video video"));
    const playPreview = (video: HTMLVideoElement) => {
      if (!video.getAttribute("src") && video.dataset.src) {
        video.src = video.dataset.src;
        video.load();
      }
      video.defaultMuted = true;
      video.muted = true;
      video.playsInline = true;
      video.setAttribute("muted", "");
      video.setAttribute("playsinline", "");
      if (video.paused) void video.play().catch(() => undefined);
    };
    const syncVisiblePreviews = () => {
      if (document.hidden) {
        previews.forEach((video) => video.pause());
        return;
      }
      const visibleVideos = previews
        .map((video) => ({ video, bounds: video.getBoundingClientRect() }))
        .filter(({ bounds }) => bounds.right > 0 && bounds.left < window.innerWidth && bounds.bottom > 0 && bounds.top < window.innerHeight)
        .sort((a, b) => Math.abs((a.bounds.left + a.bounds.right) / 2 - window.innerWidth / 2) - Math.abs((b.bounds.left + b.bounds.right) / 2 - window.innerWidth / 2));
      const activeVideos = new Set(visibleVideos.slice(0, compactCarousel ? 3 : 4).map(({ video }) => video));
      previews.forEach((video) => {
        const bounds = video.getBoundingClientRect();
        const visible = bounds.right > 0 && bounds.left < window.innerWidth && bounds.bottom > 0 && bounds.top < window.innerHeight;
        if (visible && activeVideos.has(video)) playPreview(video);
        else video.pause();
      });
    };
    previews.forEach((video) => {
      video.defaultMuted = true;
      video.muted = true;
      video.playsInline = true;
    });
    const initialSync = window.requestAnimationFrame(syncVisiblePreviews);
    const syncTimer = window.setInterval(syncVisiblePreviews, 900);
    document.addEventListener("visibilitychange", syncVisiblePreviews);
    window.addEventListener("pageshow", syncVisiblePreviews);
    window.addEventListener("resize", syncVisiblePreviews, { passive: true });
    return () => {
      window.cancelAnimationFrame(initialSync);
      window.clearInterval(syncTimer);
      document.removeEventListener("visibilitychange", syncVisiblePreviews);
      window.removeEventListener("pageshow", syncVisiblePreviews);
      window.removeEventListener("resize", syncVisiblePreviews);
      previews.forEach((video) => video.pause());
    };
  }, [compactCarousel]);

  useLayoutEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sections = gsap.utils.toArray<HTMLElement>("[data-reveal]", page);
    if (reducedMotion) {
      sections.forEach((section) => section.classList.add("is-visible"));
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    document.documentElement.classList.add("gsap-enhanced");
    const pointerCleanups: Array<() => void> = [];
    const context = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .from(".nav", { y: -24, autoAlpha: 0, duration: 0.7 })
        .from(".hero__eyebrow", { y: 18, autoAlpha: 0, duration: 0.55 }, "-=.25")
        .from(".hero__copy > *", { y: 30, autoAlpha: 0, duration: 0.75, stagger: 0.09 }, "-=.3");

      sections.forEach((section) => {
        section.classList.add("is-visible");
        const heading = section.querySelector(".section-head, .faq__intro");
        const cards = section.querySelectorAll(":scope .pain-card, :scope .audience-card, :scope .pricing-card, :scope .feature-grid > article, :scope .proof-grid > div");
        if (heading) gsap.from(heading, { y: 38, autoAlpha: 0, duration: 0.85, scrollTrigger: { trigger: section, start: "top 82%", once: true } });
        if (cards.length) gsap.from(cards, { y: 46, autoAlpha: 0, duration: 0.72, stagger: 0.09, ease: "power3.out", scrollTrigger: { trigger: cards[0], start: "top 88%", once: true } });
      });

      gsap.utils.toArray<HTMLElement>(".pain-card, .audience-card", page).forEach((card) => {
        const glow = card.querySelector(".card-glow");
        const moveGlow = (event: PointerEvent) => {
          const rect = card.getBoundingClientRect();
          gsap.to(glow, { x: event.clientX - rect.left, y: event.clientY - rect.top, duration: 0.35, overwrite: true });
        };
        card.addEventListener("pointermove", moveGlow);
        pointerCleanups.push(() => card.removeEventListener("pointermove", moveGlow));
      });
    }, page);

    return () => {
      document.documentElement.classList.remove("gsap-enhanced");
      pointerCleanups.forEach((cleanup) => cleanup());
      context.revert();
    };
  }, []);

  return <main id="inicio" ref={pageRef}>
    <div className="ambient" aria-hidden="true"><i /><i /><i /></div>
    <header className="nav-wrap">
      <nav className="nav container" aria-label="Navegação principal">
        <Brand />
        <div className={`nav__links ${menu ? "is-open" : ""}`}>
          {nav.map(([label, href]) => <a key={href} href={href} onClick={() => setMenu(false)}>{label}</a>)}
        </div>
        <div className="nav__actions"><CTA compact>Começar agora</CTA><button className="menu" onClick={() => setMenu(!menu)} aria-label="Abrir menu" aria-expanded={menu}><i /><i /></button></div>
      </nav>
    </header>

    <section className="hero hero--no-vsl container section">
      <div className="hero__brand-field" aria-hidden="true">
        {Array.from({ length: 18 }, (_, index) => <i key={index}><img src="/favicon-512.png" alt="" /></i>)}
      </div>
      <div className="hero__eyebrow"><span>SEM APARECER</span><span>SEM GRAVAR</span><span>SEM EDITOR</span></div>
      <div className="hero__copy">
        <p className="kicker">A operação completa para vender com vídeo</p>
        <h1>Ache o produto vencedor.<br /><em>A IA cria o vídeo por você.</em></h1>
        <p className="hero__sub">Com um avatar no seu lugar — pronto pra postar em minutos.</p>
        <div className="social-line">
          <div className="avatars" aria-label="Criadores da comunidade">{[1,2,3,4,5].map(n => <span key={n} aria-hidden="true" />)}</div>
          <div><b>★★★★★</b><small>+4.000 criadores ativos</small></div>
        </div>
        <div className="hero__action">
          <CTA>Quero criar sem aparecer</CTA>
          <p className="micro"><span>Acesso vitalício</span><i /><span>Pague uma vez</span></p>
        </div>
      </div>
    </section>

    <section className="market" aria-label="Marketplaces compatíveis">
      <p>Um vídeo. Vários lugares para vender.</p>
      <div className="marquee"><div>{[...marketplaces, ...marketplaces].map(([name,brand,Icon,wordmark],i)=><MarketLogo key={`${brand}-${i}`} name={name} brand={brand} Icon={Icon} wordmark={wordmark} />)}</div></div>
    </section>

    <section className="numbers container section-tight" aria-label="Números da Voomi" data-reveal>
      {[["4.000","pessoas usam a Voomi"],["1.000","criativos todo dia"],["500","produtos no radar"],["50","novos criadores por dia"]].map(([n,l])=><div key={n}><strong>{n}</strong><span>{l}</span></div>)}
      <p>8 meses no mercado. Todo dia mais gente vendendo sem aparecer.</p>
    </section>

    <section className="container section pains" data-reveal>
      <div className="section-head"><span>01 — DESTRAVE</span><h2>Você não trava por falta de vontade.<br /><em>Trava sempre nos mesmos lugares.</em></h2><p>E cada trava dessas tem uma saída dentro da Voomi.</p></div>
      <div className="pain-grid">{pains.map(([q,a],i)=>{ const Icon = painIcons[i]; return <article key={q} className={`pain-card ${i===1?"featured":""}`}><i className="card-glow" aria-hidden="true" /><div className="card-top"><span>0{i+1}</span><b><Icon aria-hidden="true" /></b></div><small>O BLOQUEIO</small><h3>“{q}”</h3><div className="card-solution"><FiPlayCircle aria-hidden="true" /><p>{a}</p></div><footer>RESOLVIDO COM A VOOMI <strong>↗</strong></footer></article>})}</div>
      <p className="manifesto">Não é ferramenta pra uma etapa.<br /><strong>É a operação inteira, do produto ao vídeo postado.</strong></p>
    </section>

    <section className="outcome-bridge" data-reveal>
      <div className="outcome-bridge__dots" aria-hidden="true" />
      <div className="container outcome-bridge__inner">
        <div className="outcome-bridge__copy">
          <span>O PONTO DE VIRADA</span>
          <h2>Enquanto você tenta<br />fazer tudo sozinho…</h2>
          <p>Tem gente encontrando um produto, transformando uma ideia em vídeo e colocando o criativo no ar no mesmo dia.</p>
          <strong>A boa notícia: você não precisa mais começar da câmera.</strong>
        </div>
        <div className="outcome-bridge__visual" aria-label="Espaços reservados para criativos e provas de venda">
          <div className="floating-video floating-video--one"><img src="/assets/voomi-outcome-product.webp" alt="Massageador portátil em criativo vertical" /><small>PRODUTO REAL</small></div>
          <div className="floating-video floating-video--two"><img src="/assets/voomi-outcome-avatar.webp" alt="Criador demonstrando o massageador portátil" /><small>CRIATIVO COM AVATAR</small></div>
          <div className="proof-stack">
            <span>RESULTADOS RECENTES</span>
            {[["Mariana S.", "R$ 189,70"], ["Carlos M.", "R$ 327,40"], ["Ana C.", "R$ 94,50"]].map(([name, value]) => <div key={name}><i>✓</i><p>Venda realizada<small>{name}</small></p><b>{value}</b></div>)}
          </div>
        </div>
      </div>
    </section>

    <section className="section compare-wrap" data-reveal>
      <div className="container compare">
      <div className="section-head left compare-title"><span>02 — SEM CÂMERA</span><h2>O que te trava não é a ferramenta.<br /><em>É a câmera apontada pra você.</em></h2><p>Você já pensou em vender online. Mas na hora de gravar, travou. A Voomi existe para você vender sem passar por isso.</p></div>
        <div className="comparison">
          <div className="comparison__side muted-side"><small>AS OUTRAS</small>{["Mostram vídeos — você grava","Você ainda precisa aparecer","O vídeo nunca sai","Cobrança todo mês"].map(x=><p key={x}><i>×</i>{x}</p>)}</div>
          <div className="comparison__side voomi-side"><small>COM A VOOMI</small>{["O avatar grava por você","Seu rosto nunca aparece","Vídeo pronto em minutos","Pague uma vez. É seu."].map(x=><p key={x}><i>✓</i>{x}</p>)}</div>
        </div>
        <blockquote>“Ninguém vai te reconhecer. Ninguém vai te julgar.<br /><em>E mesmo assim, você vende.</em>”</blockquote>
      </div>
    </section>

    <section id="plataforma" className="container section platform" data-reveal>
      <div className="section-head"><span>03 — A PLATAFORMA</span><h2>Não é uma ferramenta.<br /><em>É a operação inteira na sua mão.</em></h2><p>Do produto vencedor ao vídeo pronto. Sem aparecer, sem editor, sem sair daqui.</p></div>
      <article className="creator">
        <div className="creator__copy"><span className="chip">MÓDULO PRINCIPAL</span><small>CREATOR LAB</small><h3>Onde o produto<br />vira <em>vídeo.</em></h3><p>Escolha o produto, o avatar, a voz e o cenário. A Voomi monta tudo e entrega o vídeo pronto pra postar.</p><ul><li>Avatar no seu lugar</li><li>Voz e movimento por IA</li><li>Seu rosto nunca aparece</li></ul></div>
        <div className="creator__visual"><Placeholder label="ANTES — FOTO DO PRODUTO" className="before" src="/assets/voomi-product-creative.webp" /><span>→</span><Placeholder label="DEPOIS — CRIATIVO COM AVATAR" className="after" src="/assets/voomi-avatar-creative.webp" /></div>
      </article>
      <div className="feature-grid">{features.map(([title,text,tag,src],i)=><article key={title}><span>0{i+1}</span><small>{tag}</small><div className="feature-placeholder"><img src={src} alt={`Tela completa do módulo ${title}`} /></div><h3>{title}</h3><p>{text}</p><b>EXPLORAR MÓDULO ↗</b></article>)}</div>
      <div className="flow"><span>RADAR <b>acha</b></span><i>→</i><span>CREATOR LAB <b>cria</b></span><i>→</i><span>VIRAL BOOST <b>viraliza</b></span><i>→</i><span>LAB STUDIO <b>finaliza</b></span></div>
    </section>

    <section id="para-quem" className="container section for-you" data-reveal>
      <div className="section-head left audience-title"><span>04 — PRA QUEM É</span><h2>Se você se reconhecer em um destes,<br /><em>a Voomi é pra você.</em></h2></div>
      <div className="people-grid">{people.map(([n,t,d],i)=>{ const Icon = peopleIcons[i]; return <article className="audience-card" key={n}><i className="card-glow" aria-hidden="true" /><div className="card-top"><span>{n}</span><b><Icon aria-hidden="true" /></b></div><small>ESSE PERFIL É VOCÊ?</small><h3>{t}</h3><div className="audience-card__line" /><p>{d}</p><footer><FiUserCheck aria-hidden="true" /> A VOOMI RESOLVE <strong>↗</strong></footer></article>})}</div>
      <div className="center-cta"><p>O que faltava não era vontade. Era uma forma de vender sem precisar aparecer.</p><h3>Agora você tem.</h3><CTA>Quero começar sem aparecer</CTA></div>
    </section>

    <section id="provas" className="section proof-wrap" data-reveal>
      <div className="container">
        <div className="section-head"><span>05 — GENTE REAL</span><h2>Todo dia chega mensagem<br /><em>assim no nosso suporte.</em></h2><p className="proof-summary">Nenhum apareceu na câmera. Nenhum tinha experiência.<strong>A diferença é que eles começaram.</strong></p></div>
        <div className="story-rail story-rail--videos" aria-label="Carrossel de vídeos de criadores">
          <div className="story-rail__track" style={compactCarousel ? { transform: `translate3d(-${mobileSlide * 187}px,0,0)` } : undefined}>{(()=>{ const sequence = compactCarousel ? carouselVideos : [...carouselVideos, ...carouselVideos]; const renderedVideos = compactCarousel ? sequence : [...sequence, ...sequence]; return renderedVideos.map((video, index)=>{ const duplicate = !compactCarousel && index >= sequence.length; return <button type="button" className="story-video" key={`${video.src}-${index}`} onPointerEnter={() => warmVideo(video.src)} onPointerDown={(event) => { warmVideo(video.src); event.currentTarget.closest(".story-rail")?.classList.add("is-touching"); }} onPointerUp={(event) => { event.currentTarget.closest(".story-rail")?.classList.remove("is-touching"); if (event.pointerType !== "mouse") openVideo(video); }} onPointerCancel={(event) => event.currentTarget.closest(".story-rail")?.classList.remove("is-touching")} onFocus={() => warmVideo(video.src)} onClick={() => openVideo(video)} aria-label={duplicate ? undefined : `Abrir ${video.label} com áudio`} aria-hidden={duplicate || undefined} tabIndex={duplicate ? -1 : 0}><video data-src={video.src} poster={video.poster} muted loop playsInline preload="none" disablePictureInPicture /><span><i>▶</i><b>CLIQUE PARA OUVIR</b></span></button>})})()}</div>
        </div>
        <div className="mobile-video-controls" aria-label="Navegação dos vídeos"><button type="button" onClick={() => setMobileSlide((mobileSlide - 1 + carouselVideos.length) % carouselVideos.length)} aria-label="Vídeo anterior">←</button><span>{carouselVideos.map((video, index) => <i key={video.src} className={mobileSlide === index ? "is-active" : ""} />)}</span><button type="button" onClick={() => setMobileSlide((mobileSlide + 1) % carouselVideos.length)} aria-label="Próximo vídeo">→</button></div>
        <div className="proof-grid">{["PRINT — PRIMEIRA VENDA","PRINT — R$ 64","PRINT — R$ 512 · 20 VENDAS","PRINT — R$ 1 MIL","PRINT — R$ 374 · 6 VENDAS"].map((x,i)=><div key={x} className={i===2?"tall":""}><Placeholder label={x} /></div>)}</div>
      </div>
    </section>

    <section id="planos" className="container section pricing">
      <div className="section-head">
        <span>06 — ESCOLHA SEU PLANO</span>
        <h2>Comece agora. Continue<br /><em>do jeito que faz sentido pra você.</em></h2>
        <p>Imagens ilimitadas em qualquer plano. Escolha entre a flexibilidade mensal ou o acesso definitivo.</p>
      </div>
      <div className="pricing-grid">
        {plans.map((plan) => <article className={`pricing-card ${plan.featured ? "pricing-card--featured" : ""}`} key={plan.name}>
          {plan.featured && <div className="pricing-card__badge"><FiZap aria-hidden="true" /> MAIS VANTAJOSO</div>}
          <div className="pricing-card__head"><small>{plan.eyebrow}</small><h3>{plan.name}</h3><p>{plan.description}</p></div>
          <div className="pricing-card__price"><span>R$</span><strong>{plan.price}</strong><small>{plan.cycle}</small></div>
          <div className="pricing-card__divider" />
          <ul>{plan.features.map(([title, detail]) => <li key={title}><i><FiUserCheck aria-hidden="true" /></i><div><strong>{title}</strong><span>{detail}</span></div></li>)}</ul>
          <a className="pricing-card__cta" href="#oferta"><span>{plan.cta}</span><b aria-hidden="true">↗</b></a>
          <p className="pricing-card__micro">ACESSO À PLATAFORMA VOOMI</p>
        </article>)}
      </div>
      <div className="pricing-note"><FiShield aria-hidden="true" /><p><strong>Escolha com tranquilidade.</strong><span>Os dois planos incluem imagens ilimitadas e acesso à experiência completa da Voomi.</span></p></div>
    </section>

    <section id="faq" className="container section faq" data-reveal>
      <div className="faq__intro"><span>07 — DÚVIDAS</span><h2>Ficou com alguma dúvida?<br /><em>A gente responde.</em></h2><p>Respostas diretas, sem letras miúdas.</p></div>
      <div className="faq__list">{faqs.map(([q,a],i)=><article key={q} className={faq===i?"open":""}><button onClick={()=>setFaq(faq===i?-1:i)} aria-expanded={faq===i}><span>0{i+1}</span><b>{q}</b><i>{faq===i?"−":"+"}</i></button><div><p>{a}</p></div></article>)}</div>
    </section>

    <section id="oferta" className="final section" data-reveal>
      <div className="final__orb" aria-hidden="true" />
      <div className="container final__content"><span className="chip">A DECISÃO É SUA</span><h2>Você chegou até aqui<br /><em>por um motivo.</em></h2><p>Agora existe um jeito de vender sem pôr a cara na internet, sem estoque, sem saber gravar ou editar. A Voomi acha o produto, cria o avatar e entrega o vídeo pronto.</p><h3>A pergunta não é mais “será que eu consigo?”<br /><strong>É “por que não começar agora?”</strong></h3><CTA>Quero criar meu primeiro vídeo sem aparecer</CTA><small>SEM GRAVAR <i /> SEM APARECER <i /> SEM MENSALIDADE</small></div>
    </section>

    <footer className="container footer"><Brand /><p>Vídeos que vendem. Sem você aparecer.</p><span>© 2026 Voomi. Todos os direitos reservados.</span></footer>

    {activeVideo && <div className={`video-lightbox ${videoReady ? "is-ready" : "is-loading"}`} role="dialog" aria-modal="true" aria-label={activeVideo.label} onClick={() => setActiveVideo(null)}><button type="button" onClick={() => setActiveVideo(null)} aria-label="Fechar vídeo">×</button><div className="video-lightbox__stage" onClick={(event) => event.stopPropagation()}><video key={activeVideo.src} src={activeVideo.src} poster={activeVideo.poster} preload="auto" controls autoPlay playsInline onCanPlay={() => setVideoReady(true)} /><span className="video-lightbox__loading" aria-live="polite">Carregando vídeo…</span></div></div>}
  </main>;
}
