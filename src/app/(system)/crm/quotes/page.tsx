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
import DialogForm from "@/components/module/crm/quotes/dialog-form";
import DialogFormCopy from "@/components/module/crm/quotes/dialog-form copy";
import { useQuote } from "@/hooks/crm/quote";
import { QuoteModule } from "@/components/module/crm/quotes/quote-module";

export default function Page() {
  type ViewMode = "table" | "cards" | "list";

  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [editEntity, setEditEntity] = useState({});
  const [detailsEntity, setDetailsEntity] = useState({});
  const {isLoading,quotes}=useQuote();

  const [formOpen, setFormOpen] = useState(false);

  const tableHeads = ["Ref.", "Title", "Client", "Currency", "Discount"];

  return (
    <Container>
      <Title
        title="Quotes"
        description="Manage and view quotes information in the MBS system."
      />

      <CardContainer>
        <Card title="Registered Quotations" content="1234" />
        <Card title="Closed Quotations" content="10" />
        <Card title="Discount Average" content="12%" />
        <Card title="Registered Items" content="28" />
      </CardContainer>

      <ActionBar>
        <Search
          searchBarPlaceholder="Search quotations..."
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <AddAction
          addActionName="New Quotation"
          viewMode={viewMode}
          setViewMode={setViewMode}
          setAddFormOpen={setFormOpen}
          setSelectedEntity={setEditEntity}
        />
      </ActionBar>

      {/* <Table  tableHeads={tableHeads}></Table> */}
      <QuoteModule/>


      <DialogFormCopy onSubmitAction={(p) => alert(p)} open={formOpen} setOpen={setFormOpen} />
    </Container>
  );
}
