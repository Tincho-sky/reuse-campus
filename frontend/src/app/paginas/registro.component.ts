import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { mensajeDeError } from '../mensaje-error';

@Component({
  selector: 'app-registro',
  imports: [FormsModule],
  template: `
    <h2>Crear cuenta</h2>
    <form #f="ngForm" (ngSubmit)="enviar()">
      <label>Nombre
        <input name="nombre" [(ngModel)]="nombre" required>
      </label>
      <label>Correo
        <input name="correo" type="email" [(ngModel)]="correo" required>
      </label>
      <label>Contraseña (mínimo 6 caracteres)
        <input name="password" type="password" [(ngModel)]="password" required minlength="6">
      </label>
      <button type="submit" [disabled]="f.invalid">Registrarme</button>
    </form>
    @if (error()) { <p class="error">{{ error() }}</p> }
    @if (exito()) { <p class="exito">{{ exito() }}</p> }
  `
})
export class RegistroComponent {
  private api = inject(ApiService);
  nombre = '';
  correo = '';
  password = '';
  error = signal('');
  exito = signal('');

  enviar() {
    this.error.set('');
    this.exito.set('');
    this.api.registrar({ nombre: this.nombre, correo: this.correo, password: this.password })
      .subscribe({
        next: u => this.exito.set(`Cuenta creada. Tu ID de usuario es ${u.id}.`),
        error: err => this.error.set(mensajeDeError(err))
      });
  }
}