import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { query, rowToProperty } from "@/lib/db";
import { PropertyClientPage } from "./client-page";

export async function generateMetadata({ params }: { params: Promise<{ ref: string }> }): Promise<Metadata> {
  const { ref } = await params;
  try {
    const result = await query("SELECT * FROM properties WHERE ref = $1", [ref.toUpperCase()]);
    if (result.rows.length === 0) return { title: "Propiedad no encontrada" };
    const p = rowToProperty(result.rows[0]);
    const title = `${p.title} · ${p.location} · ${p.price}`;
    const description = p.desc.slice(0, 160);
    const image = p.images?.[0];
    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "website",
        images: image ? [{ url: image, width: 800, height: 600 }] : [],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: image ? [image] : [],
      },
      alternates: { canonical: `https://costa-blanca-leads.vercel.app/propiedades/${ref}` },
    };
  } catch {
    return { title: "Propiedad no encontrada" };
  }
}

export default async function PropiedadPage({ params }: { params: Promise<{ ref: string }> }) {
  const { ref } = await params;
  try {
    const result = await query("SELECT * FROM properties WHERE ref = $1", [ref.toUpperCase()]);
    if (result.rows.length === 0) notFound();
    const property = rowToProperty(result.rows[0]);
    return <PropertyClientPage property={property} />;
  } catch {
    notFound();
  }
}
