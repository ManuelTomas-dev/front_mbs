import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { 
  getTitles, 
  createTitle, 
  updateTitle, 
  deleteTitle, 
} from "@/services/system/job-title"; // Ajuste o caminho conforme seu projeto
import { Title } from "@/types/system/job-title";

export function useTitles() {

  const queryClient = useQueryClient();

  const {
    data: titles = [],
    error,
    isLoading,
    refetch
  } = useQuery<Title[]>({
    queryKey: ["titles"],
    queryFn: getTitles, 
    refetchInterval: 5000,
  });

  // --- CRIAÇÃO ---
  const createMutation = useMutation({
    mutationFn: createTitle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["titles", ] });
    },
  });

  // --- ATUALIZAÇÃO ---
  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<Title> }) =>
      updateTitle(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["titles", ] });
    },
  });

  // --- EXCLUSÃO ---
  const deleteMutation = useMutation({
    mutationFn: deleteTitle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["titles", ] });
    },
  });

  return {
    // Dados e estados da Query
    titles,
    error,
    isLoading,
    refetch,
    // Funções de Mutação
    createTitle: createMutation.mutateAsync,
    updateTitle: updateMutation.mutateAsync,
    deleteTitle: deleteMutation.mutateAsync,
    
    // Estados de carregamento das mutações
    isMutating: 
      createMutation.isPending || 
      updateMutation.isPending || 
      deleteMutation.isPending,
  };
}