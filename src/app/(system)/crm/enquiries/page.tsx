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
import DialogForm from "@/components/module/crm/enquiry/dialog-form";

export default function Page() {
  type ViewMode = "table" | "cards" | "list";

  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [editEntity, setEditEntity] = useState({});
  const [detailsEntity, setDetailsEntity] = useState({});

  const [formOpen, setFormOpen] = useState(false);

  const tableHeads = [
    "Enqueries Ref.",
    "Title",
    "Chance of Conversion",
    "Date",
    "Raise By",
    "Contact",
    "Phone",
    "Email",
  ];

  return (
    <Container>
      <Title
        title="Enquiries"
        description="Manage and view enquiries information in the MBS system."
      />

      <CardContainer>
        <Card title="Registered Enquiries" content="1234" />
        <Card title="Archived Enquires" content="10" />
        <Card title="Contacts Registered" content="12" />
        <Card title="Number of Persons Who Raised Enquiries" content="28" />
      </CardContainer>

      <ActionBar>
        <Search
          searchBarPlaceholder="Search enquiries..."
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <AddAction
          addActionName="New Enquiry"
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
