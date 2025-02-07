import { Routes } from '@angular/router';
import { LoginPagesComponent } from './pages/login-pages/login-pages.component';
import { OrderPagesComponent } from './pages/order-pages/order-pages.component';
import { OrderSummaryComponent } from './pages/order-summary/order-summary.component';
import { OrderHistoryComponent } from './pages/order-history/order-history.component';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  //Para os usuarios
  { path: 'order', component: OrderPagesComponent },
  { path: 'order-history', component: OrderHistoryComponent },

  //Para os administradores
  { path: 'login', component: LoginPagesComponent },
  { path: 'order-summary', component: OrderSummaryComponent, canActivate: [AuthGuard] },

  //Rotas padrão
  { path: '', redirectTo: 'order', pathMatch: 'full' },
  { path: '**', redirectTo: 'order' },
];

