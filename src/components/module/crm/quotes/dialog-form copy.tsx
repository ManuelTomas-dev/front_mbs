"use client";

import React, { useActionState, useEffect } from "react";
import DialogContainer from "@/components/generic/dialog-container";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DialogFooter } from "@/components/ui/dialog";
import { IQuote } from "@/types/crm/quotes";
import { useClient } from "@/hooks/partner/client";
import { useLocation } from "@/hooks/partner/location";
import { useContact } from "@/hooks/partner/contact";
import z from "zod";
interface DialogFormProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}
const formSchema = z.object({
  client_id: z.string().min(1, "Select a client"),
  client_location_id: z.string().min(1, "Select a location"),
  client_contact_id: z.string().min(1, "Select a contact"),
  opportunity_id: z.string().optional(),
  title: z.string().min(3, "Title must have at least 3 characters"),
  currency_id: z.string().min(1, "Select a currency"),
  description: z.string().optional(),
  notes: z.string().optional(),
  terms_conditions: z.string().optional(),
});


type FormValues = z.infer<typeof formSchema>;

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useQuote } from "@/hooks/crm/quote";
import { toast } from "sonner";

interface DialogFormProps {

  open: boolean;
  setOpen: (value: boolean) => void;
  onSubmitAction: (data: FormValues) => void; // Passando a lógica de salvar por prop
}

function DialogFormCopy({ open, setOpen, onSubmitAction }: DialogFormProps) {

  // ... dentro do componente DialogForm ...

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      client_id: "",
      client_location_id: "",
      client_contact_id: "",
      opportunity_id: "",
      currency_id: "",
      description: "",
      notes: "",
      terms_conditions: "",
      title: "",
      // ... outros campos
    },
  });

  const {
    formState: { errors, isSubmitting },
    watch
  } = form;

  const { clients } = useClient();

  const { locations } = useLocation(watch("client_id"));

  const { contacts } = useContact(watch("client_location_id"));

  const { createQuote } = useQuote();


  const onSubmit = async (values: FormValues) => {
    try {
      await createQuote({
        codigo_quotacao: `QT-${Date.now()}`, // Gerando um código temporário se necessário
        custo: 0,
        descricao: values.description || "",
        fk_cliente_contacto: Number(values.client_contact_id),
        fk_moeda: 2,
        fk_usuario: 1,
        notas: values.notes || "",
        oportunidade_conversao: values.opportunity_id ? Number(values.opportunity_id) : 0,
        status_quote: "Open",
        termos_condicoes: values.terms_conditions || "",
      });

      toast.success("Quote created successfully!");
      setOpen(false);
      form.reset(); // Limpa o formulário após sucesso
    } catch (err) {
      // O erro já é tratado no onError do useMutation, mas você pode capturar aqui também
      console.error("Error creating quote:", err);
    }
  };

  return (
    <DialogContainer
      className="sm:max-w-lg"
      open={open}
      setOpen={setOpen}
      title="Quote"
      description="Create a new quote in the MBS system."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

          {/* CLIENT SELECT (FULL WIDTH) */}
          <FormField
            control={form.control}
            name="client_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a client" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {clients?.map((client) => (
                      <SelectItem key={client.id} value={String(client.id)}>
                        {client.nome_cliente}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* GRID: LOCATION & CONTACT */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="client_location_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client Location</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {/* Renderize suas localizações aqui */}
                        {locations?.map(({
                          designacao_localidade_cliente,
                          id,
                        }) => (
                          <SelectItem
                            key={id}
                            value={String(id)}
                          >
                            {designacao_localidade_cliente}
                          </SelectItem>
                        ))}
                      </SelectGroup>

                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="client_contact_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client Contact</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select contact" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {/* Renderize seus contatos aqui */}
                        {contacts?.map((contact) => (
                          <SelectItem
                            key={contact.id}
                            value={String(contact.id)}
                          >
                            {contact.email}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* OPPORTUNITY & CURRENCY */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="opportunity_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Opportunity</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select opportunity" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {/* Itens aqui */}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="currency_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Currency</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">AOA</SelectItem>
                      <SelectItem value="2">USD</SelectItem>
                      <SelectItem value="3">EUR</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* TITLE */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Introduce the title here" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* DESCRIPTION & NOTES */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Description here..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Notes here..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* TERMS & CONDITIONS */}
          <FormField
            control={form.control}
            name="terms_conditions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Terms & Conditions</FormLabel>
                <FormControl>
                  <Textarea placeholder="Terms & Conditions..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Quote"}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContainer>
  );
}

export default DialogFormCopy;
