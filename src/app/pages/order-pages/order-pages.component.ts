import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { Acompanhamentos, Pedido, Tamanho } from '../../shared/interfaces';
import { FormsModule } from '@angular/forms';
import { PedidosServicesService } from '../../services/pedidos-services.service';

@Component({
  selector: 'app-order-pages',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order-pages.component.html',
  styleUrl: './order-pages.component.css'
})
export class OrderPagesComponent {

  limiteAcompanhamentos: number = 0;
  contagemAcompanhamentos:number = 0;
  valorTotal: number = 0;
  tipoDePagamento: string = '';
  telefone: number = 0;

  trocoNecessario: number= 0;

  tamanhoSelecionado?: Tamanho;
  acompanhamentosGratisSelecionados: Acompanhamentos[] = [];
  acompanhamentosPremiumSelecionados: Acompanhamentos[] = [];

  tamanhos: Tamanho[]= [
    { id: 1, title: 'Pequeno (300ml)', price: 7.00, maxAcompanhamentos:3, description: 'Até 3 Acompanhamentos'},
    { id: 2, title: 'Médio (500ml)', price: 14.00, maxAcompanhamentos:5, description: 'Até 5 Acompanhamentos'},
    { id: 3, title: 'Grande (700ml)', price: 20.00, maxAcompanhamentos:7, description: 'Até 7 Acompanhamentos'},
    { id: 4, title: 'Enorme (1L)', price: 25.00, maxAcompanhamentos:12, description: 'Até 12 Acompanhamentos'},
  ]
  acompanhamentosGratis: Acompanhamentos[]=[
    { id: 1, name: 'Banana' }, { id: 2, name: 'Maça' },{ id: 3, name: 'Mamão' },
    { id: 4, name: 'Kiwi' }, { id: 5, name: 'Farinha Láctea' }, { id: 6, name: 'Granola' },
    { id: 7, name: 'Leite Condensado' }, { id: 8, name: 'Neston' }, { id: 9, name: 'Leite em pó' },
    { id: 10, name: 'Mel' }, { id: 11, name: 'Paçoca' }, { id: 12, name: 'Amendoim' },
  ]
  acompanhamentosPremium: Acompanhamentos[] =[
  { id: 1, name: 'Nutella', price: 3.00 }, { id: 2, name: 'Morango', price: 2.50 },
  { id: 3, name: 'Pitaya', price: 2.50 }, { id: 4, name: 'Coco ralado', price: 1.00 },
  { id: 5, name: 'Goiabada', price: 1.50 }, { id: 6, name: 'Castanha', price: 2.00 }
  ]

  constructor(private pedidosService: PedidosServicesService){}

  selecionarTamanho(tamanho:Tamanho){
    this.limiteAcompanhamentos = tamanho.maxAcompanhamentos;
    this.tamanhoSelecionado = tamanho;
    this.contagemAcompanhamentos = 0;
    this.atualizarValorTotal();
  }

  atualizarContagem(event: any){
    this.contagemAcompanhamentos += event.target.checked ? 1: -1;
  }

  acompanhaSelecionado(id: number): boolean {
    const element = document.getElementById(`acompanhamentosGratis-${id}`) as HTMLInputElement;
    return element?.checked ?? false; 
  }

  selecionarPagamento(tipo: string) {
    this.tipoDePagamento = tipo;
  }

  toggleAcompanhamentoGratis(gratis: Acompanhamentos) {
    const index = this.acompanhamentosGratisSelecionados.indexOf(gratis);
    if (index === -1) {
      this.acompanhamentosGratisSelecionados.push(gratis);
    } else {
      this.acompanhamentosGratisSelecionados.splice(index, 1);
    }
  }

  toggleAcompanhamentoPremium(acompanhamento: Acompanhamentos) {
    const index = this.acompanhamentosPremiumSelecionados.findIndex(
      (item) => item.name === acompanhamento.name
    );
    if (index === -1) {
      this.acompanhamentosPremiumSelecionados.push(acompanhamento);
    } else {
      this.acompanhamentosPremiumSelecionados.splice(index, 1);
    }
    this.atualizarValorTotal();
  }

  atualizarValorTotal() {
    const precoTamanho = this.tamanhoSelecionado?.price || 0;
    const precoAdicionais = this.acompanhamentosPremiumSelecionados.reduce(
      (acc, item) => acc + (item.price || 0), 0
    );
    this.valorTotal = precoTamanho + precoAdicionais;
  }
  
  

  fazerPedido() {

    if (this.tipoDePagamento === 'dinheiro' && this.trocoNecessario < this.valorTotal) {
      alert('O valor do troco deve ser maior ou igual ao valor total do pedido.');
      return; 
    }

    if (this.telefone == 0|| this.telefone ==null || this.telefone == undefined) {
      alert('Informe um numero para contato');
      return; 
    }

    const pedido: Pedido = {
      id: this.pedidosService.getNextPedidoId(),  
      tamanho: this.tamanhoSelecionado?.title || '',
      precoTamanho: this.tamanhoSelecionado?.price || 0,
      acompanhamentosGratis: this.acompanhamentosGratisSelecionados,
      acompanhamentosPremium: this.acompanhamentosPremiumSelecionados,
      pagamento: this.tipoDePagamento || '',
      troco: this.tipoDePagamento === 'dinheiro' ? this.trocoNecessario : undefined,
      status: 'Solicitado',
      telefone: Number(this.telefone),
      total: this.valorTotal,
    };

    this.pedidosService.salvarPedido(pedido);

    alert('Pedido Enviado!');
    this.limparFormulario(); 
  }
  
  limparFormulario() {
      document.getElementById('limpar')?.click();

      this.tamanhoSelecionado = undefined;
      this.acompanhamentosGratisSelecionados = [];
      this.acompanhamentosPremiumSelecionados = [];
      this.tipoDePagamento = '';
      this.trocoNecessario = 0;
      this.telefone = 0;
      this.valorTotal = 0;
  }

}
