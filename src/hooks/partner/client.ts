import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IPersonnel } from "@/types/operation/personnel";
import { createPersonnel, deletePersonnel, getPersonnel, updatePersonnel } from "@/services/operation/personnel";
import { IClient } from "@/types/partnercopy/client";
import { createClient, deleteClient, getClients, updateClient } from "@/services/partner/client";

export function useClient() {

  const queryClient = useQueryClient();

  const {
    data: clients = [],
    error,
    isLoading,
    refetch
  } = useQuery<IClient[]>({
    queryKey: ["clients"],
    queryFn: getClients,
    refetchInterval: 5000,
  });

  // --- CRIAÇÃO ---
  const createMutation = useMutation({
    mutationFn: createClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients",] });
    },
  });

  // --- ATUALIZAÇÃO ---
  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<IClient> }) =>
      updateClient(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients",] });
    },
  });

  // --- EXCLUSÃO ---
  const deleteMutation = useMutation({
    mutationFn: deleteClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients",] });
    },
  });

  return {
    // Dados e estados da Query
    clients,
    error,
    isLoading,
    refetch,
    // Funções de Mutação
    createClient: createMutation.mutateAsync,
    updateClient: updateMutation.mutateAsync,
    deleteClient: deleteMutation.mutateAsync,

    // Estados de carregamento das mutações
    isMutating:
      createMutation.isPending ||
      updateMutation.isPending ||
      deleteMutation.isPending,
  };
}