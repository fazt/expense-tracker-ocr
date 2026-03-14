# PRD — Expense Tracker OCR

**Versión:** 1.0
**Fecha:** 2026-03-13
**Estado:** En desarrollo

---

## 1. Resumen ejecutivo

Expense Tracker OCR es una aplicación web que permite a usuarios registrar, organizar y analizar sus gastos personales. Su diferenciador principal es la integración con OpenAI GPT-4o para extraer datos automáticamente desde fotos de recibos (OCR), eliminando la entrada manual de datos. La aplicación está orientada a usuarios individuales que quieren control financiero sin fricción.

---

## 2. Problema

El registro manual de gastos es tedioso y genera abandono temprano. Los usuarios fotografían recibos pero nunca los procesan. Las apps existentes requieren demasiada entrada de datos para ser usadas de forma consistente.

---

## 3. Objetivo

Reducir el tiempo de registro de un gasto a menos de 10 segundos mediante OCR automático, manteniendo la capacidad de análisis completo con gráficos, presupuestos y exportación.

---

## 4. Usuarios objetivo

| Perfil | Descripción |
|--------|-------------|
| Usuario personal | Profesional o estudiante que quiere controlar sus finanzas personales |
| Administrador | Usuario con acceso a gestión de todos los usuarios de la plataforma |

---

## 5. Stack tecnológico

| Capa | Tecnología |
|------|------------|
| Frontend | Next.js 16 (App Router), React 19, Tailwind CSS v4 |
| Backend | Next.js API Routes (server-side) |
| Base de datos | PostgreSQL via Prisma ORM v6 |
| Autenticación | NextAuth v5 (beta) — JWT strategy |
| OCR / IA | OpenAI GPT-4o-mini (visión + categorización) |
| Almacenamiento de imágenes | Cloudinary |
| Gráficos | Recharts v3 |
| Deploy local | Docker Compose |

---

## 6. Modelo de datos

### User
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | String (cuid) | Identificador único |
| email | String (unique) | Email de login |
| password | String | Hash bcrypt |
| name | String | Nombre del usuario |
| createdAt | DateTime | Fecha de registro |

