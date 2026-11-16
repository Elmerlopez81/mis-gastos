"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CATEGORIAS } from "@/lib/tipos";

export default function FormGasto() {
  const router = useRouter();
  const [descripcion, setDescripcion] = useState("");
  const [monto, setMonto] = useState("");
  const [categoria, setCategoria] = useState<string>(CATEGORIAS[0]);
  const [fecha, setFecha] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState("");

  // la fecha de hoy se pone aquí y no en el useState inicial
  // para no tener diferencias entre servidor y navegador
  useEffect(() => {
    setFecha(new Date().toLocaleDateString("en-CA")); // da formato YYYY-MM-DD
  }, []);

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setEnviando(true);

    try {
      const res = await fetch("/api/gastos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ descripcion, monto: Number(monto), categoria, fecha }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "No se pudo guardar el gasto");
      }

      router.push("/movimientos");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al guardar");
      setEnviando(false);
    }
  }

  const campo = "w-full rounded border border-black/20 bg-white px-3 py-2 text-sm";

  return (
    <form onSubmit={enviar} className="space-y-4">
      <label className="block text-sm">
        Descripción
        <input
          required
          maxLength={80}
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className={`${campo} mt-1`}
          placeholder="Ej: Almuerzo"
        />
      </label>

      <label className="block text-sm">
        Monto (USD)
        <input
          required
          type="number"
          step="0.01"
          min="0.01"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
          className={`${campo} mt-1`}
          placeholder="0.00"
        />
      </label>

      <label className="block text-sm">
        Categoría
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className={`${campo} mt-1`}
        >
          {CATEGORIAS.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>

      <label className="block text-sm">
        Fecha
        <input
          required
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          className={`${campo} mt-1`}
        />
      </label>

      {error && <p className="rounded bg-red-50 p-3 text-sm text-red-700">{error}</p>}

      <button
        type="submit"
        disabled={enviando}
        className="w-full rounded bg-[var(--verde)] py-2 text-white hover:opacity-90 disabled:opacity-50"
      >
        {enviando ? "Guardando..." : "Guardar gasto"}
      </button>
    </form>
  );
}
