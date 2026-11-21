export interface Usuario {
  id: number;
  nombre: string;
  correo: string;
  rol: string;
  estado: string;
}

export interface Publicacion {
  id: number;
  titulo: string;
  descripcion: string;
  categoria: string;
  modalidad: 'DONACION' | 'INTERCAMBIO';
  estado: string;
  fecha_publicacion: string;
  usuario_id: number;
  propietario: string;
}