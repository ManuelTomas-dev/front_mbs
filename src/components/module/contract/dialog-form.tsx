"use client";

import React from "react";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import DialogContainer from "@/components/generic/dialog-container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Hooks (Ajuste os nomes conforme seu projeto)
import { useContract } from "@/hooks/crm/contract";
import { useLocation } from "@/hooks/partner/location";
import { useQuote } from "@/hooks/crm/quote";
import { useContact } from "@/hooks/partner/contact";
import { useAuthStore } from "@/store/auth";


const contractSchema = z.object({
  contrato_numero: z.string().min(1, "Contract number is required"),
  fk_localizacao: z.string().min(1, "Select a location"),
  fk_quotas: z.string().min(1, "Select a quote"),
  fk_cliente_contacto: z.string().min(1, "Select a client contact"),
  fk_local_trabalho: z.string().min(1, "Select a work location").optional(),
  descricao_contrato: z.string().min(5, "Description must be more detailed"),
  contrato_inicio: z.string().min(1, "Start date is required"),
  contrato_fim: z.string().min(1, "End date is required"),
  valor_estimado: z.string().min(1, "Enter the estimated value"),
  fk_tipo_contrato: z.string().min(1, "Select the type").optional(),
  prazo_renovacao: z.string().min(1, "Enter the renewal period"),
  fk_produte_line: z.string().min(1, "Select a product line").optional(),
  referencia_contrato: z.string().optional(),
});

type ContractFormValues = z.infer<typeof contractSchema>;

interface ContractDialogProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export function ContractCreateDialog({ open, setOpen }: ContractDialogProps) {
  const { createContract } = useContract();
  const { allLocations } = useLocation();
  const { quotes } = useQuote();
  const { allContacts } = useContact();
  const { getUserId } = useAuthStore();

  const form = useForm<ContractFormValues>({
    resolver: zodResolver(contractSchema),
    defaultValues: {
      contrato_numero: `CTR-${new Date().getFullYear()}-00${Math.floor(Math.random() * 10)}`,
      status_contrato: "Open",
      fk_usuario: "1",
    } as any,
  });

  {
    const {
      formState: { errors },
    } = form;
  }

  const onSubmit = async (values: ContractFormValues) => {
    try {
      await createContract({
        ...values,
        fk_localizacao: Number(values.fk_localizacao),
        fk_quotas: Number(values.fk_quotas),
        fk_cliente_contacto: Number(values.fk_cliente_contacto),
        fk_local_trabalho: 1,
        fk_tipo_contrato: 1,
        fk_produte_line: 1,
        prazo_renovacao: Number(values.prazo_renovacao),
        arquivado: false,
        fk_usuario: Number(getUserId()),
        contrato_fim: new Date(values.contrato_fim).toISOString(),
        contrato_inicio: new Date(values.contrato_inicio).toISOString(),
        status_contrato: "Open",
        contrato_numero: `CTR-${new Date().getFullYear()}-00${Math.floor(Math.random() * 10)}`,
        descricao_contrato: values.descricao_contrato,
        referencia_contrato: values.referencia_contrato!,
        valor_estimado: Number(values.valor_estimado!),
      });

      toast.success("Contrato criado com sucesso!");
      setOpen(false);
      form.reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DialogContainer
      className="sm:max-w-2xl" // Aumentado para comportar melhor o grid duplo
      open={open}
      setOpen={setOpen}
      title="New Contract"
      description="Fill in the details to generate the service provision contract."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

          {/* SEÇÃO 1: Identificação */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="contrato_numero"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-600 font-semibold">Contract Number</FormLabel>
                  <FormControl><Input {...field} className="bg-slate-50" /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="referencia_contrato"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>External Reference</FormLabel>
                  <FormControl><Input placeholder="REF-..." {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* SEÇÃO 2: Datas e Prazos */}
          <div className="p-4 border rounded-lg bg-slate-50/50 grid grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="contrato_inicio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Begin</FormLabel>
                  <FormControl><Input type="date" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contrato_fim"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End</FormLabel>
                  <FormControl><Input type="date" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="prazo_renovacao"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Renewal Period (Months)</FormLabel>
                  <FormControl><Input type="number" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* SEÇÃO 3: Financeiro e Classificação */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="valor_estimado"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estimated Value</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-slate-400 text-sm">AOA</span>
                      <Input className="pl-12" placeholder="0,00" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fk_produte_line"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Line</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl><SelectTrigger className="w-full"><SelectValue placeholder="Select" /></SelectTrigger></FormControl>
                    <SelectContent>
                      <SelectItem value="1">Hardware</SelectItem>
                      <SelectItem value="2">Software / Licence</SelectItem>
                      <SelectItem value="3">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="fk_localizacao"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value} // Adicione isso para o valor aparecer quando editado
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {allLocations?.map((location) => (
                        <SelectItem
                          key={location.id} // Key essencial aqui
                          value={String(location.id)} // Converte ID para string
                        >
                          {location.designacao_localidade_cliente}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fk_cliente_contacto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client Contact</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl><SelectTrigger className="w-full"><SelectValue placeholder="Select..." /></SelectTrigger></FormControl>
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

          {/* SEÇÃO 4: Descrição */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="fk_quotas"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quote</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl><SelectTrigger className="w-full"><SelectValue placeholder="Select..." /></SelectTrigger></FormControl>
                    <SelectContent>
                      {quotes.map((quote) => (
                        <SelectItem value={quote.id?.toString() || ""}>REF-{quote.custo}</SelectItem>
                      ))}

                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="descricao_contrato"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Object of the Contract (Description)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the services or scope of the contract..."
                      className="min-h-25 resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>


          <DialogFooter className="border-t pt-6">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
              Discard
            </Button>
            <Button
              type="submit"
              className="bg-blue-700 hover:bg-blue-800 text-white px-8"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Processing..." : "Finalize Contract"}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContainer>
  );
}