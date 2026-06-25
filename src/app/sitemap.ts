import type { MetadataRoute } from "next";
import { query, rowToProperty } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://costa-blanca-leads.vercel.app";

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/demo`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
  ];

  try {
    const result = await query("SELECT * FROM properties WHERE available = true ORDER BY ref");
    const properties = result.rows.map(rowToProperty);
    const propertyPages: MetadataRoute.Sitemap = properties.map((p) => ({
      url: `${base}/propiedades/${p.ref}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
    return [...staticPages, ...propertyPages];
  } catch {
    return staticPages;
  }
}
