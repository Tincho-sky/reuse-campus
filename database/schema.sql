-- USUARIO
create table usuario (
  id bigint generated always as identity primary key,
  nombre text not null,
  correo text not null unique,
  password text not null,
  rol text not null default 'USUARIO' check (rol in ('USUARIO','ADMINISTRADOR')),
  estado text not null default 'ACTIVO' check (estado in ('ACTIVO','INACTIVO'))
);

-- PUBLICACION
create table publicacion (
  id bigint generated always as identity primary key,
  titulo text not null,
  descripcion text not null,
  categoria text not null,
  modalidad text not null check (modalidad in ('DONACION','INTERCAMBIO')),
  estado text not null default 'DISPONIBLE'
    check (estado in ('DISPONIBLE','RESERVADA','ENTREGADA','CANCELADA')),
  fecha_publicacion timestamptz not null default now(),
  usuario_id bigint not null references usuario(id)
);

-- SOLICITUD
create table solicitud (
  id bigint generated always as identity primary key,
  publicacion_id bigint not null references publicacion(id),
  solicitante_id bigint not null references usuario(id),
  mensaje text,
  fecha_solicitud timestamptz not null default now(),
  estado text not null default 'PENDIENTE'
    check (estado in ('PENDIENTE','ACEPTADA','RECHAZADA','CANCELADA'))
);

-- ENTREGA / INTERCAMBIO
create table entrega (
  id bigint generated always as identity primary key,
  publicacion_id bigint not null references publicacion(id),
  solicitud_id bigint not null references solicitud(id),
  propietario_id bigint not null references usuario(id),
  receptor_id bigint not null references usuario(id),
  fecha_acuerdo timestamptz not null default now(),
  fecha_entrega timestamptz,
  estado text not null default 'PENDIENTE' check (estado in ('PENDIENTE','COMPLETADA'))
);

-- Apoya RN05 y RN08: a nivel de base de datos
create unique index una_pendiente_por_usuario
  on solicitud (publicacion_id, solicitante_id) where estado = 'PENDIENTE';
create unique index una_aceptada_por_publicacion
  on solicitud (publicacion_id) where estado = 'ACEPTADA';