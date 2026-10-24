import { useState, type FormEvent } from "react";
import { Building2, ChevronDown, Mail, Phone } from "lucide-react";
import {
  submitContactRequest,
  type ContactRequestInput,
} from "@workspace/api-client-react";

type ContactTopic = ContactRequestInput["topic"];

type FormFields = {
  name: string;
  email: string;
  phone: string;
  topic: ContactTopic | "";
  message: string;
  website: string;
};

const emptyFields: FormFields = {
  name: "",
  email: "",
  phone: "",
  topic: "",
  message: "",
  website: "",
};

const faqs = [
  {
    question: "Weet ik al precies welk systeem ik nodig heb?",
    answer:
      "Dat hoeft niet. Vertel ons wat u merkt in huis en wat u wilt verbeteren. We bespreken samen welke mogelijkheden logisch zijn voor uw woning.",
  },
  {
    question: "Kan ik ook bellen voor alleen advies?",
    answer:
      "Natuurlijk. Een eerste gesprek is bedoeld om uw vraag en situatie te begrijpen. U zit nergens aan vast.",
  },
  {
    question: "Doet QomfortHome ook de installatie?",
    answer:
      "Ja. Advies en installatie horen bij ons werk. We bespreken vooraf wat uw woning nodig heeft en welke vervolgstap passend is.",
  },
  {
    question: "Welke oplossing past bij mijn woning?",
    answer:
      "Dat hangt onder meer af van de woning, de huidige installatie en uw wensen. Daarom beginnen we met luisteren en praktisch advies, niet met een standaardoplossing.",
  },
];

const labelClass = "block text-[12px] font-semibold text-[#325129]";
const inputClass =
  "mt-2 min-h-12 w-full rounded-sm border border-[#d8dfd5] bg-white px-4 py-3 text-[14px] text-[#325129] outline-none placeholder:text-[#879385] focus:border-[#4c6b35] focus:ring-2 focus:ring-[#4c6b35]/20";

