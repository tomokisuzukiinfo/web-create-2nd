"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

const navigation = [
  ["私たちについて", "about"], ["事業紹介", "business"], ["お知らせ", "news"], ["会社概要", "company"],
];

function Arrow() {
  return <span aria-hidden="true" className="arrow">↗</span>;
}

function Brand({ light = false }: { light?: boolean }) {
  return <a className={`brand ${light ? "brand-light" : ""}`} href="#top" aria-label="Smile lims トップへ">
    <svg viewBox="0 0 38 38" aria-hidden="true"><circle cx="19" cy="19" r="17" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M10 21c3 9 15 9 18 0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><circle cx="13" cy="14" r="1.5" fill="currentColor" /><circle cx="25" cy="14" r="1.5" fill="currentColor" /></svg>
    <span>Smile lims<span className="brand-caption">株式会社Smile lims</span></span>
  </a>;
}

const services = [
  { number: "01", english: "PLACE DESIGN", name: "空間をつくる", description: "働く場所、集う場所、暮らす場所。人の想いから、その場所らしい価値を設計します。", detail: "オフィスや商業施設のコンセプト設計から、空間デザイン、プロジェクト管理までを一貫して支援します。利用する人の声を起点に、長く愛される場所をつくります。", art: "space" },
  { number: "02", english: "BUSINESS SUPPORT", name: "事業を育てる", description: "課題の発見から、次の一歩まで。企業の可能性を、ともに考え、ともに育てます。", detail: "事業の現状分析、ブランド戦略、新規サービスの企画を伴走型で支援します。小さな実証と改善を積み重ね、企業の強みを持続的な成長につなげます。", art: "business" },
  { number: "03", english: "COMMUNITY BUILDING", name: "つながりを生む", description: "人と人、企業と地域。その間にある可能性を、新しいつながりに変えていきます。", detail: "地域の交流イベント、企業間の共創プログラム、コミュニティの運営を行います。参加する一人ひとりが主役になれる、開かれた関係づくりを大切にしています。", art: "community" },
];

