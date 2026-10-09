"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

const navigation = [["私たちについて", "about"], ["事業紹介", "business"], ["お知らせ", "news"], ["会社概要", "company"]];
const services = [
  { number: "01", english: "PLACE DESIGN", name: "空間をつくる", description: "働く場所、集う場所、暮らす場所。人の想いから、その場所らしい価値を設計します。", detail: "オフィスや商業施設のコンセプト設計から、空間デザイン、プロジェクト管理までを一貫して支援します。利用する人の声を起点に、長く愛される場所をつくります。", image: "lounge.webp", alt: "自然光が差し込む木の家具と植物のあるラウンジ（AI生成イメージ）" },
  { number: "02", english: "BUSINESS SUPPORT", name: "事業を育てる", description: "課題の発見から、次の一歩まで。企業の可能性を、ともに考え、ともに育てます。", detail: "事業の現状分析、ブランド戦略、新規サービスの企画を伴走型で支援します。小さな実証と改善を積み重ね、企業の強みを持続的な成長につなげます。", image: "office.webp", alt: "大きな木のテーブルを中心にしたワークスペース（AI生成イメージ）" },
  { number: "03", english: "COMMUNITY BUILDING", name: "つながりを生む", description: "人と人、企業と地域。その間にある可能性を、新しいつながりに変えていきます。", detail: "地域の交流イベント、企業間の共創プログラム、コミュニティの運営を行います。参加する一人ひとりが主役になれる、開かれた関係づくりを大切にしています。", image: "lounge.webp", alt: "ソファとチェアのある穏やかな交流スペース（AI生成イメージ）" },
];
const news = [
  { date: "2026.10.01", category: "お知らせ", title: "コーポレートサイトをリニューアルしました。", body: "私たちの理念や事業を、よりわかりやすくお伝えするためにサイトをリニューアルしました。これからもSmile limsの取り組みをお届けします。（仮のお知らせです）" },
  { date: "2026.09.18", category: "取り組み", title: "地域とつながる「まちの対話室」を開催。", body: "地域で暮らす方々と企業が、街のこれからを語り合う交流プログラムを開催しました。対話から生まれたアイデアを、次の活動につなげていきます。（仮のお知らせです）" },
  { date: "2026.08.25", category: "お知らせ", title: "新たな共創プロジェクトがスタートしました。", body: "分野を越えて協力する企業と、新しい価値を生み出す共創プロジェクトを開始しました。（仮のお知らせです）" },
];