### Category
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | String (cuid) | Identificador único |
| name | String (unique) | Nombre de la categoría |
| icon | String | Icono (tag por defecto) |
| color | String | Color hex (#6366f1 por defecto) |

### Expense
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | String (cuid) | Identificador único |
| amount | Float | Monto del gasto |
| description | String | Descripción del gasto |
| date | DateTime | Fecha del gasto |
| receipt | String? | URL de imagen en Cloudinary |
| ocrText | String? | Texto completo extraído por OCR |
| userId | String | FK → User |
| categoryId | String | FK → Category |

### Budget
| Campo | Tipo | Restricción |
|-------|------|-------------|
| id | String (cuid) | Identificador único |
| amount | Float | Límite mensual |
| month | Int | Mes (1–12) |
| year | Int | Año |
| userId | String | FK → User |
| categoryId | String | FK → Category |
| — | — | Unique: (userId, categoryId, month, year) |

---

## 7. Módulos y funcionalidades

### 7.1 Autenticación
- Registro con nombre, email y contraseña (hash bcrypt)
- Login con credenciales — sesión JWT via NextAuth v5
- Protección de rutas: todas las rutas `/dashboard/*` y `/api/*` requieren sesión válida
- Páginas: `/login`, `/register`

### 7.2 Dashboard
- Resumen mensual: total del mes, comparativa vs mes anterior (% de variación), número de transacciones, categorías activas, promedio por gasto, mayor gasto del mes
- Selector de mes/año con navegación ← →
- Alertas de presupuesto inline (excedido / en alerta)
- Panel de tendencias con gráfica de área (gasto acumulado del mes)
- Pestañas de análisis:
  - **Diario**: área acumulada + barras por día
  - **Semanal**: barras agrupadas por semana
  - **Categorías**: donut chart + barras horizontales con % por categoría
  - **Transacciones**: listado de gastos del mes (o todos los meses si no hay datos en el mes seleccionado)

### 7.3 Escanear recibo (OCR)
- Upload de imagen (cámara o archivo)
- Preview de la imagen seleccionada
- Llamada a `POST /api/ocr`:
  - Sube imagen a Cloudinary (si está configurado)
  - Envía imagen en base64 a GPT-4o-mini (visión, `detail: "high"`)
  - Extrae: monto, descripción, categoría sugerida, fecha del recibo, texto completo OCR
- Formulario pre-rellenado con los datos extraídos (editable por el usuario)
- Botón "Guardar gasto" que registra el gasto con la imagen asociada

### 7.4 Gastos
- Listado paginado de gastos del usuario con filtros por categoría y mes
- Crear gasto manualmente (monto, descripción, categoría, fecha)
- Editar gasto existente
- Eliminar gasto con confirmación
- Visualización de imagen del recibo si está disponible

### 7.5 Presupuestos
- Crear presupuesto mensual por categoría (monto límite + mes + año)
- Ver estado de cada presupuesto: gastado / límite / porcentaje
- Barra de progreso visual con colores (verde/amarillo/rojo según % usado)
- Alertas automáticas en dashboard cuando se supera el 80% o el 100%
- Editar y eliminar presupuestos existentes

### 7.6 Categorías
- Listado de categorías globales (compartidas entre todos los usuarios)
- Crear categoría con nombre, icono y color personalizado
- Editar y eliminar categorías (con validación si tiene gastos asociados)
- Las categorías creadas están disponibles para el OCR

### 7.7 Exportar
- Exportar gastos a CSV con filtro por rango de fechas
- Descarga directa del archivo generado en el servidor

### 7.8 Administración de Usuarios
- Listado de todos los usuarios registrados con conteo de gastos
- Tarjetas de resumen: total usuarios, total gastos globales, promedio de gastos por usuario
- Editar nombre y email de cualquier usuario
- Eliminar usuario (con eliminación en cascada de sus gastos y presupuestos)
- Protección: el usuario actual no puede eliminarse a sí mismo ("Tú" badge visible)

---

## 8. API Routes

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/auth/register` | Registro de nuevo usuario |
| GET/POST | `/api/expenses` | Listar / crear gastos |
| PUT/DELETE | `/api/expenses/[id]` | Editar / eliminar gasto |
| GET | `/api/expenses/stats` | Estadísticas por mes (dashboard) |
| GET | `/api/expenses/export` | Exportar CSV |
| POST | `/api/ocr` | OCR de recibo con OpenAI Vision |
| POST | `/api/categorize` | Categorización automática por descripción |
| GET/POST | `/api/categories` | Listar / crear categorías |
| PUT/DELETE | `/api/categories/[id]` | Editar / eliminar categoría |
| GET/POST | `/api/budgets` | Listar / crear presupuestos |
| GET | `/api/users` | Listar usuarios (admin) |
| PUT/DELETE | `/api/users/[id]` | Editar / eliminar usuario (admin) |

Todas las rutas requieren sesión JWT válida (`getSession()`).

---

## 9. Variables de entorno requeridas

| Variable | Requerida | Descripción |
|----------|-----------|-------------|
| `DATABASE_URL` | Sí | PostgreSQL connection string |
| `NEXTAUTH_SECRET` | Sí | Secret para JWT de NextAuth |
| `NEXTAUTH_URL` | Sí | URL base de la app |
| `OPENAI_API_KEY` | Sí | API key de OpenAI (OCR + categorización) |
| `CLOUDINARY_CLOUD_NAME` | Opcional | Cloud name de Cloudinary (sin esto, no guarda imagen) |
| `CLOUDINARY_API_KEY` | Opcional | API key de Cloudinary |
| `CLOUDINARY_API_SECRET` | Opcional | API secret de Cloudinary |

---

## 10. Flujos de usuario principales

### Flujo A — Registro de gasto por OCR (flujo principal)
1. Usuario navega a **Escanear**
2. Sube foto del recibo
3. La app llama a OpenAI Vision → extrae monto, descripción, categoría y fecha
4. Usuario revisa y ajusta los campos pre-rellenados
5. Presiona "Guardar" → gasto registrado con imagen en Cloudinary

### Flujo B — Registro manual
1. Usuario navega a **Gastos** → "Nuevo gasto"
2. Llena monto, descripción, categoría y fecha
3. Guarda → gasto registrado

### Flujo C — Control de presupuesto
1. Usuario crea presupuesto mensual por categoría en **Presupuestos**
2. Conforme registra gastos, el dashboard muestra alertas automáticas
3. Al superar el 80% aparece alerta amarilla; al superar el 100%, roja

### Flujo D — Análisis mensual
1. Usuario entra al **Dashboard**
2. Navega entre meses con ← →
3. Revisa resumen, gráficos por día/semana/categoría y lista de transacciones

---

## 11. Criterios de aceptación clave

- [ ] Un usuario puede registrar un gasto desde una foto en menos de 15 segundos
- [ ] El OCR extrae correctamente monto y descripción en al menos el 80% de los tickets legibles
- [ ] Los presupuestos generan alertas visibles antes de ser excedidos
- [ ] El CSV exportado contiene todos los gastos del rango seleccionado con categoría y fecha
- [ ] Un administrador puede eliminar un usuario y todos sus datos se eliminan en cascada
- [ ] La app funciona en dark mode y responsive mobile

---

## 12. Pendientes / mejoras futuras

- [ ] Roles de usuario (admin vs usuario regular) con control de acceso granular
- [ ] Notificaciones por email al acercarse al límite de presupuesto
- [ ] Metas de ahorro mensuales
- [ ] Importación de extractos bancarios (CSV/OFX)
- [ ] App móvil (React Native o PWA)
- [ ] Soporte multi-moneda
- [ ] Gráficos de tendencias año a año
- [ ] Integración con más modelos de OCR para mejorar precisión
