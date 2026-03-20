"use client";

import React from "react";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import { CalendarIcon, FileText, Settings, Info } from "lucide-react";

import DialogContainer from "@/components/generic/dialog-container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DialogFooter } from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAmendment } from "@/hooks/crm/amendment";

// 1. Schema baseado no seu JSON
const amendmentSchema = z.object({
    // z.coerce garante que strings como "123" virem 123 (number)
    contract_id: z.coerce.number().min(1, "ID do contrato inválido"),
    amendment_title: z.string().min(1, "O título é obrigatório"),
    amendment_type: z.string().min(1, "O tipo é obrigatório"),
    status: z.string(),
    effective_date: z.string().min(1, "A data de vigência é obrigatória"),
});

type AmendmentFormValues = z.infer<typeof amendmentSchema>;

interface AmendmentDialogProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    contractId: number; // ID do contrato pai
}

export function AmendmentCreateDialog({ open, setOpen, contractId }: AmendmentDialogProps) {
    // Aqui você usaria o seu hook de mutations para Amendments, similar ao useInvoice
    const { registerAmendment } = useAmendment();

    const form = useForm<AmendmentFormValues>({
        resolver: zodResolver(amendmentSchema),
        defaultValues: {
            contract_id: Number(contractId),
            amendment_title: "",
            amendment_type: 'Financial',
            status: "In Review",
            effective_date: new Date().toISOString().split("T")[0],
        },
    });

    // É boa prática dar reset no form sempre que o contractId mudar ou o modal abrir
    React.useEffect(() => {
        if (open) {
            form.reset({
                contract_id: Number(contractId),
                amendment_title: "",
                amendment_type: 'Financial',
                status: "In Review",
                effective_date: new Date().toISOString().split("T")[0],
            });
        }
    }, [open, contractId, form]);


    const onSubmit = async (values: AmendmentFormValues) => {
        try {
            // Como é JSON puro, enviamos os values diretamente
            console.log("Enviando JSON:", values);
            await registerAmendment({
                amendment_title: values.amendment_title,
                contract_id: values.contract_id,
                effective_date: values.effective_date,
                status: values.status,
                amendment_type: values.amendment_type
            });

            toast({
                title: "Amendment registrado!",
                description: "A alteração foi enviada para revisão.",
            });
            setOpen(false);
            form.reset();
        } catch (error) {
            toast({
                title: "Erro ao registrar",
                variant: "destructive"
            });
        }
    };

    return (
        <DialogContainer
            className="sm:max-w-md"
            open={open}
            setOpen={setOpen}
            title="Registrar Amendment"
            description="Adicione uma alteração ou extensão ao contrato atual."
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid grid-cols-1 gap-4">
                        {/* Título do Amendment */}
                        <FormField
                            control={form.control}
                            name="amendment_title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Título da Alteração</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <FileText className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                            <Input placeholder="Ex: Aditivo de Prazo" className="pl-10" {...field} />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Tipo de Amendment */}
                        <FormField
                            control={form.control}
                            name="amendment_type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tipo</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Selecione o tipo" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Financial">Financial </SelectItem>
                                            <SelectItem value="Duration">Duration </SelectItem>
                                            <SelectItem value="Compliance">Compliance </SelectItem>
                                            <SelectItem value="Scope">Scope </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Selecione o status" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="In Review">In Review </SelectItem>
                                            <SelectItem value="Approved">Approved </SelectItem>
                                            <SelectItem value="Pending Approval">Pending Approval</SelectItem>
                                            <SelectItem value="Completed"> Completed</SelectItem>
                                            <SelectItem value="Rejected">Rejected </SelectItem>
                                            <SelectItem value="Cancelled">Cancelled </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Data Efetiva */}
                        <FormField
                            control={form.control}
                            name="effective_date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Data de Vigência</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <CalendarIcon className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                            <Input type="date" className="pl-10" {...field} />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <DialogFooter className="pt-4">
                        <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg">
                            Registrar Alteração
                        </Button>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContainer>
    );
}