"use client";

import { useEffect, useState } from "react";
import type { IconType } from "react-icons";
import { SiInstagram, SiMercadopago, SiShopee, SiTiktok, SiYoutube } from "react-icons/si";
import { FaAmazon } from "react-icons/fa";

const nav = [
  ["Como funciona", "#plataforma"],
  ["Pra quem é", "#para-quem"],
  ["Provas", "#provas"],
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
  ["Radar de produtos", "Encontre produtos validados, comissão, vendas e crescimento. Um clique manda tudo para o Creator Lab.", "RADAR"],
  ["Viral Boost", "Crie historinhas virais para crescer a conta e alcançar os primeiros seguidores que destravam sua loja.", "BOOST"],
  ["Personalize IA", "Crie avatares e cenários ilimitados. Sua foto pode virar avatar — seu rosto real não precisa aparecer.", "AVATAR"],
  ["Lab Studio", "Corte, divida cenas, ajuste, legende e exporte no navegador. Sem CapCut. Sem Premiere.", "STUDIO"],
];

const people = [
  ["01", "Quer uma renda a mais, mas não quer aparecer", "O avatar aparece por você. Você vende no anonimato."],
  ["02", "Não tem produto, estoque ou dinheiro pra investir", "Você se afilia, promove e fica com a comissão."],
  ["03", "Já tentou gravar e travou", "Aqui você não grava nada — nem precisa perder a vergonha."],
  ["04", "Não sabe editar e não quer aprender", "A Voomi monta o vídeo e ensina você do zero."],
  ["05", "Já vende e quer escalar sem virar refém do conteúdo", "Multiplique criativos em minutos, sem gravar."],
  ["06", "Cansou de ferramenta que só mostra o que vende", "A Voomi entrega o vídeo pronto na sua mão."],
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

function MarketLogo({ name, brand, Icon, wordmark }: { name: string; brand: string; Icon: IconType; wordmark: string }) {
  return <span className={`market-logo market-logo--${brand}`} aria-label={name}><i><Icon aria-hidden="true" /></i><b>{wordmark}</b></span>;
}

function Brand() {
  return <a className="brand" href="#inicio" aria-label="Voomi — início"><img src="/favicon-512.png" alt="" /><span>voomi</span></a>;
}

function CTA({ children, href = "#oferta", compact = false }: { children: React.ReactNode; href?: string; compact?: boolean }) {
  return <a className={`cta ${compact ? "cta--compact" : ""}`} href={href}><span>{children}</span><b aria-hidden="true">↗</b></a>;
}

function Placeholder({ label, className = "" }: { label: string; className?: string }) {
  return <div className={`placeholder ${className}`}><span className="placeholder__corners" /><div className="placeholder__icon">▶</div><small>ESPAÇO RESERVADO</small><strong>{label}</strong></div>;
}

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [video, setVideo] = useState(false);
  const [faq, setFaq] = useState(0);

  useEffect(() => {
    document.body.style.overflow = video ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [video]);

  return <main id="inicio">
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

    <section className="hero container section">
      <div className="hero__eyebrow"><span>●</span> SEM APARECER <i /> SEM GRAVAR <i /> SEM EDITOR</div>
      <button className="hero__video" onClick={() => setVideo(true)} aria-label="Abrir vídeo de vendas">
        <Placeholder label="VSL / VÍDEO PRINCIPAL" />
        <span className="video-badge">VSL ~2 MIN</span>
      </button>
      <div className="hero__copy">
        <p className="kicker">A operação completa para vender com vídeo</p>
        <h1>Ache o produto vencedor.<br /><em>A IA cria o vídeo por você.</em></h1>
        <p className="hero__sub">Com um avatar no seu lugar — pronto pra postar em minutos.</p>
        <div className="social-line">
          <div className="avatars">{[1,2,3,4,5].map(n => <span key={n}>{n === 5 ? "+" : ""}</span>)}</div>
          <div><b>★★★★★</b><small>+4.000 criadores ativos</small></div>
        </div>
        <CTA>Quero criar sem aparecer</CTA>
        <p className="micro">Acesso vitalício <i /> pague uma vez</p>
      </div>
    </section>

    <section className="market" aria-label="Marketplaces compatíveis">
      <p>UM VÍDEO. VÁRIOS LUGARES PRA VENDER.</p>
      <div className="marquee"><div>{[...marketplaces, ...marketplaces].map(([name,brand,Icon,wordmark],i)=><MarketLogo key={`${brand}-${i}`} name={name} brand={brand} Icon={Icon} wordmark={wordmark} />)}</div></div>
    </section>

    <section className="numbers container section-tight" aria-label="Números da Voomi">
      {[["+4.000","pessoas usam a Voomi"],["~1.000","criativos todo dia"],["+500","produtos no radar"],["+50","novos criadores por dia"]].map(([n,l])=><div key={n}><strong>{n}</strong><span>{l}</span></div>)}
      <p>8 meses no mercado. Todo dia mais gente vendendo sem aparecer.</p>
    </section>

    <section className="container section pains">
      <div className="section-head"><span>01 — DESTRAVE</span><h2>Você não trava por falta de vontade.<br /><em>Trava sempre nos mesmos lugares.</em></h2><p>E cada trava dessas tem uma saída dentro da Voomi.</p></div>
      <div className="pain-grid">{pains.map(([q,a],i)=><article key={q} className={i===1?"featured":""}><div className="alert">!</div><span>0{i+1}</span><h3>“{q}”</h3><p><b>→</b> {a}</p></article>)}</div>
      <p className="manifesto">Não é ferramenta pra uma etapa.<br /><strong>É a operação inteira, do produto ao vídeo postado.</strong></p>
    </section>

    <section className="section compare-wrap">
      <div className="container compare">
        <div className="section-head left"><span>02 — SEM CÂMERA</span><h2>O que te trava não é a ferramenta.<br /><em>É a câmera apontada pra você.</em></h2><p>Você já pensou em vender online. Mas na hora de gravar, travou. A Voomi existe para você vender sem passar por isso.</p></div>
        <div className="comparison">
          <div className="comparison__side muted-side"><small>AS OUTRAS</small>{["Mostram vídeos — você grava","Você ainda precisa aparecer","O vídeo nunca sai","Cobrança todo mês"].map(x=><p key={x}><i>×</i>{x}</p>)}</div>
          <div className="comparison__side voomi-side"><small>COM A VOOMI</small>{["O avatar grava por você","Seu rosto nunca aparece","Vídeo pronto em minutos","Pague uma vez. É seu."].map(x=><p key={x}><i>✓</i>{x}</p>)}</div>
        </div>
        <blockquote>“Ninguém vai te reconhecer. Ninguém vai te julgar.<br /><em>E mesmo assim, você vende.</em>”</blockquote>
      </div>
    </section>

    <section id="plataforma" className="container section platform">
      <div className="section-head"><span>03 — A PLATAFORMA</span><h2>Não é uma ferramenta.<br /><em>É a operação inteira na sua mão.</em></h2><p>Do produto vencedor ao vídeo pronto. Sem aparecer, sem editor, sem sair daqui.</p></div>
      <article className="creator">
        <div className="creator__copy"><span className="chip">MÓDULO PRINCIPAL</span><small>CREATOR LAB</small><h3>Onde o produto<br />vira <em>vídeo.</em></h3><p>Escolha o produto, o avatar, a voz e o cenário. A Voomi monta tudo e entrega o vídeo pronto pra postar.</p><ul><li>Avatar no seu lugar</li><li>Voz e movimento por IA</li><li>Seu rosto nunca aparece</li></ul></div>
        <div className="creator__visual"><Placeholder label="ANTES — FOTO DO PRODUTO" className="before" /><span>→</span><Placeholder label="DEPOIS — VÍDEO COM AVATAR" className="after" /></div>
      </article>
      <div className="feature-grid">{features.map(([title,text,tag],i)=><article key={title}><span>0{i+1}</span><small>{tag}</small><div className="feature-placeholder">CONTEÚDO VISUAL<br />DO MÓDULO</div><h3>{title}</h3><p>{text}</p><b>EXPLORAR MÓDULO ↗</b></article>)}</div>
      <div className="flow"><span>RADAR <b>acha</b></span><i>→</i><span>CREATOR LAB <b>cria</b></span><i>→</i><span>VIRAL BOOST <b>viraliza</b></span><i>→</i><span>LAB STUDIO <b>finaliza</b></span></div>
    </section>

    <section id="para-quem" className="container section for-you">
      <div className="section-head left"><span>04 — PRA QUEM É</span><h2>Se você se reconhecer em um destes,<br /><em>a Voomi é pra você.</em></h2></div>
      <div className="people-grid">{people.map(([n,t,d])=><article key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></article>)}</div>
      <div className="center-cta"><p>O que faltava não era vontade. Era uma forma de vender sem precisar aparecer.</p><h3>Agora você tem.</h3><CTA>Quero começar sem aparecer</CTA></div>
    </section>

    <section id="provas" className="section proof-wrap">
      <div className="container">
        <div className="section-head"><span>05 — GENTE REAL</span><h2>Todo dia chega mensagem<br /><em>assim no nosso suporte.</em></h2><p>Os espaços abaixo receberão os prints reais, anonimizados e aprovados.</p></div>
        <div className="proof-grid">{["PRINT — PRIMEIRA VENDA","PRINT — R$ 64","PRINT — R$ 512 · 20 VENDAS","PRINT — R$ 1 MIL","PRINT — R$ 374 · 6 VENDAS"].map((x,i)=><div key={x} className={i===2?"tall":""}><Placeholder label={x} /></div>)}</div>
        <div className="support-note"><span>↳</span><p><strong>E quando bate a dúvida, tem gente de verdade do outro lado.</strong><br />Você começa acompanhado.</p></div>
        <p className="proof-close">Nenhum apareceu na câmera. Nenhum tinha experiência.<br /><strong>A diferença é que eles começaram.</strong></p>
      </div>
    </section>

    <section id="faq" className="container section faq">
      <div className="faq__intro"><span>06 — DÚVIDAS</span><h2>Ficou com alguma dúvida?<br /><em>A gente responde.</em></h2><p>Respostas diretas, sem letras miúdas.</p></div>
      <div className="faq__list">{faqs.map(([q,a],i)=><article key={q} className={faq===i?"open":""}><button onClick={()=>setFaq(faq===i?-1:i)} aria-expanded={faq===i}><span>0{i+1}</span><b>{q}</b><i>{faq===i?"−":"+"}</i></button><div><p>{a}</p></div></article>)}</div>
    </section>

    <section id="oferta" className="final section">
      <div className="final__orb" aria-hidden="true" />
      <div className="container final__content"><span className="chip">A DECISÃO É SUA</span><h2>Você chegou até aqui<br /><em>por um motivo.</em></h2><p>Agora existe um jeito de vender sem pôr a cara na internet, sem estoque, sem saber gravar ou editar. A Voomi acha o produto, cria o avatar e entrega o vídeo pronto.</p><h3>A pergunta não é mais “será que eu consigo?”<br /><strong>É “por que não começar agora?”</strong></h3><CTA>Quero criar meu primeiro vídeo sem aparecer</CTA><small>SEM GRAVAR <i /> SEM APARECER <i /> SEM MENSALIDADE</small></div>
    </section>

    <footer className="container footer"><Brand /><p>Vídeos que vendem. Sem você aparecer.</p><span>© 2026 Voomi. Todos os direitos reservados.</span></footer>

    {video && <div className="modal" role="dialog" aria-modal="true" aria-label="Vídeo de apresentação"><button onClick={()=>setVideo(false)} aria-label="Fechar vídeo">×</button><Placeholder label="VSL FINAL — COM ÁUDIO" /></div>}
  </main>;
}
