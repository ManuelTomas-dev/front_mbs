import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IClient } from "@/types/partnercopy/client";
import { ILocation } from "@/types/partner/location"
import { createLocation, getLocations, updateLocation } from "@/services/partner/location";

export function useLocation(clientId?: string) {

  const queryClient = useQueryClient();

  const {
    data: locations = [],
    error,
    isLoading,
    refetch
  } = useQuery<ILocation[]>({
    queryKey: ["locations", clientId],
    queryFn: () => getLocations(clientId!),
    enabled: !!clientId,
    refetchInterval: 5000,
  });

  // --- CRIAÇÃO ---
  const createMutation = useMutation({
    mutationFn: createLocation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients",] });
    },
  });

  // --- ATUALIZAÇÃO ---
  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<IClient> }) =>
      updateLocation(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients",] });
    },
  });

  // --- EXCLUSÃO ---
  // const deleteMutation = useMutation({
  //   mutationFn: deleteLocation,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["clients",] });
  //   },
  // });

  return {
    // Dados e estados da Query
    locations,
    error,
    isLoading,
    refetch,
    // Funções de Mutação
    createLocation: createMutation.mutateAsync,
    updateLocation: updateMutation.mutateAsync,
    // deleteLocation: deleteMutation.mutateAsync,

    // Estados de carregamento das mutações
    isMutating:
      createMutation.isPending ||
      updateMutation.isPending
    // || deleteLocation.isPending ||
    // deleteMutation.isPending,
  };
}