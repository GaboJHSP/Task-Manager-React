# Task Manager App
 
Aplicación web desarrollada con **React + Node.js + PostgreSQL**, que permite gestionar tareas (crear, listar, editar y eliminar), incluyendo autenticación con **JWT** y rutas protegidas.
 
[![CI](https://github.com/GaboJHSP/Task-Manager-React/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/GaboJHSP/Task-Manager-React/actions/workflows/ci.yml)
 
## 🚀 Instalación local
 
```bash
git clone https://github.com/GaboJHSP/Task-Manager-React.git
cd task-manager-react
npm install
```
 
### Variables de entorno
Crea un archivo `.env` en la raíz con las siguientes claves:
 
```
(Frontend) VITE_API_URL=
(Backend) DATABASE_URL=
```
 
## 📜 Comandos disponibles
 
| Comando          | Descripción                              |
|------------------|-------------------------------------------|
| `npm run dev`    | Levanta el entorno de desarrollo           |
| `npm run build`  | Genera el build de producción              |
| `npm test`       | Corre las pruebas automatizadas (pendiente — Sesión 3) |
 
## 🗄️ Base de datos
 
PostgreSQL con migraciones y seeds gestionados con Prisma (ver Módulo 2).
