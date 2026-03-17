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
import DialogForm from "@/components/module/crm/tenders/dialog-form";

export default function Page() {
  type ViewMode = "table" | "cards" | "list";

  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [editEntity, setEditEntity] = useState({});
  const [detailsEntity, setDetailsEntity] = useState({});

  const [formOpen, setFormOpen] = useState(false);

  const tableHeads = [
    "Tender Ref.",
    "Cost",
    "Title",
    "Change Of Conversion",
    "Date",
    "Raised By",
    "Contact",
    "Phone",
    "Email",
  ];

  return (
    <Container>
      <Title
        title="Tenders"
        description="Manage and view tenders information in the MBS system."
      />

      <CardContainer>
        <Card title="Registered Tenders" content="1234" />
        <Card title="Archived Tenders" content="10" />
        <Card title="Closed Tender" content="12" />
        <Card title="Converted Tender" content="28" />
      </CardContainer>

      <ActionBar>
        <Search
          searchBarPlaceholder="Search tenders..."
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <AddAction
          addActionName="New Tender"
          viewMode={viewMode}
          setViewMode={setViewMode}
          setAddFormOpen={setFormOpen}
          setSelectedEntity={setEditEntity}
        />
      </ActionBar>

      <Table tableHeads={tableHeads}></Table>

      <DialogForm open={formOpen} setOpen={setFormOpen} />
    </Container>
  );
}
