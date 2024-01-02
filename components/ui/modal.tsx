import { ReactElement } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";

interface ModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  body?: ReactElement;
  footer?: ReactElement;
  step?: number;
  totalStep?: number;
}

export default function Modal({
  isOpen,
  onClose,
  body,
  footer,
  step,
  totalStep,
}: ModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
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