const news = [
  { date: "2026.10.01", category: "お知らせ", title: "コーポレートサイトをリニューアルしました。", body: "私たちの理念や事業を、よりわかりやすくお伝えするためにサイトをリニューアルしました。これからもSmile limsの取り組みをお届けします。（架空のお知らせです）" },
  { date: "2026.09.18", category: "取り組み", title: "地域とつながる「まちの対話室」を開催。", body: "地域で暮らす方々と企業が、街のこれからを語り合う交流プログラムを開催しました。対話から生まれたアイデアを、次の活動につなげていきます。（架空のお知らせです）" },
  { date: "2026.08.25", category: "お知らせ", title: "新たな共創プロジェクトがスタートしました。", body: "分野を越えて協力する企業と、新しい価値を生み出す共創プロジェクトを開始しました。今後の取り組みを、このサイトでご紹介していきます。（架空のお知らせです）" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.animate([{ opacity: 0, transform: "translateY(24px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 750, easing: "cubic-bezier(.2,.7,.2,1)" });
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    document.querySelectorAll("[data-reveal]").forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  function openContact() {
    setMenuOpen(false);
    setConfirmed(false);
    dialog.current?.showModal();
  }

  function confirmForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setConfirmed(true);
  }

  return <>
    <a href="#main" className="skip-link">本文へ移動</a>
    <header className="header" id="top">
      <Brand />
      <button type="button" className="menu-toggle" aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "閉じる ×" : "メニュー ☰"}</button>
      <nav id="main-navigation" aria-label="メインナビゲーション" className={menuOpen ? "navigation is-open" : "navigation"}>
        {navigation.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}
        <button type="button" className="nav-contact" onClick={openContact}>お問い合わせ <Arrow /></button>
      </nav>
    </header>

    <main id="main">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <div className="eyebrow"><span className="dot" /> A GOOD NEXT, TOGETHER.</div>
          <h1 id="hero-title">人と街の、<br />あたらしい<span className="accent-word">可能性。</span></h1>
          <p>想いをつなぎ、まだない価値をつくる。<br />私たちは、未来への一歩をともに歩む会社です。</p>
          <a href="#about" className="text-link">私たちについて <span className="circle-arrow"><Arrow /></span></a>
        </div>
        <div className="hero-visual">
          <img src="/images/city.svg" alt="緑と建築が共存する、未来の街を描いたイラスト" fetchPriority="high" width="1000" height="1100" />
          <span className="visual-label">NEW PERSPECTIVES.<br />NEW POSSIBILITIES.</span>
          <span className="visual-coordinate">SMILE LIMS / CORPORATE DESIGN</span>
        </div>
        <div className="hero-bottom"><span>人と、企業と、地域のこれから。</span><a href="#about">SCROLL TO EXPLORE <span aria-hidden="true">↓</span></a><span className="demo-note">SAMPLE CONTENT / DEMO</span></div>
        <div className="hero-watermark" aria-hidden="true">Smile lims.</div>
      </section>

      <section id="about" className="about section-anchor">
        <div className="section-kicker" data-reveal><span>01 / ABOUT US</span><span>私たちについて</span></div>
        <div className="about-grid">
          <div className="about-heading" data-reveal><span className="leaf-symbol" aria-hidden="true">✳</span><h2>小さな想いから、<br />大きな<span>可能性</span>へ。</h2></div>
          <div className="about-copy" data-reveal><p>街の風景も、企業の未来も。<br />そのはじまりには、いつも誰かの想いがあります。</p><p>Smile limsは、一人ひとりの声に耳を傾け、<br className="desktop-break" />人・企業・地域が持つ可能性を見つける会社です。</p><p>空間づくり、事業支援、コミュニティづくり。<br className="desktop-break" />領域を越えて手を取り合い、<br className="desktop-break" />今日より少し良い明日をつくっていきます。</p><a href="#company" className="text-link">会社概要を見る <span className="circle-arrow"><Arrow /></span></a></div>
        </div>
        <div className="about-footer" aria-hidden="true">BETTER PLACES. BETTER FUTURES.</div>
      </section>

      <section id="business" className="business section-anchor">
        <div className="section-heading" data-reveal><div><span className="section-kicker">02 / OUR BUSINESS</span><h2>可能性を、かたちに。</h2></div><p>異なる視点を掛け合わせて、<br />人と街に、新しい価値を届けます。</p></div>
        <div className="service-grid">
          {services.map(service => <article className="service-card" key={service.number} data-reveal>
            <div className={`service-art art-${service.art}`} aria-hidden="true"><span className="art-number">{service.number}</span><div className="art-shape" /><span className="art-caption">{service.english}</span></div>
            <div className="service-title"><span>{service.number}</span><h3>{service.name}</h3></div>
            <p>{service.description}</p>
            <details className="service-details"><summary>事業について詳しく <span aria-hidden="true">＋</span></summary><p>{service.detail}</p></details>
          </article>)}
        </div>
      </section>

      <section id="news" className="news section-anchor">
        <div className="news-heading" data-reveal><span className="section-kicker">03 / JOURNAL</span><h2>Smile limsのいま。</h2><p>私たちの取り組みと、日々のこと。</p></div>
        <div className="news-list" data-reveal>{news.map(item => <details className="news-item" key={item.date}><summary><time dateTime={item.date.replaceAll(".", "-")}>{item.date}</time><span className="news-category">{item.category}</span><span className="news-title">{item.title}</span><span className="news-plus" aria-hidden="true">＋</span></summary><p>{item.body}</p></details>)}</div>
      </section>

      <section id="company" className="company section-anchor">
        <div className="company-intro" data-reveal><span className="section-kicker">04 / COMPANY</span><h2>私たちのこと。</h2><p>人と街に向き合い、<br />ともに歩んでいく。</p><div className="company-emblem" aria-hidden="true"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="5" /><path d="M25 55c8 25 42 25 50 0" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" /><circle cx="34" cy="35" r="4" fill="currentColor" /><circle cx="66" cy="35" r="4" fill="currentColor" /></svg><span>Smile lims</span></div><span className="company-demo">※ 社名以外の掲載情報は仮のサンプルです。</span></div>
        <dl className="company-table" data-reveal>{[
          ["会社名", "株式会社Smile lims / Smile lims"], ["設立", "2018年4月"], ["代表者", "代表取締役　青葉 晴人"], ["所在地", "東京都港区青葉町1-2-3\nSmile limsビル 4F（架空の住所）"], ["資本金", "1,000万円"], ["事業内容", "空間デザイン・プロジェクト企画\n事業開発・ブランドコンサルティング\n地域共創・コミュニティ運営"], ["従業員数", "24名（2026年10月時点）"],
        ].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
      </section>

      <section className="contact" aria-labelledby="contact-title" data-reveal><div><span className="section-kicker">LET’S CREATE THE NEXT.</span><h2 id="contact-title">次の一歩を、ご一緒に。</h2><p>事業のご相談や、協業について。<br />まずは、あなたの想いをお聞かせください。</p></div><button type="button" className="contact-button" onClick={openContact}><span>お問い合わせ<small>CONTACT US</small></span><Arrow /></button></section>
    </main>

    <footer className="footer"><div className="footer-main"><Brand light /><a href="#top" className="back-top">BACK TO TOP <span aria-hidden="true">↑</span></a></div><div className="footer-bottom"><span>© 2026 Smile lims — Concept website</span><span>社名以外の情報は仮のサンプルです。</span></div></footer>

    <dialog ref={dialog} className="contact-dialog" aria-labelledby="dialog-title" onClose={() => setConfirmed(false)}>
      <button type="button" className="dialog-close" onClick={() => dialog.current?.close()} aria-label="お問い合わせを閉じる">×</button>
      <span className="section-kicker">CONTACT / DEMO</span><h2 id="dialog-title">お問い合わせ</h2>
      <p className="form-note">デモ用フォームです。入力内容は送信・保存されません。</p>
      {confirmed ? <div role="status" className="form-confirmation"><span aria-hidden="true">✓</span><h3>入力内容を確認しました。</h3><p>これはデモのため、実際の送信は行っていません。</p><button type="button" className="form-submit" onClick={() => dialog.current?.close()}>閉じる</button></div> : <form onSubmit={confirmForm}>
        <label>お名前 <span>必須</span><input name="name" autoComplete="name" required maxLength={100} /></label>
        <label>メールアドレス <span>必須</span><input name="email" type="email" autoComplete="email" required maxLength={254} /></label>
        <label>ご相談内容 <span>必須</span><textarea name="message" rows={4} required maxLength={3000} /></label>
        <button type="submit" className="form-submit">入力内容を確認する <Arrow /></button>
      </form>}
    </dialog>
  </>;
}
