import { useRef, useState } from 'react';
import { ArrowDown, ArrowRight, BatteryCharging, Check, House, Menu, Pause, Phone, Play, Snowflake, Thermometer, X, Zap } from 'lucide-react';
import ContactSection from './components/contact-section';

const phoneHref = 'tel:+31627299635';

const serviceImages = ['/images/qomforthome-warmtepomp.webp','/images/qomforthome-airco.webp','/images/qomforthome-hybride.webp','/images/qomforthome-thuisbatterij.webp'];
const serviceAlts = ['Warmtepomp bij een woning','Airco aan de wand in een woonruimte','Hybride verwarmingssysteem met warmtepomp en cv-ketel','Thuisbatterij in een woning'];
const services = [
  { title: 'Warmtepompen', text: 'Een passende oplossing voor verwarmen met oog voor uw woning en dagelijkse comfort.', icon: Thermometer, iconColor: '#d96553' },
  { title: 'Airco’s', text: 'Aangenaam koel op warme dagen. We denken mee over een plek en systeem dat bij uw huis past.', icon: Snowflake, iconColor: '#78bde5' },
  { title: 'Hybride systemen', text: 'Een combinatie van een warmtepomp en uw bestaande cv-ketel, afgestemd op uw situatie.', icon: Zap, iconColor: '#d2ad22' },
  { title: 'Thuisbatterijen', text: 'Verken wat een thuisbatterij kan betekenen voor het gebruik van energie in uw eigen huis.', icon: BatteryCharging, iconColor: '#000000' },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
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
      <header className={`sticky top-0 z-30 ${menuOpen ? '' : '-mb-[78px]'} border-b border-white/35 bg-white/80 backdrop-blur-md`}>
        <div className="container-wide flex h-[78px] items-center justify-between">
          <a className="flex items-center gap-3" href="#top" aria-label="QomfortHome, naar de startpagina">
            <span className="flex h-[70px] w-[150px] items-center justify-center overflow-hidden bg-white">
              <img src="/qomforthome-logo-white.webp" className="h-[70px] w-full object-contain" alt="Logo van QomfortHome Installatiebedrijf" />
            </span>
            <span className="hidden text-[10px] font-semibold uppercase leading-[1.5] tracking-[.15em] text-[#4c6b35] sm:inline">Comfort begint<br />met goed advies</span>
          </a>
          <nav aria-label="Hoofdnavigatie" className="desktop-nav flex items-center gap-8">
            <a className="nav-link" href="#diensten">Onze diensten</a>
            <a className="nav-link" href="#werkwijze">Zo werken we</a>
            <a className="nav-link" href="#over-ons">Over QomfortHome</a>
            <a className="nav-link" href="#veelgestelde-vragen">Veelgestelde vragen</a>
            <a className="nav-link" href="#contact">Contact</a>
            <a className="action-link !min-h-[43px] !px-4" href={phoneHref}><Phone size={15} aria-hidden="true" /> Bel ons</a>
          </nav>
          <button className="mobile-menu min-h-11 min-w-11 items-center justify-center rounded border border-[#d7ddd2] text-[#4c6b35]" aria-label={menuOpen ? 'Menu sluiten' : 'Menu openen'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
        {menuOpen && <nav className="container-wide flex flex-col gap-1 border-t border-[#e2e1d7] bg-white/95 pb-4 pt-3 md:hidden" aria-label="Mobiele navigatie">
          <a className="nav-link rounded px-3 py-3" onClick={closeMenu} href="#diensten">Onze diensten</a>
          <a className="nav-link rounded px-3 py-3" onClick={closeMenu} href="#werkwijze">Zo werken we</a>
          <a className="nav-link rounded px-3 py-3" onClick={closeMenu} href="#over-ons">Over QomfortHome</a>
          <a className="nav-link rounded px-3 py-3" onClick={closeMenu} href="#veelgestelde-vragen">Veelgestelde vragen</a>
          <a className="nav-link rounded px-3 py-3" onClick={closeMenu} href="#contact">Contact</a>
          <a className="action-link mt-2" href={phoneHref}><Phone size={15} /> Bel 06 27299635</a>
        </nav>}
      </header>

      <main id="top">
        <section className="relative isolate flex min-h-[100dvh] items-end overflow-hidden bg-[#1d3326] text-[#fbf9f0]" aria-labelledby="hero-titel">
          <img src="/images/qomforthome-aerial-fullbleed-poster-v3.webp" alt="" aria-hidden="true" className="absolute inset-0 -z-20 h-full w-full object-cover" width="1920" height="1080" />
          <video ref={heroVideoRef} className="absolute inset-0 -z-10 h-full w-full object-cover" src="/media/qomforthome-aerial-fullbleed-v3.mp4" poster="/images/qomforthome-aerial-fullbleed-poster-v3.webp" autoPlay muted loop playsInline preload="metadata" aria-hidden="true" tabIndex={-1} onPlay={() => setVideoPlaying(true)} onPause={() => setVideoPlaying(false)} />
          <button type="button" onClick={toggleHeroVideo} aria-label={videoPlaying ? 'Pauzeer achtergrondvideo' : 'Speel achtergrondvideo af'} className="absolute right-5 top-[94px] z-20 inline-flex min-h-10 items-center gap-2 rounded-sm border border-white/40 bg-[#325129] px-3 text-[11px] font-semibold text-white backdrop-blur-sm hover:bg-[#253e20]">
            {videoPlaying ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
            <span>{videoPlaying ? 'Pauzeer video' : 'Video afspelen'}</span>
          </button>
          <div className="absolute inset-0 -z-[5] bg-[linear-gradient(0deg,rgba(18,36,26,.9)_0%,rgba(18,36,26,.55)_48%,rgba(18,36,26,.2)_100%)]" />
          <svg
            className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[38vh] min-h-[260px] max-h-[560px] w-full sm:h-[46vh] md:h-[54vh]"
            viewBox="0 0 1440 560"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M 580 560 C 820 560 930 500 1050 390 C 1200 250 1300 80 1440 0 L 1440 560 Z"
              fill="#4c6b35"
            />
          </svg>
          <div className="container-wide relative z-10 py-14 md:py-20">
            <h1 id="hero-titel" className="serif fade-up delay-1 mt-5 max-w-[760px] text-[clamp(2.9rem,7vw,6rem)] leading-[.98]">Een huis dat <span className="text-[#4c6b35]">goed voelt.</span></h1>
            <p className="fade-up delay-2 mt-6 max-w-[520px] text-[16px] leading-[1.7] text-[#eef0e4]">Van warmtepomp tot thuisbatterij: QomfortHome helpt u kiezen wat bij uw huis past en verzorgt ook de installatie.</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a className="action-link !border !border-[#ffffff66] !bg-transparent hover:!bg-[#ffffff22]" href={phoneHref}><Phone size={16} aria-hidden="true" /> Bel voor persoonlijk advies <ArrowRight size={16} aria-hidden="true" /></a>
              <a className="action-link !border !border-[#ffffff66] !bg-transparent hover:!bg-[#ffffff22]" href="#diensten">Bekijk de mogelijkheden <ArrowDown size={15} aria-hidden="true" /></a>
            </div>
            <div className="mt-8 flex items-center gap-3 text-[12px] font-medium text-[#e4ead9]"><span className="grid h-7 w-7 place-items-center rounded-full bg-[#ffffff22]"><Check size={14} aria-hidden="true" /></span>Eerst luisteren. Dan pas adviseren.</div>
          </div>
        </section>

        <section className="border-y border-[#e2e1d7] bg-[#eeeee3]">
          <div className="container-wide grid grid-cols-1 gap-6 py-6 sm:grid-cols-3 sm:gap-0">
            <div className="flex items-center gap-3 sm:border-r sm:border-[#d5d8cc] sm:pl-2"><House size={19} className="text-[#4c6b35]" /><span className="text-[13px] font-semibold text-[#4c6b35]">Advies afgestemd op uw woning</span></div>
            <div className="flex items-center gap-3 sm:border-r sm:border-[#d5d8cc] sm:px-7"><Thermometer size={19} className="text-[#4c6b35]" /><span className="text-[13px] font-semibold text-[#4c6b35]">Installatie en advies onder één dak</span></div>
            <div className="flex items-center gap-3 sm:pl-7"><Phone size={18} className="text-[#4c6b35]" /><span className="text-[13px] font-semibold text-[#4c6b35]">Direct persoonlijk contact</span></div>
          </div>
        </section>

        <section id="diensten" className="section-pad container-wide">
          <div className="grid gap-10 md:grid-cols-[.78fr_1.22fr] md:gap-20">
            <div>
              <p className="eyebrow">Wat we voor u kunnen doen</p>
              <h2 className="serif mt-5 text-[clamp(2.5rem,4.4vw,4rem)] leading-[1.04] text-[#4c6b35]">Techniek die<br />thuis past.</h2>
              <p className="mt-5 max-w-[380px] text-[14px] leading-7 text-[#4c6b35]">Geen huis is hetzelfde. We kijken naar uw situatie en leggen helder uit welke oplossingen u kunt overwegen.</p>
              <a href={phoneHref} className="mt-7 inline-flex items-center gap-2 text-[13px] font-bold text-[#4c6b35] no-underline hover:text-[#4c6b35]">Bespreek uw plannen <ArrowRight size={16} /></a>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {services.map((service, index) => {
                const Icon = service.icon;
                return <article className="group overflow-hidden rounded-sm border border-[#d8dacf] bg-[#fbfaf3]" key={service.title}>
                  <div className="aspect-[4/3] overflow-hidden bg-[#dfe3d6]"><img src={serviceImages[index]} alt={serviceAlts[index]} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" width="800" height="600" loading="lazy" /></div>
                  <div className="p-5">
                    <div className="flex items-center justify-between"><span className="flex items-center gap-2" style={{ color: service.iconColor }}><Icon size={18} strokeWidth={1.6} aria-hidden="true" /></span><span className="step-number">0{index + 1}</span></div>
                    <h3 className="serif mt-3 text-[21px] text-[#4c6b35]">{service.title}</h3>
                    <p className="mt-2 text-[13px] leading-6 text-[#4c6b35]">{service.text}</p>
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
              <div className="absolute bottom-5 left-5 bg-[#f7f4e9] px-5 py-4 text-[11px] font-semibold leading-5 text-[#4c6b35]">Praktisch advies.<br />Passende installatie.</div>
            </div>
            <div>
              <p className="eyebrow">Persoonlijk en praktisch</p>
              <h2 className="serif mt-5 text-[clamp(2.5rem,4.3vw,3.8rem)] leading-[1.07] text-[#4c6b35]">Geen verkooppraatje.<br />Een plan voor uw huis.</h2>
              <p className="mt-6 text-[14px] leading-7 text-[#4c6b35]">Een installatie moet niet alleen technisch kloppen; ze moet ook passen bij hoe u woont. Daarom begint ons werk met uw vraag. We brengen de mogelijkheden rustig in beeld, geven advies waar u iets aan heeft en kunnen de gekozen oplossing ook installeren.</p>
              <p className="mt-4 text-[14px] leading-7 text-[#4c6b35]">Zo weet u beter waar u aan toe bent en kunt u een keuze maken die bij uw huis en wensen past.</p>
              <a className="action-link mt-7" href={phoneHref}><Phone size={15} /> Leer ons kennen aan de telefoon</a>
            </div>
          </div>
        </section>

        <section id="werkwijze" className="section-pad container-wide">
          <div className="mx-auto max-w-[620px] text-center">
            <p className="eyebrow justify-center">Een helder begin</p>
            <h2 className="serif mt-5 text-[clamp(2.5rem,4vw,3.6rem)] leading-[1.08] text-[#4c6b35]">Van vraag naar<br />passende oplossing.</h2>
            <p className="mx-auto mt-5 max-w-[460px] text-[14px] leading-7 text-[#4c6b35]">U hoeft het niet al uitgedacht te hebben. Samen bekijken we wat verstandig is als volgende stap.</p>
          </div>
          <div className="mt-14 grid gap-10 border-t border-[#d2d6c9] pt-7 md:grid-cols-3 md:gap-12">
            <article><img src="/images/qomforthome-step-01.webp" alt="Persoonlijk gesprek aan tafel over de woning" className="mb-5 aspect-[4/3] w-full rounded-sm object-cover" width="960" height="720" loading="lazy" /><span className="step-number">STAP 01</span><h3 className="serif mt-4 text-[23px] text-[#4c6b35]">U vertelt</h3><p className="mt-3 max-w-[300px] text-[13px] leading-6 text-[#4c6b35]">Wat wilt u verbeteren? We luisteren naar uw wensen en de situatie in huis.</p></article>
            <article><img src="/images/qomforthome-step-02.webp" alt="Samen advies en mogelijkheden voor de woning bekijken" className="mb-5 aspect-[4/3] w-full rounded-sm object-cover" width="960" height="720" loading="lazy" /><span className="step-number">STAP 02</span><h3 className="serif mt-4 text-[23px] text-[#4c6b35]">We denken mee</h3><p className="mt-3 max-w-[300px] text-[13px] leading-6 text-[#4c6b35]">U krijgt begrijpelijk advies over mogelijkheden die bij uw woning kunnen passen.</p></article>
            <article><img src="/images/qomforthome-step-03.webp" alt="Installateur werkt aan een warmtepomp bij een woning" className="mb-5 aspect-[4/3] w-full rounded-sm object-cover" width="960" height="720" loading="lazy" /><span className="step-number">STAP 03</span><h3 className="serif mt-4 text-[23px] text-[#4c6b35]">Een volgende stap</h3><p className="mt-3 max-w-[300px] text-[13px] leading-6 text-[#4c6b35]">Is er een passende oplossing? Dan bespreken we de installatie en het vervolg.</p></article>
          </div>
        </section>

        <ContactSection />
      </main>

      <footer className="footer-blend text-[#f1efe5]">
        <div className="container-wide grid gap-10 py-12 md:grid-cols-[1.2fr_.8fr_.8fr] md:py-16">
          <div>
            <div className="inline-flex overflow-hidden rounded-sm bg-white"><img src="/qomforthome-logo-white.webp" className="h-[70px] w-[146px] object-contain" alt="QomfortHome Installatiebedrijf" width="1536" height="1024" loading="lazy" /></div>
            <p className="mt-4 max-w-[280px] text-[12px] leading-6 text-[#c3cec1]">Persoonlijk advies en installatie voor een comfortabeler, energiebewuster thuis.</p>
          </div>
          <div><h2 className="mb-4 text-[11px] font-bold uppercase tracking-[.16em] text-[#b9c8b8]">Ontdek</h2><div className="flex flex-col items-start gap-3 text-[12px]"><a className="footer-link" href="#diensten">Onze diensten</a><a className="footer-link" href="#werkwijze">Zo werken we</a><a className="footer-link" href="#over-ons">Over QomfortHome</a><a className="footer-link" href="#veelgestelde-vragen">Veelgestelde vragen</a></div></div>
          <div><h2 className="mb-4 text-[11px] font-bold uppercase tracking-[.16em] text-[#b9c8b8]">Neem contact op</h2><a className="footer-link inline-flex items-center gap-2 text-[14px] font-semibold" href={phoneHref}><Phone size={15} /> 06 27299635</a><a className="footer-link mt-3 block text-[13px]" href="mailto:info@qomforthome.nl">info@qomforthome.nl</a><p className="mt-4 text-[12px] text-[#c3cec1]">KVK 42023215</p></div>
        </div>
        <div className="border-t border-[#37513f]"><div className="container-wide flex flex-col gap-2 py-4 text-[10px] text-[#b7c3b5] sm:flex-row sm:items-center sm:justify-between"><span>© {new Date().getFullYear()} QomfortHome Installatiebedrijf</span><span>Comfort begint met goed advies.</span></div></div>
      </footer>
      <a href={phoneHref} aria-label="Bel QomfortHome op 06 27299635" className="fixed bottom-4 right-4 z-20 flex min-h-12 items-center gap-2 rounded-full bg-[#325129] px-4 text-[12px] font-bold text-white shadow-lg md:hidden"><Phone size={16} /> Bel QomfortHome</a>
    </div>
  );
}

export default App;
