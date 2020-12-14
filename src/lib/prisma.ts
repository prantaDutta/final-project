import { PrismaClient } from "@prisma/client";
import { isProduction } from "../utils/constants";

let prisma;
const globalAny: any = global;

if (isProduction) {
  prisma = new PrismaClient();
} else {
  if (!globalAny.prisma) {
    globalAny.prisma = new PrismaClient();
  }

  prisma = globalAny.prisma;
}

export default prisma;
