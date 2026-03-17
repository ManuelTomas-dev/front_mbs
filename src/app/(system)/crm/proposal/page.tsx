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

export default function Page() {
  type ViewMode = "table" | "cards" | "list";

  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [editEntity, setEditEntity] = useState({});
  const [detailsEntity, setDetailsEntity] = useState({});

  const [formOpen, setFormOpen] = useState(false);

  const tableHeads = [
    "Date",
    "Client",
    "Client Contact",
    "Email",
    "Phone",
    "Cost",
    "Attachment",
    "Created By",
    "Status",
  ];

  return (
    <Container>
      <Title
        title="Proposal"
        description="Manage and view Proposals information in the MBS system."
      />

      <CardContainer>
        <Card title="Registered Proposals" content="1234" />
        <Card title="Archived Proposals" content="10" />
        <Card title="Converted Proposals" content="12" />
        <Card title="Client Contacts" content="28" />
      </CardContainer>

      <ActionBar>
        <Search
          searchBarPlaceholder="Search proposals..."
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <AddAction
          addActionName="New Proposal"
          viewMode={viewMode}
          setViewMode={setViewMode}
          setAddFormOpen={setFormOpen}
          setSelectedEntity={setEditEntity}
        />
      </ActionBar>

      <Table tableHeads={tableHeads}></Table>
    </Container>
  );
}
