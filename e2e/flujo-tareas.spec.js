import { test, expect } from "@playwright/test";

test(
  "un usuario puede crear una tarea y verla en la lista",
  async ({ page }) => {
    // Mostrar errores de JavaScript del navegador
    page.on("console", (message) => {
      console.log(`[NAVEGADOR] ${message.type()}: ${message.text()}`);
    });

    page.on("pageerror", (error) => {
      console.log(`[ERROR DE PÁGINA] ${error.message}`);
    });

    await page.goto("/");

    const input = page.getByLabel("Nueva tarea");
    const boton = page.getByRole("button", {
      name: "Agregar",
    });

    await input.fill("Comprar pan");

    const respuestaCreacion = page.waitForResponse(
      (response) =>
        response.url().includes("/tasks") &&
        response.request().method() === "POST",
    );

    await boton.click();

    const response = await respuestaCreacion;

    const status = response.status();
    const statusText = response.statusText();
    const responseBody = await response.text();

    console.log("=== RESPUESTA POST /tasks ===");
    console.log("URL:", response.url());
    console.log("Estado:", status);
    console.log("Texto del estado:", statusText);
    console.log("Cuerpo:", responseBody);
    console.log(
      "Datos enviados:",
      response.request().postData(),
    );

    expect(
      status,
      `POST /tasks devolvió ${status}: ${responseBody}`,
    ).toBe(201);

    await expect(
      page.getByText("Comprar pan", { exact: true }),
    ).toBeVisible();
  },
);