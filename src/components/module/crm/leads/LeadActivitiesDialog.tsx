"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import {
  MessageSquare,
  Plus,
  Calendar,
  User as UserIcon,
  Send,
  History
} from "lucide-react";
import dayjs from "dayjs";

import DialogContainer from "@/components/generic/dialog-container";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { ILeadData } from "@/types/crm/leads";
import { useLeadActivity } from "@/hooks/crm/leadsActivity";

const activitySchema = z.object({
  description: z.string().min(3, "Descreva a atividade"),
  stackholder_no_user: z.string().optional(),
  id_type_activity: z.string().default("1"),
});

type ActivityFormValues = z.infer<typeof activitySchema>;

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  lead: ILeadData | null;
}

export function LeadActivitiesDialog({ open, setOpen, lead }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { leadsActivity, createActivity } = useLeadActivity(lead?.id || 0);

  const form = useForm<ActivityFormValues>({
    resolver: zodResolver(activitySchema),
    defaultValues: {
      description: "",
      stackholder_no_user: "",
      id_type_activity: "1",
    },
  });

  const onSubmit = async (values: ActivityFormValues) => {
    if (!lead) return;
    setIsSubmitting(true);
    try {
      // Exemplo de chamada API (Substitua pelo seu hook/api)
      // await api.post(`/leads/${lead.id}/activities`, values);

      createActivity({
        description: values.description,
        stackholder_no_user: values.stackholder_no_user,
        id_lead: lead.id,
        id_type_activity: 1

      })
      toast({
        title: "Atividade registada!",
        description: "A atividade foi registada com sucesso!"
      });
      form.reset();
    } catch (error) {
      toast({ title: "Erro ao registar", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DialogContainer
      open={open}
      setOpen={setOpen}
      title={`Atividades: ${lead?.reference || ""}`}
      description="Histórico de interações e registo de novos eventos."
      className="sm:max-w-xl"
    >
      <div className="space-y-6 pt-4">
        {/* Formulário de Adição Rápida */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 bg-muted/30 p-4 rounded-xl border">
            <div className="grid grid-cols-2 gap-2">
              <FormField
                control={form.control}
                name="stackholder_no_user"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Interlocutor (Ex: Sr. João)" className="h-8 text-xs" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Badge variant="outline" className="w-fit ml-auto">Nova Interação</Badge>
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="O que aconteceu nesta interação?"
                      className="min-h-20 text-sm resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="submit" size="sm" disabled={isSubmitting} className="gap-2">
                <Send className="w-3 h-3" /> Registar
              </Button>
            </div>
          </form>
        </Form>

        <Separator />

        {/* Lista de Atividades (Timeline) */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium flex items-center gap-2 px-1">
            <History className="w-4 h-4" /> Histórico
          </h4>

          <ScrollArea className="h-75 pr-4">
            <div className="space-y-6 ml-2 border-l-2 border-muted pl-6">
              {/* Mapeamento das atividades da lead */}
              {leadsActivity?.length ? leadsActivity.map((act: any) => (
                <div key={act.id} className="relative">
                  <div className="absolute -left-7.75 top-1 bg-background p-1 rounded-full border-2 border-muted">
                    <MessageSquare className="w-3 h-3 text-primary" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-foreground">
                        {act.stackholder_no_user || "Contacto Geral"}
                      </span>
                      <span className="text-[10px] text-muted-foreground italic">
                        {dayjs(act.created_at).format("DD MMM, HH:mm")}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {act.description}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[10px] flex items-center gap-1 text-muted-foreground">
                        <UserIcon className="w-3 h-3" /> {act.user?.username || "Sistema"}
                      </span>
                    </div>
                  </div>
                </div>
              )) : (
                <p className="text-xs text-muted-foreground text-center py-4">Nenhuma atividade registada.</p>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </DialogContainer>
  );
}