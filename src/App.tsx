import { FormEvent, useMemo, useState } from "react";
import { HashRouter, Link, NavLink, Route, Routes } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

type ServiceGroup = {
  title: string;
  items: { name: string; price: string }[];
};

const serviceGroups: ServiceGroup[] = [
  {
    title: "Hair Treatment",
    items: [
      { name: "Botox/Keratin/Nanoplastia (Short)", price: "INR 3000" },
      { name: "Botox/Keratin/Nanoplastia (Long)", price: "INR 5000" },
      { name: "Straightening or Smoothening (Short)", price: "INR 4000" },
      { name: "Straightening or Smoothening (Long)", price: "INR 6000" },
      { name: "Trim", price: "INR 100" },
      { name: "Layer Cut", price: "INR 250" },
      { name: "Laser Cut", price: "INR 300" },
      { name: "Feather Cut", price: "INR 400" },
      { name: "V Cut", price: "INR 180" },
      { name: "U Cut", price: "INR 180" },
    ],
  },
  {
    title: "Facial",
    items: [
      { name: "Gold or Diamond Facial", price: "INR 1000" },
      { name: "Aroma Magic", price: "INR 800" },
      { name: "O3", price: "INR 1200" },
      { name: "Lotus White Glow", price: "INR 600" },
      { name: "Lotus Professional", price: "INR 700" },
      { name: "Fruit Facial", price: "INR 350" },
      { name: "De-Tan", price: "INR 250-350" },
    ],
  },
  {
    title: "Nails and Care",
    items: [
      { name: "Manicure", price: "INR 300" },
      { name: "Pedicure", price: "INR 500" },
      { name: "Nail Extension (Both)", price: "INR 1000" },
    ],
  },
  {
    title: "Color, Makeup and Mehndi",
    items: [
      { name: "Waxing Hand", price: "INR 300" },
      { name: "Waxing Leg", price: "INR 400" },
      { name: "Highlights Full", price: "INR 2000" },
      { name: "Highlights Global", price: "INR 3000" },
      { name: "Party Makeup", price: "INR 2000" },
      { name: "Bridal Makeup", price: "INR 7000" },
      { name: "Mehndi (Front and Back)", price: "INR 500" },
    ],
  },
];

const testimonials = [
  {
    name: "Shreya D.",
    review:
      "I booked bridal makeup and hair at Glamour Beauty Salon. The finish looked premium in both daylight and evening photos.",
  },
  {
    name: "Ayesha K.",
    review:
      "Very clean setup, warm staff and excellent smoothening result. The team explained aftercare clearly and my hair stayed silky.",
  },
  {
    name: "Moumita R.",
    review:
      "Their facial and pedicure service is consistent and relaxing. Perfect for monthly self-care before events.",
  },
];

const certifications = [
  "Certified Bridal Makeup Artistry Program",
  "Advanced Hair Chemical Treatment Certification",
  "Salon Hygiene and Client Safety Compliance Training",
];

const gallery = [
  { src: "/bridal-makeup-1.jpeg", alt: "Bridal makeup look before transformation" },
  { src: "/bridal-makeup-2.jpeg", alt: "Bridal makeup final transformation result" },
  { src: "/global-hair-colour.jpeg", alt: "Global hair colour service result" },
  { src: "/hair-highlights.jpeg", alt: "Premium hair highlights styling result" },
];

const mapLink = "https://maps.app.goo.gl/D2gPUiqRuirybc9o8";
const whatsappNumber = "917980329650";
const defaultBookingMessage =
  "Hello Glamour Beauty Salon, I would like to book an appointment.\n\nName:\nService:\nPreferred Date:\nPreferred Time:\nContact Number:";

