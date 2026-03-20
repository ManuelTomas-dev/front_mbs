"use client";

import React from "react";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import { CalendarIcon, UploadCloud, DollarSign, User } from "lucide-react";

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
import { useInvoice } from "@/hooks/crm/invoice";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useContact } from "@/hooks/partner/contact";

const invoiceSchema = z.object({
    contract_id: z.string().min(1, "Contato é obrigatório"),
    invoice_date: z.string().min(1, "Data é obrigatória"),
    amount: z.string().min(1, "Valor é obrigatório"),
    file: z.any().refine((file) => file?.length > 0, "O arquivo da fatura é obrigatório"),
});

type InvoiceFormValues = z.infer<typeof invoiceSchema>;

interface InvoiceDialogProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    contactData: { id: string; name: string }; // Recebe o contato selecionado
}

export function InvoiceCreateDialog({ open, setOpen, contactData }: InvoiceDialogProps) {
    const { registerInvoice, isRegistering, isSuccess } = useInvoice();
    const { allContacts } = useContact();

    const form = useForm<InvoiceFormValues>({
        resolver: zodResolver(invoiceSchema),
        defaultValues: {
            contract_id: contactData.id,
            invoice_date: new Date().toISOString().split("T")[0],
            amount: "",
        },
    });

    const {
        formState: { errors },
    } = form;

    const onSubmit = async (values: InvoiceFormValues) => {
        try {
            const formData = new FormData();
            formData.append("contract_id", values.contract_id);
            formData.append("date", values.invoice_date);
            formData.append("value", values.amount);

            // Captura o arquivo do FileList
            if (values.file && values.file[0]) {
                formData.append("file", values.file[0]);
            }
            registerInvoice(formData);


            console.log("Enviando FormData...");
            toast({
                title: "Invoice registrada com sucesso!",
                description: "Fatura enviada com sucesso!",
            });
            setOpen(false);
            form.reset();
        } catch (error) {
            toast({
                title: "Erro ao registrar invoice",
                description: "Invoice registrada sem sucesso!"
            });
        }
    };

    return (
        <DialogContainer
            className="sm:max-w-md"
            open={open}
            setOpen={setOpen}
            title="Registrar Invoice"
            description="Faça o upload da fatura correspondente a este contrato."
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    {/* Info do Contato (Read Only) */}
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                        <User className="h-5 w-5 text-blue-600" />
                        <div>
                            <p className="text-xs text-blue-600 font-medium">Faturar para:</p>
                            <p className="text-sm font-bold text-blue-900">{contactData.name}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        <FormField
                            control={form.control}
                            name="invoice_date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Data da Fatura</FormLabel>
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

                        <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Valor da Fatura</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                            <Input placeholder="0,00" className="pl-10" {...field} />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="file"
                            render={({ field: { onChange, value, ...rest } }) => (
                                <FormItem>
                                    <FormLabel>Documento (PDF/PNG)</FormLabel>
                                    <FormControl>
                                        <div className="border-2 border-dashed border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors cursor-pointer relative">
                                            <input
                                                type="file"
                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                                accept=".pdf,.png,.jpg,.jpeg"
                                                onChange={(e) => onChange(e.target.files)}
                                                {...rest}
                                            />
                                            <div className="flex flex-col items-center justify-center gap-2">
                                                <UploadCloud className="h-8 w-8 text-slate-400" />
                                                <p className="text-sm text-slate-600 text-center">
                                                    {form.watch("file")?.[0]?.name || "Clique para selecionar o arquivo"}
                                                </p>
                                            </div>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="contract_id"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Client Contact</FormLabel>
                                    <Select onValueChange={field.onChange}>
                                        <FormControl><SelectTrigger className="w-full">
                                            <SelectValue placeholder="Selecione..." />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {allContacts.map((contact) => (
                                                <SelectItem value={contact.id.toString()}>{contact.nome_contato}</SelectItem>
                                            ))}

                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <DialogFooter className="pt-4">
                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-100">
                            Registrar Invoice
                        </Button>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContainer>
    );
}