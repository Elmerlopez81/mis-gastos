import { obtenerGastos, totalPorCategoria } from "@/lib/gastos";
import { dinero } from "@/lib/formato";

export const dynamic = "force-dynamic";

export default async function Categorias() {
  const gastos = await obtenerGastos();
  const porCategoria = totalPorCategoria(gastos);
  const totalGeneral = gastos.reduce((suma, g) => suma + g.monto, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Gastos por categoría</h1>
        <p className="text-sm text-black/60">Total acumulado: {dinero(totalGeneral)}</p>
      </div>

      {porCategoria.length === 0 ? (
        <p className="rounded bg-white p-4 text-sm">Aún no hay datos para mostrar.</p>
      ) : (
        <ul className="space-y-3">
          {porCategoria.map((c) => {
            const porcentaje = totalGeneral > 0 ? (c.total / totalGeneral) * 100 : 0;
            return (
              <li key={c.categoria} className="rounded bg-white p-4">
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-medium">{c.categoria}</span>
                  <span>
                    {dinero(c.total)} · {porcentaje.toFixed(0)}%
                  </span>
                </div>
                <div className="h-2 rounded bg-black/10">
                  <div
                    className="h-2 rounded bg-[var(--verde)]"
                    style={{ width: `${porcentaje}%` }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
