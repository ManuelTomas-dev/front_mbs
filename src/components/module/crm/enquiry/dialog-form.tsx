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
      title="Enquiry"
      description="Create a new enquiry in the MBS system."
    >
      <form>
        <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
          <Field>
            <FieldLabel>Title:</FieldLabel>
            <Input type="text" placeholder="(Ex.: Condoflow)" />
          </Field>

          <Field>
            <FieldLabel>Enquery Source:</FieldLabel>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select an enquery source" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup></SelectGroup>
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel>Date:</FieldLabel>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-[212px] justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                >
                  <span>Pick a date</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" />
              </PopoverContent>
            </Popover>
          </Field>

          <Field>
            <FieldLabel>Sales Person:</FieldLabel>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a sales person" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup></SelectGroup>
              </SelectContent>
            </Select>
          </Field>
        </div>

        <Field className="mt-4">
          <FieldLabel>Enquery:</FieldLabel>
          <Textarea placeholder="Introduce the enquery details here." />
        </Field>

        <Field className="mt-4">
          <FieldLabel>Enquery Notes:</FieldLabel>
          <Textarea placeholder="Introduce the enquery notes here." />
        </Field>

        <Field className="mt-4">
          <FieldLabel>Likelyhood of Conversion:</FieldLabel>
          <Slider
            defaultValue={[75]}
            max={100}
            step={1}
            className="mx-auto w-full max-w-xs"
          />
        </Field>

        <Field className="mt-6">
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
            <FieldLabel>Person of Contact:</FieldLabel>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a person of contact" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup></SelectGroup>
              </SelectContent>
            </Select>
          </Field>
        </div>

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
