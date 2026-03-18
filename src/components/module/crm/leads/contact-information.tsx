import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PhoneIcon, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface ContactInformationProps {
  name: string;
  role: string;
  phoneNumber: string;
  email: string;
}

function ContactInformation({
  name,
  role,
  phoneNumber,
  email,
}: ContactInformationProps) {
  return (
    <div className="col-span-4 px-2 py-2">
      <h3 className="font-semibold py-2">Contact Information</h3>
      <Separator />
      <div className="flex flex-row content-center mt-4">
        <Avatar className="h-12 w-12 rounded-lg grayscale">
          <AvatarImage src={"/avatars/shadcn.jpg"} alt={"user"} />
          <AvatarFallback className="rounded-lg">CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col ml-4">
          <p>Manuel Nelo Tomás</p>
          <p className="text-muted-foreground">Procurement Management</p>
        </div>
      </div>

      <div className="flex flex-row content-center mt-4">
        <PhoneIcon className="ml-4" />
        <p className="text-muted-foreground ml-6">+244 945 340 598</p>
      </div>

      <div className="flex flex-row content-center mt-4">
        <Mail className="ml-4" />
        <p className="text-muted-foreground ml-6">manuel.tomas@netag.ao</p>
      </div>
    </div>
  );
}

export default ContactInformation;
