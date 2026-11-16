import Link from "next/link";
import { obtenerGastos, totalPorCategoria } from "@/lib/gastos";
import { dinero, fechaCorta } from "@/lib/formato";

export const dynamic = "force-dynamic";

export default async function Inicio() {
  const gastos = await obtenerGastos();

  const hoy = new Date();
  const prefijoMes = `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, "0")}`;
  const delMes = gastos.filter((g) => g.fecha.startsWith(prefijoMes));
  const totalMes = delMes.reduce((suma, g) => suma + g.monto, 0);
  const top = totalPorCategoria(delMes)[0];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Resumen del mes</h1>
        <p className="text-sm text-black/60">
          Lo que has gastado en {hoy.toLocaleDateString("es-SV", { month: "long", year: "numeric" })}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Tarjeta titulo="Total gastado" valor={dinero(totalMes)} />
        <Tarjeta titulo="Movimientos" valor={String(delMes.length)} />
        <Tarjeta
          titulo="Categoría top"
          valor={top ? `${top.categoria} (${dinero(top.total)})` : "—"}
        />
      </div>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Últimos gastos</h2>
          <Link href="/movimientos" className="text-sm text-[var(--verde)] underline">
            Ver todos
          </Link>
        </div>

        {gastos.length === 0 ? (
          <p className="rounded bg-white p-4 text-sm">
            Todavía no hay gastos.{" "}
            <Link href="/nuevo" className="underline">
              Agrega el primero
            </Link>
            .
          </p>
        ) : (
          <ul className="divide-y divide-black/10 rounded bg-white">
            {gastos.slice(0, 5).map((g) => (
              <li key={g.id} className="flex items-center justify-between p-3">
                <div>
                  <p className="font-medium">{g.descripcion}</p>
                  <p className="text-xs text-black/60">
                    {g.categoria} · {fechaCorta(g.fecha)}
                  </p>
                </div>
                <span className="font-semibold">{dinero(g.monto)}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function Tarjeta({ titulo, valor }: { titulo: string; valor: string }) {
  return (
    <div className="rounded bg-white p-4 shadow-sm">
      <p className="text-xs uppercase tracking-wide text-black/50">{titulo}</p>
      <p className="mt-1 text-xl font-bold text-[var(--verde)]">{valor}</p>
    </div>
  );
}
