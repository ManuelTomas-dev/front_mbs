import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IPersonnel } from "@/types/operation/personnel";
import { createPersonnel, deletePersonnel, getPersonnel,updatePersonnel } from "@/services/operation/personnel";

export function usePersonnel() {

  const queryClient = useQueryClient();

  const {
    data: personnel = [],
    error,
    isLoading,
    refetch
  } = useQuery<IPersonnel[]>({
    queryKey: ["personnel"],
    queryFn: getPersonnel,
    refetchInterval: 5000,
  });

  // --- CRIAÇÃO ---
  const createMutation = useMutation({
    mutationFn: createPersonnel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["personnel", ] });
    },
  });

  // --- ATUALIZAÇÃO ---
  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<IPersonnel> }) =>
      updatePersonnel(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["personnel", ] });
    },
  });

  // --- EXCLUSÃO ---
  const deleteMutation = useMutation({
    mutationFn: deletePersonnel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["personnel", ] });
    },
  });

  return {
    // Dados e estados da Query
    personnel,
    error,
    isLoading,
    refetch,
    // Funções de Mutação
    createPersonnel: createMutation.mutateAsync,
    updatePersonnel: updateMutation.mutateAsync,
    deletePersonnel: deleteMutation.mutateAsync,

    // Estados de carregamento das mutações
    isMutating: 
      createMutation.isPending || 
      updateMutation.isPending || 
      deleteMutation.isPending,
  };
}