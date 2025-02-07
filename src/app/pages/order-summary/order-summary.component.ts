import { Component } from '@angular/core';
import { Acompanhamentos, Pedido } from '../../shared/interfaces';
import { PedidosServicesService } from '../../services/pedidos-services.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css'
})
export class OrderSummaryComponent {
  pedidosSolicitados: Pedido[] = [];
  pedidosEmAndamento: Pedido[] = [];
  pedidosFinalizados: Pedido[] = [];

  constructor(private pedidoService: PedidosServicesService) {}

  ngOnInit() {
    this.carregarPedidos();
  }

  carregarPedidos() {
    this.pedidosSolicitados = this.pedidoService.filtrarPedidosPorStatus('Solicitado');
    this.pedidosEmAndamento = this.pedidoService.filtrarPedidosPorStatus('Em Andamento');
    this.pedidosFinalizados = this.pedidoService.filtrarPedidosPorStatus('Finalizado');
  }

  atualizarStatus(pedido: Pedido, novoStatus:'Solicitado' | 'Em Andamento' | 'Finalizado') {
    pedido.status = novoStatus;
    
    const pedidos = JSON.parse(localStorage.getItem('pedidos') || '[]');
    const pedidoIndex = pedidos.findIndex((p: Pedido) => p.id === pedido.id);
    
    if (pedidoIndex !== -1) {
      pedidos[pedidoIndex] = pedido;
      localStorage.setItem('pedidos', JSON.stringify(pedidos));
    }
    
    this.carregarPedidos();
  }
  concatenarAcompanhamentos(acompanhamentos: Acompanhamentos[]){
    return acompanhamentos.map(a => a.name).join(', ')
  }

}
