
import { createProduct, getProducts } from "@/services/crm/product";
import { IProduct } from "@/types/crm/product";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useProduct() {

    const queryClient = useQueryClient();

    const {
        data: products = [],
        error,
        isLoading,
        refetch
    } = useQuery<IProduct[]>({
        queryKey: ["products"],
        queryFn: getProducts,
        refetchInterval: 5000,
    });

    // --- CRIAÇÃO ---
    const createMutation = useMutation({
        mutationFn: createProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
        },
        onError: (err) => {
            console.error("Error creating product:", err);
            toast.error("Error creating product.");
        }
    });

    return {
        // Dados e estados da Query
        products,
        error,
        isLoading,
        refetch,
        // Funções de Mutação
        createProduct: createMutation.mutateAsync,

        // Estados de carregamento das mutações
        isMutating:
            createMutation.isPending
      
    }
}