import { createAmendment, getAmendments } from "@/services/crm/amendment";
import { Iamendment } from "@/types/crm/amendment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
// Importe seus serviços de amendment aqui

export function useAmendment() {
    const queryClient = useQueryClient();

    // --- BUSCA (QUERY) ---
    const {
        data: amendments = [],
        error,
        isLoading,
        refetch
    } = useQuery<Iamendment[]>({
        queryKey: ["amendments"],
        queryFn: getAmendments,
        refetchInterval: 5000, // Mantive o polling de 5s conforme seu exemplo
    });

    // --- CRIAÇÃO (MUTATION) ---
    const createMutation = useMutation({
        mutationFn: createAmendment,
        onSuccess: () => {
            // Invalida o cache para atualizar a lista automaticamente
            queryClient.invalidateQueries({ queryKey: ["amendments"] });
            toast.success("Amendment registrado com sucesso!");
        },
        onError: (err) => {
            console.error("Erro na criação do amendment:", err);
            toast.error("Erro ao registrar alteração contratual");
        }
    });

    return {
        // Dados e estados da Query
        amendments,
        error,
        isLoading,
        refetch,
        
        // Funções de Mutação
        registerAmendment: createMutation.mutateAsync,

        // Estados de carregamento
        isRegistering: createMutation.isPending,
        isMutating: createMutation.isPending 
    };
}