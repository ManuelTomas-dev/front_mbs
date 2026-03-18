import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, MoreHorizontal, Edit, Archive, Trash2, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BaseItem {
  id: string | number;
  [key: string]: any;
}
interface ActionDropdownProps {
  item: BaseItem;
  setSelectedEntity: (value: any) => void;
  setDeleteDialogOpen: (value: boolean) => void;
}

function ActionDropdwon({
  item,
  setDeleteDialogOpen,
  setSelectedEntity,
}: ActionDropdownProps) {
  const handleAction = (action: string) => {
    switch (action) {
      case "view":
        setSelectedEntity(item);
        break;
      case "edit":
        setSelectedEntity(item);
        break;
      case "delete":
        setSelectedEntity(item);
        setDeleteDialogOpen(true);
        break;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleAction("view")}>
          <Eye className="mr-2 h-4 w-4" />
          View Details
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleAction("edit")}>
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleAction("duplicate")}>
          <Copy className="mr-2 h-4 w-4" />
          Duplicate
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleAction("archive")}>
          <Archive className="mr-2 h-4 w-4" />
          Archive
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleAction("delete")}
          className="text-red-600 focus:text-red-600"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ActionDropdwon;
