import { Routes } from '@angular/router';
import { LoginPagesComponent } from './pages/login-pages/login-pages.component';
import { OrderPagesComponent } from './pages/order-pages/order-pages.component';
import { OrderSummaryComponent } from './pages/order-summary/order-summary.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';
import { OrderHistoryComponent } from './pages/order-history/order-history.component';

export const  routes: Routes = [
    { path: 'order', component: OrderPagesComponent },
    { path: 'order-history', component: OrderHistoryComponent },

    //PROTEGIDAS
    { path: 'login', component: LoginPagesComponent },
    { path: 'admin', component: AdminDashboardComponent },
    { path: 'order-summary', component: OrderSummaryComponent },
    { path: 'admin/order-details/:id', component: OrderDetailsComponent }, 

    { path: '', redirectTo: 'order-summary', pathMatch: 'full' }, 
    { path: '**', redirectTo: 'order' }, 
  ];