function Arrow() { return <span className="arrow" aria-hidden="true">↗</span>; }
function Brand() { return <a className="brand" href="#top" aria-label="Smile lims トップへ"><span>Smile lims<span className="brand-caption">株式会社Smile lims</span></span></a>; }
function Rail({ number, english, japanese }: { number: string; english: string; japanese: string }) { return <div className="rail-label"><span>{number} / {english}</span><span>{japanese}</span></div>; }

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);

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

  function openContact() { setMenuOpen(false); setConfirmed(false); dialog.current?.showModal(); }
  function confirmForm(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setConfirmed(true); }

  return <>
    <a href="#main" className="skip-link">本文へ移動</a>
    <header className={`header ${scrolled ? "is-scrolled" : ""} ${menuOpen ? "menu-is-open" : ""}`}>
      <Brand />
      <nav id="main-navigation" aria-label="メインナビゲーション" className={menuOpen ? "navigation is-open" : "navigation"}>
        {navigation.map(([label, id], index) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}><span className="menu-index">0{index + 1}</span>{label}<span className="menu-link-arrow" aria-hidden="true">↗</span></a>)}
        <button type="button" className="nav-contact" onClick={openContact}>お問い合わせ <Arrow /></button>
      </nav>
      <button type="button" className="menu-toggle" aria-label={menuOpen ? "メニューを閉じる" : "メニューを開く"} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)}><span>{menuOpen ? "CLOSE" : "MENU"}</span><span className="menu-lines" aria-hidden="true"><i /><i /></span></button>
    </header>

    <main id="main" inert={menuOpen}>
      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-visual"><img src="/images/office.webp" alt="緑と木の家具がある、自然光に包まれたオフィス（AI生成イメージ）" fetchPriority="high" width="1672" height="941" /></div><div className="hero-shade" />
        <span className="hero-eyebrow">SMILE LIMS — A BETTER EVERYDAY.</span>
        <h1 id="hero-title">SMILE WITH PURPOSE.</h1>
        <div className="hero-copy"><h2>人と企業の可能性を、<br />あたらしい明日の力に。</h2><p>小さな想いに、まっすぐ向き合う。<br />私たちは、ともに考え、ともに歩み、<br />日々の先にある笑顔をつくっていきます。</p></div>
        <a href="#about" className="hero-scroll"><span aria-hidden="true">↓</span>SCROLL TO DISCOVER</a><span className="hero-caption">01 / THE BEGINNING OF SOMETHING GOOD.</span>
      </section>

      <section id="about" className="about section-anchor editorial-section">
        <aside className="section-rail"><Rail number="01" english="ABOUT US" japanese="私たちについて" /><div className="rail-links"><a href="#about">ブランドメッセージ</a><a href="#business">私たちの事業</a><a href="#company">会社概要</a></div><span className="rail-bottom">Every smile starts somewhere.</span></aside>
        <div className="editorial-content"><div className="section-topline"><span>想いを、未来へ。</span><span>Brand Message</span></div><h2 className="display-heading"><span data-reveal>CREATING POSSIBILITIES,</span><span data-reveal>ENRICHING EVERYDAY LIFE.</span></h2>
          <div className="message-grid" data-reveal><h3>その一歩から、<br />未来は変わりはじめる。</h3><div><p>何気ない会話の中にある気づき。<br />まだ言葉になっていない、小さな想い。</p><p>Smile limsは、一人ひとりの声に耳を傾け、<br />人・企業・地域が持つ可能性を見つける会社です。</p><p>異なる視点を持ち寄って、まだない価値を生み出す。<br />ともに考え、ともに育てる。<br />その積み重ねが、明日の笑顔につながると信じています。</p><a href="#company" className="text-link">会社概要を見る <Arrow /></a></div></div>
          <figure className="about-image" data-reveal><img src="/images/lounge.webp" alt="木の家具と穏やかな自然光のあるラウンジ（AI生成イメージ）" width="1672" height="941" loading="lazy" /><figcaption>Spaces for new perspectives. / Image visual</figcaption></figure>
        </div>
      </section>

      <section id="business" className="business section-anchor editorial-section">
        <aside className="section-rail business-rail"><Rail number="02" english="OUR BUSINESS" japanese="私たちの事業" /><div className="rail-statement"><h2>人と向き合う。<br />可能性を見つける。<br />価値を、かたちにする。</h2><p>領域を越えてつながり、<br />次の一歩をともにつくります。</p><a href="#company" className="outline-link">私たちのこと <Arrow /></a></div></aside>
        <div className="business-content"><div className="section-topline"><span>Smile limsができること</span><span>Three perspectives</span></div>{services.map(service => <article className="service-card" key={service.number}><div className="service-image" data-reveal><img src={`/images/${service.image}`} alt={service.alt} width="1672" height="941" loading="lazy" /></div><div className="service-label"><span>{service.number} / {service.english}</span></div><h3 data-reveal>{service.name}</h3><p>{service.description}</p><details className="service-details"><summary>事業について詳しく <span aria-hidden="true">＋</span></summary><p>{service.detail}</p></details></article>)}<div className="business-note"><span className="business-number">3</span><div><h3>つながる、3つの視点。</h3><p>空間・事業・コミュニティ。<br />異なる領域から、あたらしい可能性を。</p></div></div></div>
      </section>

      <section className="image-break" aria-label="Smile limsのビジョン"><img src="/images/lounge.webp" alt="これからの働き方をイメージした穏やかなラウンジ（AI生成イメージ）" width="1672" height="941" loading="lazy" /><div className="image-break-copy" data-reveal><span>OUR VISION</span><h2>想いをつなぎ、<br />まだない価値をつくる。</h2><p>We believe in the possibilities ahead.</p></div></section>

      <section id="news" className="news section-anchor editorial-section"><aside className="section-rail"><Rail number="03" english="JOURNAL" japanese="お知らせ" /><p className="rail-description">私たちの取り組みと、<br />日々のこと。</p></aside><div className="editorial-content"><div className="section-topline"><span>Smile limsのいま</span><span>Latest Stories</span></div><h2 className="display-heading"><span data-reveal>OUR LATEST</span><span data-reveal>STORIES.</span></h2><div className="news-list">{news.map(item => <details className="news-item" key={item.date}><summary><time dateTime={item.date.replaceAll(".", "-")}>{item.date}</time><span className="news-category">{item.category}</span><span className="news-title">{item.title}</span><span className="news-plus" aria-hidden="true">＋</span></summary><p>{item.body}</p></details>)}</div></div></section>

      <section id="company" className="company section-anchor editorial-section"><aside className="section-rail"><Rail number="04" english="COMPANY" japanese="会社概要" /><div className="rail-links"><a href="#about">私たちについて</a><a href="#business">事業紹介</a><a href="#company">会社概要</a></div><span className="rail-bottom">株式会社Smile lims</span></aside><div className="editorial-content"><div className="section-topline"><span>私たちのこと</span><span>Company Info</span></div><h2 className="display-heading"><span data-reveal>THE PEOPLE BEHIND</span><span data-reveal>SMILE LIMS.</span></h2><dl className="company-table">{[
        ["会社名", "株式会社Smile lims"], ["設立", "2018年4月"], ["代表者", "代表取締役　青葉 晴人"], ["所在地", "東京都港区青葉町1-2-3\nSmile limsビル 4F（仮の住所）"], ["資本金", "1,000万円"], ["事業内容", "空間デザイン・プロジェクト企画\n事業開発・ブランドコンサルティング\n地域共創・コミュニティ運営"], ["従業員数", "24名（仮の情報）"],
      ].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl><p className="company-demo">※ 社名以外の会社情報・事業内容・お知らせは仮のサンプルです。</p></div></section>

      <section className="contact" aria-labelledby="contact-title"><div className="contact-label"><span>LET’S TALK</span><span>お問い合わせ</span></div><div className="contact-main"><h2 id="contact-title" data-reveal>GOOD THINGS<br />START WITH A HELLO.</h2><div className="contact-bottom"><p>事業のご相談や、協業について。<br />あなたの想いを、お聞かせください。</p><button type="button" className="contact-button" onClick={openContact}>お問い合わせ <Arrow /></button></div></div></section>
    </main>

    <footer className="footer" inert={menuOpen}><div className="footer-main"><Brand /><a href="#top" className="back-top">BACK TO TOP <span aria-hidden="true">↑</span></a></div><div className="footer-bottom"><span>© 2026 Smile lims</span><span>社名以外の内容はサンプルです。空間写真はAI生成イメージです。</span></div></footer>

    <dialog ref={dialog} className="contact-dialog" aria-labelledby="dialog-title" onClose={() => setConfirmed(false)}><button type="button" className="dialog-close" onClick={() => dialog.current?.close()} aria-label="お問い合わせを閉じる">×</button><span className="section-kicker">CONTACT / DEMO</span><h2 id="dialog-title">お問い合わせ</h2><p className="form-note">デモ用フォームです。入力内容は送信・保存されません。</p>{confirmed ? <div role="status" className="form-confirmation"><span aria-hidden="true">✓</span><h3>入力内容を確認しました。</h3><p>これはデモのため、実際の送信は行っていません。</p><button type="button" className="form-submit" onClick={() => dialog.current?.close()}>閉じる</button></div> : <form onSubmit={confirmForm}><label>お名前 <span>必須</span><input name="name" autoComplete="name" required maxLength={100} /></label><label>メールアドレス <span>必須</span><input name="email" type="email" autoComplete="email" required maxLength={254} /></label><label>ご相談内容 <span>必須</span><textarea name="message" rows={4} required maxLength={3000} /></label><button type="submit" className="form-submit">入力内容を確認する <Arrow /></button></form>}</dialog>
  </>;
}
