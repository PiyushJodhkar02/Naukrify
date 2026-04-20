import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import companies from "../data/companies.json";
import faqs from "../data/faq.json";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { ArrowRight, Users, Building2, Zap, TrendingUp } from "lucide-react";

const LandingPage = () => {
  return (
    <main className="flex flex-col gap-16 sm:gap-24 py-12 sm:py-20">

      {/* ── Hero ── */}
      <section className="text-center relative">
        {/* Ambient blobs */}
        <div className="absolute inset-0 -z-10 pointer-events-none flex items-center justify-center overflow-hidden">
          <div className="w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[80px]" />
          <div className="w-[300px] h-[300px] rounded-full bg-violet-500/6 blur-[60px] ml-32" />
        </div>

        {/* Eyebrow */}
        <p className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.3em] text-cyan-500/60 uppercase mb-8 border border-cyan-500/15 px-4 py-2 rounded-full bg-cyan-500/5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          The Future of Hiring
        </p>

        {/* Main heading */}
        <h1 className="font-bold tracking-tight leading-none mb-6">
          <span className="block text-4xl sm:text-6xl lg:text-8xl text-white/90">
            Find Your
          </span>
          <span className="block gradient-title text-4xl sm:text-6xl lg:text-8xl py-2">
            Dream Role
          </span>
          <span className="flex items-center justify-center gap-3 text-3xl sm:text-5xl lg:text-7xl text-white/70 mt-2">
            and get{" "}
            <img
              src="/logo.png"
              className="h-12 sm:h-20 lg:h-28 inline-block ml-4"
              alt="Naukrify"
            />
          </span>
        </h1>

        <p className="text-muted-foreground text-sm sm:text-base max-w-sm mx-auto leading-relaxed mt-4">
          Explore thousands of job listings or find the perfect candidate — all in one place.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3 justify-center mt-10">
          <Link to="/jobs">
            <button
              id="find-jobs-btn"
              className="btn-cyan"
              style={{ transition: "all 0.2s" }}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 0 28px rgba(0,229,255,0.35)"}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = "none"}
            >
              Find Jobs <ArrowRight size={15} />
            </button>
          </Link>
          <Link to="/post-job">
            <button id="post-job-btn" className="btn-ghost">
              Post a Job
            </button>
          </Link>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-8 sm:gap-16 mt-16">
          {[
            { label: "Active Jobs", value: "12K+", icon: TrendingUp },
            { label: "Companies", value: "800+", icon: Building2 },
            { label: "Hired Monthly", value: "3K+", icon: Users },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-white/90">{value}</p>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1 justify-center">
                <Icon size={11} className="text-cyan-500/60" />
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Company Logos ── */}
      <div>
        <p className="text-center text-xs tracking-[0.25em] text-white/15 uppercase mb-8">
          Trusted by top companies
        </p>
        <Carousel
          plugins={[Autoplay({ delay: 1800 })]}
          className="w-full"
        >
          <CarouselContent className="flex gap-4 sm:gap-16 items-center">
            {companies.map(({ name, id, path }) => (
              <CarouselItem key={id} className="basis-1/3 lg:basis-1/6 flex items-center justify-center">
                <img
                  src={path}
                  alt={name}
                  className="h-6 sm:h-9 object-contain grayscale opacity-25 hover:opacity-50 hover:grayscale-0 transition-all duration-500"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* ── Banner Image ── */}
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.06]">
        <img
          src="/banner.png"
          className="w-full object-cover"
          alt="Naukrify banner"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
      </div>

      {/* ── Feature Cards ── */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Candidate */}
        <div className="group p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-cyan-500/20 hover:bg-white/[0.04] transition-all duration-300 cursor-default">
          <div className="w-11 h-11 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-5 group-hover:bg-cyan-500/20 transition-colors duration-300">
            <Users size={20} className="text-cyan-400" />
          </div>
          <h3 className="text-base font-semibold text-white/90 mb-2">For Job Seekers</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Discover curated opportunities, track applications in real-time, and land your next role — faster than ever.
          </p>
          <div className="mt-5 h-px bg-gradient-to-r from-cyan-500/20 to-transparent" />
        </div>

        {/* Recruiter */}
        <div className="group p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-violet-500/20 hover:bg-white/[0.04] transition-all duration-300 cursor-default">
          <div className="w-11 h-11 rounded-xl bg-violet-500/10 flex items-center justify-center mb-5 group-hover:bg-violet-500/20 transition-colors duration-300">
            <Building2 size={20} className="text-violet-400" />
          </div>
          <h3 className="text-base font-semibold text-white/90 mb-2">For Recruiters</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Post jobs, manage every application in a single dashboard, and find talent without the noise.
          </p>
          <div className="mt-5 h-px bg-gradient-to-r from-violet-500/20 to-transparent" />
        </div>
      </section>

      {/* ── FAQ ── */}
      <section>
        <div className="flex items-center gap-2.5 mb-6">
          <Zap size={15} className="text-cyan-400" />
          <h2 className="text-sm font-semibold tracking-wide text-white/60 uppercase">
            Frequently Asked
          </h2>
        </div>
        <Accordion type="multiple" className="w-full space-y-2">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index + 1}`}
              className="border border-white/[0.06] rounded-xl px-5 bg-white/[0.02] hover:bg-white/[0.035] transition-all duration-200 data-[state=open]:border-white/[0.1]"
            >
              <AccordionTrigger className="text-sm font-medium text-white/75 hover:text-white hover:no-underline py-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground pb-4 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </main>
  );
};

export default LandingPage;
