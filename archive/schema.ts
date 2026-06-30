import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Leads table - Stores customer inquiries from calculator and product pages
 */
export const leads = mysqlTable("leads", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  productType: varchar("productType", { length: 50 }).notNull(), // 'convoltaje' or 'tintaflash'
  kitId: varchar("kitId", { length: 100 }),
  productId: varchar("productId", { length: 100 }),
  message: text("message"),
  quotationUrl: varchar("quotationUrl", { length: 500 }), // URL to stored PDF
  status: mysqlEnum("status", ["new", "contacted", "quoted", "converted", "lost"]).default("new").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Lead = typeof leads.$inferSelect;
export type InsertLead = typeof leads.$inferInsert;

/**
 * Quotations table - Stores generated quotations/prefacturas
 */
export const quotations = mysqlTable("quotations", {
  id: int("id").autoincrement().primaryKey(),
  leadId: int("leadId").notNull(),
  quotationNumber: varchar("quotationNumber", { length: 50 }).notNull().unique(),
  kitId: varchar("kitId", { length: 100 }),
  complementaryProducts: text("complementaryProducts"), // JSON array of product IDs
  subtotal: int("subtotal").notNull(), // Price in cents
  discount: int("discount").default(0), // Discount in cents
  total: int("total").notNull(), // Total in cents
  pdfUrl: varchar("pdfUrl", { length: 500 }), // URL to stored PDF
  pdfKey: varchar("pdfKey", { length: 200 }), // Storage key for PDF
  status: mysqlEnum("status", ["draft", "sent", "accepted", "rejected", "expired"]).default("draft").notNull(),
  expiresAt: timestamp("expiresAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Quotation = typeof quotations.$inferSelect;
export type InsertQuotation = typeof quotations.$inferInsert;

/**
 * Design uploads table - For Tintaflash custom designs
 */
export const designUploads = mysqlTable("designUploads", {
  id: int("id").autoincrement().primaryKey(),
  leadId: int("leadId"),
  productId: varchar("productId", { length: 100 }).notNull(),
  designUrl: varchar("designUrl", { length: 500 }).notNull(), // URL to stored design image
  designKey: varchar("designKey", { length: 200 }).notNull(), // Storage key
  quantity: int("quantity").default(1),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type DesignUpload = typeof designUploads.$inferSelect;
export type InsertDesignUpload = typeof designUploads.$inferInsert;