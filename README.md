# 📝 Task Manager App

Aplicación web desarrollada con **React + Node.js + PostgreSQL**, que permite gestionar tareas (crear, listar, editar y eliminar), incluyendo autenticación con **JWT** y rutas protegidas.

---

# 🏗️ 1. Arquitectura del Sistema

## 🔗 Conexión Frontend ↔ Backend

El frontend desarrollado en React se comunica con el backend mediante peticiones HTTP usando `fetch`.

```ts
fetch(`${import.meta.env.VITE_API_URL}/tasks`)
```

* Se utiliza una variable de entorno (`VITE_API_URL`) para definir la URL del backend.
* Esto permite cambiar fácilmente entre entorno local y producción.

---

## 🔗 Conexión Backend ↔ Base de Datos

El backend (Node.js + Express) se conecta a la base de datos PostgreSQL utilizando **Prisma ORM**.

```ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
```

* Prisma actúa como intermediario entre el backend y la base de datos.
* Permite realizar consultas de forma segura y tipada.

---

## ☁️ Despliegue

* **Frontend:** desplegado en Vercel
* **Backend:** desplegado en Render (Web Service)
* **Base de datos:** PostgreSQL en Render

---

## 🧩 Flujo General

```
Usuario → Frontend (React en Vercel)
        → Backend (API en Render)
        → Base de Datos (PostgreSQL en Render)
```

---

# 💻 4. Código Clave

## 🔄 Carga de datos en el frontend (useEffect)

```ts
useEffect(() => {
  fetch(`${import.meta.env.VITE_API_URL}/tasks`)
    .then((response) => response.json())
    .then((data) => setTasks(data))
    .catch((error) => console.error(error));
}, []);
```

👉 Este hook permite cargar las tareas automáticamente al iniciar la aplicación.

---

## 🌐 Comunicación con el backend (fetch)

```ts
fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ text: taskText })
})
```

👉 Se utiliza `fetch` para enviar y recibir datos del backend mediante JSON.

---

## 🚏 Ruta del backend

```ts
app.get('/tasks', async (req, res) => {
  const tasks = await prisma.task.findMany();
  res.json(tasks);
});
```

👉 Esta ruta obtiene todas las tareas almacenadas en la base de datos.

---

## 🔌 Conexión con la base de datos

```ts
const prisma = new PrismaClient();
```

👉 Prisma se encarga de gestionar la conexión con PostgreSQL.

---

## ➕ Inserción de datos en la base de datos

```ts
app.post('/tasks', async (req, res) => {
  const { text } = req.body;

  const newTask = await prisma.task.create({
    data: { text }
  });

  res.json(newTask);
});
```

👉 Permite registrar nuevas tareas en la base de datos.

---

# 🗄️ 5. Base de Datos

## 📊 Tecnología utilizada

* **PostgreSQL** (desplegado en Render)
* **Prisma ORM** para la gestión de datos

---

## 🧱 Estructura del modelo

```prisma
model Task {
  id        Int     @id @default(autoincrement())
  text      String
  completed Boolean @default(false)
}
```

👉 Cada tarea tiene:

* Un identificador único
* Un texto descriptivo
* Un estado (completado o pendiente)

---

## 💾 Persistencia de datos

Antes:

* Los datos se almacenaban en memoria → se perdían al reiniciar el servidor

Ahora:

* Los datos se almacenan en PostgreSQL → **persisten permanentemente**

👉 Esto permite:

* Mantener la información incluso después de cerrar la app
* Escalabilidad y mayor confiabilidad

---

# 🔐 Autenticación

El sistema incluye autenticación mediante **JWT (JSON Web Token)**:

* Login genera un token
* El token se envía en headers
* Existen rutas protegidas que validan el token

---

# 🚀 Funcionalidades

✔ Crear tareas
✔ Listar tareas
✔ Editar tareas
✔ Eliminar tareas
✔ Autenticación con JWT
✔ Rutas protegidas

---

# ⚙️ Variables de entorno

Frontend:

```env
VITE_API_URL=https://tu-backend.onrender.com
```

Backend:

```env
DATABASE_URL=postgresql://...
JWT_SECRET=...
```

---

# 📌 Conclusión

Este proyecto implementa una arquitectura moderna basada en:

* Separación frontend/backend
* Uso de API REST
* Persistencia en base de datos en la nube
* Despliegue en plataformas reales (Render y Vercel)

Lo que lo convierte en una solución escalable y lista para producción.

---
