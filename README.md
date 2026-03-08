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

En PowerShell de Windows, si `cp` no funciona, usa:

```powershell
Copy-Item .env.example .env
```

## Variables de Entorno

```env
DATABASE_URL="postgresql://usuario:password@localhost:5432/expense_tracker"
OPENAI_API_KEY="tu-api-key"
CLOUDINARY_CLOUD_NAME="tu-cloud-name"
CLOUDINARY_API_KEY="tu-api-key"
CLOUDINARY_API_SECRET="tu-api-secret"
```

Para Docker Compose (red interna de Docker), usa `.env.docker` basado en `.env.docker.example` y el host `db`:

```env
DATABASE_URL="postgresql://expense_user:expense_pass@db:5432/expense_tracker"
```

## Base de Datos

```bash
# Sincronizar schema con la base de datos
npx prisma db push

# Ejecutar seed (categorias iniciales)
npx prisma db seed
```

## Modos de Ejecucion

### 1) Local completo (app + DB local)

Usa PostgreSQL instalado en tu maquina (`localhost:5432`) y ejecuta:

```bash
pnpm dev
```

### 2) Docker completo (app + DB en Docker)

```bash
# 1) Crear archivo de entorno para Docker
cp .env.docker.example .env.docker

# 2) Levantar servicios
pnpm docker:up
```

En este modo, la DB vive en la intranet Docker (`expense_tracker_intranet`) y no expone puertos al host.

### 3) Modo hibrido (app local + DB Docker)

```bash
# Levanta solo la DB Docker y la publica en 5433
pnpm docker:db:up
```

Usa este `DATABASE_URL` en tu `.env` local:

```env
DATABASE_URL="postgresql://expense_user:expense_pass@localhost:5433/expense_tracker"
```

Luego corre la app local:

```bash
pnpm dev
```

Para detener la DB Docker del modo hibrido:

```bash
pnpm docker:db:down
```

## Desarrollo

```bash
pnpm dev
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

## Docker

Esta configuracion levanta la app y PostgreSQL en una intranet de Docker (`expense_tracker_intranet`).
El contenedor de PostgreSQL **no publica puertos al host**, evitando conflictos con tu PostgreSQL local.

```bash
# 1) Crear archivo de entorno para Docker
cp .env.docker.example .env.docker

# 2) Levantar servicios
pnpm docker:up
```

Luego abre [http://localhost:3000](http://localhost:3000).

Comandos utiles:

```bash
pnpm docker:logs
pnpm docker:down
```

## Ver y Revisar la DB en Docker

### Estado de contenedores

```bash
docker compose ps
```

### Logs de PostgreSQL

```bash
docker compose logs -f db
```

### Entrar a PostgreSQL (psql) dentro del contenedor

```bash
docker compose exec db psql -U expense_user -d expense_tracker
```

Comandos utiles dentro de `psql`:

```sql
\dt
\d "User"
\d "Expense"
SELECT COUNT(*) FROM "Expense";
SELECT * FROM "Category" LIMIT 10;
```

Para salir de `psql`:

```bash
\q
```

### Ver tablas en interfaz visual (Prisma Studio)

Si estas en modo hibrido (DB en `localhost:5433`) o local, corre:

```bash
npx prisma studio
```

Si estas en Docker completo y quieres abrir Prisma Studio localmente, exporta temporalmente la URL apuntando al puerto publicado (modo hibrido) o usa `psql` dentro del contenedor.
