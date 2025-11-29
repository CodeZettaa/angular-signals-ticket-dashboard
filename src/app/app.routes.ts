import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/pages/dashboard.page').then((m) => m.DashboardPageComponent),
  },
  {
    path: 'tickets',
    loadComponent: () =>
      import('./features/tickets/pages/tickets.page').then((m) => m.TicketsPageComponent),
  },
  {
    path: 'tickets/new',
    loadComponent: () =>
      import('./features/tickets/pages/ticket-form.page').then((m) => m.TicketFormPageComponent),
  },
  {
    path: 'tickets/:id',
    loadComponent: () =>
      import('./features/tickets/pages/ticket-details.page').then(
        (m) => m.TicketDetailsPageComponent
      ),
  },
  {
    path: 'tickets/:id/edit',
    loadComponent: () =>
      import('./features/tickets/pages/ticket-form.page').then((m) => m.TicketFormPageComponent),
  },
  {
    path: '**',
    redirectTo: '/dashboard',
  },
];
