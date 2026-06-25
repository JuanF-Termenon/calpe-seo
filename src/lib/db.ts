import { Pool } from "pg";
import type { Property } from "@/lib/demo-properties";

const globalForPool = globalThis as unknown as { pool: Pool | undefined };

function createPool() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL environment variable is not set");
  }
  const url = new URL(connectionString);
  return new Pool({
    host: url.hostname,
    port: parseInt(url.port, 10) || 5432,
    database: url.pathname.slice(1),
    user: url.username,
    password: decodeURIComponent(url.password),
    ssl: { rejectUnauthorized: false },
    max: 5,
  });
}

export const pool = globalForPool.pool ?? createPool();

if (process.env.NODE_ENV !== "production") globalForPool.pool = pool;

export async function query(text: string, params?: unknown[]) {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result;
  } finally {
    client.release();
  }
}

// Helper to convert snake_case DB rows to camelCase JS objects
export function rowToProperty(row: Record<string, unknown>): Property {
  return {
    id: row.id as number,
    ref: row.ref as string,
    title: row.title as string,
    location: row.location as string,
    price: row.price as string,
    beds: row.beds as number,
    baths: row.baths as number,
    m2: row.m2 as number,
    type: row.type as string,
    purpose: row.purpose as "venta" | "alquiler" | "temporal",
    desc: row.desc as string,
    images: JSON.parse((row.images as string) || "[]"),
    coords: { lat: row.lat as number, lng: row.lng as number },
    available: (row.available as boolean) ?? true,
    translations: typeof row.translations === "string" ? JSON.parse(row.translations) : (row.translations || {}),
    clientId: row.clientId as number | null,
    createdAt: row.createdAt as string | null,
    updatedAt: row.updatedAt as string | null,
  };
}
