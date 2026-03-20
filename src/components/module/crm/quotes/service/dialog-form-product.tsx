"use client";

import React from "react";
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
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogFooter } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { useService } from "@/hooks/crm/service"; // Assumindo que você tenha esse hook

// 1. Schema para o Serviço baseado no seu JSON
const serviceSchema = z.object({
  nome_servico: z.string().min(3, "O nome do serviço deve ter pelo menos 3 caracteres"),
  custo: z.coerce.number().min(0.01, "O custo deve ser maior que zero"),
  imposto_retencao_fonte: z.boolean().default(false),
  quantidade_equipa: z.coerce.number().min(1, "A equipa deve ter pelo menos 1 pessoa"),
  codigo_servico: z.string().min(2, "Informe o código do serviço"),
  criado_por: z.number().default(1),
});

type ServiceFormValues = z.infer<typeof serviceSchema>;

interface ServiceDialogProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

function ServiceRegistrationDialog({ open, setOpen }: ServiceDialogProps) {
  const { createService } = useService(); // Hook para o backend Flask

  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      nome_servico: "",
      custo: 0,
      imposto_retencao_fonte: false,
      quantidade_equipa: 1,
      codigo_servico: "",
      criado_por: 1,
    },
  });

  const { formState: { isSubmitting } } = form;

  const onSubmit = async (values: ServiceFormValues) => {
    try {
      await createService(values);
      toast.success("Serviço registado com sucesso!");
      setOpen(false);
      form.reset();
    } catch (err) {
      console.error("Erro ao criar serviço:", err);
      toast.error("Erro ao criar serviço. Tente novamente.");
    }
  };

  return (
    <DialogContainer
      className="sm:max-w-lg"
      open={open}
      setOpen={setOpen}
      title="Registar Novo Serviço"
      description="Adicione novos serviços ao catálogo do sistema MBS."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          
          {/* NOME DO SERVIÇO */}
          <FormField
            control={form.control}
            name="nome_servico"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do Serviço</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Instalação de Software" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* CÓDIGO DO SERVIÇO */}
            <FormField
              control={form.control}
              name="codigo_servico"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Código (SKU)</FormLabel>
                  <Input placeholder="INST001" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* QUANTIDADE DA EQUIPA */}
            <FormField
              control={form.control}
              name="quantidade_equipa"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pessoas na Equipa</FormLabel>
                  <Input type="number" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Separator />

          {/* FINANCEIRO */}
          <div className="bg-accent/20 p-4 rounded-xl space-y-4">
            <FormField
              control={form.control}
              name="custo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Custo do Serviço (AOA/USD)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" className="bg-background" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imposto_retencao_fonte"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border bg-background p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Sujeito a Retenção na Fonte</FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "A guardar..." : "Registar Serviço"}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContainer>
  );
}

export default ServiceRegistrationDialog;