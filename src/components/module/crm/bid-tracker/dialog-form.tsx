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
      title="BID Tracker"
      description="Create a new BID tracker in the MBS system."
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
            <FieldLabel>Amout:</FieldLabel>
            <Input
              type="number"
              min={0}
              placeholder="Introduce the amount here"
            />
          </Field>

          <Field>
            <FieldLabel>BID Reference:</FieldLabel>
            <Input type="text" />
          </Field>

          <Field>
            <FieldLabel>Complete(%):</FieldLabel>
            <Slider defaultValue={[75]} max={100} step={1} className="mt-3" />
          </Field>

          <Field>
            <FieldLabel>Description:</FieldLabel>
            <Textarea placeholder="Introduce the description here..." />
          </Field>

          <Field>
            <FieldLabel>Follow Up Remarks:</FieldLabel>
            <Textarea placeholder="Introduce the follow up remarks here..." />
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
            <FieldLabel>Due Date:</FieldLabel>
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
            <FieldLabel>Date Received:</FieldLabel>
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
            <FieldLabel>Days Left:</FieldLabel>
            <Input
              type="number"
              min={0}
              placeholder="Introduce the days left here"
            />
          </Field>
        </div>

        <Field className="mt-6">
          <FieldLabel>Award Status:</FieldLabel>
          <Input type="text" />
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
