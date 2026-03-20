export type IContract = {
    id?: number;
    contrato_numero: string;
    fk_localizacao: number;
    fk_quotas: number;
    fk_cliente_contacto: number;
    fk_local_trabalho: number;
    descricao_contrato: string;
    contrato_inicio: string;
    contrato_fim: string;
    status_contrato: string;
    arquivado: boolean;
    fk_usuario: number;
    valor_estimado: number;
    fk_tipo_contrato: number;
    prazo_renovacao: number;
    fk_produte_line: number;
    referencia_contrato: string;
};