export default function ContactSection() {
  const [fields, setFields] = useState<FormFields>(emptyFields);
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [feedback, setFeedback] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const updateField = (field: keyof FormFields, value: string) => {
    setFields((current) => ({ ...current, [field]: value }) as FormFields);
    setFormStatus("idle");
    setFeedback("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const name = fields.name.trim();
    const email = fields.email.trim();
    const message = fields.message.trim();
    const topic = fields.topic;

    if (name.length < 2 || message.length < 10 || !topic) {
      setFormStatus("error");
      setFeedback("Vul uw naam, onderwerp en een bericht van minimaal 10 tekens in.");
      return;
    }

    const payload: ContactRequestInput = {
      name,
      email,
      topic,
      message,
      phone: fields.phone.trim(),
      website: fields.website,
    };

    setFormStatus("sending");
    setFeedback("");

    try {
      const result = await submitContactRequest(payload);
      setFormStatus("sent");
      setFeedback(result.message);
      setFields(emptyFields);
    } catch {
      setFormStatus("error");
      setFeedback(
        "Versturen is niet gelukt. Probeer het later opnieuw of bel 06 27299635.",
      );
    }
  };

  return (
    <>
      <section id="contact" className="bg-[#eeeee3] px-0 py-16 md:py-24">
        <div className="container-wide overflow-hidden rounded-sm border border-[#d8dfd5] bg-white shadow-[0_22px_64px_rgba(29,51,38,.12)] md:grid md:grid-cols-[.8fr_1.2fr]">
          <aside className="bg-[#325129] px-7 py-9 text-[#f6f3e8] md:px-10 md:py-12 lg:px-12">
            <p className="eyebrow !text-[#cbd8c4]">Even overleggen?</p>
            <h2 className="serif mt-5 text-[clamp(2.2rem,4vw,3.2rem)] leading-[1.05]">
              Samen kijken naar een comfortabeler huis.
            </h2>
            <p className="mt-5 max-w-[390px] text-[14px] leading-7 text-[#d2d9ce]">
              Vertel ons wat u wilt verbeteren. We denken met u mee over advies,
              verduurzaming en een passende installatie.
            </p>

            <div className="mt-9 space-y-5">
              <a
                className="group flex items-center gap-3 text-[#f6f3e8] no-underline"
                href="mailto:info@qomforthome.nl"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/10 text-[#dce7d4]">
                  <Mail size={18} aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-[11px] text-[#cbd8c4]">E-mail ons</span>
                  <span className="mt-0.5 block text-[13px] font-semibold group-hover:underline">
                    info@qomforthome.nl
                  </span>
                </span>
              </a>
              <a
                className="group flex items-center gap-3 text-[#f6f3e8] no-underline"
                href="tel:+31627299635"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/10 text-[#dce7d4]">
                  <Phone size={18} aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-[11px] text-[#cbd8c4]">Bel ons</span>
                  <span className="mt-0.5 block text-[13px] font-semibold group-hover:underline">
                    06 27299635
                  </span>
                </span>
              </a>
              <div className="flex items-center gap-3 text-[#f6f3e8]">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/10 text-[#dce7d4]">
                  <Building2 size={18} aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-[11px] text-[#cbd8c4]">KVK</span>
                  <span className="mt-0.5 block text-[13px] font-semibold">42023215</span>
                </span>
              </div>
            </div>
          </aside>

          <form
            className="bg-[#fbfaf5] px-6 py-8 text-[#325129] sm:px-8 md:px-10 md:py-12"
            onSubmit={handleSubmit}
          >
            <h3 className="serif text-[clamp(1.8rem,3vw,2.35rem)] leading-tight text-[#325129]">
              Vertel ons waar u mee geholpen wilt worden.
            </h3>
            <p className="mt-2 text-[13px] leading-6 text-[#65745f]">
              We nemen persoonlijk contact met u op om uw vraag te bespreken.
            </p>

            <div
              aria-hidden="true"
              className="sr-only"
            >
              <label htmlFor="contact-website">Laat dit veld leeg</label>
              <input
                id="contact-website"
                name="website"
                autoComplete="off"
                tabIndex={-1}
                value={fields.website}
                onChange={(event) => updateField("website", event.target.value)}
              />
            </div>

            <fieldset
              className="mt-7 grid min-w-0 grid-cols-1 gap-x-5 gap-y-5 border-0 p-0 sm:grid-cols-2"
              disabled={formStatus === "sending"}
            >
              <legend className="sr-only">Uw contactgegevens en vraag</legend>
              <label className={labelClass} htmlFor="contact-name">
                Volledige naam *
                <input
                  className={inputClass}
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  placeholder="Uw naam"
                  minLength={2}
                  maxLength={120}
                  required
                  value={fields.name}
                  onChange={(event) => updateField("name", event.target.value)}
                />
              </label>
              <label className={labelClass} htmlFor="contact-email">
                E-mailadres *
                <input
                  className={inputClass}
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="naam@voorbeeld.nl"
                  maxLength={254}
                  required
                  value={fields.email}
                  onChange={(event) => updateField("email", event.target.value)}
                />
              </label>
              <label className={labelClass} htmlFor="contact-phone">
                Telefoonnummer <span className="font-normal text-[#7f8b7a]">(optioneel)</span>
                <input
                  className={inputClass}
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="06 12345678"
                  maxLength={40}
                  value={fields.phone}
                  onChange={(event) => updateField("phone", event.target.value)}
                />
              </label>
              <label className={labelClass} htmlFor="contact-topic">
                Waarover wilt u contact? *
                <select
                  className={inputClass}
                  id="contact-topic"
                  name="topic"
                  required
                  value={fields.topic}
                  onChange={(event) => updateField("topic", event.target.value)}
                >
                  <option value="">Selecteer een onderwerp</option>
                  <option value="warmtepomp">Warmtepomp</option>
                  <option value="airco">Airco</option>
                  <option value="hybride">Hybride systeem</option>
                  <option value="thuisbatterij">Thuisbatterij</option>
                  <option value="advies">Algemeen advies</option>
                </select>
              </label>
              <label className={`${labelClass} sm:col-span-2`} htmlFor="contact-message">
                Vertel kort over uw vraag *
                <textarea
                  className={`${inputClass} min-h-32 resize-y`}
                  id="contact-message"
                  name="message"
                  placeholder="Wat wilt u verbeteren in uw woning?"
                  minLength={10}
                  maxLength={4000}
                  required
                  value={fields.message}
                  onChange={(event) => updateField("message", event.target.value)}
                />
              </label>
            </fieldset>

            <p className="mt-4 text-[11px] leading-5 text-[#778273]">
              Uw gegevens gebruiken we alleen om contact op te nemen over deze aanvraag.
            </p>
            <button
              className="action-link mt-5 w-full justify-center disabled:cursor-wait disabled:opacity-60"
              type="submit"
              disabled={formStatus === "sending"}
            >
              {formStatus === "sending" ? "Aanvraag versturen…" : "Verstuur mijn aanvraag"}
            </button>
            <p
              className={`mt-4 min-h-5 text-[12px] leading-5 ${
                formStatus === "error" ? "text-[#a43c31]" : "text-[#325129]"
              }`}
              role={formStatus === "error" ? "alert" : "status"}
              aria-live="polite"
            >
              {feedback}
            </p>
          </form>
        </div>
      </section>

      <section id="veelgestelde-vragen" className="section-pad border-t border-[#e4e4d8] bg-[#f7f4ef]">
        <div className="container-wide grid gap-10 md:grid-cols-[.75fr_1.25fr] md:gap-20">
          <div>
            <p className="eyebrow">Even overleggen?</p>
            <h2 className="serif mt-5 text-[clamp(2.4rem,4vw,3.5rem)] leading-[1.05] text-[#4c6b35]">
              Veelgestelde vragen.
            </h2>
            <p className="mt-5 max-w-[360px] text-[14px] leading-7 text-[#4c6b35]">
              Misschien staat uw vraag er al tussen. U kunt natuurlijk ook direct
              contact met ons opnemen.
            </p>
            <a
              className="action-link mt-6"
              href="#contact"
            >
              Stel uw vraag <Mail size={15} aria-hidden="true" />
            </a>
          </div>
          <div className="self-center divide-y divide-[#d9ddd2] border-y border-[#d9ddd2]">
            {faqs.map((faq, index) => (
              <div key={faq.question}>
                <button
                  id={`faq-trigger-${index}`}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left text-[14px] font-semibold text-[#325129]"
                  aria-expanded={openFaq === index}
                  aria-controls={`faq-panel-${index}`}
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  {faq.question}
                  <ChevronDown
                    size={18}
                    className={`shrink-0 transition-transform ${openFaq === index ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                </button>
                <p
                  id={`faq-panel-${index}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${index}`}
                  hidden={openFaq !== index}
                  className="max-w-[650px] pb-5 pr-10 text-[13px] leading-6 text-[#65745f]"
                >
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
