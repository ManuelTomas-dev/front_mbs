"use client";
import Container from "@/components/generic/container";
import Title from "@/components/generic/title";
import CardContainer from "@/components/generic/card-container";
import Card from "@/components/generic/card";
import ActionBar from "@/components/generic/action-bar";
import Table from "@/components/generic/table";
import Search from "@/components/generic/search";
import { useState } from "react";
import AddAction from "@/components/generic/add-action";
import DialogForm from "@/components/module/contract/dialog-form";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function Page() {
  type ViewMode = "table" | "cards" | "list";

  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [editEntity, setEditEntity] = useState({});
  const [detailsEntity, setDetailsEntity] = useState({});

  const [formOpen, setFormOpen] = useState(false);

  const tableHeads = [
    "Contract Nº",
    "Client",
    "Contract Name",
    "Status",
    "Value",
    "Start Date",
    "End Date",
    "Contract Manager",
  ];

  const data = [
    {
      contract_number: "1",
      client: "Manuel Tomas",
      contract_name: "Validações",
      status: "Pending",
      value: "50 000kz",
      start_date: "19/03/2026",
      end_date: "22/03/2026",
      contract_manager: "Edson Zongo",
    },
    {
      contract_number: "1",
      client: "Manuel Tomas",
      contract_name: "Validações",
      status: "Pending",
      value: "50 000kz",
      start_date: "19/03/2026",
      end_date: "22/03/2026",
      contract_manager: "Edson Zongo",
    },
    {
      contract_number: "1",
      client: "Manuel Tomas",
      contract_name: "Validações",
      status: "Pending",
      value: "50 000kz",
      start_date: "19/03/2026",
      end_date: "22/03/2026",
      contract_manager: "Edson Zongo",
    },
  ];

  return (
    <Container style="container mx-auto max-w-360">
      <Title
        title="Contracts"
        description="Manage and view contracts information in the MBS system."
      />

      <CardContainer cardNumber={5}>
        <Card title="Total Contracts" content="1234" />
        <Card title="Total Contract Value" content="$40,500,00" />
        <Card title="Closed Value" content="$12,500,00" />
        <Card title="Active Value" content="$28,000,00" />
        <Card title="Average Contract Value" content="$7,850,00" />
      </CardContainer>

      <ActionBar>
        <Search
          searchBarPlaceholder="Search contracts..."
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <AddAction
          addActionName="New Contract"
          viewMode={viewMode}
          setViewMode={setViewMode}
          setAddFormOpen={setFormOpen}
          setSelectedEntity={setEditEntity}
        >
          <Button type="button">
            Export <Download />
          </Button>
        </AddAction>
      </ActionBar>

      <Table
        data={data}
        tableHeads={tableHeads}
        detailsLink="/contract/crm"
      ></Table>

      <DialogForm open={formOpen} setOpen={setFormOpen} />
    </Container>
  );
}
