import { Role } from "@prisma/client";
import { NextRequest } from "next/server";
export type Session = { id: string; role: Role; name: string };
export function sessionFromRequest(request: NextRequest): Session { const role = request.headers.get("x-demo-role") as Role | null; return { id: request.headers.get("x-user-id") || "seed-admin", role: role || Role.ADMINISTRADOR, name: "Administrador" }; }
export function requireRole(session: Session, allowed: Role[]) { if (!allowed.includes(session.role)) throw new Error("No tienes permisos para esta acción."); }
