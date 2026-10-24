import { useRef, useState } from 'react';
import { ArrowDown, ArrowRight, BatteryCharging, Check, ChevronDown, House, Menu, Pause, Phone, Play, Snowflake, Thermometer, X, Zap } from 'lucide-react';

const phoneHref = 'tel:+31627299635';

const serviceImages = ['/images/qomforthome-warmtepomp.webp','/images/qomforthome-airco.webp','/images/qomforthome-hybride.webp','/images/qomforthome-thuisbatterij.webp'];
const serviceAlts = ['Warmtepomp bij een woning','Airco aan de wand in een woonruimte','Hybride verwarmingssysteem met warmtepomp en cv-ketel','Thuisbatterij in een woning'];
const services = [
  { title: 'Warmtepompen', text: 'Een passende oplossing voor verwarmen met oog voor uw woning en dagelijkse comfort.', icon: Thermometer },
  { title: 'Airco’s', text: 'Aangenaam koel op warme dagen. We denken mee over een plek en systeem dat bij uw huis past.', icon: Snowflake },
  { title: 'Hybride systemen', text: 'Een combinatie van een warmtepomp en uw bestaande cv-ketel, afgestemd op uw situatie.', icon: Zap },
  { title: 'Thuisbatterijen', text: 'Verken wat een thuisbatterij kan betekenen voor het gebruik van energie in uw eigen huis.', icon: BatteryCharging },
];

