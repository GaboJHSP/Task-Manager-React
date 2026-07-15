# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: flujo-tareas.spec.js >> un usuario puede crear una tarea y verla en la lista
- Location: e2e\flujo-tareas.spec.js:3:1

# Error details

```
Error: POST /tasks devolvió 500: {"error":"Error al crear tarea"}

expect(received).toBe(expected) // Object.is equality

Expected: 201
Received: 500
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test(
  4  |   "un usuario puede crear una tarea y verla en la lista",
  5  |   async ({ page }) => {
  6  |     // Mostrar errores de JavaScript del navegador
  7  |     page.on("console", (message) => {
  8  |       console.log(`[NAVEGADOR] ${message.type()}: ${message.text()}`);
  9  |     });
  10 | 
  11 |     page.on("pageerror", (error) => {
  12 |       console.log(`[ERROR DE PÁGINA] ${error.message}`);
  13 |     });
  14 | 
  15 |     await page.goto("/");
  16 | 
  17 |     const input = page.getByLabel("Nueva tarea");
  18 |     const boton = page.getByRole("button", {
  19 |       name: "Agregar",
  20 |     });
  21 | 
  22 |     await input.fill("Comprar pan");
  23 | 
  24 |     const respuestaCreacion = page.waitForResponse(
  25 |       (response) =>
  26 |         response.url().includes("/tasks") &&
  27 |         response.request().method() === "POST",
  28 |     );
  29 | 
  30 |     await boton.click();
  31 | 
  32 |     const response = await respuestaCreacion;
  33 | 
  34 |     const status = response.status();
  35 |     const statusText = response.statusText();
  36 |     const responseBody = await response.text();
  37 | 
  38 |     console.log("=== RESPUESTA POST /tasks ===");
  39 |     console.log("URL:", response.url());
  40 |     console.log("Estado:", status);
  41 |     console.log("Texto del estado:", statusText);
  42 |     console.log("Cuerpo:", responseBody);
  43 |     console.log(
  44 |       "Datos enviados:",
  45 |       response.request().postData(),
  46 |     );
  47 | 
  48 |     expect(
  49 |       status,
  50 |       `POST /tasks devolvió ${status}: ${responseBody}`,
> 51 |     ).toBe(201);
     |       ^ Error: POST /tasks devolvió 500: {"error":"Error al crear tarea"}
  52 | 
  53 |     await expect(
  54 |       page.getByText("Comprar pan", { exact: true }),
  55 |     ).toBeVisible();
  56 |   },
  57 | );
```