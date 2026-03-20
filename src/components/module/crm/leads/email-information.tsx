import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface EmailInformationProps {
  emailData: string;
}

function EmailInformation({ emailData }: EmailInformationProps) {
  return (
    <>
      <div className="flex flex-col">
        <h3 className="font-semibold py-2 ml-3">Description & Email Inquiry</h3>
        <Textarea
          rows={10}
          className="max-h-2.5 overflow-y-auto resize-none focus-visible:ring-0 focus-visible:ring-offset-0"
          value={emailData}
          readOnly
        />
      </div>
      <div className="flex justify-end">
        <Button type="button" className="w-12.5 self-end">
          <Download />
        </Button>
      </div>
    </>
  );
}

export default EmailInformation;
