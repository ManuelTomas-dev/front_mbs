import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import React from "react";
import { cn } from "@/lib/utils"

interface DialogContainerProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string
}

function DialogContainer({
  open,
  setOpen,
  title,
  description,
  children,
  className
}: DialogContainerProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className={cn("sm:max-w-200", className)}>
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
