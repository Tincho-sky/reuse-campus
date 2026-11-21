import { HttpErrorResponse } from '@angular/common/http';

export function mensajeDeError(err: HttpErrorResponse): string {
  if (err.status === 0) {
    return 'No se pudo conectar con el servidor. Revisa que la API esté encendida.';
  }
  return err.error?.error ?? 'Ocurrió un error inesperado.';
}