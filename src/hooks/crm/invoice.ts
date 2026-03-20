import { createInvoice } from "@/services/crm/invoice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useInvoice() {
    const queryClient = useQueryClient();

    // --- REGISTRO DE INVOICE (VIA FORMDATA) ---
    const createMutation = useMutation({
        mutationFn: (formData: FormData) => createInvoice(formData),
        onSuccess: () => {
            // Invalida as queries relacionadas para atualizar listas de faturamento
            queryClient.invalidateQueries({ queryKey: ["invoices"] });
            // Opcional: invalidar contratos se a invoice mudar o status dele
            queryClient.invalidateQueries({ queryKey: ["contracts"] });
            
            toast.success("Invoice registrada e arquivo enviado!");
        },
        onError: (err: any) => {
            console.error("Erro no registro da invoice:", err);
            toast.error("Falha ao registrar invoice. Verifique o arquivo.");
        }
    });

    return {
        registerInvoice: createMutation.mutateAsync,
        isRegistering: createMutation.isPending,
        isSuccess: createMutation.isSuccess,
    };
}