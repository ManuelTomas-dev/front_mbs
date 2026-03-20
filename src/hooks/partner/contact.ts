import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createContact, getAllContacts, getContactsByLocation } from "@/services/partner/contact";
import { IContact } from "@/types/partner/contact";

export function useContact(locationId?: number | string) {

    const queryClient = useQueryClient();
    const {
        data: allContacts = [],
        error: allContactsError,
        isLoading: allContactsLoading,
        refetch: allContactsRefetch
    } = useQuery<IContact[]>({
        queryKey: ["contacts"],
        queryFn: getAllContacts,
        refetchInterval: 5000,
    });

    const {
        data: contacts = [],
        error,
        isLoading,
        refetch
    } = useQuery<IContact[]>({
        queryKey: ["contacts", locationId],
        queryFn: () => getContactsByLocation(locationId!),
        enabled: !!locationId,
        refetchInterval: 5000,
    });

    // --- CRIAÇÃO ---
    const createMutation = useMutation({
        mutationFn: createContact,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["clients",] });
        },
    });

    return {
        // Dados e estados da Query
        contacts,
        allContacts,
        error,
        isLoading,
        refetch,
        // Funções de Mutação
        createLocation: createMutation.mutateAsync,

        // Estados de carregamento das mutações
        isMutating:
            createMutation.isPending
        // || deleteLocation.isPending ||
        // deleteMutation.isPending,
    }
}