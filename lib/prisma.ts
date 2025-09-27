import { PrismaClient } from "@prisma/client";

const PrismaClientSingleton = () => {
  return new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
    log: ['error', 'warn'],
  });
};
declare const globalThis: {
    prismaGlobal: ReturnType<typeof PrismaClientSingleton>;
} & typeof global;
const db = globalThis.prismaGlobal ?? PrismaClientSingleton();
export default db;
if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = db;
}
