# Expense Tracker OCR

Aplicacion de seguimiento de gastos con escaneo de recibos mediante IA (GPT-4o Vision). Construida con Next.js, Prisma y PostgreSQL.

![Screenshot](public/screenshot.png)

## Caracteristicas

- Autenticacion de usuarios (registro/login con JWT)
- CRUD de gastos con categorias
- Escaneo de recibos con OCR (GPT-4o Vision)
- Auto-categorizacion de gastos con IA
- Administracion de categorias (nombre, icono, color)
- Presupuestos mensuales por categoria
- Dashboard con graficos (Recharts)
- Subida de imagenes a Cloudinary
- Exportacion de gastos
- Drag & drop para subir recibos

## Tech Stack

- **Frontend:** Next.js 16, React 19, Tailwind CSS 4
- **Backend:** Next.js API Routes
- **Base de datos:** PostgreSQL + Prisma ORM
- **IA/OCR:** OpenAI GPT-4o Vision
- **Almacenamiento:** Cloudinary
- **Graficos:** Recharts

## Instalacion

```bash
# Clonar el repositorio
git clone https://github.com/fazt/expense-tracker-ocr.git
cd expense-tracker-ocr

# Instalar dependencias
pnpm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales
```

## Variables de Entorno

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5448/expense_tracker"
OPENAI_API_KEY="tu-api-key"
CLOUDINARY_CLOUD_NAME="tu-cloud-name"
CLOUDINARY_API_KEY="tu-api-key"
CLOUDINARY_API_SECRET="tu-api-secret"
```

## Base de Datos

El proyecto incluye un `docker-compose.yml` con PostgreSQL 16.

```bash
# Levantar la base de datos
docker compose up -d

# Sincronizar schema con la base de datos
npx prisma db push

# Ejecutar seed (categorias iniciales)
npx prisma db seed
```

La base de datos corre en el puerto `5448` (mapeado desde el 5432 del contenedor).

| Variable       | Valor por defecto  |
|----------------|--------------------|
| Usuario        | `postgres`         |
| Password       | `postgres`         |
| Base de datos  | `expense_tracker`  |
| Puerto         | `5448`             |

## Desarrollo

```bash
# 1. Levantar la base de datos
docker compose up -d

# 2. Instalar dependencias
pnpm install

# 3. Iniciar el servidor
pnpm dev
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador.
