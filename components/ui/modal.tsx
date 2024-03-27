import { ReactElement } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  body?: ReactElement;
  footer?: ReactElement;
  step?: number;
  totalStep?: number;
  isEditing?: boolean;
}

export default function Modal({
  isOpen,
  onClose,
  body,
  footer,
  step,
  totalStep,
  isEditing,
}: ModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={cn(
          "bg-black p-1",
          isEditing && "h-[80vh] overflow-x-hidden overflow-y-auto"
        )}
      >
        <div className="flex items-center gap-6">
          <button
            className="w-fit p-1 hover:opacity-70 transition"
            onClick={onClose}
          >
            <X size={28} />
          </button>
          {step && totalStep && (
            <span className="text-xl font-bold">
              Step {step} of {totalStep}
            </span>
          )}
        </div>
        <div>{body}</div>
        {footer && <div>{footer}</div>}
      </DialogContent>
    </Dialog>
  );
}
