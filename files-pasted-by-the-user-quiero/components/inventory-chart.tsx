"use client";
import { useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type Row = { name: string; stock: number; value: number };
export function InventoryChart({ categories }: { categories: Row[] }) {
  const [metric, setMetric] = useState<"stock" | "value">("stock");
  const data = useMemo(() => [...categories].sort((a, b) => b[metric] - a[metric]), [categories, metric]);
  const formatter = (value: number) => metric === "value" ? `$${value.toLocaleString("es-CL")}` : `${value} uds.`;
  return <section className="card mb-6 p-5"><div className="mb-5 flex flex-wrap items-start justify-between gap-3"><div><h2 className="font-semibold">Inventario por categoría</h2><p className="muted">Datos actualizados según el stock registrado.</p></div><select value={metric} onChange={event => setMetric(event.target.value as "stock" | "value")} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"><option value="stock">Unidades disponibles</option><option value="value">Valor en inventario</option></select></div><div className="h-72"><ResponsiveContainer width="100%" height="100%"><BarChart data={data} margin={{ top: 8, right: 8, left: -12, bottom: 8 }}><CartesianGrid strokeDasharray="3 3" vertical={false}/><XAxis dataKey="name" tick={{ fontSize: 11 }} interval={0} angle={-20} textAnchor="end" height={55}/><YAxis tick={{ fontSize: 11 }}/><Tooltip formatter={(value: number) => formatter(value)}/><Bar dataKey={metric} name={metric === "stock" ? "Unidades" : "Valor"} fill="#2563eb" radius={[6, 6, 0, 0]}/></BarChart></ResponsiveContainer></div></section>;
}
