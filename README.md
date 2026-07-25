# Task Manager App

Aplicación web full stack para la gestión de tareas, desarrollada con **React**, **Node.js**, **Express**, **PostgreSQL** y **Prisma**.

Permite registrar usuarios, autenticarse mediante **JSON Web Token (JWT)** y administrar tareas mediante operaciones de creación, consulta, edición, cambio de estado y eliminación.

El proyecto incorpora un flujo completo de integración y despliegue continuo, incluyendo validación de código, pruebas automatizadas, pruebas end-to-end, contenerización, migraciones de base de datos y despliegue automático a un ambiente de staging.

![CI](https://github.com/GaboJHSP/Task-Manager-React/actions/workflows/ci.yml/badge.svg?branch=main)

---

## Funcionalidades principales

- Registro e inicio de sesión de usuarios.
- Autenticación basada en JWT.
- Protección de rutas privadas.
- Creación de tareas.
- Listado de tareas.
- Edición de tareas.
- Marcado de tareas como completadas o pendientes.
- Eliminación de tareas.
- Persistencia de información en PostgreSQL.
- Validación del estado del backend mediante el endpoint `/health`.
- Integración y despliegue continuo mediante GitHub Actions.
- Despliegue automático a staging en Railway.

---

## Tecnologías utilizadas

### Frontend

- React
- TypeScript
- Vite
- Vitest
- React Testing Library
- Playwright
- ESLint

### Backend

- Node.js
- Express
- TypeScript
- Prisma ORM
- JSON Web Token
- Vitest
- Supertest
- ESLint

### Infraestructura y DevOps

- PostgreSQL
- Docker
- Docker Compose
- GitHub Actions
- Railway
- GitHub Branch Protection Rules

---

## Arquitectura general

```text
┌─────────────────────────┐
│       React + Vite      │
│        Frontend         │
│     localhost:3000      │
└────────────┬────────────┘
             │ HTTP / REST
             ▼
┌─────────────────────────┐
│    Node.js + Express    │
│         Backend         │
│     localhost:4000      │
└────────────┬────────────┘
             │ Prisma ORM
             ▼
┌─────────────────────────┐
│       PostgreSQL        │
│     localhost:5433      │
└─────────────────────────┘
