"use client";

import { createQuoteItem, getItemsByQuote } from "@/services/crm/ItemsQuotes";
import { IQuoteItem } from "@/types/crm/ItemsQuotes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useQuoteItems(quoteId?: number) {
  const queryClient = useQueryClient();

  // --- BUSCA DE ITENS DA COTAÇÃO ---
  const {
    data: quoteItems = [],
    error,
    isLoading,
    refetch,
  } = useQuery<IQuoteItem[]>({
    queryKey: ["quote-items", quoteId], // Chave única por cotação
    queryFn: () => (quoteId ? getItemsByQuote(quoteId) : Promise.resolve([])),
    enabled: !!quoteId, // Só executa se houver um ID de cotação
    refetchInterval: 5000,
  });

  // --- ADICIONAR ITEM À COTAÇÃO (Produto ou Serviço) ---
  const createMutation = useMutation({
    mutationFn: createQuoteItem,
    onSuccess: () => {
      // Invalida especificamente os itens desta cotação
      queryClient.invalidateQueries({ queryKey: ["quote-items", quoteId] });
      toast.success("Item adicionado à cotação com sucesso!");
    },
    onError: (err) => {
      console.error("Error adding item to quote:", err);
      toast.error("Erro ao adicionar item à cotação.");
    },
  });

  return {
    // Dados e estados da Query
    quoteItems,
    error,
    isLoading,
    refetch,
    
    // Funções de Mutação
    addQuoteItem: createMutation.mutateAsync,

    // Estados de carregamento
    isAdding: createMutation.isPending,
  };
}