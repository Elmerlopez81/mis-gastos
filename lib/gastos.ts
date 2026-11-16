import { getSupabase } from "./supabase";
import type { Gasto } from "./tipos";

// Solo se usa desde Server Components y Route Handlers
export async function obtenerGastos(): Promise<Gasto[]> {
  const { data, error } = await getSupabase()
    .from("gastos")
    .select("id, descripcion, monto, categoria, fecha")
    .order("fecha", { ascending: false })
    .order("id", { ascending: false });

  if (error) throw new Error(error.message);

  return (data ?? []).map((g) => ({ ...g, monto: Number(g.monto) }));
}

export function totalPorCategoria(gastos: Gasto[]) {
  const mapa = new Map<string, number>();
  for (const g of gastos) {
    mapa.set(g.categoria, (mapa.get(g.categoria) ?? 0) + g.monto);
  }
  return [...mapa.entries()]
    .map(([categoria, total]) => ({ categoria, total }))
    .sort((a, b) => b.total - a.total);
}
