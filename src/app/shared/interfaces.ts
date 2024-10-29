export interface Tamanho {
    id: number,
    title: string,
    price: number,
    description: string,
    maxAcompanhamentos: number
}
  
export interface Acompanhamentos {
    id: number,
    name: string,
    price?: number
}
export interface Pedido {
    id: number;
    tamanho: string;
    precoTamanho: number;
    acompanhamentosGratis: Acompanhamentos[];
    acompanhamentosPremium:Acompanhamentos[];
    pagamento: string;
    troco?: number;
    status: 'Solicitado' | 'Em Andamento' | 'Finalizado';
    telefone:number;
    total: number;
}