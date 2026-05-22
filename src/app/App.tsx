import { useState, useRef, useEffect } from "react";
import { ArrowRight, ArrowLeft, ChevronRight } from "lucide-react";

function resolveImageUrl(url: string): string {
  const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (match) return `https://lh3.googleusercontent.com/d/${match[1]}=s0`;
  return url;
}

interface Funnel {
  id: number;
  title: string;
  client: string;
  category: string;
  year: string;
  description: string;
  tags: string[];
  imageUrl: string;
  imageAlt: string;
}

const funnels: Funnel[] = [
  {
    id: 1,
    title: "Opt-In Funnel",
    client: "Better Leads Aus.",
    category: "Application Funnel",
    year: "2026",
    description:
      "A sample funnel driving leads for a B2B lead generation agency. Optimised the hook, story, offer and reduced friction at the opt-in step.",
    tags: ["B2B", "Lead Generation"],
    imageUrl:
      "https://drive.google.com/file/d/1p3Lx_IxpcN0q2FKL60s1bQvFe9DWaJOp/view?usp=sharing",
    imageAlt: "Reverse Squeeze Funnel landing and opt-in page",
  },
  {
    id: 2,
    title: "Registration Funnel",
    client: "Fly High Futures",
    category: "Application Funnel",
    year: "2026",
    description:
      "Registration funnel for a motivational speaker and coach",
    tags: ["Coaching", "Seminar", "B2B"],
    imageUrl:
      "https://drive.google.com/file/d/1Mh8_mBfYcdqPQYHU9V5NcVGat4BtFL1V/view?usp=sharing?w=960&auto=format&fit=crop",
    imageAlt: "Registration Funnel showing registration page",
  },
  {
    id: 3,
    title: "Property Investment Lead Generation",
    client: "Karen In Property",
    category: "Application Funnel",
    year: "2026",
    description:
      "An Opt-In funnel for a property investment company. Planned a quiz-style pre-sell page.",
    tags: ["Property", "Quiz", "B2C"],
    imageUrl:
      "https://drive.google.com/file/d/1zr1um-rHl0-fNu9KwHX9ehqdzDxcOmT9/view?usp=sharing?w=960&auto=format&fit=crop",
    imageAlt: "Funnel design for Property Investment Company",
  },
  {
    id: 4,
    title: "High-Ticket Closer Funnel",
    client: "Kora Laser Clinic",
    category: "Application Funnel",
    year: "2024",
    description:
      "A premium application funnel for a laser clinic.",
    tags: ["Premium", "Application", "B2C"],
    imageUrl:
      "https://drive.google.com/file/d/1a1FgqA8rx3qqbqpQjUCn4OxkO5T0qBHE/view?usp=sharing?w=960&auto=format&fit=crop",
    imageAlt: "High-Ticket Application Funnel with VSL and qualifier pages",
  },
  {
    id: 5,
    title: "Lead Magnet + Email Nurture",
    client: "MK Kids Interior",
    category: "Lead Magnet",
    year: "2026",
    description:
      "A clean opt-in funnel delivering a free room planning guide for kids.",
    tags: ["Lead Magnet", "Interior", "Email Sequence"],
    imageUrl:
      "https://drive.google.com/file/d/1S38EuDcQTpvYvaJEhESDOo5FEVKgfzEG/view?usp=sharing?w=960&auto=format&fit=crop",
    imageAlt: "Lead Magnet funnel for an Interior Design brand with opt-in and thank you page",
  },
];

