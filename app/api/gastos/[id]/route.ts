import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const numero = Number(id);

  if (!Number.isInteger(numero)) {
    return NextResponse.json({ error: "ID no válido." }, { status: 400 });
  }

  const { error } = await getSupabase().from("gastos").delete().eq("id", numero);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
