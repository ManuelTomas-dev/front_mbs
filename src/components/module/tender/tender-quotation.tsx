"use client";

import { useState } from "react";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import ViewOptions from "@/components/generic/view-options";
import Container from "@/components/generic/container";
import Title from "@/components/generic/title";
import CardContainer from "@/components/generic/card-container";
import Card from "@/components/generic/card";
import Table from "@/components/generic/table";
import ActionBar from "@/components/generic/action-bar";
// import DialogForm from "../contract/dialog-form";
import Search from "@/components/generic/search";
import AddAction from "@/components/generic/add-action";

import {
  Plus,
  FileText,
  DollarSign,
  CheckCircle,
  TrendingUp,
  Calendar,
  ChevronDown,
} from "lucide-react";
import DialogForm from "../crm/enquiry/dialog-form";

const statsCards = [
  {
    label: "Total Tenders",
    value: "24",
    icon: FileText,
    iconColor: "text-slate-600",
  },
  {
    label: "Total Value Pipeline",
    value: "$21,150,750",
    icon: DollarSign,
    iconColor: "text-slate-600",
  },
  {
    label: "Approved Value",
    value: "$8,345,300",
    icon: CheckCircle,
    iconColor: "text-emerald-500",
  },
  {
    label: "Conversion Rate",
    value: "45%",
    icon: TrendingUp,
    iconColor: "text-blue-500",
  },
];

const columns = [
  { id: "draft", label: "Draft", color: "bg-slate-400" },
  { id: "in-progress", label: "In Progress", color: "bg-amber-400" },
  { id: "submitted", label: "Submitted", color: "bg-emerald-500" },
  { id: "won", label: "Won", color: "bg-slate-300" },
  { id: "lost", label: "Lost", color: "bg-slate-300" },
];

export function QuotationManagement() {
  type ViewMode = "table" | "cards" | "list";

  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [selectedEntity, setSelectedEntity] = useState({});
  const [detailsDialog, setDetailsDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);

  const [formOpen, setFormOpen] = useState(false);
  const tableHeads = ["Reference", "Status", "Company"];

  return (
    <Container>
      <Title
        title="CRM Quotation Management"
        description="Manage and view CRM Quotation Management information in the MBS system."
      />

      <CardContainer>
        <Card title="Total Tenders" content="1234" />
        <Card title="Total Value Pipeline" content="$40,500,00" />
        <Card title="Approved Value" content="$12,500,00" />
        <Card title="Conversion Rate" content="45%" />
        <Card title="Average Bid Cost" content="$12,500" />
      </CardContainer>

      <ActionBar>
        <Search
          searchBarPlaceholder="Search ..."
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <AddAction
          addActionName="New Tender"
          viewMode={viewMode}
          setViewMode={setViewMode}
          setAddFormOpen={setFormOpen}
          setSelectedEntity={setSelectedEntity}
        />
      </ActionBar>

      <Table tableHeads={tableHeads}></Table>

      <DialogForm open={formOpen} setOpen={setFormOpen} />
    </Container>
  );
}
