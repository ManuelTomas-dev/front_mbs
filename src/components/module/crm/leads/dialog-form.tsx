"use client";

import React, { useActionState } from "react";
import DialogContainer from "@/components/generic/dialog-container";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DialogFooter } from "@/components/ui/dialog";
import { ILead } from "@/types/crm/leads";

interface DialogFormProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

function DialogForm({ open, setOpen }: DialogFormProps) {
  async function action(prevState: Partial<ILead>, formData: FormData) {
    const payload = {
      reference: formData.get("reference"),
      id_client_contact: formData.get("id_client_contact"),
      description: formData.get("description"),
      inquiry_email: formData.get("inquiry_email"),
      interest: formData.get("interest"),
      id_contact_form: formData.get("id_contact_form"),
      id_source: formData.get("id_source"),
      id_owner: formData.get("id_owner"),
    };

    console.log(payload);
    return {};
  }

  async function handleOnSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    await formAction(formData);
  }

  const initialState: Partial<ILead> = {};
  const [formState, formAction, pending] = useActionState(action, initialState);

  return (
    <DialogContainer
      open={open}
      setOpen={setOpen}
      title="Lead"
      description="Create a new Lead in the MBS system."
    >
      <form onSubmit={handleOnSubmit}>
        <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
          <Field>
            <FieldLabel>Reference:</FieldLabel>
            <Input
              type="text"
              placeholder="Introduce the reference here"
              name="reference"
            />
          </Field>

          <Field>
            <FieldLabel>Client Contact:</FieldLabel>
            <Select name="id_client_contact">
              <SelectTrigger>
                <SelectValue placeholder="Select a client contact" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup></SelectGroup>
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel>Description:</FieldLabel>
            <Input
              type="text"
              placeholder="Introduce the description here"
              name="description"
            />
          </Field>

          <Field>
            <FieldLabel>Enquiry Email:</FieldLabel>
            <Input
              type="email"
              placeholder="Introduce the email here"
              name="inquiry_email"
            />
          </Field>

          <Field>
            <FieldLabel>Interest:</FieldLabel>
            <Select name="interest">
              <SelectTrigger>
                <SelectValue placeholder="Select an interest" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup></SelectGroup>
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel>Contact Form:</FieldLabel>
            <Select name="id_contact_form">
              <SelectTrigger>
                <SelectValue placeholder="Select a contact form" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup></SelectGroup>
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel>Source:</FieldLabel>
            <Select name="id_source">
              <SelectTrigger>
                <SelectValue placeholder="Select a source" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup></SelectGroup>
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel>Owner:</FieldLabel>
            <Select name="id_owner">
              <SelectTrigger>
                <SelectValue placeholder="Select the Owner" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup></SelectGroup>
              </SelectContent>
            </Select>
          </Field>
        </div>

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
