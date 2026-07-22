import app from "./app";

const PORT = Number(process.env.PORT) || 3000;

const simularCaos =
    process.env.SIMULAR_CAOS?.trim().toLowerCase() === "true";

console.log(`[startup] SIMULAR_CAOS=${simularCaos}`);

if (simularCaos) {
    throw new Error(
        "SIMULACRO_CAOS: fallo intencional de arranque en staging",
    );
}

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});