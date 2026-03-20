export interface IProduct {
    id?: number;
    nome_produto: string;
    marca: string;
    modelo: string;
    fabricante: string;
    grupo: string;
    preco_fornecedor: number;
    percentagem_lucro: number;
    valor_final: number;
    iva: boolean;
    stock: number;
}
