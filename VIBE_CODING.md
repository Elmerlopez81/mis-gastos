# Proceso de Vibe Coding

> Este documento debe reflejar tu proceso real. Las secciones traen la estructura y lo que ya se decidió; completa los espacios marcados con **[TU EXPERIENCIA]** con lo que realmente te pasó al ejecutar el proyecto (errores que viste, cómo los arreglaste, qué cambiaste).

**Herramienta de IA usada:** Claude (chat)
**Proyecto:** Mis Gastos, app de control de gastos personales

## 1. Concepción inicial

Tema libre, así que elegí una app de gastos personales porque es un dominio que entiendo bien y encaja con los requisitos: varias vistas (resumen, lista, categorías, formulario), datos que se crean y se borran, y cálculos simples para mostrar en pantalla.

Decisiones tomadas desde el inicio:

- **Supabase** como base de datos, para tener datos reales sin montar un backend propio.
- **Route Handlers** para las operaciones de crear, listar y borrar, así el navegador nunca habla directo con la base.
- **Tailwind CSS** para los estilos.
- Moneda en **dólares (USD)** y textos en español.

## 2. Prompts principales

Prompt inicial (resumido): pegué el enunciado completo de la actividad y pedí ayuda para construir la app. La IA me preguntó la temática y cómo quería manejar los datos, y respondí: **gastos personales** y **Supabase**.

Otros prompts que usé (ajusta o reemplaza por los tuyos reales):

1. "Genera la estructura de carpetas para Next.js 16 con App Router y TypeScript: 4 rutas, componentes y una carpeta lib."
2. "Crea los Route Handlers para listar, crear y borrar gastos con Supabase, validando los datos que llegan."
3. "Haz el formulario de nuevo gasto como Client Component con useState y manejo de errores."
4. "Agrega loading.tsx y error.tsx."
5. **[TU EXPERIENCIA]** Prompts que escribiste mientras probabas (por ejemplo, para corregir un error o cambiar el diseño).

## 3. Iteraciones

| # | Qué se pidió | Resultado | Qué ajusté |
|---|--------------|-----------|------------|
| 1 | Estructura base y rutas | Proyecto con 4 páginas | **[TU EXPERIENCIA]** |
| 2 | API con Route Handlers + Supabase | GET, POST y DELETE | **[TU EXPERIENCIA]** |
| 3 | Formulario y lista con filtros | Componentes cliente | **[TU EXPERIENCIA]** |
| 4 | Loading y error UI | `loading.tsx`, `error.tsx` | **[TU EXPERIENCIA]** |
| 5 | Diseño responsive | Menú que se colapsa en móvil | **[TU EXPERIENCIA]** |

## 4. Decisiones técnicas

- **Server Components** para las páginas que solo muestran datos (resumen, categorías, movimientos): se consulta Supabase en el servidor y llega el HTML ya armado.
- **Client Components** solo donde hace falta interactividad: `Navbar` (menú móvil), `FormGasto` (formulario) y `ListaMovimientos` (búsqueda, filtro y borrado).
- **`useState`** para campos del formulario, filtros, mensajes de error y estados de "guardando/borrando".
- **`useEffect`** para poner la fecha de hoy en el formulario (evita diferencias entre servidor y navegador) y para cerrar el menú móvil al cambiar de página.
- **`force-dynamic`** en las páginas con datos, para que siempre muestren lo último guardado.
- **Validación en el servidor** dentro del Route Handler, aunque el formulario ya valida, porque la API se puede llamar sin pasar por el formulario.
- **Sin autenticación**: se dejó fuera para mantener el alcance de la actividad; queda anotado en el README.
- Variables de entorno en `.env.local`, con `.env.example` documentado.

## 5. Desafíos y cómo se resolvieron

Completa con lo que realmente te pasó. Algunos puntos donde es común tropezar, para que los revises al probar:

- Configurar las políticas (RLS) de Supabase: si la tabla devuelve vacío o da error de permisos, revisar que se ejecutó `schema.sql` completo.
- Variables de entorno en Vercel: hay que agregarlas también ahí, no solo en `.env.local`.
- Diferencias entre fecha del servidor y del navegador (zona horaria).

**[TU EXPERIENCIA]** Describe cada problema real, cómo se lo planteaste a la IA y qué solución funcionó.

## 6. Validación del código generado

Qué revisé antes de aceptar el código (anota lo que hiciste tú):

- [ ] Que compile sin errores con `npm run build`
- [ ] Que las 4 rutas abran y el menú funcione en móvil
- [ ] Que crear y borrar un gasto se refleje en Supabase
- [ ] Que el loading y el error se vean (por ejemplo, quitando una variable de entorno)
- [ ] Que no haya claves subidas al repositorio

## 7. Optimización final

**[TU EXPERIENCIA]** Qué mejoraste al final (textos, estilos, validaciones, rendimiento).
