import { obtenerGastos } from "@/lib/gastos";
import ListaMovimientos from "@/components/ListaMovimientos";

export const dynamic = "force-dynamic";

export default async function Movimientos() {
  const gastos = await obtenerGastos();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Movimientos</h1>
      <ListaMovimientos inicial={gastos} />
    </div>
  );
}
