import type { PrismaClient as PrismaClientType } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientType | undefined;
};

let prismaInstance: PrismaClientType | undefined;

async function createPrismaClient(): Promise<PrismaClientType> {
  const { PrismaClient } = await import("@prisma/client");
  const { PrismaPg } = await import("@prisma/adapter-pg");
  const { Pool } = await import("pg");

  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL environment variable is not set");
  }

  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);

  return new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });
}

export async function getPrisma(): Promise<PrismaClientType> {
  if (!prismaInstance) {
    if (globalForPrisma.prisma) {
      prismaInstance = globalForPrisma.prisma;
    } else {
      prismaInstance = await createPrismaClient();
      if (process.env.NODE_ENV !== "production") {
        globalForPrisma.prisma = prismaInstance;
      }
    }
  }
  return prismaInstance;
}

// Synchronous getter for existing connections
export function getPrismaSync(): PrismaClientType {
  if (!prismaInstance) {
    throw new Error("Prisma not initialized. Call getPrisma() first.");
  }
  return prismaInstance;
}
