// A single shared Prisma client. Next.js reloads modules a lot in dev, and
// creating a new client each time would exhaust the database connections, so
// we cache one instance on the global object.
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
