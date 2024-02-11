import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AlertTriangle } from "lucide-react";

export default function TestTooltip() {
  return (
    <div className="absolute top-5 right-5">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="px-2 py-1 flex items-center gap-2 text-xl bg-[#7B3F00] text-yellow-400 font-semibold border-2 rounded-lg">
            <AlertTriangle />
            Test mode
          </TooltipTrigger>
          <TooltipContent>
            <p className="p-1 ">
              Sorry, The site is not finished yet. Therefore, some functions are
              not yet fully functional.
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