const faqs = [
  { question: 'Weet ik al precies welk systeem ik nodig heb?', answer: 'Dat hoeft niet. Vertel ons wat u merkt in huis en wat u wilt verbeteren. We bespreken samen welke mogelijkheden logisch zijn voor uw woning.' },
  { question: 'Kan ik ook bellen voor alleen advies?', answer: 'Natuurlijk. Een eerste gesprek is bedoeld om uw vraag en situatie te begrijpen. U zit nergens aan vast.' },
  { question: 'Doet QomfortHome ook de installatie?', answer: 'Ja. Advies en installatie horen bij ons werk. We bespreken vooraf wat uw woning nodig heeft en welke vervolgstap passend is.' },
  { question: 'Welke oplossing past bij mijn woning?', answer: 'Dat hangt onder meer af van de woning, de huidige installatie en uw wensen. Daarom beginnen we met luisteren en praktisch advies, niet met een standaardoplossing.' },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const [videoPlaying, setVideoPlaying] = useState(false);

  const toggleHeroVideo = () => {
    const video = heroVideoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play().then(() => setVideoPlaying(true)).catch(() => setVideoPlaying(false));
    } else {
      video.pause();
      setVideoPlaying(false);
    }
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="min-h-[100dvh]">
      <header className="sticky top-0 z-30 border-b border-[#e2e1d7] bg-[#f8f6ed]/95 backdrop-blur-md">
        <div className="container-wide flex h-[78px] items-center justify-between">
          <a className="flex items-center gap-3" href="#top" aria-label="QomfortHome, naar de startpagina">
            <span className="flex h-[54px] w-[112px] items-center justify-center overflow-hidden rounded-sm bg-[#18221b]">
              <img src="/qomforthome-logo.png" className="h-[54px] w-full object-contain" alt="Logo van QomfortHome Installatiebedrijf" />
            </span>
            <span className="hidden text-[10px] font-semibold uppercase leading-[1.5] tracking-[.15em] text-[#758075] sm:inline">Comfort begint<br />met goed advies</span>
          </a>
          <nav aria-label="Hoofdnavigatie" className="desktop-nav flex items-center gap-8">
            <a className="nav-link" href="#diensten">Onze diensten</a>
            <a className="nav-link" href="#werkwijze">Zo werken we</a>
            <a className="nav-link" href="#over-ons">Over QomfortHome</a>
            <a className="action-link !min-h-[43px] !px-4" href={phoneHref}><Phone size={15} aria-hidden="true" /> Bel ons</a>
          </nav>
          <button className="mobile-menu min-h-11 min-w-11 items-center justify-center rounded border border-[#d7ddd2] text-[#315640]" aria-label={menuOpen ? 'Menu sluiten' : 'Menu openen'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
        {menuOpen && <nav className="container-wide flex flex-col gap-1 border-t border-[#e2e1d7] pb-4 pt-3 md:hidden" aria-label="Mobiele navigatie">
          <a className="nav-link rounded px-3 py-3" onClick={closeMenu} href="#diensten">Onze diensten</a>
          <a className="nav-link rounded px-3 py-3" onClick={closeMenu} href="#werkwijze">Zo werken we</a>
          <a className="nav-link rounded px-3 py-3" onClick={closeMenu} href="#over-ons">Over QomfortHome</a>
          <a className="action-link mt-2" href={phoneHref}><Phone size={15} /> Bel 06 27299635</a>
        </nav>}
      </header>

      <main id="top">
        <section className="relative isolate flex min-h-[calc(100dvh-78px)] items-end overflow-hidden bg-[#1d3326] text-[#fbf9f0]" aria-labelledby="hero-titel">
          <img src="/images/qomforthome-aerial-poster-v2.webp" alt="" aria-hidden="true" className="absolute inset-0 -z-20 h-full w-full object-cover" width="1920" height="1080" />
          <video ref={heroVideoRef} className="absolute inset-0 -z-10 h-full w-full object-cover" src="/media/qomforthome-aerial-hero-v2.mp4" poster="/images/qomforthome-aerial-poster-v2.webp" autoPlay muted loop playsInline preload="metadata" aria-hidden="true" tabIndex={-1} onPlay={() => setVideoPlaying(true)} onPause={() => setVideoPlaying(false)} />
          <button type="button" onClick={toggleHeroVideo} aria-label={videoPlaying ? 'Pauzeer achtergrondvideo' : 'Speel achtergrondvideo af'} className="absolute right-5 top-5 z-20 inline-flex min-h-10 items-center gap-2 rounded-sm border border-white/40 bg-[#1d3326cc] px-3 text-[11px] font-semibold text-white backdrop-blur-sm hover:bg-[#1d3326]">
            {videoPlaying ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
            <span>{videoPlaying ? 'Pauzeer video' : 'Video afspelen'}</span>
          </button>
          <div className="absolute inset-0 -z-[5] bg-[linear-gradient(0deg,rgba(18,36,26,.9)_0%,rgba(18,36,26,.55)_48%,rgba(18,36,26,.2)_100%)]" />
          <div className="container-wide py-14 md:py-20">
            <p className="eyebrow fade-up !text-[#dfe8d6]">Comfortabel wonen, slim geregeld</p>
            <h1 id="hero-titel" className="serif fade-up delay-1 mt-5 max-w-[760px] text-[clamp(2.9rem,7vw,6rem)] leading-[.98]">Een huis dat <span className="text-[#f0a090]">goed voelt.</span></h1>
            <p className="fade-up delay-2 mt-6 max-w-[520px] text-[16px] leading-[1.7] text-[#eef0e4]">Van warmtepomp tot thuisbatterij: QomfortHome helpt u kiezen wat bij uw huis past en verzorgt ook de installatie.</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a className="action-link light" href={phoneHref}><Phone size={16} aria-hidden="true" /> Bel voor persoonlijk advies <ArrowRight size={16} aria-hidden="true" /></a>
              <a className="action-link !border !border-[#ffffff66] !bg-transparent hover:!bg-[#ffffff22]" href="#diensten">Bekijk de mogelijkheden <ArrowDown size={15} aria-hidden="true" /></a>
            </div>
            <div className="mt-8 flex items-center gap-3 text-[12px] font-medium text-[#e4ead9]"><span className="grid h-7 w-7 place-items-center rounded-full bg-[#ffffff22]"><Check size={14} aria-hidden="true" /></span>Eerst luisteren. Dan pas adviseren.</div>
          </div>
        </section>

        <section className="border-y border-[#e2e1d7] bg-[#eeeee3]">
          <div className="container-wide grid grid-cols-1 gap-6 py-6 sm:grid-cols-3 sm:gap-0">
            <div className="flex items-center gap-3 sm:border-r sm:border-[#d5d8cc] sm:pl-2"><House size={19} className="text-[#567455]" /><span className="text-[13px] font-semibold text-[#405748]">Advies afgestemd op uw woning</span></div>
            <div className="flex items-center gap-3 sm:border-r sm:border-[#d5d8cc] sm:px-7"><Thermometer size={19} className="text-[#b55e4b]" /><span className="text-[13px] font-semibold text-[#405748]">Installatie en advies onder één dak</span></div>
            <div className="flex items-center gap-3 sm:pl-7"><Phone size={18} className="text-[#567455]" /><span className="text-[13px] font-semibold text-[#405748]">Direct persoonlijk contact</span></div>
          </div>
        </section>

        <section id="diensten" className="section-pad container-wide">
          <div className="grid gap-10 md:grid-cols-[.78fr_1.22fr] md:gap-20">
            <div>
              <p className="eyebrow">Wat we voor u kunnen doen</p>
              <h2 className="serif mt-5 text-[clamp(2.5rem,4.4vw,4rem)] leading-[1.04] text-[#294734]">Techniek die<br />thuis past.</h2>
              <p className="mt-5 max-w-[380px] text-[14px] leading-7 text-[#657369]">Geen huis is hetzelfde. We kijken naar uw situatie en leggen helder uit welke oplossingen u kunt overwegen.</p>
              <a href={phoneHref} className="mt-7 inline-flex items-center gap-2 text-[13px] font-bold text-[#3c6748] no-underline hover:text-[#b45b48]">Bespreek uw plannen <ArrowRight size={16} /></a>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {services.map((service, index) => {
                const Icon = service.icon;
                return <article className="group overflow-hidden rounded-sm border border-[#d8dacf] bg-[#fbfaf3]" key={service.title}>
                  <div className="aspect-[4/3] overflow-hidden bg-[#dfe3d6]"><img src={serviceImages[index]} alt={serviceAlts[index]} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" width="800" height="600" loading="lazy" /></div>
                  <div className="p-5">
                    <div className="flex items-center justify-between"><span className="flex items-center gap-2 text-[#48704e]"><Icon size={18} strokeWidth={1.6} aria-hidden="true" /></span><span className="step-number">0{index + 1}</span></div>
                    <h3 className="serif mt-3 text-[21px] text-[#2b4734]">{service.title}</h3>
                    <p className="mt-2 text-[13px] leading-6 text-[#67756a]">{service.text}</p>
                  </div>
                </article>;
              })}
            </div>
          </div>
        </section>

        <section id="over-ons" className="bg-[#e8ebe0]">
          <div className="container-wide grid items-center gap-12 py-20 md:grid-cols-[1fr_1.1fr] md:gap-24 md:py-28">
            <div className="relative min-h-[360px] overflow-hidden rounded-sm bg-[#d0d9c9]">
              <img src="/images/home-interior.jpg" alt="Een rustige woonruimte als voorbeeld van comfortabel wonen" className="absolute inset-0 h-full w-full object-cover" width="1200" height="900" loading="lazy" />
              <div className="absolute bottom-5 left-5 bg-[#f7f4e9] px-5 py-4 text-[11px] font-semibold leading-5 text-[#536858]">Praktisch advies.<br />Passende installatie.</div>
            </div>
            <div>
              <p className="eyebrow">Persoonlijk en praktisch</p>
              <h2 className="serif mt-5 text-[clamp(2.5rem,4.3vw,3.8rem)] leading-[1.07] text-[#294734]">Geen verkooppraatje.<br />Een plan voor uw huis.</h2>
              <p className="mt-6 text-[14px] leading-7 text-[#5e6d62]">Een installatie moet niet alleen technisch kloppen; ze moet ook passen bij hoe u woont. Daarom begint ons werk met uw vraag. We brengen de mogelijkheden rustig in beeld, geven advies waar u iets aan heeft en kunnen de gekozen oplossing ook installeren.</p>
              <p className="mt-4 text-[14px] leading-7 text-[#5e6d62]">Zo weet u beter waar u aan toe bent en kunt u een keuze maken die bij uw huis en wensen past.</p>
              <a className="action-link mt-7" href={phoneHref}><Phone size={15} /> Leer ons kennen aan de telefoon</a>
            </div>
          </div>
        </section>

        <section id="werkwijze" className="section-pad container-wide">
          <div className="mx-auto max-w-[620px] text-center">
            <p className="eyebrow justify-center">Een helder begin</p>
            <h2 className="serif mt-5 text-[clamp(2.5rem,4vw,3.6rem)] leading-[1.08] text-[#294734]">Van vraag naar<br />passende oplossing.</h2>
            <p className="mx-auto mt-5 max-w-[460px] text-[14px] leading-7 text-[#657369]">U hoeft het niet al uitgedacht te hebben. Samen bekijken we wat verstandig is als volgende stap.</p>
          </div>
          <div className="mt-14 grid gap-10 border-t border-[#d2d6c9] pt-7 md:grid-cols-3 md:gap-12">
            <article><span className="step-number">STAP 01</span><h3 className="serif mt-4 text-[23px] text-[#304b38]">U vertelt</h3><p className="mt-3 max-w-[300px] text-[13px] leading-6 text-[#667469]">Wat wilt u verbeteren? We luisteren naar uw wensen en de situatie in huis.</p></article>
            <article><span className="step-number">STAP 02</span><h3 className="serif mt-4 text-[23px] text-[#304b38]">We denken mee</h3><p className="mt-3 max-w-[300px] text-[13px] leading-6 text-[#667469]">U krijgt begrijpelijk advies over mogelijkheden die bij uw woning kunnen passen.</p></article>
            <article><span className="step-number">STAP 03</span><h3 className="serif mt-4 text-[23px] text-[#304b38]">Een volgende stap</h3><p className="mt-3 max-w-[300px] text-[13px] leading-6 text-[#667469]">Is er een passende oplossing? Dan bespreken we de installatie en het vervolg.</p></article>
          </div>
        </section>

        <section className="bg-[#294734] text-[#f6f3e8]">
          <div className="container-wide grid gap-9 py-16 md:grid-cols-[1fr_auto] md:items-center md:py-20">
            <div><p className="eyebrow !text-[#c6d2bd]">Even overleggen?</p><h2 className="serif mt-4 max-w-[680px] text-[clamp(2.4rem,4.4vw,4rem)] leading-[1.05]">Uw huis, uw vraag.<br />We denken graag mee.</h2><p className="mt-4 max-w-[500px] text-[14px] leading-7 text-[#d2d9ce]">Bel ons voor een persoonlijk gesprek over comfort, installatie of een volgende stap.</p></div>
            <div className="flex flex-col items-start gap-3 md:items-end"><a className="action-link light" href={phoneHref}><Phone size={16} /> 06 27299635 <ArrowRight size={16} /></a><a className="action-link !bg-transparent !border !border-[#ffffff66] !text-white" href="mailto:info@qomforthome.nl">Mail info@qomforthome.nl</a><span className="text-[11px] text-[#c1cdbf]">U spreekt direct met QomfortHome.</span></div>
          </div>
        </section>

        <section className="section-pad container-wide">
          <div className="grid gap-12 md:grid-cols-[.7fr_1.3fr] md:gap-24">
            <div><p className="eyebrow">Veelgestelde vragen</p><h2 className="serif mt-5 text-[clamp(2.4rem,4vw,3.5rem)] leading-[1.06] text-[#294734]">Goed om<br />te weten.</h2><p className="mt-5 max-w-[300px] text-[14px] leading-7 text-[#657369]">Staat uw vraag er niet bij? We helpen u graag verder aan de telefoon.</p><a className="mt-5 inline-flex items-center gap-2 text-[13px] font-bold text-[#3c6748] no-underline" href={phoneHref}>Bel 06 27299635 <ArrowRight size={15} /></a></div>
            <div className="divide-y divide-[#d6d8ce] border-y border-[#d6d8ce]">
              {faqs.map((faq, index) => <div key={faq.question}>
                <button className="flex w-full items-center justify-between gap-6 py-5 text-left text-[14px] font-semibold text-[#304b38]" aria-expanded={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? null : index)}>{faq.question}<ChevronDown size={18} className={`shrink-0 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} /></button>
                {openFaq === index && <p className="max-w-[600px] pb-5 pr-10 text-[13px] leading-6 text-[#657369]">{faq.answer}</p>}
              </div>)}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#1d3326] text-[#f1efe5]">
        <div className="container-wide grid gap-10 py-12 md:grid-cols-[1.2fr_.8fr_.8fr] md:py-16">
          <div>
            <div className="inline-flex overflow-hidden rounded-sm bg-[#101710]"><img src="/qomforthome-logo.png" className="h-[70px] w-[146px] object-contain" alt="QomfortHome Installatiebedrijf" width="1024" height="684" loading="lazy" /></div>
            <p className="mt-4 max-w-[280px] text-[12px] leading-6 text-[#c3cec1]">Persoonlijk advies en installatie voor een comfortabeler, energiebewuster thuis.</p>
          </div>
          <div><h2 className="mb-4 text-[11px] font-bold uppercase tracking-[.16em] text-[#b9c8b8]">Ontdek</h2><div className="flex flex-col items-start gap-3 text-[12px]"><a className="footer-link" href="#diensten">Onze diensten</a><a className="footer-link" href="#werkwijze">Zo werken we</a><a className="footer-link" href="#over-ons">Over QomfortHome</a></div></div>
          <div><h2 className="mb-4 text-[11px] font-bold uppercase tracking-[.16em] text-[#b9c8b8]">Neem contact op</h2><a className="footer-link inline-flex items-center gap-2 text-[14px] font-semibold" href={phoneHref}><Phone size={15} /> 06 27299635</a><a className="footer-link mt-3 block text-[13px]" href="mailto:info@qomforthome.nl">info@qomforthome.nl</a><p className="mt-4 text-[12px] text-[#c3cec1]">KVK 42023215</p></div>
        </div>
        <div className="border-t border-[#37513f]"><div className="container-wide flex flex-col gap-2 py-4 text-[10px] text-[#b7c3b5] sm:flex-row sm:items-center sm:justify-between"><span>© {new Date().getFullYear()} QomfortHome Installatiebedrijf</span><span>Comfort begint met goed advies.</span></div></div>
      </footer>
      <a href={phoneHref} aria-label="Bel QomfortHome op 06 27299635" className="fixed bottom-4 right-4 z-20 flex min-h-12 items-center gap-2 rounded-full bg-[#386847] px-4 text-[12px] font-bold text-white shadow-lg md:hidden"><Phone size={16} /> Bel QomfortHome</a>
    </div>
  );
}

export default App;
