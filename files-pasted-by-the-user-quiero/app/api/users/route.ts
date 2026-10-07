import { Role } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { requireRole, sessionFromRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { userSchema } from "@/validations";

export async function GET(request: NextRequest) {
  try {
    requireRole(sessionFromRequest(request), [Role.ADMINISTRADOR]);
    return NextResponse.json(await prisma.user.findMany({ orderBy: { name: "asc" } }));
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "No autorizado" }, { status: 403 });
  }
}

export async function POST(request: NextRequest) {
  try {
    requireRole(sessionFromRequest(request), [Role.ADMINISTRADOR]);
    const user = await prisma.user.create({ data: userSchema.parse(await request.json()) });
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "No se pudo crear el usuario" }, { status: 400 });
  }
}
