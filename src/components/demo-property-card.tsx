"use client";

import { useState, useRef, useCallback } from "react";
import { MapPin, Bed, Bath, Maximize, X, Phone, Mail, MessageCircle, Building2, ChevronLeft, ChevronRight } from "lucide-react";
import type { Property } from "@/lib/demo-properties";
import { useLang } from "@/lib/providers";
import { localizeProperty } from "@/lib/property-translations";

export function DemoPropertyCard({
  property,
  color,
  defaultOpen = false,
}: {
  property: Property;
  color: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const [imgIdx, setImgIdx] = useState(0);
  const { t, locale } = useLang();
  const p = localizeProperty(property, locale);

  const hasImages = property.images.length > 0;

  const prevImg = useCallback(() => {
    setImgIdx((i) => (i === 0 ? property.images.length - 1 : i - 1));
  }, [property.images.length]);

  const nextImg = useCallback(() => {
    setImgIdx((i) => (i === property.images.length - 1 ? 0 : i + 1));
  }, [property.images.length]);

  const purposeLabel = p.purpose === "venta" ? t("demo.card.for-sale") : p.purpose === "alquiler" ? t("demo.card.for-rent") : t("demo.card.for-season");

  // Touch swipe for card image gallery
  const touchStartX = useRef(0);
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    const diff = Math.abs(e.touches[0].clientX - touchStartX.current);
    if (diff > 10) e.preventDefault();
  }, []);
  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextImg();
      else prevImg();
    }
  }, [nextImg, prevImg]);

  // Touch swipe for modal image gallery
  const modalTouchStartX = useRef(0);
  const handleModalTouchStart = useCallback((e: React.TouchEvent) => {
    modalTouchStartX.current = e.touches[0].clientX;
  }, []);
  const handleModalTouchMove = useCallback((e: React.TouchEvent) => {
    const diff = Math.abs(e.touches[0].clientX - modalTouchStartX.current);
    if (diff > 10) e.preventDefault();
  }, []);
  const handleModalTouchEnd = useCallback((e: React.TouchEvent) => {
    const diff = modalTouchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextImg();
      else prevImg();
    }
  }, [nextImg, prevImg]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white text-left transition-all hover:shadow-lg dark:border-slate-700 dark:bg-slate-900"
      >
        {hasImages ? (
          <div
            className="relative h-64 overflow-hidden bg-slate-200 sm:h-72 dark:bg-slate-700"
            style={{ touchAction: "pan-y" }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <img
              src={property.images[imgIdx]}
              alt={p.title}
              className="block h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />
            {property.images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prevImg(); }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white/70 text-slate-700 shadow-lg transition-all hover:bg-white md:opacity-0 md:group-hover:opacity-100"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextImg(); }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white/70 text-slate-700 shadow-lg transition-all hover:bg-white md:opacity-0 md:group-hover:opacity-100"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {property.images.map((_, i) => (
                    <span
                      key={i}
                      className={`block rounded-full transition-all ${
                        i === imgIdx ? "h-1.5 w-5 bg-white" : "h-1.5 w-1.5 bg-white/60"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
            <div className="absolute left-3 top-3 flex flex-col items-start gap-1">
              <span className="rounded-full bg-white/90 px-2.5 py-0.5 text-[11px] font-semibold text-slate-700 shadow-sm backdrop-blur-sm dark:bg-slate-800/90 dark:text-slate-300">
                {p.type}
              </span>
              <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold text-white backdrop-blur-sm shadow-sm ${
                property.purpose === "venta" ? "bg-blue-600/80" : property.purpose === "alquiler" ? "bg-emerald-600/80" : "bg-amber-600/80"
              }`}>
                {purposeLabel}
              </span>
            </div>
            <span className="absolute right-3 top-3 rounded-full bg-amber-500 px-2.5 py-0.5 text-[11px] font-bold text-white shadow-sm">
              {property.price}
            </span>
          </div>
        ) : (
          <div className={`relative h-64 sm:h-72 bg-gradient-to-br ${color}`}>
            <div className="absolute inset-0 flex items-center justify-center">
              <Building2 className="h-14 w-14 text-white/30" />
            </div>
            <div className="absolute left-3 top-3 flex flex-col items-start gap-1">
              <span className="rounded-full bg-white/90 px-2.5 py-0.5 text-[11px] font-semibold text-slate-700 shadow-sm backdrop-blur-sm dark:bg-slate-800/90 dark:text-slate-300">
                {p.type}
              </span>
              <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold text-white backdrop-blur-sm shadow-sm ${
                property.purpose === "venta" ? "bg-blue-600/80" : property.purpose === "alquiler" ? "bg-emerald-600/80" : "bg-amber-600/80"
              }`}>
                {purposeLabel}
              </span>
            </div>
            <span className="absolute right-3 top-3 rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-white shadow-sm">
              {property.price}
            </span>
          </div>
        )}
        <div className="flex flex-1 flex-col justify-between p-5">
          <div>
            <h3 className="font-semibold text-slate-900 group-hover:text-blue-700 dark:text-slate-100 dark:group-hover:text-blue-400">
            {p.title}
          </h3>
          <p className="mt-1 flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
            <MapPin className="h-3 w-3" />
            {p.location}
          </p>
          <p className="mt-2 text-xs leading-relaxed text-slate-600 line-clamp-2 dark:text-slate-400">
            {p.desc}
          </p>
          <div className="mt-4 flex items-center gap-4 border-t border-slate-100 pt-4 text-xs text-slate-500 dark:border-slate-700 dark:text-slate-400">
            {property.beds > 0 && (
              <>
                <span className="flex items-center gap-1">
                  <Bed className="h-3.5 w-3.5" />
                  {t("demo.card.beds").replace("{n}", String(property.beds))}
                </span>
                <span className="flex items-center gap-1">
                  <Bath className="h-3.5 w-3.5" />
                  {t("demo.card.baths").replace("{n}", String(property.baths))}
                </span>
              </>
            )}
            <span className="flex items-center gap-1">
              <Maximize className="h-3.5 w-3.5" />
              {t("demo.card.m2").replace("{n}", String(property.m2))}
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
            {t("demo.card.click-detail").replace("{ref}", property.ref)}
          </p>
        </div>
        </div>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="mt-8 mb-8 w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-slate-900"
            onClick={(e) => e.stopPropagation()}
          >
            {hasImages ? (
              <div
                className="relative bg-slate-200 dark:bg-slate-700"
                style={{ touchAction: "pan-y" }}
                onTouchStart={handleModalTouchStart}
                onTouchMove={handleModalTouchMove}
                onTouchEnd={handleModalTouchEnd}
              >
                <img
                  src={property.images[imgIdx]}
                  alt={`${p.title} — foto ${imgIdx + 1}`}
                  className="aspect-[4/3] w-full object-cover sm:aspect-[16/9]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />
                {property.images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => { e.stopPropagation(); prevImg(); }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-all hover:bg-white/40 hover:scale-110"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); nextImg(); }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-all hover:bg-white/40 hover:scale-110"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {property.images.map((_, i) => (
                        <button
                          key={i}
                          onClick={(e) => { e.stopPropagation(); setImgIdx(i); }}
                          className={`h-2 rounded-full transition-all ${
                            i === imgIdx ? "w-8 bg-white" : "w-2 bg-white/50 hover:bg-white/70"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
                <button
                  onClick={() => setOpen(false)}
                  className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition-all hover:bg-black/50"
                >
                  <X className="h-5 w-5" />
                </button>
                <span className="absolute left-4 bottom-4 rounded-full bg-amber-500 px-4 py-1.5 text-base font-bold text-white shadow-lg">
                  {property.price}
                </span>
              </div>
            ) : (
              <div className={`relative h-64 sm:h-72 bg-gradient-to-br ${color}`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Building2 className="h-16 w-16 text-white/20" />
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition-all hover:bg-black/50"
                >
                  <X className="h-5 w-5" />
                </button>
                <span className="absolute left-4 bottom-4 rounded-full bg-amber-500 px-4 py-1.5 text-base font-bold text-white">
                  {property.price}
                </span>
              </div>
            )}

            <div className="p-5 sm:p-8">
              <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{p.title}</h2>
                  <p className="mt-1 flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
                    <MapPin className="h-4 w-4" />
                    {p.location}
                  </p>
                </div>
                <div className="flex shrink-0 gap-1.5">
                  <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                    property.purpose === "venta" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300" : property.purpose === "alquiler" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300" : "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
                  }`}>
                    {purposeLabel}
                  </span>
                  <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    {p.type}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex gap-6 text-sm">
                {property.beds > 0 && (
                  <>
                    <span className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                      <Bed className="h-4 w-4 text-blue-700 dark:text-blue-400" />
                      {property.beds} {t("demo.card.beds").replace("{n}", String(property.beds)).replace(/^\d+\s/, "")}
                    </span>
                    <span className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                      <Bath className="h-4 w-4 text-blue-700 dark:text-blue-400" />
                      {property.baths} {t("demo.card.baths").replace("{n}", String(property.baths)).replace(/^\d+\s/, "")}
                    </span>
                  </>
                )}
                <span className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <Maximize className="h-4 w-4 text-blue-700 dark:text-blue-400" />
                  {t("demo.card.m2-built").replace("{n}", String(property.m2))}
                </span>
              </div>

              <div className="mt-6">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">{t("demo.card.desc-title")}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{p.desc}</p>
              </div>

              <div className="mt-6 border-t border-slate-100 pt-6 dark:border-slate-700">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">{t("demo.card.location-title")}</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{p.location}</p>
                <div className="mt-3 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
                  <iframe
                    title={`Mapa de ${p.location}`}
                    src={`https://www.openstreetmap.org/export/embed.html?bbox=${property.coords.lng - 0.015},${property.coords.lat - 0.015},${property.coords.lng + 0.015},${property.coords.lat + 0.015}&layer=mapnik&marker=${property.coords.lat},${property.coords.lng}`}
                    width="100%"
                    height="220"
                    className="block"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <a
                  href={`https://www.google.com/maps?q=${property.coords.lat},${property.coords.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-xs text-blue-700 hover:underline dark:text-blue-400"
                >
                  <MapPin className="h-3 w-3" />
                  {t("demo.card.map-link")}
                </a>
              </div>

              <div className="mt-6 border-t border-slate-100 pt-6 dark:border-slate-700">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">{t("demo.card.contact-title")}</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {t("demo.card.contact-desc").replace("{ref}", property.ref)}
                </p>
                <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
                  <button
                    onClick={() => window.open(`tel:+34965830000`)}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-700 px-3 py-3 text-sm font-semibold text-white transition-colors dark:bg-blue-600"
                  >
                    <Phone className="h-4 w-4" />
                    {t("demo.card.phone")}
                  </button>
                  <button
                    onClick={() =>
                      window.open(
                        `mailto:info@inmobiliaria.com?subject=${encodeURIComponent(`Consulta: ${property.ref} · ${property.title}`)}&body=${encodeURIComponent(`Hola,\n\nMe interesa la propiedad ref. ${property.ref} — ${property.title}.\nUbicación: ${property.location}\nPrecio: ${property.price}\n\nVer anuncio: https://costa-blanca-leads.vercel.app/demo?ref=${property.ref}\n\nPor favor, contactadme para más información.\n\nGracias.`)}`
                      )
                    }
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 px-3 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    <Mail className="h-4 w-4" />
                    {t("demo.card.email")}
                  </button>
                  <button
                    onClick={() =>
                      window.open(
                        `/api/whatsapp?text=${encodeURIComponent(`Hola, me interesa la propiedad ${property.ref} · ${property.title}\n\nUbicación: ${property.location}\nPrecio: ${property.price}\n\nVer anuncio: https://costa-blanca-leads.vercel.app/demo?ref=${property.ref}`)}`,
                        "_blank"
                      )
                    }
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-green-600 px-3 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-700 dark:border-slate-700 dark:bg-green-700 dark:hover:bg-green-600"
                  >
                    <MessageCircle className="h-4 w-4" />
                    {t("demo.card.whatsapp")}
                  </button>
                </div>
                <p className="mt-3 text-xs text-slate-400 dark:text-slate-500">
                  {t("demo.card.consent")}
                </p>
              </div>

              <p className="mt-4 text-xs text-slate-400 dark:text-slate-500">
                {t("demo.card.ref").replace("{ref}", property.ref)}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
