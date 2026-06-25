"use client";

import { useState, useCallback, useRef } from "react";
import { MapPin, Bed, Bath, Maximize, ChevronLeft, ChevronRight, Phone, Mail, MessageCircle, ArrowLeft, Building2, X } from "lucide-react";
import type { Property } from "@/lib/demo-properties";
import { useLang } from "@/lib/providers";
import { localizeProperty } from "@/lib/property-translations";

const purposeColors: Record<string, string> = {
  venta: "bg-blue-600",
  alquiler: "bg-emerald-600",
  temporal: "bg-amber-600",
};

export function PropertyClientPage({ property }: { property: Property }) {
  const [imgIdx, setImgIdx] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const { t, locale } = useLang();
  const p = localizeProperty(property, locale);
  const hasImages = property.images.length > 0;

  const prevImg = useCallback(() => {
    setImgIdx((i) => (i === 0 ? property.images.length - 1 : i - 1));
  }, [property.images.length]);

  const nextImg = useCallback(() => {
    setImgIdx((i) => (i === property.images.length - 1 ? 0 : i + 1));
  }, [property.images.length]);

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

  const purposeLabel = p.purpose === "venta" ? t("demo.card.for-sale") : p.purpose === "alquiler" ? t("demo.card.for-rent") : t("demo.card.for-season");

  return (
    <div className="min-h-dvh bg-white dark:bg-slate-950">
      <div className="mx-auto max-w-6xl">
        <div className="px-6 py-4">
          <a
            href="/demo"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-700 dark:text-slate-400 dark:hover:text-blue-400"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al listado
          </a>
        </div>

        {hasImages ? (
          <div
            className="relative h-72 sm:h-[500px] bg-slate-200 dark:bg-slate-700"
            style={{ touchAction: "pan-y" }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <img
              src={property.images[imgIdx]}
              alt={`${p.title} — foto ${imgIdx + 1}`}
              className="h-full w-full cursor-pointer object-cover"
              onClick={() => setFullscreen(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
            {property.images.length > 1 && (
              <>
                <button onClick={prevImg} className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-all hover:bg-white/40 hover:scale-110">
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button onClick={nextImg} className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-all hover:bg-white/40 hover:scale-110">
                  <ChevronRight className="h-6 w-6" />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {property.images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setImgIdx(i)}
                      className={`h-2 rounded-full transition-all ${i === imgIdx ? "w-10 bg-white" : "w-2 bg-white/50 hover:bg-white/70"}`}
                    />
                  ))}
                </div>
              </>
            )}
            <div className="absolute left-4 bottom-4 flex flex-col gap-2">
              <span className="rounded-full bg-amber-500 px-5 py-2 text-lg font-bold text-white shadow-lg">
                {property.price}
              </span>
            </div>
          </div>
        ) : (
          <div className="h-72 sm:h-[500px] bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center dark:from-slate-800 dark:to-slate-700">
            <Building2 className="h-20 w-20 text-slate-400 dark:text-slate-600" />
          </div>
        )}

        <div className="mx-auto max-w-4xl px-6 py-8 sm:py-12">
          <div className="flex-col items-start gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4 flex">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl dark:text-slate-100">{p.title}</h1>
              <p className="mt-2 flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                <MapPin className="h-4 w-4 shrink-0" />
                {p.location}
              </p>
            </div>
            <div className="flex shrink-0 gap-1.5">
              <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold text-white ${purposeColors[p.purpose] || "bg-blue-600"}`}>
                {purposeLabel}
              </span>
              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                {p.type}
              </span>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-6 text-sm">
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

          <div className="mt-8">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{t("demo.card.desc-title")}</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{p.desc}</p>
          </div>

          <div className="mt-8 border-t border-slate-100 pt-8 dark:border-slate-800">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{t("demo.card.location-title")}</h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{p.location}</p>
            <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
              <iframe
                title={`Mapa de ${p.location}`}
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${property.coords.lng - 0.015},${property.coords.lat - 0.015},${property.coords.lng + 0.015},${property.coords.lat + 0.015}&layer=mapnik&marker=${property.coords.lat},${property.coords.lng}`}
                width="100%"
                height="300"
                className="block"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
            <a
              href={`https://www.google.com/maps?q=${property.coords.lat},${property.coords.lng}`}
              target="_blank" rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1 text-xs text-blue-700 hover:underline dark:text-blue-400"
            >
              <MapPin className="h-3 w-3" />
              {t("demo.card.map-link")}
            </a>
          </div>

          <div className="mt-8 border-t border-slate-100 pt-8 dark:border-slate-800">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{t("demo.card.contact-title")}</h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              {t("demo.card.contact-desc").replace("{ref}", property.ref)}
            </p>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <a
                href="tel:+34965830000"
                className="inline-flex items-center justify-center gap-3 rounded-xl bg-blue-700 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-700/25 transition-all hover:bg-blue-800"
              >
                <Phone className="h-5 w-5" />
                {t("demo.card.phone")}
              </a>
              <a
                href={`mailto:info@inmobiliaria.com?subject=${encodeURIComponent(`Consulta: ${property.ref} · ${property.title}`)}&body=${encodeURIComponent(`Hola,\n\nMe interesa la propiedad ref. ${property.ref} — ${property.title}.\nUbicación: ${property.location}\nPrecio: ${property.price}\n\nVer anuncio: https://costa-blanca-leads.vercel.app/propiedades/${property.ref}\n\nPor favor, contactadme para más información.\n\nGracias.`)}`}
                className="inline-flex items-center justify-center gap-3 rounded-xl border border-slate-300 px-6 py-4 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <Mail className="h-5 w-5" />
                {t("demo.card.email")}
              </a>
              <a
                href={`/api/whatsapp?text=${encodeURIComponent(`Hola, me interesa la propiedad ${property.ref} · ${property.title}\n\nUbicación: ${property.location}\nPrecio: ${property.price}\n\nVer anuncio: https://costa-blanca-leads.vercel.app/propiedades/${property.ref}`)}`}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 rounded-xl bg-green-600 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-green-600/25 transition-all hover:bg-green-700"
              >
                <MessageCircle className="h-5 w-5" />
                {t("demo.card.whatsapp")}
              </a>
            </div>
            <p className="mt-4 text-xs text-slate-400 dark:text-slate-500">{t("demo.card.consent")}</p>
          </div>

          <p className="mt-6 text-xs text-slate-400 dark:text-slate-500">
            {t("demo.card.ref").replace("{ref}", property.ref)}
          </p>
        </div>
      </div>

      {fullscreen && hasImages && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setFullscreen(false)}
        >
          <button
            onClick={() => setFullscreen(false)}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-all hover:bg-white/40"
          >
            <X className="h-5 w-5" />
          </button>
          {property.images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prevImg(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-all hover:bg-white/40"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); nextImg(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-all hover:bg-white/40"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}
          <img
            src={property.images[imgIdx]}
            alt={p.title}
            className="max-h-full max-w-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