function buildWhatsAppWebLink(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function WhatsAppBookingBox({ dark = false }: { dark?: boolean }) {
  const [name, setName] = useState("");
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [contact, setContact] = useState("");
  const [copied, setCopied] = useState(false);

  const message = useMemo(() => {
    return [
      "Hello Glamour Beauty Salon, I would like to book an appointment.",
      "",
      `Name: ${name || ""}`,
      `Service: ${service || ""}`,
      `Preferred Date: ${date || ""}`,
      `Preferred Time: ${time || ""}`,
      `Contact Number: ${contact || ""}`,
    ].join("\n");
  }, [contact, date, name, service, time]);

  const openWhatsAppApp = (event: FormEvent) => {
    event.preventDefault();
    const hasInput = name || service || date || time || contact;
    const finalMessage = hasInput ? message : defaultBookingMessage;
    const whatsappUrl = buildWhatsAppWebLink(finalMessage);
    const popup = window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    if (!popup) {
      window.location.href = whatsappUrl;
    }
  };

  const copyMessage = async () => {
    const hasInput = name || service || date || time || contact;
    const finalMessage = hasInput ? message : defaultBookingMessage;
    await navigator.clipboard.writeText(finalMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const textTone = dark ? "text-[#f7d8df]" : "text-[#684a51]";
  const fieldStyle = dark
    ? "bg-[#2f1a22] border-[#7e4f5b] text-[#fff6f8] placeholder:text-[#bf8e99]"
    : "bg-white border-[#dfc1c9] text-[#2f1d25] placeholder:text-[#9f7680]";

  return (
    <form onSubmit={openWhatsAppApp} className="mt-5 space-y-3 rounded-3xl border border-[#b47986]/50 p-4">
      <p className={`text-xs ${textTone}`}>
        Fill details and tap Book via WhatsApp App. If link is blocked, copy message and send manually to 7980329650.
      </p>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name" className={`w-full rounded-xl border px-3 py-2 text-sm outline-none ${fieldStyle}`} />
      <input value={service} onChange={(e) => setService(e.target.value)} placeholder="Service Required" className={`w-full rounded-xl border px-3 py-2 text-sm outline-none ${fieldStyle}`} />
      <div className="grid grid-cols-2 gap-3">
        <input value={date} onChange={(e) => setDate(e.target.value)} placeholder="Date" className={`w-full rounded-xl border px-3 py-2 text-sm outline-none ${fieldStyle}`} />
        <input value={time} onChange={(e) => setTime(e.target.value)} placeholder="Time" className={`w-full rounded-xl border px-3 py-2 text-sm outline-none ${fieldStyle}`} />
      </div>
      <input value={contact} onChange={(e) => setContact(e.target.value)} placeholder="Contact Number" className={`w-full rounded-xl border px-3 py-2 text-sm outline-none ${fieldStyle}`} />
      <button type="submit" className="w-full rounded-full bg-[#8b4c58] px-5 py-3 text-sm font-semibold text-[#fff7f8]">
        Book via WhatsApp App
      </button>
      <button type="button" onClick={copyMessage} className="w-full rounded-full border border-[#b47986] px-5 py-3 text-sm font-semibold text-[#8b4c58]">
        {copied ? "Message Copied" : "Copy Booking Message"}
      </button>
    </form>
  );
}

function BeforeAfterSlider() {
  const [sliderValue, setSliderValue] = useState(45);

  return (
    <section className="px-4 py-14">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7 }}
        className="mx-auto max-w-sm"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#a36873]">Before and After</p>
        <h3 className="mt-2 font-display text-2xl text-[#2f1d25]">Bridal Transformation Preview</h3>
        <p className="mt-2 text-sm text-[#62484f]">Slide to compare natural look with full bridal finish.</p>
        <div className="relative mt-5 h-[23rem] overflow-hidden rounded-[1.75rem]">
          <img src="/bridal-makeup-1.jpeg" alt="Before bridal makeup" className="h-full w-full object-cover" />
          <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderValue}%` }}>
            <img src="/bridal-makeup-2.jpeg" alt="After bridal makeup" className="h-full w-full object-cover" />
          </div>
          <div className="absolute inset-y-0 w-0.5 bg-white/90" style={{ left: `calc(${sliderValue}% - 1px)` }} />
        </div>
        <input
          aria-label="Before and after slider"
          type="range"
          min={0}
          max={100}
          value={sliderValue}
          onChange={(event) => setSliderValue(Number(event.target.value))}
          className="mt-4 h-2 w-full accent-[#8b4c58]"
        />
      </motion.div>
    </section>
  );
}

function HomePage() {
  return (
    <>
      <section className="relative min-h-[92vh] overflow-hidden bg-[#190f14] px-4 pt-4 text-[#fff7f8]">
        <img
          src="/bridal-makeup-2.jpeg"
          alt="Premium bridal makeup at Glamour Beauty Salon"
          className="absolute inset-0 h-full w-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#12090e]/50 via-[#170d12]/60 to-[#160a10]" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 mx-auto flex h-full max-w-sm flex-col pb-12 pt-10"
        >
          <p className="font-display text-3xl tracking-wide">Glamour Beauty Salon</p>
          <p className="mt-5 text-xs uppercase tracking-[0.25em] text-[#f1cdd5]">Luxury Beauty Destination in Kolkata</p>
          <h1 className="mt-3 font-display text-4xl leading-tight text-white">Premium bridal, hair and skin artistry.</h1>
          <p className="mt-4 text-sm leading-relaxed text-[#f9dfe4]">
            Crafted for women who want polished, camera-ready results with salon comfort and expert care.
          </p>
          <div className="mt-7 flex gap-3">
            <Link
              to="/services"
              className="rounded-full border border-[#f0c4ce] px-5 py-3 text-sm font-semibold text-[#fff3f5]"
            >
              View Services
            </Link>
          </div>
          <p className="mt-3 text-xs text-[#f3ced6]">Use the booking form below to open WhatsApp with your service details.</p>
          <WhatsAppBookingBox dark />
          <div className="mt-auto pt-10 text-sm text-[#f9dfe4]">
            <p>46A Kustia Masjid Bari Lane, Kolkata</p>
            <p>12 noon to 9 pm, Monday to Sunday</p>
          </div>
        </motion.div>
      </section>

      <section className="bg-[#fbf7f8] px-4 py-14">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-sm"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9d626f]">Signature Focus</p>
          <h2 className="mt-2 font-display text-3xl text-[#2f1d25]">Designed to drive bookings and bridal leads</h2>
          <p className="mt-3 text-sm leading-relaxed text-[#674950]">
            From glossy keratin finishes to complete bridal glam, every service is priced clearly and performed with
            premium product care.
          </p>
        </motion.div>
      </section>

      <BeforeAfterSlider />

      <section className="px-4 pb-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-sm"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9d626f]">Portfolio</p>
          <h3 className="mt-2 font-display text-2xl text-[#2f1d25]">Real service outcomes</h3>
          <div className="mt-5 grid grid-cols-2 gap-3">
            {gallery.map((image, index) => (
              <motion.img
                key={image.src}
                src={image.src}
                alt={image.alt}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="h-40 w-full rounded-2xl object-cover"
              />
            ))}
          </div>
        </motion.div>
      </section>

      <section className="bg-[#26141b] px-4 py-14 text-[#fceef1]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-sm"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#dca9b4]">Client Love</p>
          <h3 className="mt-2 font-display text-2xl">Testimonials</h3>
          <div className="mt-4 space-y-4">
            {testimonials.map((item) => (
              <div key={item.name}>
                <p className="text-sm leading-relaxed text-[#f6dce2]">"{item.review}"</p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#dca9b4]">{item.name}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
    </>
  );
}

function ServicesPage() {
  return (
    <div className="bg-[#fbf7f8] px-4 pb-14 pt-10 text-[#2f1d25]">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mx-auto max-w-sm"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9d626f]">Service Menu</p>
        <h1 className="mt-2 font-display text-3xl">Luxury Services and Pricing</h1>
        <p className="mt-2 text-sm text-[#654850]">All prices in INR. Final quote may vary by hair length, texture and styling complexity.</p>
      </motion.section>

      <section className="mx-auto mt-8 max-w-sm space-y-8">
        {serviceGroups.map((group, index) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: index * 0.04 }}
          >
            <h2 className="font-display text-2xl text-[#321f27]">{group.title}</h2>
            <div className="mt-3 space-y-2">
              {group.items.map((service) => (
                <div key={service.name} className="flex items-center justify-between gap-3 border-b border-[#e9d2d8] pb-2 text-sm">
                  <span>{service.name}</span>
                  <span className="font-semibold text-[#6a3f49]">{service.price}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </section>

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.65 }}
        className="mx-auto mt-12 max-w-sm"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9d626f]">Certifications</p>
        <h3 className="mt-2 font-display text-2xl">Professional Standards</h3>
        <ul className="mt-3 space-y-2 text-sm text-[#684a51]">
          {certifications.map((item) => (
            <li key={item} className="border-b border-[#ead6db] pb-2">
              {item}
            </li>
          ))}
        </ul>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="mx-auto mt-12 max-w-sm"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9d626f]">Visit Us</p>
        <h3 className="mt-2 font-display text-2xl">Glamour Beauty Salon, Kolkata</h3>
        <p className="mt-3 text-sm text-[#684a51]">46A Kustia Masjid Bari Lane, Kolkata</p>
        <p className="text-sm text-[#684a51]">Open every day: 12 noon to 9 pm</p>
        <div className="mt-5 overflow-hidden rounded-2xl border border-[#ecd5db]">
          <iframe
            title="Glamour Beauty Salon location map"
            src="https://www.google.com/maps?q=46A%20Kustia%20Masjid%20Bari%20Lane%20Kolkata&output=embed"
            loading="lazy"
            className="h-64 w-full border-0"
          />
        </div>
        <div className="mt-5 flex flex-col gap-3">
          <a
            href={mapLink}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-[#bd7f8c] px-5 py-3 text-center text-sm font-semibold text-[#613d46]"
          >
            Open Google Map
          </a>
          <a href="tel:+917980329650" className="text-center text-sm font-semibold text-[#6a3f49]">
            Call: +91 79803 29650
          </a>
        </div>
        <WhatsAppBookingBox />
      </motion.section>
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-[#fbf7f8]">
        <header className="sticky top-0 z-30 border-b border-[#e7d2d8] bg-[#fff7f8]/95 backdrop-blur">
          <nav className="mx-auto flex max-w-sm items-center justify-between px-4 py-3 text-sm">
            <p className="font-display text-xl text-[#351f27]">Glamour</p>
            <div className="flex items-center gap-4 font-semibold text-[#7d4f5b]">
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "text-[#2f1d25]" : "transition hover:text-[#2f1d25]")}
              >
                Home
              </NavLink>
              <NavLink
                to="/services"
                className={({ isActive }) => (isActive ? "text-[#2f1d25]" : "transition hover:text-[#2f1d25]")}
              >
                Services
              </NavLink>
            </div>
          </nav>
        </header>

        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
          </Routes>
        </AnimatePresence>
      </div>
    </HashRouter>
  );
}
