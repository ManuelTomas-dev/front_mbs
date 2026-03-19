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
    "Tender Ref.",
    "Customer",
    "Incumbent Name",
    "Winning Change Probability",
    "Number Of Participants",
  ];

  return (
    <Container>
      <Title
        title="Tender Proposals"
        description="Manage and view Tender Proposals information in the MBS system."
      />

      <CardContainer>
        <Card title="Registered Tender Proposals" content="1234" />
        <Card title="Archived Tender Proposals" content="10" />
        <Card title="Participants" content="12" />
        <Card title="Customers" content="28" />
      </CardContainer>

      <ActionBar>
        <Search
          searchBarPlaceholder="Search tender proposals..."
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <AddAction
          addActionName="New Tender Proposal"
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
