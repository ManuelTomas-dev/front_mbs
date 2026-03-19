"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileText, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const costItems = [
  {
    id: 1,
    type: "Tender Dossier Purchase",
    amountBudget: 500,
    amountActual: 600,
  },
  {
    id: 2,
    type: "Printing & Copies",
    amountBudget: 150,
    amountActual: 150,
  },
  {
    id: 3,
    type: "Courier & Delivery",
    amountBudget: 100,
    amountActual: 100,
  },
  {
    id: 4,
    type: "USB Drives",
    amountBudget: 50,
    amountActual: 50,
  },
];

export function TenderCosts() {
  const [rowsPerPage, setRowsPerPage] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);

  const totalBidCost = costItems.reduce(
    (sum, item) => sum + item.amountActual,
    0,
  );
  const expectedValue = 120000;
  const roi = expectedValue / totalBidCost;

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-semibold text-slate-800">
            Tender Costs
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex">
            {/* Cost Table */}
            <div className="flex-1">
              {/* Table Header */}
              <div className="grid grid-cols-[100px_1fr_140px_140px] bg-slate-700 text-white text-sm font-medium">
                <div className="px-4 py-3">Type</div>
                <div className="px-4 py-3">Description</div>
                <div className="px-4 py-3 text-center">Amount (USD)</div>
                <div className="px-4 py-3 text-center">Amount (USD)</div>
              </div>

              {/* Table Body */}
              {costItems.map((item, index) => (
                <div
                  key={item.id}
                  className={`grid grid-cols-[100px_1fr_140px_140px] text-sm border-b border-slate-200 ${
                    index % 2 === 0 ? "bg-white" : "bg-slate-50"
                  }`}
                >
                  <div className="px-4 py-3 flex items-center">
                    <FileText className="h-4 w-4 text-amber-500" />
                  </div>
                  <div className="px-4 py-3 text-slate-700">{item.type}</div>
                  <div className="px-4 py-3 text-center text-slate-600">
                    ${item.amountBudget.toLocaleString()}
                  </div>
                  <div className="px-4 py-3 text-center font-medium text-slate-800">
                    ${item.amountActual.toLocaleString()}
                  </div>
                </div>
              ))}

              {/* Total Row */}
              <div className="grid grid-cols-[100px_1fr_140px_140px] text-sm bg-slate-100 border-b border-slate-200">
                <div className="px-4 py-3"></div>
                <div className="px-4 py-3 font-semibold text-slate-800">
                  Total Bid Cost
                </div>
                <div className="px-4 py-3"></div>
                <div className="px-4 py-3"></div>
              </div>

              {/* Pagination */}
              <div className="flex items-center gap-2 px-4 py-4">
                <span className="text-sm text-slate-600">Rows per page:</span>
                <Select value={rowsPerPage} onValueChange={setRowsPerPage}>
                  <SelectTrigger className="w-16 h-8 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex items-center gap-1 ml-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>

                  {[1, 2, 3].map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "ghost"}
                      size="icon"
                      className={`h-8 w-8 text-sm ${
                        currentPage === page
                          ? "bg-slate-700 text-white hover:bg-slate-800"
                          : "text-slate-600 hover:bg-slate-200"
                      }`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                  ))}

                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setCurrentPage(Math.min(3, currentPage + 1))}
                    disabled={currentPage === 3}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Summary Panel */}
            <div className="w-64 bg-slate-50 border-l border-slate-200">
              <div className="p-4 space-y-4">
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-slate-600">Total Bid Cost</span>
                  <span className="text-lg font-bold text-slate-800">
                    ${totalBidCost.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-t border-slate-200">
                  <span className="text-sm text-slate-600">Expected Value</span>
                  <span className="text-lg font-bold text-blue-600">
                    ${expectedValue.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-t border-slate-200">
                  <span className="text-sm text-slate-600">
                    Estimated Bid ROI
                  </span>
                  <span className="text-lg font-bold text-amber-500">High</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
