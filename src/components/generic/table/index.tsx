import React from "react";
import {
  Table as TableComponent,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ActionDropdown from "../action-dropdown";

interface BaseData {
  id: string | number;
  [key: string]: any;
}

interface TableProps<T extends BaseData> {
  tableHeads: string[];
  data?: T[];
  setSelectedItem: (value: any) => void;
  setDeleteDialog: (value: boolean) => void;
  children?: React.ReactNode;
}

function Table<T extends BaseData>({
  tableHeads,
  data,
  setSelectedItem,
  setDeleteDialog,
  children,
}: TableProps<T>) {
  const firstItem = data?.[0] ?? {};
  const dataKeys = Object.keys(firstItem).filter((key) => key != "id");

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
        <TableBody>
          {data?.map((item) => (
            <TableRow key={item.id}>
              {dataKeys.map((key, index, array) => (
                <>
                  <TableCell>{item[key]}</TableCell>
                  {index === array.length - 1 ? (
                    <TableCell className="text-right">
                      <ActionDropdown
                        item={item}
                        setSelectedEntity={setSelectedItem}
                        setDeleteDialogOpen={setDeleteDialog}
                      />{" "}
                    </TableCell>
                  ) : null}
                </>
              ))}
            </TableRow>
          ))}
          {!data?.length ? (
            <TableRow>
              <TableCell
                colSpan={tableHeads.length + 1}
                className="text-gray-500 text-center"
              >
                No registered data
              </TableCell>
            </TableRow>
          ) : null}
        </TableBody>
      </TableComponent>
    </div>
  );
}

export default Table;
