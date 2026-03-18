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
    "Lead",
    "Company",
    "Contact",
    "Source",
    "Status",
    "Owner",
    "Last Contact",
  ];

  return (
    <Container>
      <Title
        title="Leads"
        description="Manage and view Leads information in the MBS system."
      />

      <CardContainer>
        <Card title="New Leads" content="1234" />
        <Card title="Hot Leads" content="10" />
        <Card title="Opportunities" content="12" />
        <Card title="Conversion" content="28%" />
      </CardContainer>

      <ActionBar>
        <Search
          searchBarPlaceholder="Search leads..."
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <AddAction
          addActionName="New Lead"
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

      <Table tableHeads={tableHeads}></Table>
    </Container>
  );
}
