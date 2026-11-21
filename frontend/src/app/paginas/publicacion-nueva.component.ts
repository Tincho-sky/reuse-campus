import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { mensajeDeError } from '../mensaje-error';

@Component({
  selector: 'app-publicacion-nueva',
  imports: [FormsModule],
  template: `
    <h2>Nueva publicación</h2>
    <form #f="ngForm" (ngSubmit)="enviar()">
      <label>Título
        <input name="titulo" [(ngModel)]="titulo" required>
      </label>
      <label>Descripción
        <textarea name="descripcion" [(ngModel)]="descripcion" required></textarea>
      </label>
      <label>Categoría
        <input name="categoria" [(ngModel)]="categoria" required>
      </label>
      <label>Modalidad
        <select name="modalidad" [(ngModel)]="modalidad" required>
          <option value="DONACION">Donación</option>
          <option value="INTERCAMBIO">Intercambio</option>
        </select>
      </label>
      <label>ID de usuario (temporal, hasta que exista el login)
        <input name="usuarioId" type="number" [(ngModel)]="usuarioId" required>
      </label>
      <button type="submit" [disabled]="f.invalid">Publicar</button>
    </form>
    @if (error()) { <p class="error">{{ error() }}</p> }
  `
})
export class PublicacionNuevaComponent {
  private api = inject(ApiService);
  private router = inject(Router);
  titulo = '';
  descripcion = '';
  categoria = '';
  modalidad = 'DONACION';
  usuarioId: number | null = null;
  error = signal('');

  enviar() {
    this.error.set('');
    this.api.crearPublicacion({
      titulo: this.titulo,
      descripcion: this.descripcion,
      categoria: this.categoria,
      modalidad: this.modalidad,
      usuarioId: Number(this.usuarioId)
    }).subscribe({
      next: () => this.router.navigate(['/publicaciones']),
      error: err => this.error.set(mensajeDeError(err))
    });
  }
}