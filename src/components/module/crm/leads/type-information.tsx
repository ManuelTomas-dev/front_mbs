import { Check, FlameIcon } from "lucide-react";

function TypeInformation() {
  return (
    <div className="flex flex-col col-span-2 px-2 py-2 place-self-end">
      <div className="grid grid-cols-2 place-content-center">
        <h3 className="font-medium">Status:</h3>
        <div className="flex flex-row">
          <Check className="mx-2" />
          <p className="text-muted-foreground">New</p>
        </div>
      </div>

      <div className="grid grid-cols-2 place-content-center mt-3">
        <h3 className="font-medium">Interest:</h3>
        <div className="flex flex-row">
          <FlameIcon className="mx-2" />
          <p className="text-muted-foreground">Hot</p>
        </div>
      </div>
    </div>
  );
}

export default TypeInformation;
