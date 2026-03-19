import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SaveDraftSectionProps {
  status: string;
  count: number;
}

function SaveDraftSection({ status, count }: SaveDraftSectionProps) {
  return (
    <div className="w-full mt-auto flex flex-row justify-between">
      <p className="font-medium">
        {count} RF {status}
      </p>
      <div className="flex flex-row space-x-2">
        <Button className="font-semibold cursor-pointer" variant="outline">
          Save Draft
        </Button>
        <Button className="font-semibold cursor-pointer">
          <ChevronLeft />
        </Button>
        <Button className="font-semibold cursor-pointer">
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}

export default SaveDraftSection;
