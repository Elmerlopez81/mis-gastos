import FormGasto from "@/components/FormGasto";

export default function Nuevo() {
  return (
    <div className="mx-auto max-w-md space-y-6">
      <h1 className="text-2xl font-bold">Agregar gasto</h1>
      <FormGasto />
    </div>
  );
}
