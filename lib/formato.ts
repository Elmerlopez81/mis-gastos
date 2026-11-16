export function dinero(valor: number) {
  return new Intl.NumberFormat("es-SV", {
    style: "currency",
    currency: "USD",
  }).format(valor);
}

export function fechaCorta(fecha: string) {
  // se agrega la hora para que la zona horaria no mueva el día
  const d = new Date(`${fecha}T12:00:00`);
  return d.toLocaleDateString("es-SV", { day: "2-digit", month: "short" });
}
