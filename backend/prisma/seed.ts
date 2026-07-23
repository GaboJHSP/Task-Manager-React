import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL no está configurada para ejecutar el seed");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const SEED_TASK_ID = -1;

async function main(): Promise<void> {
  await prisma.task.upsert({
    where: {
      id: SEED_TASK_ID,
    },
    update: {
      text: "Tarea inicial creada por el seed",
      completed: false,
    },
    create: {
      id: SEED_TASK_ID,
      text: "Tarea inicial creada por el seed",
      completed: false,
    },
  });

  console.log("Seed ejecutado correctamente");
}

main()
  .catch((error: unknown) => {
    console.error("Error al ejecutar el seed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });