/// <reference types="node" />

import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
    schema: "prisma/schema.prisma",

    migrations: {
        path: "prisma/migrations",
        seed: "tsx prisma/seed.ts",
    },

    datasource: {
        /*
         * prisma generate no necesita conectarse a la base de datos.
         * Railway proporcionará DATABASE_URL durante las migraciones
         * y la ejecución del backend.
         */
        url: process.env.DATABASE_URL ?? "",
    },
});