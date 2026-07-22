import "dotenv/config";
import app from "./app";

const port = Number(process.env.PORT ?? 3000);
const host = "0.0.0.0";

// Falla intencional del Laboratorio 3.
// Solo se ejecuta dentro del ambiente staging de Railway.
if (process.env.RAILWAY_ENVIRONMENT_NAME === "staging") {
    throw new Error(
        "SIMULACRO_CAOS: fallo intencional de arranque en Railway staging",
    );
}

app.listen(port, host, () => {
    console.log(`Backend ejecutándose en el puerto ${port}`);
});