function CoverSlide({ onStart }: { onStart: () => void }) {
  return (
    <div className="relative flex flex-col items-center justify-center w-full h-screen overflow-hidden bg-background select-none">
      {/* subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* top label */}
      <div className="absolute top-10 left-12 flex items-center gap-3">
        <span
          className="text-xs tracking-[0.25em] uppercase text-muted-foreground"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Portfolio
        </span>
        <span className="w-8 h-px bg-primary opacity-60" />
      </div>

      {/* center content */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-8 text-center max-w-3xl">
        <p
          className="text-xs tracking-[0.3em] uppercase text-primary"
          style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 400 }}
        >
          Marketing Funnels
        </p>

        <h1
          className="text-6xl md:text-8xl text-foreground leading-[0.95] tracking-tight"
          style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}
        >
          Funnel
          <br />
          <em style={{ fontStyle: "italic", fontWeight: 400 }}>Design</em>
          <br />
          Reel
        </h1>

        <p
          className="text-base text-muted-foreground max-w-sm leading-relaxed"
          style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
        >
          A curated collection of marketing funnels built to convert. Click
          below to step through each design.
        </p>

        <button
          onClick={onStart}
          className="group flex items-center gap-3 mt-2 px-8 py-4 bg-primary text-primary-foreground transition-all duration-300 hover:bg-accent hover:scale-105 active:scale-100"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 500,
            letterSpacing: "0.05em",
            fontSize: "0.8rem",
            textTransform: "uppercase",
          }}
        >
          Begin Reel
          <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>

      {/* bottom label */}
      <div
        className="absolute bottom-10 right-12 text-xs text-muted-foreground tracking-widest uppercase"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {funnels.length} Projects
      </div>

      {/* decorative line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-border" />
    </div>
  );
}

function FunnelSlide({
  funnel,
  index,
  total,
  onPrev,
  onNext,
  onCover,
}: {
  funnel: Funnel;
  index: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  onCover: () => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // reset scroll on funnel change
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [funnel.id]);

  return (
    <div className="flex flex-col w-full h-screen bg-background overflow-hidden">
      {/* top bar */}
      <div
        className="flex items-center justify-between px-8 md:px-12 py-5 border-b border-border shrink-0"
        style={{ minHeight: "64px" }}
      >
        <button
          onClick={() => { window.location.href = 'https://www.onefunnel-lab.com'; }}
          className="text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-primary transition-colors duration-200"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          ← Portfolio
        </button>

        <div className="flex items-center gap-2">
          {Array.from({ length: total }).map((_, i) => (
            <span
              key={i}
              className={`block rounded-full transition-all duration-300 ${
                i === index
                  ? "w-4 h-1.5 bg-primary"
                  : "w-1.5 h-1.5 bg-muted-foreground opacity-30"
              }`}
            />
          ))}
        </div>

        <span
          className="text-xs tracking-widest text-muted-foreground tabular-nums"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>

      {/* main content */}
      <div className="relative flex flex-1 min-h-0">
        {/* Fixed navigation arrows - always visible */}
        <button
          onClick={onPrev}
          disabled={index === 0}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-50 flex items-center justify-center w-12 h-12 bg-background/90 backdrop-blur-sm border border-border text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200 disabled:opacity-20 disabled:cursor-not-allowed shadow-lg"
          aria-label="Previous funnel"
        >
          <ArrowLeft size={20} />
        </button>
        <button
          onClick={onNext}
          disabled={index === total - 1}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-50 flex items-center justify-center w-12 h-12 bg-background/90 backdrop-blur-sm border border-border text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200 disabled:opacity-20 disabled:cursor-not-allowed shadow-lg"
          aria-label="Next funnel"
        >
          <ArrowRight size={20} />
        </button>

        {/* left info panel */}
        <aside
          className="hidden md:flex flex-col justify-between w-72 lg:w-80 shrink-0 border-r border-border px-10 py-10"
        >
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-1">
              <span
                className="text-xs tracking-[0.25em] uppercase text-primary"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {funnel.category}
              </span>
              <h2
                className="text-2xl lg:text-3xl text-foreground leading-tight mt-1"
                style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}
              >
                {funnel.title}
              </h2>
            </div>

            <p
              className="text-sm text-muted-foreground leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
            >
              {funnel.description}
            </p>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center py-3 border-t border-border">
                <span
                  className="text-xs uppercase tracking-widest text-muted-foreground"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Client
                </span>
                <span
                  className="text-xs text-foreground"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {funnel.client}
                </span>
              </div>
              <div className="flex justify-between items-center py-3 border-t border-border">
                <span
                  className="text-xs uppercase tracking-widest text-muted-foreground"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Year
                </span>
                <span
                  className="text-xs text-foreground"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {funnel.year}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {funnel.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs border border-border text-muted-foreground"
                  style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.05em" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* navigation */}
          <div className="flex gap-3 mt-8">
            <button
              onClick={onPrev}
              disabled={index === 0}
              className="flex items-center justify-center w-10 h-10 border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors duration-200 disabled:opacity-20 disabled:cursor-not-allowed"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              onClick={onNext}
              disabled={index === total - 1}
              className="flex items-center justify-center w-10 h-10 border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors duration-200 disabled:opacity-20 disabled:cursor-not-allowed"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </aside>

        {/* right: scrollable funnel image */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* mobile header */}
          <div className="md:hidden flex flex-col gap-1 px-6 py-5 border-b border-border shrink-0">
            <span
              className="text-xs tracking-[0.25em] uppercase text-primary"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {funnel.category}
            </span>
            <h2
              className="text-xl text-foreground"
              style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}
            >
              {funnel.title}
            </h2>
          </div>

          {/* image scroll area */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto bg-secondary"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(255,255,255,0.1) transparent",
            }}
          >
            <div className="mx-auto max-w-2xl px-6 md:px-10 py-8">
              {/* image placeholder / drop zone */}
              <div
                className="relative w-full bg-card border border-border group cursor-pointer"
                style={{ minHeight: "800px" }}
              >
                <img
                  src={resolveImageUrl(funnel.imageUrl)}
                  alt={funnel.imageAlt}
                  className="w-full h-auto block"
                  style={{ minHeight: "800px", objectFit: "cover" }}
                />
              </div>

              {/* scroll hint */}
              <p
                className="text-center text-xs text-muted-foreground mt-4 tracking-widest uppercase"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Scroll to view full funnel
              </p>
            </div>
          </div>

          {/* mobile nav */}
          <div className="md:hidden flex items-center justify-between px-6 py-4 border-t border-border shrink-0">
            <button
              onClick={onPrev}
              disabled={index === 0}
              className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <ArrowLeft size={14} /> Prev
            </button>
            <button
              onClick={onNext}
              disabled={index === total - 1}
              className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Next <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [slide, setSlide] = useState(0); // 0 = cover, 1+ = funnel index
  const [fading, setFading] = useState(false);

  const goTo = (n: number) => {
    if (n === slide) return;
    setFading(true);
    setTimeout(() => {
      setSlide(n);
      setFading(false);
    }, 220);
  };

  return (
    <div
      className="w-full h-screen overflow-hidden bg-background"
      style={{
        fontFamily: "'DM Sans', sans-serif",
        transition: "opacity 0.22s ease",
        opacity: fading ? 0 : 1,
      }}
    >
      {slide === 0 ? (
        <CoverSlide onStart={() => goTo(1)} />
      ) : (
        <FunnelSlide
          funnel={funnels[slide - 1]}
          index={slide - 1}
          total={funnels.length}
          onPrev={() => goTo(Math.max(1, slide - 1))}
          onNext={() => goTo(Math.min(funnels.length, slide + 1))}
          onCover={() => goTo(0)}
        />
      )}
    </div>
  );
}
