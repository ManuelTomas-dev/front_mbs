"use client";

import { createService, getServices } from "@/services/crm/Service";
import { IService } from "@/types/crm/service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useService() {
  const queryClient = useQueryClient();

  // --- BUSCA DE SERVIÇOS ---
  const {
    data: services = [],
    error,
    isLoading,
    refetch,
  } = useQuery<IService[]>({
    queryKey: ["services"],
    queryFn: getServices,
    refetchInterval: 5000, // Mantive o polling de 5s para sincronização em tempo real
  });

  // --- CRIAÇÃO DE SERVIÇO ---
  const createMutation = useMutation({
    mutationFn: createService,
    onSuccess: () => {
      // Invalida a cache de serviços para forçar um refresh automático na lista
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast.success("Serviço adicionado com sucesso!");
    },
    onError: (err) => {
      console.error("Error creating service:", err);
      toast.error("Erro ao criar o serviço.");
    },
  });

  return {
    // Dados e estados da Query
    services,
    error,
    isLoading,
    refetch,
    
    // Funções de Mutação
    createService: createMutation.mutateAsync,

    // Estados de carregamento das mutações
    isCreating: createMutation.isPending,
  };
}