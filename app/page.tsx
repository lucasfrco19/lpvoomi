"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import type { IconType } from "react-icons";
import { SiInstagram, SiMercadopago, SiShopee, SiTiktok, SiYoutube } from "react-icons/si";
import { FaAmazon } from "react-icons/fa";
import { FiShield, FiUserCheck, FiZap } from "react-icons/fi";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProductPreview } from "./product-preview";

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

const featureDemos = [
  {
    id: "radar",
    title: "Radar de produtos",
    tag: "RADAR",
    description: "Encontre produtos validados, compare o potencial e leve a melhor oportunidade direto para a criação.",
    benefits: ["Compare vendas, comissão e crescimento", "Filtre oportunidades em segundos", "Envie o produto direto para a criação"],
    outcome: "Você sai da dúvida com um produto escolhido e pronto para virar conteúdo.",
  },
  {
    id: "boost",
    title: "Viral Boost",
    tag: "BOOST",
    description: "Transforme uma ideia simples em uma história curta, pensada para prender atenção e fazer a conta crescer.",
    benefits: ["Transforme uma ideia em um hook forte", "Estruture histórias curtas com ritmo", "Gere roteiros pensados para retenção"],
    outcome: "Uma ideia simples vira um roteiro organizado, pronto para entrar em produção.",
  },
  {
    id: "avatar",
    title: "Personalize IA",
    tag: "AVATAR",
    description: "Defina quem apresenta, onde a cena acontece e mantenha uma identidade visual consistente sem aparecer.",
    benefits: ["Escolha o avatar e o estilo da marca", "Defina cenários para cada campanha", "Mantenha consistência sem aparecer"],
    outcome: "Sua criação ganha uma identidade reconhecível sem depender da sua imagem.",
  },
  {
    id: "studio",
    title: "Lab Studio",
    tag: "STUDIO",
    description: "Faça os ajustes finais, adapte o formato e exporte o criativo sem depender de um editor externo.",
    benefits: ["Ajuste o vídeo para cada canal", "Finalize sem um editor externo", "Exporte no formato pronto para publicar"],
    outcome: "O vídeo termina no formato certo para TikTok, Reels, Shopee ou YouTube.",
  },
] as const;

const people = [
  ["01", "Quer uma renda a mais, mas não quer aparecer", "O avatar aparece por você. Você vende no anonimato."],
  ["02", "Não tem produto, estoque ou dinheiro pra investir", "Você se afilia, promove e fica com a comissão."],
  ["03", "Já tentou gravar e travou", "Aqui você não grava nada — nem precisa perder a vergonha."],
  ["04", "Não sabe editar e não quer aprender", "A Voomi monta o vídeo e ensina você do zero."],
  ["05", "Já vende e quer escalar sem virar refém do conteúdo", "Multiplique criativos em minutos, sem gravar."],
  ["06", "Cansou de ferramenta que só mostra o que vende", "A Voomi entrega o vídeo pronto na sua mão."],
];


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

