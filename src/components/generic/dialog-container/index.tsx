import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import React from "react";

interface DialogContainerProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  title: string;
  description: string;
  children: React.ReactNode;
}

function DialogContainer({
  open,
  setOpen,
  title,
  description,
  children,
}: DialogContainerProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}

export default DialogContainer;
