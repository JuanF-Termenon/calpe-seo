"use client";

import { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  TrendingUp,
  Smartphone,
  FileText,
  MessageSquare,
  Check,
  ArrowRight,
  Target,
  Euro,
  Home as HomeIcon,
  MessageCircle,
  Menu,
  X,
} from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { DemoPropertyCard } from "@/components/demo-property-card";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLang } from "@/lib/providers";
import type { Property } from "@/lib/demo-properties";

export default function Home() {
  const { t } = useLang();
  const [previewProps, setPreviewProps] = useState<Property[]>([]);
  const [loadingPreview, setLoadingPreview] = useState(true);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    fetch("/api/properties")
      .then((r) => r.json())
      .then((data: Property[]) => {
        const refs = ["CBL-101", "CBL-301", "CBL-201"];
        setPreviewProps(refs.map((ref) => data.find((p: Property) => p.ref === ref)).filter(Boolean) as Property[]);
      })
      .catch(() => {})
      .finally(() => setLoadingPreview(false));
  }, []);

  const benefitItems = [
    { icon: Search, title: t("benefits.0.title"), description: t("benefits.0.desc") },
    { icon: FileText, title: t("benefits.1.title"), description: t("benefits.1.desc") },
    { icon: MessageSquare, title: t("benefits.2.title"), description: t("benefits.2.desc") },
    { icon: MapPin, title: t("benefits.3.title"), description: t("benefits.3.desc") },
    { icon: Smartphone, title: t("benefits.4.title"), description: t("benefits.4.desc") },
    { icon: TrendingUp, title: t("benefits.5.title"), description: t("benefits.5.desc") },
  ];

  const stepItems = [
    { num: "01", title: t("steps.0.title"), desc: t("steps.0.desc") },
    { num: "02", title: t("steps.1.title"), desc: t("steps.1.desc") },
    { num: "03", title: t("steps.2.title"), desc: t("steps.2.desc") },
    { num: "04", title: t("steps.3.title"), desc: t("steps.3.desc") },
  ];

  const faqItems = Array.from({ length: 7 }, (_, i) => ({
    q: t(`faq.${i}.q`),
    a: t(`faq.${i}.a`),
  }));

  return (
    <div className="min-h-dvh">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/90">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-700 text-white text-sm font-bold">
              CBL
            </div>
            <span className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Costa Blanca <span className="text-blue-700 dark:text-blue-400">Leads</span>
            </span>
          </div>
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex dark:text-slate-400">
            <a href="#servicios">{t("nav.servicios")}</a>
            <a href="#como-funciona">{t("nav.como-funciona")}</a>
            <a href="#precios">{t("nav.precios")}</a>
            <a href="/demo" className="text-blue-700 dark:text-blue-400">{t("nav.ver-demo")}</a>
            <a href="#agenda-tu-demo">{t("nav.contacto")}</a>
          </nav>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 md:hidden dark:text-slate-400 dark:hover:bg-slate-800"
            >
              {mobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <a
              href="#agenda-tu-demo"
              className="hidden sm:inline-flex rounded-lg bg-blue-700 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              {t("nav.solicitar-demo")}
            </a>
          </div>
        </div>
        {mobileMenu && (
          <nav className="border-t border-slate-200 bg-white px-6 py-4 space-y-3 md:hidden dark:border-slate-800 dark:bg-slate-950">
            <a href="#servicios" onClick={() => setMobileMenu(false)} className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800">{t("nav.servicios")}</a>
            <a href="#como-funciona" onClick={() => setMobileMenu(false)} className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800">{t("nav.como-funciona")}</a>
            <a href="#precios" onClick={() => setMobileMenu(false)} className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800">{t("nav.precios")}</a>
            <a href="/demo" onClick={() => setMobileMenu(false)} className="block rounded-lg px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20">{t("nav.ver-demo")}</a>
            <a href="#agenda-tu-demo" onClick={() => setMobileMenu(false)} className="block rounded-lg bg-blue-700 px-3 py-2.5 text-sm font-semibold text-white text-center">{t("nav.solicitar-demo")}</a>
          </nav>
        )}
      </header>

      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-amber-50 dark:from-blue-950 dark:via-slate-950 dark:to-amber-950">
        <div className="mx-auto max-w-6xl px-6 pb-20 pt-12 md:pb-32 md:pt-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-100 px-3.5 py-1 text-xs font-medium text-blue-800 md:px-4 md:py-1.5 md:text-sm dark:bg-blue-900/40 dark:text-blue-300">
              <MapPin className="h-3.5 w-3.5 md:h-4 md:w-4" />
              {t("hero.badge")}
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 text-balance sm:text-4xl md:text-5xl lg:text-6xl dark:text-slate-100">
              {t("hero.title")}{" "}
              <span className="text-blue-700 dark:text-blue-400">{t("hero.title-highlight")}</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 text-pretty md:mt-6 md:text-lg dark:text-slate-400">
              {t("hero.subtitle")}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row md:mt-10">
              <a
                href="#agenda-tu-demo"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-blue-700 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-700/25 transition-all hover:bg-blue-800 hover:shadow-blue-800/25 dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                {t("hero.cta")}
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="/demo"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-8 py-3.5 text-base font-semibold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                {t("hero.demo")}
              </a>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm text-slate-500 md:mt-8 dark:text-slate-400">
              <span>{t("hero.tagline")}</span>
            </div>
            <p className="mt-2 text-sm font-medium text-amber-700 dark:text-amber-400">
              {t("hero.launch-text")}
            </p>
          </div>
        </div>
      </section>

      <section id="servicios" className="scroll-mt-20 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-slate-900 text-balance dark:text-slate-100">
              {t("benefits.title")}
            </h2>
            <p className="mt-4 text-lg text-slate-600 text-pretty dark:text-slate-400">
              {t("benefits.subtitle")}
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {benefitItems.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="group rounded-2xl border border-slate-200 bg-white p-8 transition-shadow hover:shadow-lg dark:border-slate-700 dark:bg-slate-900 dark:hover:shadow-slate-900/50"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700 transition-colors group-hover:bg-blue-700 group-hover:text-white dark:bg-blue-900/30 dark:text-blue-400 dark:group-hover:bg-blue-600">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-slate-50 py-20 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-slate-900 text-balance dark:text-slate-100">
              {t("demo.title")}
            </h2>
            <p className="mt-4 text-lg text-slate-600 text-pretty dark:text-slate-400">
              {t("demo.subtitle")}
            </p>
            <a
              href="/demo"
              className="mt-6 inline-flex items-center gap-2 text-blue-700 font-semibold hover:underline dark:text-blue-400"
            >
              {t("demo.cta")} <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="mx-auto mt-10 grid max-w-5xl gap-6 sm:grid-cols-3">
            {loadingPreview ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="h-64 animate-pulse bg-slate-200 sm:h-72 dark:bg-slate-700" />
                  <div className="space-y-3 p-4">
                    <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                    <div className="h-3 w-1/2 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                    <div className="h-5 w-1/3 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                  </div>
                </div>
              ))
            ) : (
              ["CBL-101", "CBL-301", "CBL-201"].map((ref, i) => {
                const p = previewProps.find((pr) => pr.ref === ref);
                if (!p) return null;
                return (
                  <DemoPropertyCard
                    key={p.ref}
                    property={p}
                    color={["from-blue-400 to-blue-600", "from-amber-400 to-amber-600", "from-emerald-400 to-emerald-600"][i]}
                  />
                );
              })
            )}
          </div>
        </div>
      </section>

      <section className="bg-blue-700 py-20 dark:bg-blue-900">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold text-white text-balance">{t("works.title")}</h2>
            <p className="mt-4 text-lg text-blue-100 text-pretty dark:text-blue-200">
              {t("works.subtitle")}
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl bg-white/10 p-8 text-white backdrop-blur-sm">
              <HomeIcon className="h-8 w-8 text-amber-300 dark:text-amber-200" />
              <h3 className="mt-4 text-lg font-semibold">{t("works.0.title")}</h3>
              <p className="mt-2 text-sm text-blue-100 dark:text-blue-200">
                {t("works.0.desc")}
              </p>
            </div>
            <div className="rounded-xl bg-white/10 p-8 text-white backdrop-blur-sm">
              <HomeIcon className="h-8 w-8 text-amber-300 dark:text-amber-200" />
              <h3 className="mt-4 text-lg font-semibold">{t("works.1.title")}</h3>
              <p className="mt-2 text-sm text-blue-100 dark:text-blue-200">
                {t("works.1.desc")}
              </p>
            </div>
            <div className="rounded-xl bg-white/10 p-8 text-white backdrop-blur-sm">
              <HomeIcon className="h-8 w-8 text-amber-300 dark:text-amber-200" />
              <h3 className="mt-4 text-lg font-semibold">{t("works.2.title")}</h3>
              <p className="mt-2 text-sm text-blue-100 dark:text-blue-200">
                {t("works.2.desc")}
              </p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <Target className="mx-auto h-6 w-6 text-amber-300 dark:text-amber-200" />
            <p className="mt-4 text-lg font-semibold text-white">
              {t("works.tagline")}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 dark:bg-slate-950">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-3xl rounded-2xl border border-amber-200 bg-amber-50 p-8 text-center md:p-12 dark:border-amber-800 dark:bg-amber-950/40">
            <Euro className="mx-auto h-8 w-8 text-amber-600 dark:text-amber-400" />
            <h2 className="mt-4 text-2xl font-bold text-slate-900 text-balance dark:text-slate-100">
              {t("roi.title")}
            </h2>
            <p className="mt-4 text-base text-slate-600 leading-relaxed text-pretty dark:text-slate-400">
              {t("roi.desc")}
            </p>
          </div>
        </div>
      </section>

      <section
        id="como-funciona"
        className="scroll-mt-20 border-t border-slate-200 bg-slate-50 py-20 dark:border-slate-800 dark:bg-slate-900"
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-slate-900 text-balance dark:text-slate-100">
              {t("steps.title")}
            </h2>
            <p className="mt-4 text-lg text-slate-600 text-pretty dark:text-slate-400">
              {t("steps.subtitle")}
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-4">
            {stepItems.map(({ num, title, desc }) => (
              <div key={num} className="relative text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-700 text-lg font-bold text-white dark:bg-blue-600">
                  {num}
                </div>
                <h3 className="mt-5 font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="precios" className="scroll-mt-20 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-slate-900 text-balance dark:text-slate-100">
              {t("pricing.title")}
            </h2>
            <p className="mt-4 text-lg text-slate-600 text-pretty dark:text-slate-400">
              {t("pricing.subtitle")}
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-8 dark:border-slate-700 dark:bg-slate-900">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{t("pricing.presencia.name")}</h3>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                {t("pricing.presencia.desc")}
              </p>
              <div className="mt-6">
                <p className="text-xl text-slate-400 line-through dark:text-slate-500">{t("pricing.presencia.old-price")}</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">{t("pricing.presencia.price")}</p>
                <p className="text-xs text-amber-600 font-medium dark:text-amber-400">{t("pricing.launch-tag")}</p>
              </div>
              <ul className="mt-6 space-y-3 text-sm text-slate-600 dark:text-slate-400">
                {[0,1,2,3,4,5,6,7].map((i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="h-4 w-4 shrink-0 text-blue-700 dark:text-blue-400" />
                    {t(`pricing.presencia.${i}`)}
                  </li>
                ))}
              </ul>
              <a
                href="#agenda-tu-demo"
                className="mt-8 flex w-full items-center justify-center rounded-lg border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                {t("pricing.presencia.cta")}
              </a>
            </div>
            <div className="relative rounded-2xl border-2 border-blue-700 bg-white p-8 shadow-lg shadow-blue-700/10 dark:border-blue-500 dark:bg-slate-900 dark:shadow-blue-500/10">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-700 px-4 py-1 text-xs font-semibold text-white dark:bg-blue-600">
                {t("pricing.captacion.badge")}
              </span>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                {t("pricing.captacion.name")}
              </h3>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                {t("pricing.captacion.desc")}
              </p>
              <div className="mt-6">
                <p className="text-xl text-slate-400 line-through dark:text-slate-500">{t("pricing.captacion.old-price")}</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">{t("pricing.captacion.price")}</p>
                <p className="text-xs text-amber-600 font-medium dark:text-amber-400">{t("pricing.launch-tag")}</p>
              </div>
              <ul className="mt-6 space-y-3 text-sm text-slate-600 dark:text-slate-400">
                {[0,1,2,3,4,5,6].map((i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="h-4 w-4 shrink-0 text-blue-700 dark:text-blue-400" />
                    {t(`pricing.captacion.${i}`)}
                  </li>
                ))}
              </ul>
              <a
                href="#agenda-tu-demo"
                className="mt-8 flex w-full items-center justify-center rounded-lg bg-blue-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                {t("pricing.captacion.cta")}
              </a>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-8 dark:border-slate-700 dark:bg-slate-900">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                {t("pricing.premium-int.name")}
              </h3>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                {t("pricing.premium-int.desc")}
              </p>
              <div className="mt-6">
                <p className="text-xl text-slate-400 line-through dark:text-slate-500">{t("pricing.premium-int.old-price")}</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">{t("pricing.premium-int.price")}</p>
                <p className="text-xs text-amber-600 font-medium dark:text-amber-400">{t("pricing.launch-tag")}</p>
              </div>
              <ul className="mt-6 space-y-3 text-sm text-slate-600 dark:text-slate-400">
                {[0,1,2,3,4,5,6,7].map((i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="h-4 w-4 shrink-0 text-blue-700 dark:text-blue-400" />
                      {t(`pricing.premium-int.${i}`)}
                  </li>
                ))}
              </ul>
              <a
                href="#agenda-tu-demo"
                className="mt-8 flex w-full items-center justify-center rounded-lg border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                {t("pricing.premium-int.cta")}
              </a>
            </div>
          </div>

          <div className="mx-auto mt-12 max-w-2xl text-center text-sm font-medium text-slate-600 dark:text-slate-400">
            {t("pricing.bullets")}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white py-20 dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-slate-900 text-balance dark:text-slate-100">
              {t("faq.title")}
            </h2>
          </div>
          <div className="mx-auto mt-12 max-w-3xl space-y-6">
            {faqItems.map((item, i) => (
              <details key={i} className="group cursor-pointer rounded-xl border border-slate-200 p-5 open:border-blue-200 open:bg-blue-50/50 dark:border-slate-700 dark:open:border-blue-800 dark:open:bg-blue-950/30">
                <summary className="flex items-center justify-between font-semibold text-slate-900 list-none [&::-webkit-details-marker]:hidden dark:text-slate-100">
                  {item.q}
                  <span className="text-blue-700 transition-transform group-open:rotate-45 dark:text-blue-400">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-blue-700 py-16 dark:border-slate-800 dark:bg-blue-900">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-2xl font-bold text-white text-balance">
            {t("cta.title")}
          </h2>
          <p className="mt-4 text-lg text-blue-100 text-pretty dark:text-blue-200">
            {t("cta.desc")}
          </p>
          <a
            href="#agenda-tu-demo"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-amber-500 px-8 py-3.5 text-base font-semibold text-blue-900 transition-colors hover:bg-amber-400 dark:bg-amber-600 dark:text-blue-950 dark:hover:bg-amber-500"
          >
            {t("cta.button")}
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      <section
        id="agenda-tu-demo"
        className="scroll-mt-20 bg-slate-50 py-20 dark:bg-slate-900"
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-slate-900 text-balance dark:text-slate-100">
              {t("booking.title")}
            </h2>
            <p className="mt-4 text-lg text-slate-600 text-pretty dark:text-slate-400">
              {t("booking.subtitle")}
            </p>
          </div>
          <div className="mx-auto mt-10 max-w-xl">
            <div className="mb-8 flex justify-center">
              <a
                href={`/api/whatsapp?text=${encodeURIComponent(t("booking.whatsapp-text"))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600"
              >
                <MessageCircle className="h-5 w-5" />
                {t("booking.whatsapp")}
              </a>
            </div>
            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-700" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-slate-50 px-4 text-sm text-slate-400 dark:bg-slate-900 dark:text-slate-500">{t("booking.or")}</span>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white py-10 dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-700 text-white text-xs font-bold">
                CBL
              </div>
              <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {t("footer.brand")}
              </span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {t("footer.copyright")}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
