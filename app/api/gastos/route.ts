import { NextResponse } from "next/server";
import { obtenerGastos } from "@/lib/gastos";
import { getSupabase } from "@/lib/supabase";
import { CATEGORIAS } from "@/lib/tipos";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const gastos = await obtenerGastos();
    return NextResponse.json(gastos);
  } catch (e) {
    const mensaje = e instanceof Error ? e.message : "Error desconocido";
    return NextResponse.json({ error: mensaje }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  const descripcion = String(body?.descripcion ?? "").trim();
  const monto = Number(body?.monto);
  const categoria = String(body?.categoria ?? "");
  const fecha = String(body?.fecha ?? "");

  if (!descripcion || descripcion.length > 80) {
    return NextResponse.json(
      { error: "La descripción es obligatoria (máximo 80 caracteres)." },
      { status: 400 }
    );
  }
  if (!Number.isFinite(monto) || monto <= 0) {
    return NextResponse.json(
      { error: "El monto debe ser un número mayor a 0." },
      { status: 400 }
    );
  }
  if (!(CATEGORIAS as readonly string[]).includes(categoria)) {
    return NextResponse.json({ error: "Categoría no válida." }, { status: 400 });
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
    return NextResponse.json({ error: "Fecha no válida." }, { status: 400 });
  }

  const { data, error } = await getSupabase()
    .from("gastos")
    .insert({ descripcion, monto, categoria, fecha })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
