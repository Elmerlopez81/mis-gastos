-- Ejecutar en el SQL Editor de Supabase

create table if not exists gastos (
  id bigint generated always as identity primary key,
  descripcion text not null,
  monto numeric(10, 2) not null check (monto > 0),
  categoria text not null,
  fecha date not null default current_date,
  created_at timestamptz not null default now()
);

-- App de demostración sin login: se permite leer/escribir con la clave anon.
-- Si algún día se agrega autenticación, hay que cambiar estas políticas.
alter table gastos enable row level security;

create policy "lectura publica" on gastos for select using (true);
create policy "insertar publico" on gastos for insert with check (true);
create policy "borrar publico" on gastos for delete using (true);

-- Datos de ejemplo para que la app no se vea vacía
insert into gastos (descripcion, monto, categoria, fecha) values
  ('Almuerzo en el centro', 4.50, 'Comida', current_date - 1),
  ('Pasaje de bus', 0.35, 'Transporte', current_date - 1),
  ('Recarga de celular', 5.00, 'Servicios', current_date - 3),
  ('Cine con amigos', 7.25, 'Ocio', current_date - 4),
  ('Supermercado', 32.80, 'Comida', current_date - 6),
  ('Libro de programación', 18.00, 'Estudio', current_date - 8);
