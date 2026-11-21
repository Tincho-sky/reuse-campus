import { Routes } from '@angular/router';
import { PublicacionesListaComponent } from './paginas/publicaciones-lista.component';
import { PublicacionNuevaComponent } from './paginas/publicacion-nueva.component';
import { RegistroComponent } from './paginas/registro.component';

export const routes: Routes = [
  { path: '', redirectTo: 'publicaciones', pathMatch: 'full' },
  { path: 'publicaciones', component: PublicacionesListaComponent },
  { path: 'publicaciones/nueva', component: PublicacionNuevaComponent },
  { path: 'registro', component: RegistroComponent },
  { path: '**', redirectTo: 'publicaciones' }
];