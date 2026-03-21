"use client";

import React, { useActionState } from "react";
import DialogContainer from "@/components/generic/dialog-container";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
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
  title: z.string().min(3, "Title must be at least 3 characters"),
  currency_id: z.string().min(1, "Select a currency"),
  description: z.string().optional(),
  notes: z.string().optional(),
  terms_conditions: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

function DialogForm({ open, setOpen }: DialogFormProps) {
  
  async function action(prevState: Partial<IQuote>, formData: FormData) {
    const payload = {
      client_id: formData.get("client_id"),
      client_location_id: formData.get("client_location_id"),
      client_contract_id: formData.get("client_contract_id"),
      opportunity_id: formData.get("opportunity_id"),
      title: formData.get("title"),
      currency_id: formData.get("currency_id"),
      description: formData.get("description"),
      notes: formData.get("notes"),
      terms_conditions: formData.get("terms_conditions"),
    };

    return {};
  }

  async function handleOnSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    await formAction(formData);
  }

  const initialState: Partial<IQuote> = {};
  const [formState, formAction, pending] = useActionState(action, initialState);


  return (
    <DialogContainer
      open={open}
      setOpen={setOpen}
      title="Quote"
      description="Create a new quote in the MBS system."
    >
      <form onSubmit={handleOnSubmit}>
        <Field>
          <FieldLabel>Client:</FieldLabel>
          <Select name="client_id">
            <SelectTrigger>
              <SelectValue placeholder="Select a client" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup></SelectGroup>
            </SelectContent>
          </Select>
        </Field>

        <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 mt-6">
          <Field>
            <FieldLabel>Client Location:</FieldLabel>
            <Select name="client_location_id">
              <SelectTrigger>
                <SelectValue placeholder="Select a client location" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup></SelectGroup>
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel>Client Contact:</FieldLabel>
            <Select name="client_contact_id">
              <SelectTrigger>
                <SelectValue placeholder="Select a client contact" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup></SelectGroup>
              </SelectContent>
            </Select>
          </Field>
        </div>

        <Field className="mt-6">
          <FieldLabel>Opportunity:</FieldLabel>
          <Select name="opportunity_id">
            <SelectTrigger>
              <SelectValue placeholder="Select a opportunity" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup></SelectGroup>
            </SelectContent>
          </Select>
        </Field>

        <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 mt-6">
          <Field>
            <FieldLabel>Title:</FieldLabel>
            <Input
              type="text"
              name="title"
              placeholder="Introduce the title here"
            />
          </Field>

          <Field>
            <FieldLabel>Currency:</FieldLabel>
            <Select name="currency_id">
              <SelectTrigger>
                <SelectValue placeholder="Select a currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup></SelectGroup>
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel>Description:</FieldLabel>
            <Textarea
              name="description"
              placeholder="Introduce a description here..."
            />
          </Field>

          <Field>
            <FieldLabel>Notes:</FieldLabel>
            <Textarea name="notes" placeholder="Introduce the notes here..." />
          </Field>
        </div>

        <Field className="mt-6">
          <FieldLabel>Terms & Conditions:</FieldLabel>
          <Textarea
            name="terms_conditions"
            placeholder="Introduce the Terms & Conditions here..."
          />
        </Field>

        <DialogFooter className="mt-6">
          <Button type="submit">Save</Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </Button>
        </DialogFooter>
      </form>
    </DialogContainer>
  );
}

export default DialogForm;
