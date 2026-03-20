import { createContract, getContracts } from "@/services/crm/contract";
import { IContract } from "@/types/crm/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useContract() {
    const queryClient = useQueryClient();

    // --- LISTAGEM DE CONTRATOS DO LEAD ---
    const {
        data: contracts = [],
        error,
        isLoading,
        refetch
    } = useQuery<IContract[]>({
        queryKey: ["contracts"],
        queryFn:getContracts,
    });

    // --- CRIAÇÃO DE CONTRATO ---
    const createMutation = useMutation({
        mutationFn: createContract,
        onSuccess: () => {
            // Invalida a cache para atualizar a lista de contratos
            queryClient.invalidateQueries({ queryKey: ["contracts"] });
            toast.success("Contrato gerado com sucesso!");
        },
        onError: (err: any) => {
            console.error("Erro na criação do contrato:", err);
            toast.error("Erro ao criar contrato. Verifique os dados.");
        }
    });

    return {
        // Dados e estados da Query
        contracts,
        error,
        isLoading,
        refetch,

        // Funções de Mutação
        createContract: createMutation.mutateAsync,

        // Estados de carregamento e erro das mutações
        isMutating: createMutation.isPending,
        isSuccess: createMutation.isSuccess,
        isError: createMutation.isError
    };
}