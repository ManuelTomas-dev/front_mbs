"use client"

import { useState } from "react"
import {
    Search,
    Filter,
    MoreHorizontal,
    Eye,
    Edit,
    Copy,
    Archive,
    Trash2,
    Table,
    Grid3X3,
    List,
    Plus,
    Mail,
    User,
    Zap,
    TrendingUp,
    Activity,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table as TableComponent, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Hooks e Tipos de Leads
import { ILead, ILeadData } from "@/types/crm/leads"
import { useLead } from "@/hooks/crm/leads"
import { LeadListSkeleton, LeadModuleSkeleton } from "./quote-skeleton"
import LeadDialogForm from "./dialog-form"
import { RecentActivity } from "@/components/common/RecentActivity"
import { LeadActivitiesDialog } from "./LeadActivitiesDialog"

type ViewMode = "table" | "cards" | "list"

export function LeadModule() {
    const [searchTerm, setSearchTerm] = useState("")
    const [viewMode, setViewMode] = useState<ViewMode>("table")
    const [formOpen, setFormOpen] = useState(false)
    const [editingLead, setEditingLead] = useState<ILeadData | null>(null)
    const [activityOpen, setActivityOpen] = useState(false);
    const [selectedLead, setSelectedLead] = useState<ILeadData | null>(null);
    const { leads, isLoading, error } = useLead();

    const handleAction = (action: string, lead: ILeadData) => {
        switch (action) {
            case "edit":
                setEditingLead(lead)
                setFormOpen(true)
                break
            case "activity": // Novo caso
                setSelectedLead(lead);
                setActivityOpen(true);
                break;
            case "duplicate":
                // Lógica de duplicação aqui
                break
        }
    }

    // Filtro de pesquisa (Referência ou E-mail)
    const filteredLeads = leads.filter((lead) =>
        lead.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.inquiry_email.toLowerCase().includes(searchTerm.toLowerCase())
    )

    // Estatísticas para os Cards
    const stats = {
        total: filteredLeads.length,
        new: filteredLeads.filter(l => l.status === "New").length,
        hot: filteredLeads.filter(l => l.interest === "Hot").length,
        conversionRate: filteredLeads.length > 0 ? Math.round((filteredLeads.filter(l => l.status === "Qualified").length / filteredLeads.length) * 100) : 0
    }

    const ActionDropdown = ({ lead }: { lead: ILeadData }) => (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleAction("activity", lead)}>
                    <Activity className="mr-2 h-4 w-4" /> Atividades
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAction("view", lead)}>
                    <Eye className="mr-2 h-4 w-4" /> View Details
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAction("edit", lead)}>
                    <Edit className="mr-2 h-4 w-4" /> Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleAction("delete", lead)} className="text-red-600">
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )

    const renderTableView = () => (
        <div className="rounded-md border bg-card">
            <TableComponent>
                <TableHeader>
                    <TableRow>
                        <TableHead>Reference</TableHead>
                        <TableHead>Contact / Email</TableHead>
                        <TableHead>Interest</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Created at</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredLeads.map((lead) => (
                        <TableRow key={lead.id}>
                            <TableCell className="font-medium">{lead.reference}</TableCell>
                            <TableCell>
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium">ID Contact: {lead.id_client_contact}</span>
                                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                                        <Mail className="w-3 h-3" /> {lead.inquiry_email}
                                    </span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <Badge variant={lead.interest === "Hot" ? "destructive" : lead.interest === "Warm" ? "default" : "secondary"}>
                                    {lead.interest}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <Badge variant="outline">{lead.status}</Badge>
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                                {lead.created_at ? new Date(lead.created_at).toLocaleDateString("en-US") : "---"}
                            </TableCell>
                            <TableCell className="text-right">
                                <ActionDropdown lead={lead} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </TableComponent>
        </div>
    )

    if (isLoading) return <LeadModuleSkeleton />
    if (error) return <div className="p-4 text-red-500">Erro ao carregar leads.</div>

    return (
        <div className="space-y-6 container mx-auto py-6">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Leads</h2>
                    <p className="text-muted-foreground">
                        Gestão de potenciais clientes e oportunidades de negócio.
                    </p>
                </div>
                <Button onClick={() => { setEditingLead(null); setFormOpen(true); }}>
                    <Plus className="mr-2 h-4 w-4" /> Nova Lead
                </Button>
            </div>

            {/* Cards de Estatísticas */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total de Leads</CardTitle>
                        <User className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.total}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Novas (A aguardar)</CardTitle>
                        <Plus className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.new}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Leads "Hot"</CardTitle>
                        <Zap className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.hot}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Taxa de Qualificação</CardTitle>
                        <TrendingUp className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.conversionRate}%</div>
                    </CardContent>
                </Card>
            </div>
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1 space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div className="relative">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Pesquisar leads..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-8 w-80"
                                />
                            </div>
                            <Button variant="outline" size="sm">
                                <Filter className="mr-2 h-4 w-4" /> Filtros
                            </Button>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Button variant={viewMode === "table" ? "default" : "outline"} size="sm" onClick={() => setViewMode("table")}>
                                <Table className="h-4 w-4" />
                            </Button>
                            <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>
                                <List className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {viewMode === "table" ? renderTableView() : <LeadListSkeleton />}
                </div>
                <div className="shrink-0">
                    <RecentActivity activities={leads} />
                </div>
            </div>


            {/* Modal de Formulário */}
            <LeadDialogForm
                open={formOpen}
                setOpen={setFormOpen}
                initialData={editingLead || undefined}
            />

            <LeadActivitiesDialog
                open={activityOpen}
                setOpen={setActivityOpen}
                lead={selectedLead}
            />
        </div>
    )
}