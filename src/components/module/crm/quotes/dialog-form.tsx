import DialogContainer from "@/components/generic/dialog-container";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { DialogFooter } from "@/components/ui/dialog";

interface DialogFormProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

function DialogForm({ open, setOpen }: DialogFormProps) {
  return (
    <DialogContainer
      open={open}
      setOpen={setOpen}
      title="Quote"
      description="Create a new quote in the MBS system."
    >
      <form>
        <Field>
          <FieldLabel>Client:</FieldLabel>
          <Select>
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
            <Select>
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
            <Select>
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
          <Select>
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
            <Input type="text" placeholder="(Ex.: Condoflow)" />
          </Field>

          <Field>
            <FieldLabel>Currency:</FieldLabel>
            <Select>
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
            <Textarea placeholder="Introduce a description here..." />
          </Field>

          <Field>
            <FieldLabel>Notes:</FieldLabel>
            <Textarea placeholder="Introduce the notes here..." />
          </Field>
        </div>

        <Field className="mt-6">
          <FieldLabel>Notes:</FieldLabel>
          <Textarea placeholder="Introduce the Terms & Conditions here..." />
        </Field>

        <DialogFooter className="mt-6">
          <Button type="button">Save</Button>
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
