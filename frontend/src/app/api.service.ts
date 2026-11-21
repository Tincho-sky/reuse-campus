import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Publicacion, Usuario } from './modelos';

const API = 'http://localhost:3000/api';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);

  listarPublicaciones(): Observable<Publicacion[]> {
    return this.http.get<Publicacion[]>(`${API}/publicaciones`);
  }

  crearPublicacion(datos: {
    titulo: string; descripcion: string; categoria: string;
    modalidad: string; usuarioId: number;
  }): Observable<Publicacion> {
    return this.http.post<Publicacion>(`${API}/publicaciones`, datos);
  }

  registrar(datos: { nombre: string; correo: string; password: string }): Observable<Usuario> {
    return this.http.post<Usuario>(`${API}/usuarios/registro`, datos);
  }
}