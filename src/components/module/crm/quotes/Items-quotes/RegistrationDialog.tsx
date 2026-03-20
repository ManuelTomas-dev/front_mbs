"use client";

import React, { useEffect, useState } from "react";
import z from "zod";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Layers, DollarSign, StickyNote, Calculator } from "lucide-react";

import DialogContainer from "@/components/generic/dialog-container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { DialogFooter } from "@/components/ui/dialog";

import { useProduct } from "@/hooks/crm/product";
import { useService } from "@/hooks/crm/service";
import { useQuoteItems } from "@/hooks/crm/ItemQuote";

// Schema alinhado ao seu JSON de exemplo
const quoteItemSchema = z.object({
    quantidade: z.coerce.number().min(1, "Mínimo de 1 unidade"),
    preco_unico: z.coerce.number().min(0, "Preço inválido"),
    uom: z.string().min(1, "Selecione a unidade"),
    custo: z.coerce.number().min(0, "Custo inválido"),
    fk_quotas: z.number(),
    notas: z.string().optional().nullable(),
    status_seccao: z.boolean().default(true),
    fk_servico: z.number().nullable().default(null),
    fk_produto: z.number().nullable().default(null),
});

type QuoteItemValues = z.infer<typeof quoteItemSchema>;

interface QuoteItemDialogProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    quoteId: number;
    initialData?: Partial<QuoteItemValues>;
}

