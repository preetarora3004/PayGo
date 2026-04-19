import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

const url = process.env.DATABASE_URL;

if (!url) {
    throw new ErrorEvent("DATABASE_URL is missing");
}

export const client =
    globalForPrisma.prisma ||
    new PrismaClient({
        adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
        log: ["query", "error", "warn"]
    });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = client;
