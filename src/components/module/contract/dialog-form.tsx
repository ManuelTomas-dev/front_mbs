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
      title="Contract"
      description="Create a new Contract in the MBS system."
    >
      <form>
        <div className="grid grid-cols-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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

          <Field>
            <FieldLabel>Work Location:</FieldLabel>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a work location" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup></SelectGroup>
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel>Expected Start:</FieldLabel>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-53 justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
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
            <FieldLabel>Expected End:</FieldLabel>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-53 justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
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
            <FieldLabel>Quote:</FieldLabel>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a quotation" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup></SelectGroup>
              </SelectContent>
            </Select>
          </Field>

          <Field className="col-span-2">
            <FieldLabel>Estimated Value:</FieldLabel>
            <Input
              type="number"
              min={0}
              placeholder="Introduce the contract estimated value"
            />
          </Field>

          <Field>
            <FieldLabel>Location:</FieldLabel>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a location" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup></SelectGroup>
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel>Product Line:</FieldLabel>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a product line" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup></SelectGroup>
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel>Renewal Option:</FieldLabel>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a renewal option" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup></SelectGroup>
              </SelectContent>
            </Select>
          </Field>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 mt-6">
          <Field>
            <FieldLabel>Contract Reference:</FieldLabel>
            <Input type="text" />
          </Field>

          <Field>
            <FieldLabel>Contract Type:</FieldLabel>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a contract type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup></SelectGroup>
              </SelectContent>
            </Select>
          </Field>
        </div>

        <Field className="mt-6">
          <FieldLabel>Details:</FieldLabel>
          <Textarea placeholder="Introduce the details here..." />
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
