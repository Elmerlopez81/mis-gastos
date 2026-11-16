export type Gasto = {
  id: number;
  descripcion: string;
  monto: number;
  categoria: string;
  fecha: string; // formato YYYY-MM-DD
};

export const CATEGORIAS = [
  "Comida",
  "Transporte",
  "Servicios",
  "Ocio",
  "Estudio",
  "Salud",
  "Otros",
] as const;
