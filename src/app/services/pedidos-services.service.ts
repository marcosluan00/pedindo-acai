import { Injectable } from '@angular/core';
import { Pedido } from '../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PedidosServicesService {
  private storageKey = 'pedidos';
  private phoneKey = 'telefoneUsuario';

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

  getNextPedidoId(): number {
    const currentId = localStorage.getItem('pedidoIdCounter');
    const nextId = currentId ? parseInt(currentId, 10) + 1 : 1;
    localStorage.setItem('pedidoIdCounter', nextId.toString());
    return nextId;
  }

  filtrarPedidosPorStatus(status: 'Solicitado' | 'Em Andamento' | 'Finalizado'): Pedido[] {
    const pedidos = this.carregarPedidos();
    return pedidos.filter(pedido => pedido.status === status);
  }

  salvarNumeroUsuario(numero: string): void {
    localStorage.setItem(this.phoneKey, numero);
  }

  buscarPedidosPorTelefone(numero: number): Pedido[] {
    const pedidos = this.carregarPedidos();
    return pedidos.filter(pedido => pedido.telefone == numero);
  }
}
