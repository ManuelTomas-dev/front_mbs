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
      title="Tracking"
      description="Create a new Tracking in the MBS system."
    >
      <form>
        <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
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

          <Field>
            <FieldLabel>Date Contact:</FieldLabel>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-[212px] justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                >
                  <span>Select a date:</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" />
              </PopoverContent>
            </Popover>
          </Field>

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
            <FieldLabel>Purchase If Any:</FieldLabel>
            <Input type="text" />
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

          <Field>
            <FieldLabel>Customer Type:</FieldLabel>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a customer type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup></SelectGroup>
              </SelectContent>
            </Select>
          </Field>
        </div>

        <Field className="mt-6">
          <FieldLabel>Description:</FieldLabel>
          <Textarea placeholder="Introduce here the description of the contact and discussion." />
        </Field>

        <Field className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 mt-6">
          <FieldLabel>Date to Complete Future Actions:</FieldLabel>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-[212px] justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
              >
                <span>Select a date:</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" />
            </PopoverContent>
          </Popover>
        </Field>

        <Field className="mt-6">
          <FieldLabel>Future Actions:</FieldLabel>
          <Textarea placeholder="Introduce here future actions." />
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
