# Mis Gastos

App web para llevar el control de gastos personales. Hecha con Next.js 16 (App Router), TypeScript, Tailwind CSS y Supabase, usando IA como copiloto de desarrollo (ver [VIBE_CODING.md](./VIBE_CODING.md)).

**Despliegue:** https://TU-PROYECTO.vercel.app  <!-- cambiar por el enlace real -->

## Qué hace

- **Resumen (`/`)**: total del mes, número de movimientos, categoría donde más se gasta y los últimos 5 gastos.
- **Movimientos (`/movimientos`)**: lista completa con búsqueda, filtro por categoría y opción de borrar.
- **Categorías (`/categorias`)**: cuánto se ha gastado en cada categoría, con porcentajes.
- **Agregar (`/nuevo`)**: formulario para registrar un gasto nuevo.

## Tecnologías

- Next.js 16 con App Router y TypeScript
- Tailwind CSS 4
- Supabase (PostgreSQL) para guardar los datos
- Route Handlers (`/api/gastos`) para crear, listar y borrar
- Desplegado en Vercel

## Instalación

Requisitos: Node.js 20 o superior y una cuenta gratuita de Supabase.

1. Clonar el repositorio e instalar dependencias:

   ```bash
   git clone https://github.com/TU-USUARIO/mis-gastos.git
   cd mis-gastos
   npm install
   ```

2. Crear un proyecto en Supabase y, en el **SQL Editor**, ejecutar el contenido de `supabase/schema.sql` (crea la tabla `gastos` y agrega unos datos de ejemplo).

3. Copiar las variables de entorno:

   ```bash
   cp .env.example .env.local
   ```

   y completar `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY` con los datos de *Project Settings > API*.

4. Levantar el proyecto:

   ```bash
   npm run dev
   ```

   Abrir http://localhost:3000.

## Despliegue en Vercel

1. Subir el repositorio a GitHub.
2. En Vercel, importar el repositorio.
3. Agregar las dos variables de entorno de `.env.example` en *Settings > Environment Variables*.
4. Desplegar.

## Estructura

```
app/
  page.tsx            resumen (Server Component)
  movimientos/        lista de gastos
  categorias/         totales por categoría
  nuevo/              formulario
  api/gastos/         Route Handlers (GET, POST, DELETE)
  loading.tsx         pantalla de carga
  error.tsx           pantalla de error
components/           Navbar, FormGasto, ListaMovimientos (Client Components)
lib/                  conexión a Supabase, tipos y utilidades
supabase/schema.sql   tabla y políticas
```

## Nota sobre seguridad

La app no tiene login: las políticas de Supabase permiten leer, insertar y borrar con la clave pública. Está pensada como proyecto de práctica. Para uso real habría que agregar autenticación y restringir las políticas por usuario.
