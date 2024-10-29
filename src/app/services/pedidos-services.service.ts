import { Injectable } from '@angular/core';
import { Pedido } from '../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PedidosServicesService {
  private storageKey = 'pedidos';

  constructor() {}

  carregarPedidos(): Pedido[] {
    const pedidosJSON = localStorage.getItem(this.storageKey);
    return pedidosJSON ? JSON.parse(pedidosJSON) : [];
  }

  salvarPedido(pedido: Pedido): void {
    pedido.id = this.getNextPedidoId();
    const pedidosExistentes = this.carregarPedidos();
    pedidosExistentes.push(pedido);
    localStorage.setItem(this.storageKey, JSON.stringify(pedidosExistentes));
  }

  // Gera o próximo ID único para o pedido
  getNextPedidoId(): number {
    const currentId = localStorage.getItem('pedidoIdCounter');
    const nextId = currentId ? parseInt(currentId, 10) + 1 : 1;
    localStorage.setItem('pedidoIdCounter', nextId.toString());
    return nextId;
  }

  // Filtra os pedidos por status (Solicitado, Em Andamento, Finalizado)
  filtrarPedidosPorStatus(status: 'Solicitado' | 'Em Andamento' | 'Finalizado'): Pedido[] {
    const pedidos = this.carregarPedidos();
    return pedidos.filter(pedido => pedido.status === status);
  }
}
