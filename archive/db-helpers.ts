import { eq } from "drizzle-orm";
import { getDb } from "./db";
import {
  leads,
  quotations,
  designUploads,
  type InsertLead,
  type InsertQuotation,
  type InsertDesignUpload,
} from "../drizzle/schema";

/**
 * Create a new lead from calculator or product inquiry
 */
export async function createLead(data: InsertLead) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(leads).values(data);
  return result;
}

/**
 * Get lead by ID
 */
export async function getLeadById(leadId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.select().from(leads).where(eq(leads.id, leadId)).limit(1);
  return result[0] || null;
}

/**
 * Update lead status
 */
export async function updateLeadStatus(leadId: number, status: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db
    .update(leads)
    .set({ status: status as any, updatedAt: new Date() })
    .where(eq(leads.id, leadId));
}

/**
 * Create a quotation
 */
export async function createQuotation(data: InsertQuotation) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(quotations).values(data);
  return result;
}

/**
 * Get quotation by ID
 */
export async function getQuotationById(quotationId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db
    .select()
    .from(quotations)
    .where(eq(quotations.id, quotationId))
    .limit(1);
  return result[0] || null;
}

/**
 * Get quotation by number
 */
export async function getQuotationByNumber(quotationNumber: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db
    .select()
    .from(quotations)
    .where(eq(quotations.quotationNumber, quotationNumber))
    .limit(1);
  return result[0] || null;
}

/**
 * Update quotation with PDF URL and status
 */
export async function updateQuotationPDF(
  quotationId: number,
  pdfUrl: string,
  pdfKey: string,
  status: string = "sent"
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db
    .update(quotations)
    .set({
      pdfUrl,
      pdfKey,
      status: status as any,
      updatedAt: new Date(),
    })
    .where(eq(quotations.id, quotationId));
}

/**
 * Create design upload
 */
export async function createDesignUpload(data: InsertDesignUpload) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(designUploads).values(data);
  return result;
}

/**
 * Get design uploads by lead ID
 */
export async function getDesignsByLeadId(leadId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db
    .select()
    .from(designUploads)
    .where(eq(designUploads.leadId, leadId));
  return result;
}

/**
 * Generate unique quotation number
 */
export function generateQuotationNumber(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `CONV-${year}${month}${day}-${random}`;
}
