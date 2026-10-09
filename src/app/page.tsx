"use client";

import { useEffect, useState } from "react";
import { company } from "./company";

const navigation = [["私たちについて", "about"], ["事業紹介", "business"], ["お知らせ", "news"], ["会社概要", "company"]];
const services = [
  { number: "01", english: "REAL ESTATE SALES", name: company.services[0], description: "住まいの購入・売却について、ご希望をお聞きしながら次の一歩をサポートします。", detail: "住まいを購入したい、今の物件を売却したい。ご希望のエリアや条件、これからの暮らしについて、お聞かせください。お一人おひとりの想いに寄り添ってご相談を承ります。", image: "lounge.webp", alt: "住まいをイメージした自然光の差し込むラウンジ（AI生成イメージ）" },
  { number: "02", english: "RENTAL BROKERAGE", name: company.services[1], description: "暮らし方やご希望の条件に合わせて、新しい住まい探しをお手伝いします。", detail: "エリア、間取り、ご予算など、住まい探しで大切にしたいことを一緒に整理します。はじめてのお引っ越しも、暮らしの変化に合わせたお部屋探しも、お気軽にご相談ください。", image: "office.webp", alt: "明るい住空間をイメージした木の家具のある室内（AI生成イメージ）" },
  { number: "03", english: "PERSONAL TRAINING", name: company.services[2], description: "住まいだけでなく、からだづくりにも。一人ひとりの目標に寄り添うパーソナルトレーニング。", detail: "運動を始めたい、日々のからだづくりを続けたい。ご自身の目標やご希望をお聞かせください。トレーニングの内容やご利用については、電話・メールでお問い合わせいただけます。", image: "training.webp", alt: "自然光の入るパーソナルトレーニング空間（AI生成イメージ）" },
];
const companyRows = [
  { label: "会社名", value: company.name },
  { label: "代表", value: company.representative },
  { label: "所在地", value: <><span>〒{company.postalCode}</span><br />{company.address[0]}<br />{company.address[1]}</> },
  { label: "電話", value: <a href={company.phoneHref}>{company.phone}</a> },
  { label: "携帯", value: <a href={company.mobileHref}>{company.mobile}</a> },
  { label: "メール", value: <a href={company.emailHref}>{company.email}</a> },
  { label: "事業内容", value: company.services.join("\n") },
];

