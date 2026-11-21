import { Component, OnInit, inject, signal } from '@angular/core';
import { ApiService } from '../api.service';
import { Publicacion } from '../modelos';
import { mensajeDeError } from '../mensaje-error';

@Component({
  selector: 'app-publicaciones-lista',
  template: `
    <h2>Publicaciones</h2>
    @if (error()) { <p class="error">{{ error() }}</p> }
    @if (cargando()) { <p>Cargando...</p> }
    @for (p of publicaciones(); track p.id) {
      <article class="tarjeta">
        <h3>{{ p.titulo }}</h3>
        <p>{{ p.descripcion }}</p>
        <small>{{ p.categoria }} · {{ p.modalidad }} · Publicado por {{ p.propietario }}</small>
        <span class="estado">{{ p.estado }}</span>
      </article>
    } @empty {
      @if (!cargando() && !error()) { <p>Aún no hay publicaciones.</p> }
    }
  `
})
export class PublicacionesListaComponent implements OnInit {
  private api = inject(ApiService);
  publicaciones = signal<Publicacion[]>([]);
  cargando = signal(true);
  error = signal('');

  ngOnInit() {
    this.api.listarPublicaciones().subscribe({
      next: datos => { this.publicaciones.set(datos); this.cargando.set(false); },
      error: err => { this.error.set(mensajeDeError(err)); this.cargando.set(false); }
    });
  }
}