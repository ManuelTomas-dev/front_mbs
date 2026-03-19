import { InfiniteQueryObserverRefetchErrorResult, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createContact, getContactsByLocation } from "@/services/partner/contact";
import { IContact } from "@/types/partner/contact";
import { createQuote, getQuotes } from "@/services/crm/quotes";
import { IQuote } from "@/types/crm/quotes";
import { toast } from "sonner";

export function useQuote() {

    const queryClient = useQueryClient();

    const {
        data: quotes = [],
        error,
        isLoading,
        refetch
    } = useQuery<IQuote[]>({
        queryKey: ["quotes"],
        queryFn: getQuotes,
        refetchInterval: 5000,
    });

    // --- CRIAÇÃO ---
    // --- DENTRO DO useQuote ---
    const createMutation = useMutation({
        mutationFn: createQuote,
        onSuccess: () => {
            // MUITO IMPORTANTE: Deve ser a mesma chave usada no useQuery ["quotes"]
            queryClient.invalidateQueries({ queryKey: ["quotes"] });
        },
        onError: (err) => {
            console.error("Erro na criação:", err);
            toast.error("Erro ao criar cotação");
        }
    });

    return {
        // Dados e estados da Query
        quotes,
        error,
        isLoading,
        refetch,
        // Funções de Mutação
        createQuote: createMutation.mutateAsync,

        // Estados de carregamento das mutações
        isMutating:
            createMutation.isPending
        // || deleteLocation.isPending ||
        // deleteMutation.isPending,
    }
}