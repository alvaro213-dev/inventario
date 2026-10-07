# Inventario Pro

Aplicación de control de inventario empresarial construida con Next.js App Router, TypeScript, Tailwind CSS, Prisma y PostgreSQL/Neon. Gestiona catálogo, categorías, proveedores, movimientos inmutables, alertas y valorización.

## Arquitectura

- `app/api`: endpoints validados y protegidos en servidor.
- `services`: reglas de negocio; los movimientos ejecutan una transacción serializable y bloqueo de fila.
- `repositories`: consultas de lectura especializadas.
- `validations`: esquemas Zod reutilizables.
- `prisma`: esquema, relaciones, índices y datos de demostración.

El campo de stock se modifica exclusivamente mediante `registerMovement`. Las salidas no pueden dejar stock negativo y los movimientos no tienen endpoint de eliminación.

## Requisitos e instalación

1. Node.js 20 o superior y una base PostgreSQL (por ejemplo Neon).
2. Copia `.env.example` a `.env` y asigna la cadena de Neon:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST/DATABASE?sslmode=require"
```

3. Instala y prepara la base:

```bash
npm install
npm run db:generate
npm run db:migrate -- --name init
npm run db:seed
npm run dev
```

Abre `http://localhost:3000`.

## Roles

Las rutas API verifican el rol en servidor. Administrador gestiona catálogo y datos maestros; Operador registra movimientos; Visualizador sólo consulta. El adaptador demostrativo `lib/auth.ts` centraliza la sesión y debe conectarse a tu proveedor de autenticación antes de producción.

## Despliegue en Vercel

1. Crea una base en Neon y añade `DATABASE_URL` en las variables de entorno del proyecto Vercel.
2. Ejecuta la migración en CI o desde un entorno seguro antes del despliegue.
3. Configura el comando de build como `npm run build`.

Nunca publiques el archivo `.env`; sólo `.env.example` forma parte del repositorio.
