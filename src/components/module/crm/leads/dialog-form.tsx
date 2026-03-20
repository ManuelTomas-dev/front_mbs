"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import {
  Hash,
  Mail,
  FileText,
  Activity,
  Zap,
  User,
  Share2,
  Save,
  X,
  Target,
  RotateCw
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

import DialogContainer from "@/components/generic/dialog-container";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DialogFooter } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

// Hooks (Adaptados para a estrutura de Leads)
import { useContact } from "@/hooks/partner/contact";
import { useLead } from "@/hooks/crm/leads";
import { useAuthStore } from "@/store/auth";
import { usePersonnel } from "@/hooks/operation/personnel";
import { api } from "@/lib/api";
import { ILeadData } from "@/types/crm/leads";

interface ILead {
  reference: string;
  id_client_contact: number;
  description: string;
  inquiry_email: string;
  status: string;
  interest: string;
  id_contact_form: number;
  id_source: number;
  id_owner: number;
  id_user_created: string;
}

const leadSchema = z.object({
  reference: z.string().min(1, "A referência é obrigatória"),
  inquiry_email: z.string().email("E-mail de inquérito inválido"),
  description: z.string().min(5, "Descreva detalhadamente o interesse"),
  status: z.string().min(1, "Selecione o estado"),
  interest: z.string().min(1, "Selecione o nível de interesse"),
  id_client_contact: z.string().min(1, "Selecione um contacto"),
  id_source: z.string().min(1, "Selecione a fonte"),
  id_owner: z.string().min(1, "Atribua um gestor"),
});

type LeadFormValues = z.infer<typeof leadSchema>;

interface DialogFormProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  initialData?: Partial<ILeadData>;
}

function LeadDialogForm({ open, setOpen, initialData }: DialogFormProps) {
  const { createLead } = useLead();
  const { getUserId } = useAuthStore();
  const { personnel } = usePersonnel();

  // Hook de contactos (exemplo: buscando todos ou filtrando se necessário)
  const { allContacts } = useContact();
  const { user, setToken } = useAuthStore();

  const form = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      reference: initialData?.reference || "",
      inquiry_email: initialData?.inquiry_email || "",
      description: initialData?.description || "",
      status: initialData?.status || "New",
      interest: initialData?.interest || "Warm",
      id_client_contact: initialData?.id_client_contact ? String(initialData.id_client_contact) : "",
      id_source: initialData?.id_source ? String(initialData.id_source) : "",
      id_owner: initialData?.id_owner ? String(initialData.id_owner) : "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: LeadFormValues) => {
    try {
      await createLead({
        ...values,
        id_client_contact: Number(values.id_client_contact),
        id_source: 1,
        id_owner: Number(values.id_owner),
        id_contact_form: 1, // Default ou vindo de prop
        id_user_created: getUserId() ?? "1", // ID do utilizador logado
      });

      toast({
        title: "Lead criada com sucesso!",
        description: "A lead foi criada com sucesso.",
      });
      setOpen(false);
      form.reset();
    } catch (err: any) {
      console.error("Erro ao criar lead:", err);
      const isAuthError = err.response?.status === 401;

      toast({
        title: isAuthError ? "Sessão Expirada" : "Erro ao processar",
        variant: "destructive",
        action: isAuthError ? (
          <Button
            variant="outline"
            size="sm"
            onClick={async () => {
              try {
                // No backend, enviamos o user.id (ou pegamos do identity do Refresh Token se usar o Flask-JWT corretamente)
                const response = await api.post("/auth/refresh-token", { user_id: user.id });

                // 2. SALVE O NOVO TOKEN NO STORE
                const newToken = response.data.access_token;
                setToken(newToken);

                toast({ title: "Sucesso!", description: "Sessão renovada. Tente guardar a lead agora." });
              } catch (refreshErr) {
                toast({ title: "Erro", description: "Não foi possível renovar. Faça login novamente." });
              }
            }}
          >
            <RotateCw className="w-4 h-4 mr-2" /> Renovar
          </Button>
        ) : undefined
      });
    };
  };

  return (
    <DialogContainer
      open={open}
      setOpen={setOpen}
      title="Nova Lead"
      description="Registe potenciais oportunidades e clientes interessados."
      className="sm:max-w-2xl"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="reference"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Hash className="w-4 h-4 text-muted-foreground" /> Referência
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: LEAD-001" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="inquiry_email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" /> E-mail
                  </FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="cliente@exemplo.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-muted-foreground" /> Descrição do Interesse
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Detalhes sobre os serviços solicitados..."
                    className="min-h-25 resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Separator className="opacity-50" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-muted-foreground" /> Status
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="sm:w-full h-9">
                        <SelectValue placeholder="Estado inicial" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="New">Novo</SelectItem>
                      <SelectItem value="In Progress">Em Análise</SelectItem>
                      <SelectItem value="Qualified">Qualificado</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="interest"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-muted-foreground" /> Interesse
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="sm:w-full h-9">
                        <SelectValue placeholder="Prioridade" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Hot">Prioridade Alta (Hot)</SelectItem>
                      <SelectItem value="Warm">Prioridade Média (Warm)</SelectItem>
                      <SelectItem value="Cold">Prioridade Baixa (Cold)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-muted/30 p-4 rounded-lg border border-border/50">
            <FormField
              control={form.control}
              name="id_client_contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs uppercase flex items-center gap-1">
                    <User className="w-3 h-3" /> Contacto
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="sm:w-full h-9">
                        <SelectValue placeholder="Selecionar" />

                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {allContacts?.map((c) => (
                        <SelectItem key={c.id} value={String(c.id)}>{c.email}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="id_source"
              render={({ field }) => (
                <FormItem >
                  <FormLabel className="text-xs uppercase flex items-center gap-1">
                    <Share2 className="w-3 h-3" /> Fonte
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} >
                    <FormControl>
                      <SelectTrigger className="sm:w-full h-9">
                        <SelectValue placeholder="Source" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">Email</SelectItem>
                      <SelectItem value="2">whatsaap</SelectItem>
                      <SelectItem value="3">Telefone</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="id_owner"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs uppercase flex items-center gap-1">
                    <Share2 className="w-3 h-3" /> Fonte
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="sm:w-full h-9">
                        <SelectValue placeholder="Selecionar" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {personnel?.map((c) => (
                        <SelectItem key={c.id} value={String(c.id)}>{c.first_name + " " + c.last_name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

          </div>

          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2"
            >
              <X className="w-4 h-4" /> Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6"
            >
              {isSubmitting ? (
                "A guardar..."
              ) : (
                <>
                  <Save className="w-4 h-4" /> Guardar Lead
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContainer>
  );
}

export default LeadDialogForm;