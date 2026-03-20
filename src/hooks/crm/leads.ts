import { createLead, getLeads } from "@/services/crm/leads";
import { ILead, ILeadData } from "@/types/crm/leads";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useLead() {
    const queryClient = useQueryClient();

    // --- LISTAGEM ---
    const {
        data: leads = [],
        error,
        isLoading,
        refetch
    } = useQuery<ILeadData[]>({
        queryKey: ["leads"],
        queryFn: getLeads,
        refetchInterval: 10000, // Intervalo de 10s para leads costuma ser suficiente
    });

    // --- CRIAÇÃO ---
    const createMutation = useMutation({
        mutationFn: createLead,
        onSuccess: () => {
            // Invalida a cache para atualizar a lista automaticamente
            queryClient.invalidateQueries({ queryKey: ["leads"] });
            // toast.success("Lead registada com sucesso!");
        },
        onError: (err) => {
            console.error("Erro na criação da lead:", err);
            toast.error("Erro ao criar lead. Verifique os dados.");
        }
    });

    return {
        // Dados e estados da Query
        leads,
        error,
        isLoading,
        refetch,

        // Funções de Mutação
        createLead: createMutation.mutateAsync,

        // Estados de carregamento e erro das mutações
        isMutating: createMutation.isPending,
        isSuccess: createMutation.isSuccess,
        isError: createMutation.isError
    };
}