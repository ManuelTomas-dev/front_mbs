import { createLead, getLeads } from "@/services/crm/leads";
import { createActivity, getActivityById } from "@/services/crm/leadsActivity";
import { ILead, ILeadData } from "@/types/crm/leads";
import { ILeadActivity } from "@/types/crm/leadsActivitiy";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useLeadActivity(leadId: number) {
    const queryClient = useQueryClient();

    // --- LISTAGEM ---
    const {
        data: leadsActivity = [],
        error,
        isLoading,
        refetch
    } = useQuery<ILeadActivity[]>({
        queryKey: ["activity", leadId],
        queryFn: () => getActivityById(leadId),
        refetchInterval: 10000, // Intervalo de 10s para leads costuma ser suficiente
    });

    // --- CRIAÇÃO ---
    const createMutation = useMutation({
        mutationFn: createActivity,
        onSuccess: () => {
            // Invalida a cache para atualizar a lista automaticamente
            queryClient.invalidateQueries({ queryKey: ["activity"] });
            // toast.success("Lead registada com sucesso!");
        },
        onError: (err) => {
            console.error("Erro na criação da leadActivity:", err);
            toast.error("Erro ao criar leadActivity. Verifique os dados.");
        }
    });

    return {
        // Dados e estados da Query
        leadsActivity,
        error,
        isLoading,
        refetch,

        // Funções de Mutação
        createActivity: createMutation.mutateAsync,

        // Estados de carregamento e erro das mutações
        isMutating: createMutation.isPending,
        isSuccess: createMutation.isSuccess,
        isError: createMutation.isError
    };
}