import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
{
    path: '',
    redirectTo: 'library',
    pathMatch: 'full'
  },
  {
    path: 'library',
    loadComponent: () => import('./pages/library/library').then(m => m.Library)
  },
  {
    path: 'track/:id',
    loadComponent: () => import('./pages/track-detail/track-detail').then(m => m.TrackDetail)
  },
  {
    path: 'add',
    loadComponent: () => import('./components/track-form/track-form').then(m => m.TrackFormComponent)
},
{
    path: 'edit/:id',
    loadComponent: () => import('./components/track-form/track-form').then(m => m.TrackFormComponent)
},
{
  path: 'test' , 
  loadComponent : () => import('./pages/test/test').then(m=> m.Test)
},
{
  path : '**',
  canActivate: [authGuard],
  loadComponent: () => import('./pages/error404/error404').then(m => m.Error404)
}
];