export function QuoteItemRegistrationDialog({
    open,
    setOpen,
    quoteId,
    initialData
}: QuoteItemDialogProps) {
    const { products } = useProduct();
    const { services } = useService();
    const { addQuoteItem, isAdding } = useQuoteItems(quoteId);

    // Estado para controlar se estamos selecionando Produto ou Serviço no Select
    const [selectionType, setSelectionType] = useState<"produto" | "servico">("produto");

    const form = useForm<QuoteItemValues>({
        resolver: zodResolver(quoteItemSchema),
        defaultValues: {
            quantidade: 1,
            preco_unico: 0,
            uom: "unidade",
            custo: 0,
            fk_quotas: quoteId,
            notas: "",
            status_seccao: true,
            fk_servico: null,
            fk_produto: null,
        },
    });

    // Lógica para quando o usuário seleciona um item na lista
    const handleItemSelection = (id: string) => {
        const numericId = Number(id);
        if (selectionType === "produto") {
            const prod = products?.find(p => p.id === numericId);
            if (prod) {
                form.setValue("fk_produto", prod.id || null);
                form.setValue("fk_servico", null);
                form.setValue("preco_unico", prod.valor_final);
                form.setValue("uom", "unidade");
            }
        } else {
            const serv = services?.find(s => s.id === numericId);
            if (serv) {
                form.setValue("fk_servico", serv.id || null);
                form.setValue("fk_produto", null);
                form.setValue("preco_unico", serv.custo);
                form.setValue("uom", "servico");
            }
        }
    };



    const qty = useWatch({ control: form.control, name: "quantidade" });
    const price = useWatch({ control: form.control, name: "preco_unico" });

    // Resetar o formulário com dados iniciais quando o modal abrir
    useEffect(() => {
        if (open) {
            if (initialData?.fk_produto) {
                const prod = products?.find(p => p.id === initialData.fk_produto);
                form.reset({
                    quantidade: 1,
                    preco_unico: prod?.valor_final || 0,
                    uom: "unidade",
                    custo: prod?.valor_final || 0,
                    fk_quotas: quoteId,
                    notas: "",
                    status_seccao: true,
                    fk_produto: initialData.fk_produto,
                    fk_servico: null,
                });
            } else if (initialData?.fk_servico) {
                const serv = services?.find(s => s.id === initialData.fk_servico);
                form.reset({
                    quantidade: 1,
                    preco_unico: serv?.custo || 0,
                    uom: "servico",
                    custo: serv?.custo || 0,
                    fk_quotas: quoteId,
                    notas: "",
                    status_seccao: true,
                    fk_servico: initialData.fk_servico,
                    fk_produto: null,
                });
            }
        }
    }, [open, initialData, products, services, quoteId, form]);

    // Cálculo Automático do campo "custo" (que no seu JSON parece ser o Total)
    useEffect(() => {
        const total = (qty || 0) * (price || 0);
        form.setValue("custo", total);
    }, [qty, price, form]);

    const onSubmit = async (values: QuoteItemValues) => {
        try {
            // Garantir que os campos opcionais enviem null se estiverem vazios
            await addQuoteItem({
                ...values,
                fk_servico: values.fk_servico ?? null,
                fk_produto: values.fk_produto ?? null,
                notas: values.notas || null,
            } as any); // O 'as any' ignora o erro de conflito null/undefined da interface se necessário

            setOpen(false);
            form.reset();
        } catch (err) {
            console.error(err);
        }
    };

    return (
     <DialogContainer
            className="sm:max-w-xl"
            open={open}
            setOpen={setOpen}
            title="Configurar Item na Cotação"
            description="Selecione o item e ajuste os valores."
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    
                    {/* --- NOVO: SELEÇÃO DE PRODUTO OU SERVIÇO --- */}
                    <div className="space-y-4 p-4 border rounded-xl bg-muted/30">
                        <div className="flex gap-4 mb-2">
                            <Button 
                                type="button" 
                                variant={selectionType === "produto" ? "default" : "outline"}
                                size="sm"
                                onClick={() => setSelectionType("produto")}
                            >
                                Produto
                            </Button>
                            <Button 
                                type="button" 
                                variant={selectionType === "servico" ? "default" : "outline"}
                                size="sm"
                                onClick={() => setSelectionType("servico")}
                            >
                                Serviço
                            </Button>
                        </div>

                        <FormItem>
                            <FormLabel>Selecionar {selectionType === "produto" ? "Produto" : "Serviço"}</FormLabel>
                            <Select 
                                onValueChange={handleItemSelection}
                                value={form.getValues(selectionType === "produto" ? "fk_produto" : "fk_servico")?.toString()}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder={`Escolha o ${selectionType}...`} />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {selectionType === "produto" 
                                        ? products?.map(p => (
                                            <SelectItem key={p.id} value={p.id!.toString()}>{p.nome_produto}</SelectItem>
                                          ))
                                        : services?.map(s => (
                                            <SelectItem key={s.id} value={s.id!.toString()}>{s.nome_servico}</SelectItem>
                                          ))
                                    }
                                </SelectContent>
                            </Select>
                        </FormItem>
                    </div>
                    {/* --- FIM DA SELEÇÃO --- */}

                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="quantidade"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex items-center gap-2">
                                        <Layers className="h-4 w-4 text-muted-foreground" /> Quantidade
                                    </FormLabel>
                                    <FormControl>
                                        <Input type="number" min="1" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="uom"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Unidade (UoM)</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                                        <SelectContent>
                                            <SelectItem value="unidade">Unidade (un)</SelectItem>
                                            <SelectItem value="hora">Hora (h)</SelectItem>
                                            <SelectItem value="servico">Serviço (srv)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4 bg-accent/20 p-4 rounded-xl border border-muted/50">
                        <FormField
                            control={form.control}
                            name="preco_unico"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-bold flex items-center gap-2">
                                        <DollarSign className="h-4 w-4 text-green-600" /> Preço Unitário
                                    </FormLabel>
                                    <FormControl>
                                        <Input type="number" step="0.01" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="custo"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex items-center gap-2 text-primary font-semibold">
                                        <Calculator className="h-4 w-4" /> Total do Item
                                    </FormLabel>
                                    <FormControl>
                                        <Input type="number" readOnly className="bg-muted/50 font-bold" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancelar</Button>
                        <Button type="submit" disabled={isAdding || (!form.getValues("fk_produto") && !form.getValues("fk_servico"))}>
                            {isAdding ? "A salvar..." : "Adicionar à Cotação"}
                        </Button>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContainer>
    );
}