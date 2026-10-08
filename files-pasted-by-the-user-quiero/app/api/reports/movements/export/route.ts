import { prisma } from "@/lib/prisma";

function csvValue(value: string | number | null | undefined) {
  const text = String(value ?? "");
  return `"${text.replace(/"/g, '""')}"`;
}

export async function GET() {
  const movements = await prisma.inventoryMovement.findMany({
    include: {
      user: true,
      product: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const headers = [
    "Fecha",
    "Usuario",
    "Correo",
    "Producto",
    "SKU",
    "Tipo",
    "Cantidad",
    "Stock anterior",
    "Stock resultante",
    "Motivo",
  ];

  const rows = movements.map((movement) =>
    [
      movement.createdAt.toLocaleDateString("es-CL"),
      movement.user.name,
      movement.user.email,
      movement.product.name,
      movement.product.sku,
      movement.type,
      movement.quantity,
      movement.previousStock,
      movement.resultingStock,
      movement.reason,
    ]
      .map(csvValue)
      .join(";")
  );

  const csv = "\uFEFF" + [headers.join(";"), ...rows].join("\n");

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition":
        'attachment; filename="informe-movimientos.csv"',
    },
  });
}