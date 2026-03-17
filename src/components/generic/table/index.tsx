import React from "react";
import {
  Table as TableComponent,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TableProps {
  tableHeads: string[];
  children?: React.ReactNode;
}

function Table({ tableHeads, children }: TableProps) {
  return (
    <div className="rounded-md border mt-6">
      <TableComponent>
        <TableHeader>
          <TableRow>
            {tableHeads.map((head) => {
              return <TableHead>{head}</TableHead>;
            })}
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{children}</TableBody>
      </TableComponent>
    </div>
  );
}

export default Table;
