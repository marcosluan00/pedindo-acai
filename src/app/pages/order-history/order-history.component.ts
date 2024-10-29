import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Pedido } from '../../shared/interfaces';
import { CommonModule } from '@angular/common';
import { PedidosServicesService } from '../../services/pedidos-services.service';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css'
})
export class OrderHistoryComponent {
  telefoneUsuario: string = '';
  pedidos: Pedido[] = [];
  pedidosEncontrados: boolean = true;

  constructor(private pedidosService: PedidosServicesService) {}

  ngOnInit(): void {
    const savedPhone = localStorage.getItem('userPhone');
    if (savedPhone) {
      this.telefoneUsuario = savedPhone;
      this.buscarPedidos();
    }
  }

  buscarPedidos(): void {
    if (!this.telefoneUsuario) return;

    this.pedidosService.salvarNumeroUsuario(this.telefoneUsuario);

    this.pedidos = this.pedidosService.buscarPedidosPorTelefone(Number(this.telefoneUsuario));
    this.pedidosEncontrados = this.pedidos.length > 0;
  }

  onEnter(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.buscarPedidos();
    }
  }

  concatenarAcompanhamentos(acompanhamentos: { name: string }[]): string {
    return acompanhamentos.map(a => a.name).join(', ');
  }
}
