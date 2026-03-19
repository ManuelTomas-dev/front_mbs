"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Container from "@/components/generic/container";
import Title from "@/components/generic/title";
import Table from "@/components/generic/table";

export function TenderCosts() {
  const tableHeads = ["Type", "Description", "Amount(USD)", "Amount(AOA)"];

  return (
    <Container>
      <Title
        title="Tender Costs"
        description="Manage and view tender costs information in the MBS system."
      />
      <div className="grid grid-col-2 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-3 space-x-2">
        <Table style="col-span-2" tableHeads={tableHeads}></Table>
        <Table
          tableHeads={["Total BID Cost", "Expected Value", "Estimated BID ROI"]}
        ></Table>
      </div>
    </Container>
  );
}
