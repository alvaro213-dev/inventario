"use client";

import { useRouter } from "next/navigation";

export function ProductActions({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  const router = useRouter();

  async function deactivateProduct() {
    const confirmed = window.confirm(
      `¿Deseas desactivar el producto "${name}"?`
    );

    if (!confirmed) return;

    const response = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      alert("No se pudo desactivar el producto.");
      return;
    }

    router.refresh();
  }

  return (
    <button
      onClick={deactivateProduct}
      className="rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-100"
    >
      Desactivar
    </button>
  );
}