const toolCosts = [
  { logo: "https://framerusercontent.com/images/xr1ctABU48XZiPCvjONXa98d48.png", name: "Minea Starter", purpose: "Pesquisa de produtos", price: "R$ 255,01" },
  { logo: "https://www.heygen.com/favicon.ico", name: "HeyGen Creator", purpose: "Avatares e vídeos", price: "R$ 150,92" },
  { logo: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg", name: "ChatGPT Plus", purpose: "Ideias e roteiros", price: "R$ 104,09" },
  { logo: "https://sf16-web-tos-buz.capcutstatic.com/obj/capcut-web-buz-sg/common/images/lv_web-2.ico", name: "CapCut Pro", purpose: "Edição de vídeo", price: "R$ 104,03" },
  { logo: "https://www.canva.com/favicon.ico", name: "Canva Pro", purpose: "Design e criativos", price: "R$ 62,45" },
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
  { src: "/assets/videos/voomi-testimonial-07.mp4", poster: "/assets/videos/voomi-testimonial-07-poster.webp", label: "Depoimento de criador 07" },
];

const creationGalleryVideos = [
  { src: "/assets/videos/creation-gallery-cookware.mp4", poster: "/assets/videos/creation-gallery-cookware-poster.jpg", label: "Criação Voomi — conjunto de panelas" },
  { src: "/assets/videos/creation-gallery-01.mp4", poster: "/assets/videos/creation-gallery-01-poster.jpg", label: "Criação Voomi 01" },
  { src: "/assets/videos/creation-gallery-02.mp4", poster: "/assets/videos/creation-gallery-02-poster.jpg", label: "Criação Voomi 02" },
  { src: "/assets/videos/creation-gallery-03.mp4", poster: "/assets/videos/creation-gallery-03-poster.jpg", label: "Criação Voomi 03" },
  { src: "/assets/videos/creation-gallery-04.mp4", poster: "/assets/videos/creation-gallery-04-poster.jpg", label: "Criação Voomi 04" },
  { src: "/assets/videos/creation-gallery-05.mp4", poster: "/assets/videos/creation-gallery-05-poster.webp", label: "Criação Voomi 05" },
  { src: "/assets/videos/creation-gallery-06.mp4", poster: "/assets/videos/creation-gallery-06-poster.webp", label: "Criação Voomi 06" },
];

const flowSteps = [
  ["RADAR", "acha"],
  ["CREATOR LAB", "cria"],
  ["VIRAL BOOST", "viraliza"],
  ["LAB STUDIO", "finaliza"],
] as const;

const proofShots = [
  { src: "/assets/proofs/proof-primeira-venda.jpeg", metric: "Primeira venda", label: "Começou a postar e a primeira venda saiu" },
  { src: "/assets/proofs/proof-512-vinte-vendas.jpeg", metric: "R$ 512,87", label: "20 produtos vendidos em 7 dias" },
  { src: "/assets/proofs/proof-feedback-tenis.jpeg", metric: "Vídeos que vendem", label: "Duas vendas e evolução com as orientações" },
  { src: "/assets/proofs/proof-374-seis-vendas.jpeg", metric: "R$ 374", label: "6 vendas e comissão gerada" },
  { src: "/assets/proofs/proof-mil-24-vendas.jpeg", metric: "R$ 1 mil", label: "24 produtos vendidos" },
  { src: "/assets/proofs/proof-primeira-venda-euro.jpeg", metric: "Primeira venda", label: "Resultado internacional em poucos dias" },
];

function MarketLogo({ name, brand, Icon, wordmark }: { name: string; brand: string; Icon: IconType; wordmark: string }) {
  return <span className={`market-logo market-logo--${brand}`} aria-label={name}><i><Icon aria-hidden="true" /></i><b>{wordmark}</b></span>;
}

function Brand() {
  return <a className="brand" href="#inicio" aria-label="Voomi — início"><Image src="/favicon-512.png" width={512} height={512} alt="" /><span>voomi</span></a>;
}

function CTA({ children, href = "#oferta", compact = false }: { children: React.ReactNode; href?: string; compact?: boolean }) {
  return <a className={`cta ${compact ? "cta--compact" : ""}`} href={href}><span>{children}</span><b aria-hidden="true">↗</b></a>;
}

export default function Home() {
  const pageRef = useRef<HTMLElement>(null);
  const [menu, setMenu] = useState(false);
  const [faq, setFaq] = useState(0);
  const [compactCarousel, setCompactCarousel] = useState(false);
  const [painSlide, setPainSlide] = useState(0);
  const [proofSlide, setProofSlide] = useState(0);
  const [activeFeature, setActiveFeature] = useState(0);
  const [coupon, setCoupon] = useState("");
  const [couponMessage, setCouponMessage] = useState("");
  const [activeVideo, setActiveVideo] = useState<(typeof carouselVideos)[number] | null>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [resultVideoSoundOn, setResultVideoSoundOn] = useState(false);
  const painCarouselRef = useRef<HTMLDivElement>(null);
  const painTrackRef = useRef<HTMLDivElement>(null);
  const painWheelLockRef = useRef(false);
  const proofTouchRef = useRef<{ x: number; y: number } | null>(null);
  const resultVideoRef = useRef<HTMLVideoElement>(null);

  const selectFeature = (index: number) => {
    setActiveFeature((index + featureDemos.length) % featureDemos.length);
  };

  const applyCoupon = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedCoupon = coupon.trim().toUpperCase();
    if (!normalizedCoupon) return;
    setCoupon(normalizedCoupon);
    window.localStorage.setItem("voomi-coupon", normalizedCoupon);
    setCouponMessage("Código registrado. A validação final acontece no pagamento.");
  };

  const goToPain = (index: number) => {
    const next = (index + pains.length) % pains.length;
    setPainSlide(next);
  };

  const handleProofTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    proofTouchRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleProofTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const start = proofTouchRef.current;
    proofTouchRef.current = null;
    if (!start) return;
    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;
    if (Math.abs(deltaX) < 42 || Math.abs(deltaX) <= Math.abs(deltaY)) return;
    setProofSlide((current) => (current + (deltaX < 0 ? 1 : -1) + proofShots.length) % proofShots.length);
  };

  useEffect(() => {
    const carousel = painCarouselRef.current;
    if (!carousel) return;
    const handleWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < Math.abs(event.deltaX) || Math.abs(event.deltaY) < 8) return;
      const atStart = painSlide === 0 && event.deltaY < 0;
      const atEnd = painSlide === pains.length - 1 && event.deltaY > 0;
      if (atStart || atEnd) return;
      event.preventDefault();
      if (painWheelLockRef.current) return;
      painWheelLockRef.current = true;
      goToPain(painSlide + (event.deltaY > 0 ? 1 : -1));
      window.setTimeout(() => { painWheelLockRef.current = false; }, 650);
    };
    carousel.addEventListener("wheel", handleWheel, { passive: false });
    return () => carousel.removeEventListener("wheel", handleWheel);
  }, [painSlide]);

  const openVideo = (video: (typeof carouselVideos)[number]) => {
    setVideoReady(false);
    setActiveVideo(video);
  };

  const enableResultVideoSound = () => {
    const video = resultVideoRef.current;
    if (!video) return;
    video.muted = false;
    video.volume = 1;
    setResultVideoSoundOn(true);
    void video.play().catch(() => undefined);
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
    const rails = Array.from(document.querySelectorAll<HTMLElement>(".story-rail"));
    const visibleRails = new Set<HTMLElement>();
    const pendingPlayHandlers = new Map<HTMLVideoElement, () => void>();
    let activePreviews = new Set<HTMLVideoElement>();
    let syncFrame: number | null = null;
    let carouselFrame: number | null = null;
    let lastCarouselTime = window.performance.now();
    const carouselPositions = new Map<HTMLElement, number>();

    const pausePreview = (video: HTMLVideoElement) => {
      const pendingHandler = pendingPlayHandlers.get(video);
      if (pendingHandler) video.removeEventListener("canplay", pendingHandler);
      pendingPlayHandlers.delete(video);
      video.pause();
    };

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
      const startPlayback = () => {
        pendingPlayHandlers.delete(video);
        if (!document.hidden && !activeVideo && activePreviews.has(video) && video.paused) {
          void video.play().catch(() => undefined);
        }
      };
      if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) startPlayback();
      else if (!pendingPlayHandlers.has(video)) {
        pendingPlayHandlers.set(video, startPlayback);
        video.addEventListener("canplay", startPlayback, { once: true });
      }
    };

    const syncVisiblePreviews = () => {
      syncFrame = null;
      if (document.hidden || activeVideo) {
        activePreviews = new Set();
        previews.forEach(pausePreview);
        return;
      }
      const sampledVideos: HTMLVideoElement[] = [];
      visibleRails.forEach((rail) => sampledVideos.push(...rail.querySelectorAll<HTMLVideoElement>("video")));
      activePreviews = new Set(sampledVideos);
      previews.forEach((video) => activePreviews.has(video) ? playPreview(video) : pausePreview(video));
    };

    const scheduleSync = () => {
      if (syncFrame === null) syncFrame = window.requestAnimationFrame(syncVisiblePreviews);
    };

    const railObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const rail = entry.target as HTMLElement;
        rail.classList.toggle("is-offscreen", !entry.isIntersecting);
        if (entry.isIntersecting) visibleRails.add(rail);
        else visibleRails.delete(rail);
      });
      scheduleSync();
    }, { rootMargin: "300px 0px" });

    previews.forEach((video) => {
      video.defaultMuted = true;
      video.muted = true;
      video.playsInline = true;
    });
    rails.forEach((rail) => railObserver.observe(rail));
    scheduleSync();

    const advanceMobileCarousels = (time: number) => {
      const elapsed = Math.min(64, time - lastCarouselTime);
      lastCarouselTime = time;
      if (!document.hidden && !activeVideo) {
        visibleRails.forEach((rail) => {
          if (rail.classList.contains("is-touching")) {
            carouselPositions.set(rail, rail.scrollLeft);
            return;
          }
          const track = rail.querySelector<HTMLElement>(".story-rail__track");
          if (!track) return;
          const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 0;
          const loopWidth = track.scrollWidth / 2 + gap / 2;
          const speed = rail.classList.contains("story-rail--videos") ? 16 : 34;
          const current = carouselPositions.get(rail) ?? rail.scrollLeft;
          const next = current + speed * (elapsed / 1000);
          const wrapped = next >= loopWidth ? next - loopWidth : next;
          carouselPositions.set(rail, wrapped);
          rail.scrollLeft = wrapped;
        });
      }
      carouselFrame = window.requestAnimationFrame(advanceMobileCarousels);
    };
    if (compactCarousel) carouselFrame = window.requestAnimationFrame(advanceMobileCarousels);
    document.addEventListener("visibilitychange", scheduleSync);
    window.addEventListener("pageshow", scheduleSync);
    window.addEventListener("resize", scheduleSync, { passive: true });
    return () => {
      railObserver.disconnect();
      if (syncFrame !== null) window.cancelAnimationFrame(syncFrame);
      if (carouselFrame !== null) window.cancelAnimationFrame(carouselFrame);
      pendingPlayHandlers.forEach((handler, video) => video.removeEventListener("canplay", handler));
      document.removeEventListener("visibilitychange", scheduleSync);
      window.removeEventListener("pageshow", scheduleSync);
      window.removeEventListener("resize", scheduleSync);
      previews.forEach((video) => video.pause());
    };
  }, [activeVideo, compactCarousel]);

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
        const cards = section.querySelectorAll(":scope .pain-card, :scope .audience-card, :scope .pricing-card, :scope .product-tour, :scope .proof-grid > div");
        if (heading) gsap.from(heading, { y: 38, autoAlpha: 0, duration: 0.85, scrollTrigger: { trigger: section, start: "top 82%", once: true } });
        if (cards.length) gsap.from(cards, { y: 46, autoAlpha: 0, duration: 0.72, stagger: 0.09, ease: "power3.out", scrollTrigger: { trigger: cards[0], start: "top 88%", once: true } });
      });

      gsap.utils.toArray<HTMLElement>(".pain-card, .audience-card", page).forEach((card) => {
        const glow = card.querySelector(".card-glow");
        if (!glow) return;
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

  const currentFeature = featureDemos[activeFeature];
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
        {Array.from({ length: 18 }, (_, index) => <i key={index}><Image src="/favicon-512.png" width={512} height={512} alt="" /></i>)}
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

    <section className="section pains" data-reveal>
      <div className="unlock-shell container">
        <header className="unlock-intro section-head left"><span>01 — DESTRAVE</span><h2>Você não trava por falta de vontade.<br className="unlock-intro__desktop-break" />{" "}<em>Trava sempre nos mesmos lugares.</em></h2></header>
        <div className="pain-carousel" ref={painCarouselRef}><div className="pain-grid" ref={painTrackRef} style={{ transform: `translate3d(-${painSlide * 100}%,0,0)` }}>{pains.map(([q,a],i)=><article key={q} className="pain-card"><div className="pain-card__number">0{i+1}</div><div className="pain-card__content"><div className="pain-card__problem"><small>O BLOQUEIO</small><h3>“{q}”</h3></div><div className="card-solution"><small>A SAÍDA</small><p>{a}</p></div></div></article>)}</div></div>
        <div className="pain-controls"><div>{pains.map(([,],i)=><button key={i} type="button" className={painSlide===i?"is-active":""} onClick={()=>goToPain(i)} aria-label={`Ir para bloqueio ${i+1}`} />)}</div><span><button type="button" onClick={()=>goToPain(painSlide-1)} aria-label="Bloqueio anterior">←</button><button type="button" onClick={()=>goToPain(painSlide+1)} aria-label="Próximo bloqueio">→</button></span></div>
        <div className="unlock-manifesto"><p>Não é ferramenta pra uma etapa. <strong>É a operação inteira, do produto ao vídeo postado.</strong></p></div>
      </div>
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
          <div className="floating-video floating-video--one"><Image src="/assets/voomi-outcome-product.webp" fill sizes="(max-width: 600px) 40vw, 220px" alt="Massageador portátil em criativo vertical" /><small>PRODUTO REAL</small></div>
          <div className="outcome-bridge__arrow" role="img" aria-label="Do produto real para o criativo com avatar">→</div>
          <div className="floating-video floating-video--two"><Image src="/assets/voomi-outcome-avatar.webp" fill sizes="(max-width: 600px) 40vw, 220px" alt="Criador demonstrando o massageador portátil" /><small>CRIATIVO COM AVATAR</small></div>
          <div className="proof-stack proof-stack--screenshot">
            <Image src="/assets/proof-tiktok-shop-results.jpeg" fill sizes="(max-width: 600px) 90vw, 460px" alt="Resultados do TikTok Shop com GMV atribuído de R$ 5,3 mil, 93 itens vendidos e comissão estimada de R$ 538,80" />
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
      <article className="creator creator--pipeline">
        <div className="creator__copy creator__copy--pipeline">
          <div><span className="chip">MÓDULO PRINCIPAL</span><small>CREATOR LAB</small><h3>Onde tudo<br />vira <em>vídeo.</em></h3></div>
          <div className="creator__copy-details"><p>Escolha o cenário, o produto e o avatar. A Voomi combina tudo e entrega o vídeo pronto pra postar.</p><ul><li>Cenário definido por você</li><li>Avatar no seu lugar</li><li>Vídeo final pronto para vender</li></ul></div>
        </div>
        <div className="creator__visual creator-pipeline" aria-label="Cenário, produto e avatar transformados em um vídeo pronto">
          <figure className="creator-pipeline__card creator-pipeline__card--scenario"><Image src="/assets/creator-lab-scenario.png" fill sizes="(max-width: 700px) 85vw, 240px" alt="Cenário de uma garagem com motocicletas" /><figcaption><small>01</small><strong>CENÁRIO</strong></figcaption></figure>
          <span aria-hidden="true">→</span>
          <figure className="creator-pipeline__card creator-pipeline__card--product"><Image src="/assets/creator-lab-product.jpeg" fill sizes="(max-width: 700px) 85vw, 240px" alt="Jaqueta preta escolhida como produto" /><figcaption><small>02</small><strong>PRODUTO</strong></figcaption></figure>
          <span aria-hidden="true">→</span>
          <figure className="creator-pipeline__card creator-pipeline__card--avatar"><Image src="/assets/creator-lab-avatar.png" fill sizes="(max-width: 700px) 85vw, 240px" alt="Avatar masculino escolhido para apresentar o produto" /><figcaption><small>03</small><strong>AVATAR</strong></figcaption></figure>
          <span aria-hidden="true">→</span>
          <figure className="creator-pipeline__card creator-pipeline__card--result"><video ref={resultVideoRef} src="/assets/creator-lab-result.mp4" aria-label="Vídeo final criado com o cenário, o produto e o avatar" autoPlay muted={!resultVideoSoundOn} loop playsInline controls preload="metadata" onVolumeChange={(event)=>setResultVideoSoundOn(!event.currentTarget.muted&&event.currentTarget.volume>0)} />{!resultVideoSoundOn&&<button type="button" className="creator-pipeline__sound" onClick={enableResultVideoSound} aria-label="Ativar som do vídeo final"><span aria-hidden="true">♪</span>ATIVAR SOM</button>}<figcaption><small>04</small><strong>VÍDEO PRONTO</strong></figcaption></figure>
        </div>
      </article>
      <div className="creation-gallery">
        <header className="creation-gallery__head"><span>GALERIA DE CRIAÇÕES</span><h3>Ideias que viraram<br /><em>vídeos prontos.</em></h3><p>Criações feitas dentro da Voomi, passando automaticamente para você ver o resultado.</p></header>
        <div className="story-rail story-rail--creations" aria-label="Galeria em carrossel de vídeos criados na Voomi">
          <div className="story-rail__track">{(()=>{const renderedVideos=[...creationGalleryVideos,...creationGalleryVideos];return renderedVideos.map((video,index)=>{const duplicate=index>=creationGalleryVideos.length;return <div className="story-video story-video--passive" key={`${video.src}-${index}`} aria-hidden={duplicate||undefined}><video src={video.src} poster={video.poster||undefined} autoPlay muted loop playsInline preload="metadata" disablePictureInPicture /></div>})})()}</div>
        </div>
      </div>
      <header className="product-tour-heading">
        <span>PLATAFORMA AO VIVO</span>
        <h3>Conheça por <em>dentro.</em></h3>
      </header>
      <div className="product-tour">
        <div className="product-tour__topline">
          <div><strong>Uma prévia da plataforma. Clique e teste.</strong></div>
          <p>Não é print estático — é o sistema em miniatura</p>
        </div>

        <div className="product-tour__tabs" role="tablist" aria-label="Módulos da plataforma">
          {featureDemos.map((feature, index) => (
            <button
              type="button"
              role="tab"
              aria-selected={activeFeature === index}
              aria-controls="product-tour-panel"
              className={activeFeature === index ? "is-active" : ""}
              key={feature.id}
              onClick={() => selectFeature(index)}
            >
              <span>0{index + 1}</span>
              <b>{feature.tag}</b>
              <small>{feature.title}</small>
            </button>
          ))}
        </div>

        <div className="product-tour__panel" id="product-tour-panel" role="tabpanel">
          <div className="product-tour__screen" key={currentFeature.id}>
            <div className="product-tour__browserbar" aria-hidden="true"><i /><i /><i /><span>app.voomi.ai / {currentFeature.id}</span><b>AO VIVO</b></div>
            <div className="product-tour__image product-tour__image--live">
              <ProductPreview
                activeId={currentFeature.id}
                onNavigate={(id) => {
                  const index = featureDemos.findIndex((feature) => feature.id === id);
                  if (index >= 0) selectFeature(index);
                }}
              />
            </div>
          </div>

          <aside className="product-tour__guide">
            <header><span>0{activeFeature + 1} / 04 · {currentFeature.tag}</span><h3>{currentFeature.title}</h3><p>{currentFeature.description}</p></header>
            <div className="product-tour__capabilities">
              <small>O QUE ESTE MÓDULO RESOLVE</small>
              <ul>{currentFeature.benefits.map((benefit, index) => <li key={benefit}><i>0{index + 1}</i><span>{benefit}</span></li>)}</ul>
            </div>
            <div className="product-tour__outcome"><span>RESULTADO</span><p>{currentFeature.outcome}</p></div>
            <a className="product-tour__link" href="#planos"><span>Quero usar a Voomi</span><b aria-hidden="true">↗</b></a>
            <footer className="product-tour__progress"><span><b style={{ width: `${((activeFeature + 1) / featureDemos.length) * 100}%` }} /></span><small>MÓDULO {activeFeature + 1} DE {featureDemos.length}</small></footer>
          </aside>
        </div>
      </div>
      <div className="flow">
        <div className="flow__track">
          {[false, true].map((duplicate) => (
            <div className="flow__group" aria-hidden={duplicate || undefined} key={duplicate ? "duplicate" : "original"}>
              {flowSteps.map(([module, action], index) => (
                <span key={module}>{module} <b>{action}</b>{index < flowSteps.length - 1 && <i aria-hidden="true">→</i>}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>

    <section id="para-quem" className="container section for-you" data-reveal>
      <div className="audience-clean">
        <header className="audience-clean__head"><div><span>04 — PRA QUEM É</span><h2>A Voomi é para você se...</h2></div></header>
        <div className="audience-clean__grid">{people.map(([,t,d])=><article className="audience-profile" key={t}><span><FiUserCheck aria-hidden="true" /></span><div><h3>{t}</h3><p>{d}</p></div></article>)}</div>
        <footer className="audience-clean__footer"><strong>Você não precisa aparecer, ter produto ou saber editar.</strong><CTA>Quero começar agora</CTA></footer>
      </div>
    </section>

    <section id="provas" className="section proof-wrap" data-reveal>
      <div className="container">
        <div className="section-head"><span>05 — GENTE REAL</span><h2>Todo dia chega mensagem<br /><em>assim no nosso suporte.</em></h2><p className="proof-summary">Nenhum apareceu na câmera. Nenhum tinha experiência.<strong>A diferença é que eles começaram.</strong></p></div>
        <div className="story-rail story-rail--videos" aria-label="Carrossel de vídeos de criadores">
          <div className="story-rail__track">{(()=>{ const renderedVideos = [...carouselVideos, ...carouselVideos]; return renderedVideos.map((video, index)=>{ const duplicate = index >= carouselVideos.length; return <button type="button" className="story-video" key={`${video.src}-${index}`} onPointerDown={(event) => event.currentTarget.closest(".story-rail")?.classList.add("is-touching")} onPointerUp={(event) => { event.currentTarget.closest(".story-rail")?.classList.remove("is-touching"); if (event.pointerType !== "mouse") openVideo(video); }} onPointerCancel={(event) => event.currentTarget.closest(".story-rail")?.classList.remove("is-touching")} onClick={() => openVideo(video)} aria-label={duplicate ? undefined : `Abrir ${video.label} com áudio`} aria-hidden={duplicate || undefined} tabIndex={duplicate ? -1:0}><video src={video.src} poster={video.poster || undefined} autoPlay muted loop playsInline preload="metadata" disablePictureInPicture /><span><i>▶</i><b>CLIQUE PARA OUVIR</b></span></button>})})()}</div>
        </div>
        <div className="proof-orbit">
          <div className="proof-orbit__hud"><span>RESULTADOS REAIS</span></div>
          <div className="proof-orbit__viewport" onTouchStart={handleProofTouchStart} onTouchEnd={handleProofTouchEnd} onTouchCancel={()=>{ proofTouchRef.current = null; }}>
            {proofShots.map((proof,index)=>{ const raw=index-proofSlide; const offset=raw>proofShots.length/2?raw-proofShots.length:raw<-proofShots.length/2?raw+proofShots.length:raw; return <button type="button" key={proof.src} className={`proof-orbit__shot ${offset===0?"is-active":""}`} style={{"--offset":offset} as React.CSSProperties} onClick={()=>setProofSlide(index)} aria-label={`Ver prova: ${proof.label}`} aria-current={offset===0?"true":undefined}><Image src={proof.src} fill sizes="(max-width: 700px) 72vw, 390px" alt={proof.label} /></button>})}
          </div>
          <div className="proof-orbit__readout"><div><strong>RESULTADOS REAIS</strong><p>{proofShots[proofSlide].label}</p></div><span><button type="button" onClick={()=>setProofSlide((proofSlide-1+proofShots.length)%proofShots.length)} aria-label="Prova anterior">←</button><button type="button" onClick={()=>setProofSlide((proofSlide+1)%proofShots.length)} aria-label="Próxima prova">→</button></span></div>
          <div className="proof-orbit__dots">{proofShots.map((proof,index)=><button type="button" key={proof.src} className={proofSlide===index?"is-active":""} onClick={()=>setProofSlide(index)} aria-label={`Ir para prova ${index+1}`} />)}</div>
        </div>
      </div>
    </section>

    <section className="tool-cost section" data-reveal>
      <div className="container">
        <div className="tool-cost__head">
          <span>FAÇA AS CONTAS</span>
          <h2>Quanto custa montar essa operação<br /><em>com ferramentas separadas?</em></h2>
          <p>Produto, roteiro, avatar, edição e design em cinco plataformas, cinco cobranças e cinco fluxos diferentes.</p>
        </div>
        <div className="tool-cost__layout">
          <div className="tool-cost__list">
            {toolCosts.map((tool) => <article key={tool.name}><i aria-hidden="true"><span style={{ backgroundImage: `url("${tool.logo}")` }} /></i><div><strong>{tool.name}</strong><span>{tool.purpose}</span></div><b>{tool.price}<small>/mês</small></b></article>)}
            <footer><span>TOTAL DE REFERÊNCIA</span><strong>≈ R$ 676,51<small>/mês</small></strong><p>Mais de R$ 8.118 por ano em assinaturas separadas.</p></footer>
          </div>
          <aside className="tool-cost__voomi">
            <span>COM A VOOMI</span>
            <h3>Uma operação.<br />Um só fluxo.</h3>
            <ul><li><i>✓</i> Radar de produtos</li><li><i>✓</i> Roteiros e Viral Boost</li><li><i>✓</i> Avatares e cenários com IA</li><li><i>✓</i> Criação e edição de vídeos</li></ul>
            <div><small>A PARTIR DE</small><p><span>R$</span><strong>147</strong><b>/mês</b></p><em>ou R$ 697 em pagamento único</em></div>
            <a href="#planos"><span>Ver planos da Voomi</span><b aria-hidden="true">↗</b></a>
          </aside>
        </div>
        <p className="tool-cost__note">Conversão informativa pela PTAX de venda a R$ 5,2043, publicada pelo Banco Central em 18 de agosto de 2026. Preços, impostos, região e câmbio podem alterar os valores.</p>
      </div>
    </section>

    <section id="planos" className="container section pricing">
      <div className="section-head">
        <span>06 — ESCOLHA SEU PLANO</span>
        <h2>Comece agora. Continue<br /><em>do jeito que faz sentido pra você.</em></h2>
        <p>Imagens ilimitadas em qualquer plano. Escolha entre a flexibilidade mensal ou o acesso definitivo.</p>
      </div>
      <form className="pricing-coupon" onSubmit={applyCoupon}>
        <div><FiZap aria-hidden="true" /><input type="text" value={coupon} onChange={(event) => { setCoupon(event.target.value); setCouponMessage(""); }} maxLength={32} autoComplete="off" placeholder="TEM UM CUPOM?" aria-label="Código do cupom" /><button type="submit" disabled={!coupon.trim()}>Aplicar</button></div>
        {couponMessage && <p role="status"><i>✓</i>{couponMessage}</p>}
      </form>
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

    {activeVideo && <div className={`video-lightbox ${videoReady ? "is-ready" : "is-loading"}`} role="dialog" aria-modal="true" aria-label={activeVideo.label}><button type="button" onClick={() => setActiveVideo(null)} aria-label="Fechar vídeo">×</button><div className="video-lightbox__stage"><video key={activeVideo.src} src={activeVideo.src} poster={activeVideo.poster} preload="auto" controls autoPlay playsInline onCanPlay={() => setVideoReady(true)} /><span className="video-lightbox__loading" aria-live="polite">Carregando vídeo…</span></div></div>}
  </main>;
}