function Arrow() { return <span className="arrow" aria-hidden="true">↗</span>; }
function Brand() { return <a className="brand" href="#top" aria-label="Smile lims トップへ"><img className="brand-mark" src="/images/smile-lims-mark.webp" alt="" width="512" height="205" /><span>{company.brand}<span className="brand-caption">{company.name}</span></span></a>; }
function Rail({ number, english, japanese }: { number: string; english: string; japanese: string }) { return <div className="rail-label"><span>{number} / {english}</span><span>{japanese}</span></div>; }

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 72);
      const hero = document.querySelector<HTMLElement>(".hero");
      if (hero && !reduce.matches && window.scrollY <= hero.offsetHeight) hero.style.setProperty("--hero-shift", `${window.scrollY * 0.12}px`);
    };
    const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        if (!reduce.matches) entry.target.animate([{ opacity: 0, transform: "translateY(35px)", clipPath: "inset(0 0 100% 0)" }, { opacity: 1, transform: "translateY(0)", clipPath: "inset(0 0 0 0)" }], { duration: 950, easing: "cubic-bezier(.16,1,.3,1)" });
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    document.querySelectorAll("[data-reveal]").forEach(element => observer.observe(element));
    return () => { observer.disconnect(); window.removeEventListener("scroll", onScroll); window.cancelAnimationFrame(frame); };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", escape);
    return () => { document.body.style.overflow = previous; window.removeEventListener("keydown", escape); };
  }, [menuOpen]);

  return <>
    <a href="#main" className="skip-link">本文へ移動</a>
    <header className={`header ${scrolled ? "is-scrolled" : ""} ${menuOpen ? "menu-is-open" : ""}`}>
      <Brand />
      <nav id="main-navigation" aria-label="メインナビゲーション" className={menuOpen ? "navigation is-open" : "navigation"}>
        {navigation.map(([label, id], index) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}><span className="menu-index">0{index + 1}</span>{label}<span className="menu-link-arrow" aria-hidden="true">↗</span></a>)}
        <a className="nav-contact" href="#contact" onClick={() => setMenuOpen(false)}>お問い合わせ <Arrow /></a>
      </nav>
      <button type="button" className="menu-toggle" aria-label={menuOpen ? "メニューを閉じる" : "メニューを開く"} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)}><span>{menuOpen ? "CLOSE" : "MENU"}</span><span className="menu-lines" aria-hidden="true"><i /><i /></span></button>
    </header>

    <main id="main" inert={menuOpen}>
      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-visual"><img src="/images/office.webp" alt="緑と木の家具がある、自然光に包まれたオフィス（AI生成イメージ）" fetchPriority="high" width="1672" height="941" /></div><div className="hero-shade" />
        <span className="hero-eyebrow">SMILE LIMS — A BETTER EVERYDAY.</span>
        <h1 id="hero-title">SMILE IN EVERY HOME.</h1>
        <div className="hero-copy"><h2>{company.tagline}</h2><p>住まいのこと、からだのこと。<br />不動産売買・賃貸仲介・パーソナルトレーニングで、<br />あなたらしい毎日に寄り添います。</p></div>
        <a href="#about" className="hero-scroll"><span aria-hidden="true">↓</span>SCROLL TO DISCOVER</a><span className="hero-caption">01 / THE BEGINNING OF SOMETHING GOOD.</span>
      </section>

      <section id="about" className="about section-anchor editorial-section">
        <aside className="section-rail"><Rail number="01" english="ABOUT US" japanese="私たちについて" /><div className="rail-links"><a href="#about">ブランドメッセージ</a><a href="#business">私たちの事業</a><a href="#company">会社概要</a></div><span className="rail-bottom">Every smile starts at home.</span></aside>
        <div className="editorial-content"><div className="section-topline"><span>{company.tagline}</span><span>Brand Message</span></div><h2 className="display-heading"><span data-reveal>FOR YOUR HOME,</span><span data-reveal>FOR YOUR EVERYDAY.</span></h2>
          <div className="message-grid" data-reveal><h3>住まいと、からだと。<br />あなたらしい毎日へ。</h3><div><p>新しい住まいを探すこと。<br />自分のからだと向き合うこと。</p><p>smile limsは、大阪を拠点に、<br />不動産売買・賃貸仲介・パーソナルトレーニングの<br />3つの事業を通じて、日々の暮らしに寄り添います。</p><p>ご希望や想いを、一つひとつお聞きしながら。<br />住まい探しも、からだづくりも、<br />気軽に相談できる身近な存在を目指しています。</p><a href="#company" className="text-link">会社概要を見る <Arrow /></a></div></div>
          <figure className="about-image" data-reveal><img src="/images/lounge.webp" alt="木の家具と穏やかな自然光のあるラウンジ（AI生成イメージ）" width="1672" height="941" loading="lazy" /><figcaption>Spaces for new perspectives. / Image visual</figcaption></figure>
        </div>
      </section>

      <section id="business" className="business section-anchor editorial-section">
        <aside className="section-rail business-rail"><Rail number="02" english="OUR BUSINESS" japanese="私たちの事業" /><div className="rail-statement"><h2>住まいを見つける。<br />暮らしを支える。<br />からだを整える。</h2><p>あなたらしい毎日のために、<br />住まいと健康に寄り添います。</p><a href="#company" className="outline-link">私たちのこと <Arrow /></a></div></aside>
        <div className="business-content"><div className="section-topline"><span>smile limsができること</span><span>Our three services</span></div>{services.map(service => <article className="service-card" key={service.number}><div className="service-image" data-reveal><img src={`/images/${service.image}`} alt={service.alt} width="1672" height="941" loading="lazy" /></div><div className="service-label"><span>{service.number} / {service.english}</span></div><h3 data-reveal>{service.name}</h3><p>{service.description}</p><details className="service-details"><summary>事業について詳しく <span aria-hidden="true">＋</span></summary><p>{service.detail}</p></details></article>)}<div className="business-note"><span className="business-number">3</span><div><h3>暮らしに寄り添う、3つの事業。</h3><p>不動産売買・賃貸仲介・<br />パーソナルトレーニング。</p></div></div></div>
      </section>

      <section className="image-break" aria-label="Smile limsのビジョン"><img src="/images/lounge.webp" alt="穏やかな暮らしをイメージしたラウンジ（AI生成イメージ）" width="1672" height="941" loading="lazy" /><div className="image-break-copy" data-reveal><span>OUR VISION</span><h2>{company.tagline}</h2><p>For your home. For your everyday.</p></div></section>

      <section id="news" className="news section-anchor editorial-section"><aside className="section-rail"><Rail number="03" english="JOURNAL" japanese="お知らせ" /><p className="rail-description">私たちの取り組みと、<br />日々のこと。</p></aside><div className="editorial-content"><div className="section-topline"><span>smile limsのいま</span><span>Latest Stories</span></div><h2 className="display-heading"><span data-reveal>OUR LATEST</span><span data-reveal>STORIES.</span></h2><p className="news-empty">お知らせは準備中です。<br />サービスについてのご相談は、お気軽にお問い合わせください。</p></div></section>

      <section id="company" className="company section-anchor editorial-section"><aside className="section-rail"><Rail number="04" english="COMPANY" japanese="会社概要" /><div className="rail-links"><a href="#about">私たちについて</a><a href="#business">事業紹介</a><a href="#company">会社概要</a></div><span className="rail-bottom">{company.name}</span></aside><div className="editorial-content"><div className="section-topline"><span>私たちのこと</span><span>Company Info</span></div><h2 className="display-heading"><span data-reveal>THE PEOPLE BEHIND</span><span data-reveal>SMILE LIMS.</span></h2><dl className="company-table">{companyRows.map(({label, value}) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl><a className="text-link" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(company.address.join(" "))}`} target="_blank" rel="noopener noreferrer">所在地を地図で見る <Arrow /></a></div></section>

      <section id="contact" className="contact section-anchor" aria-labelledby="contact-title"><div className="contact-label"><span>LET’S TALK</span><span>お問い合わせ</span></div><div className="contact-main"><h2 id="contact-title" data-reveal>GOOD THINGS<br />START WITH A HELLO.</h2><div className="contact-bottom"><p>住まいのこと、からだのこと。<br />お電話・メールで、お気軽にご相談ください。</p><a className="contact-button" href={company.emailHref}>メールでお問い合わせ <Arrow /></a></div><div className="contact-channels"><a href={company.phoneHref}><span>PHONE / 電話</span><strong>{company.phone}</strong><Arrow /></a><a href={company.mobileHref}><span>MOBILE / 携帯</span><strong>{company.mobile}</strong><Arrow /></a><a className="contact-email" href={company.emailHref}><span>EMAIL / メール</span><strong>{company.email}</strong><Arrow /></a></div><p className="contact-address">代表　{company.representative}<br />〒{company.postalCode}　{company.address[0]}<br />{company.address[1]}</p></div></section>
    </main>

    <footer className="footer" inert={menuOpen}><div className="footer-main"><Brand /><a href="#top" className="back-top">BACK TO TOP <span aria-hidden="true">↑</span></a></div><div className="footer-bottom"><span>© 2026 smile lims</span><span>掲載写真はAI生成のイメージです。</span></div></footer>
  </>;
}
