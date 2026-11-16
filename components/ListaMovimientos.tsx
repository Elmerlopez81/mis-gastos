"use client";

import { useState } from "react";
import { CATEGORIAS, type Gasto } from "@/lib/tipos";
import { dinero, fechaCorta } from "@/lib/formato";

export default function ListaMovimientos({ inicial }: { inicial: Gasto[] }) {
  const [gastos, setGastos] = useState(inicial);
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("todas");
  const [error, setError] = useState("");
  const [borrando, setBorrando] = useState<number | null>(null);

  const visibles = gastos.filter((g) => {
    const coincideTexto = g.descripcion.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCat = categoria === "todas" || g.categoria === categoria;
    return coincideTexto && coincideCat;
  });

  const total = visibles.reduce((suma, g) => suma + g.monto, 0);

  async function borrar(id: number) {
    if (!confirm("¿Seguro que quieres borrar este gasto?")) return;

    setError("");
    setBorrando(id);
    try {
      const res = await fetch(`/api/gastos/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "No se pudo borrar el gasto");
      }
      setGastos((actuales) => actuales.filter((g) => g.id !== id));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al borrar");
    } finally {
      setBorrando(null);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="search"
          placeholder="Buscar por descripción..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="flex-1 rounded border border-black/20 bg-white px-3 py-2 text-sm"
        />
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="rounded border border-black/20 bg-white px-3 py-2 text-sm"
        >
          <option value="todas">Todas las categorías</option>
          {CATEGORIAS.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {error && <p className="rounded bg-red-50 p-3 text-sm text-red-700">{error}</p>}

      <p className="text-sm text-black/60">
        {visibles.length} resultado(s) · Total {dinero(total)}
      </p>

      {visibles.length === 0 ? (
        <p className="rounded bg-white p-4 text-sm">No hay gastos que coincidan.</p>
      ) : (
        <ul className="divide-y divide-black/10 rounded bg-white">
          {visibles.map((g) => (
            <li key={g.id} className="flex items-center justify-between gap-3 p-3">
              <div className="min-w-0">
                <p className="truncate font-medium">{g.descripcion}</p>
                <p className="text-xs text-black/60">
                  {g.categoria} · {fechaCorta(g.fecha)}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-semibold">{dinero(g.monto)}</span>
                <button
                  onClick={() => borrar(g.id)}
                  disabled={borrando === g.id}
                  className="text-xs text-red-700 underline disabled:opacity-50"
                >
                  {borrando === g.id ? "..." : "Borrar"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
