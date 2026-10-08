"use client";

import { useRouter } from "next/navigation";

export function ProductActions({
  id,
  name,
  status,
}: {
  id: string;
  name: string;
  status: string;
}) {
  const router = useRouter();

  async function changeStatus() {
    const nextStatus = status === "ACTIVO" ? "INACTIVO" : "ACTIVO";

    const confirmed = window.confirm(
      `¿Deseas ${nextStatus === "ACTIVO" ? "reactivar" : "desactivar"} el producto "${name}"?`
    );

    if (!confirmed) return;

    const response = await fetch(`/api/products/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: nextStatus,
      }),
    });

    if (!response.ok) {
      alert("No se pudo actualizar el producto.");
      return;
    }

    router.refresh();
  }

  const isActive = status === "ACTIVO";

  return (
    <button
      onClick={changeStatus}
      className={
        isActive
          ? "rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-100"
          : "rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 hover:bg-emerald-100"
      }
    >
      {isActive ? "Desactivar" : "Reactivar"}
    </button>
  );
}