"use client"

import { useState } from "react"
import {
    Search,
    Filter,
    MoreHorizontal,
    Eye,
    Edit,
    Trash2,
    Table,
    List,
    Plus,
    FileText,
    Calendar,
    DollarSign,
    TrendingUp,
    ShieldCheck,
    Archive,
    History,
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

// Hooks e Tipos
import { useContract } from "@/hooks/crm/contract"
import { IContract } from "@/types/crm/client"
import { ContractCreateDialog } from "./dialog-form"
import { InvoiceCreateDialog } from "./invoice"
import { api } from "@/lib/api"
import { toast } from "@/hooks/use-toast"
import { ContractInvoicesSheet } from "@/components/common/ContractInvoicesSheet"
import { AmendmentCreateDialog } from "./amendment"
import { ContractAmendmentsSheet } from "@/components/common/ContractAmendmentSheet"
import { ContractActivitySidebar } from "@/components/common/ContractActivitySidebar"

type ViewMode = "table" | "list"

export function ContractModule() {
    const [searchTerm, setSearchTerm] = useState("")
    const [viewMode, setViewMode] = useState<ViewMode>("table")
    const [formOpen, setFormOpen] = useState(false)
    const [invoiceOpen, setInvoiceOpen] = useState(false);
    const [amendmentOpen, setAmendmentOpen] = useState(false);
    const [selectedContact, setSelectedContact] = useState({ id: "", name: "" });



    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [selectedContract, setSelectedContract] = useState<IContract | null>(null);
    const [invoices, setInvoices] = useState([]);
    const [loadingInvoices, setLoadingInvoices] = useState(false);


    // Estados para Amendments
    const [isAmendmentSheetOpen, setIsAmendmentSheetOpen] = useState(false);
    const [amendments, setAmendments] = useState([]);
    const [loadingAmendments, setLoadingAmendments] = useState(false);


    // Usando o hook que corrigimos
    const { contracts, isLoading, error } = useContract();


    // Filtro de pesquisa
    const filteredContracts = contracts.filter((c) =>
        c.contrato_numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.descricao_contrato.toLowerCase().includes(searchTerm.toLowerCase())
    )

    // Estatísticas Reais
    const stats = {
        total: filteredContracts.length,
        active: filteredContracts.filter(c => c.status_contrato === "Open").length,
        totalValue: filteredContracts.reduce((acc, c) => acc + Number(c.valor_estimado), 0),
        archived: filteredContracts.filter(c => c.arquivado).length
    }
    // Função para disparar a modal de invoice
    const handleInvoiceAction = (contract: any) => {
        setSelectedContact({
            id: String(contract.fk_cliente_contacto),
            name: "Contato do Contrato " + contract.contrato_numero // Aqui você pode buscar o nome real se tiver
        });
        setInvoiceOpen(true);
    };

    const handleOpenInvoices = async (contract: IContract) => {
        setSelectedContract(contract);
        setIsSheetOpen(true);
        setLoadingInvoices(true);
        try {
            // Ajuste a rota para filtrar pelo contrato no backend se possível
            const { data } = await api.get(`/contract/invoice`);
            const contractInvoices = data.filter((i: any) => i.contract_id === contract.id);
            setInvoices(contractInvoices);
        } catch (error) {
            toast({
                title: "Erro",
                description: "Erro ao carregar documentos."
            });
        } finally {
            setLoadingInvoices(false);
        }
    };


    const handleAmendmentAction = (contract: IContract) => {
        setSelectedContract(contract);
        setAmendmentOpen(true);
    };

    const handleOpenAmendments = async (contract: IContract) => {
        setSelectedContract(contract);
        setIsAmendmentSheetOpen(true);
        setLoadingAmendments(true);
        try {
            const { data } = await api.get(`/contract/amendment`);
            // Filtra os aditivos que pertencem a este contrato
            const contractAmendments = data.filter((a: any) => a.contract_id === contract.id);
            setAmendments(contractAmendments);
        } catch (error) {
            toast({
                title: "Erro",
                description: "Erro ao carregar aditivos.",
                variant: "destructive"
            });
        } finally {
            setLoadingAmendments(false);
        }
    };


    // No renderTableView, dentro do DropdownMenu:
    const handleEdit = (contract: IContract) => {
        setSelectedContact({
            id: String(contract.fk_cliente_contacto),
            name: "Contato do Contrato " + contract.contrato_numero // Aqui você pode buscar o nome real se tiver
        });
        setFormOpen(true);
    };

    const renderTableView = () => (
        <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
            <TableComponent>
                <TableHeader className="bg-bluetext-blue-50050">
                    <TableRow>
                        <TableHead className="font-bold">Nº Contrato</TableHead>
                        <TableHead className="font-bold">Descrição</TableHead>
                        <TableHead className="font-bold">Vigência</TableHead>
                        <TableHead className="font-bold">Valor Est.</TableHead>
                        <TableHead className="font-bold">Status</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredContracts.length > 0 ? (
                        filteredContracts.map((contract) => (
                            <TableRow key={contract.contrato_numero} className="hover:bg-bluetext-blue-50050 transition-colors">
                                <TableCell className="font-medium text-blue-600">
                                    {contract.contrato_numero}
                                </TableCell>
                                <TableCell className="max-w-75 truncate">
                                    {contract.descricao_contrato}
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col text-xs">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3 text-blue-500" />
                                            {new Date(contract.contrato_inicio).toLocaleDateString()}
                                        </span>
                                        <span className="text-blue-500">até</span>
                                        <span className="font-medium">
                                            {new Date(contract.contrato_fim).toLocaleDateString()}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell className="font-semibold">
                                    {Number(contract.valor_estimado).toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })}
                                </TableCell>
                                <TableCell>
                                    <Badge variant={contract.status_contrato === "Open" ? "default" : "secondary"} className="rounded-full">
                                        {contract.status_contrato}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem><Eye className="mr-2 h-4 w-4" /> Detalhes</DropdownMenuItem>
                                            <DropdownMenuItem><Edit className="mr-2 h-4 w-4" /> Editar</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleInvoiceAction(contract)}>
                                                <FileText className="mr-2 h-4 w-4" /> Registrar Invoice
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleOpenInvoices(contract)}>
                                                <Eye className="mr-2 h-4 w-4 text-blue-600" /> Ver Faturamento
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={() => handleAmendmentAction(contract)}>
                                                <FileText className="mr-2 h-4 w-4" /> Register Amendment
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleOpenAmendments(contract)}>
                                                <History className="mr-2 h-4 w-4 text-blue-600" /> Ver Aditivos
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="text-red-600"><Trash2 className="mr-2 h-4 w-4" /> Eliminar</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                                Nenhum contrato encontrado para este lead.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </TableComponent>
        </div>
    )

    if (error) return <div className="p-4 text-red-500 bg-red-50 rounded-lg">Erro ao carregar contratos.</div>

    return (
        <div className="space-y-6 container mx-auto py-6">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-blue-500">Contratos</h2>
                    <p className="text-muted-foreground">Gerencie acordos, renovações e valores contratuais.</p>
                </div>
                <Button onClick={() => setFormOpen(true)} className="bg-blue-700 hover:bg-blue-800 shadow-md">
                    <Plus className="mr-2 h-4 w-4" /> Novo Contrato
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {/* Card: Contratos Ativos */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">  Contratos Ativos</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.active}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">  Valor Acumulado</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">  {Number(stats.totalValue).toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">     Arquivados</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">   {stats.archived}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">     Ticket Médio</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">                              {(stats.totalValue / (stats.total || 1)).toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })}
                        </div>
                    </CardContent>
                </Card>


            </div>

            <div className="flex items-center justify-between gap-4">
                <div className="flex flex-1 items-center space-x-2">
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Buscar por número ou descrição..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-8"
                        />
                    </div>
                    <Button variant="outline" size="sm"><Filter className="mr-2 h-4 w-4" /> Filtros</Button>
                </div>
                <div className="flex items-center bg-bluetext-blue-500 p-1 rounded-lg">
                    <Button
                        variant={viewMode === "table" ? "secondary" : "ghost"} // "secondary" em vez de "white"
                        size="sm"
                        className={`h-8 shadow-sm ${viewMode === "table" ? "bg-white hover:bg-white" : ""}`}
                        onClick={() => setViewMode("table")}
                    >
                        <Table className="h-4 w-4" />
                    </Button>

                    <Button
                        variant={viewMode === "list" ? "secondary" : "ghost"}
                        size="sm"
                        className={`h-8 shadow-sm ${viewMode === "list" ? "bg-white hover:bg-white" : ""}`}
                        onClick={() => setViewMode("list")}
                    >
                        <List className="h-4 w-4" />
                    </Button>
                </div>
            </div>


            <div className="flex flex-col lg:flex-row gap-6">

                <div className="flex-1 min-w-0">
                    {isLoading ? (
                        <div className="space-y-4">
                            <div className="h-10 bg-bluetext-blue-500 animate-pulse rounded w-full" />
                            <div className="h-64 bg-bluetext-blue-500animate-pulse rounded w-full" />
                        </div>
                    ) : renderTableView()}
                </div>

                {/* Lado Direito: O Card Lateral de Atividades */}
                <ContractActivitySidebar
                    invoices={invoices}
                    amendments={amendments}
                    isLoading={loadingInvoices || loadingAmendments}
                />
            </div>

            {/* Diálogo de Criação */}
            <ContractCreateDialog
                open={formOpen}
                setOpen={setFormOpen}
            />
            <InvoiceCreateDialog
                open={invoiceOpen}
                setOpen={setInvoiceOpen}
                contactData={selectedContact}
            />
            <ContractInvoicesSheet
                open={isSheetOpen}
                onOpenChange={setIsSheetOpen}
                invoices={invoices}
                isLoading={loadingInvoices}
                contractNumber={selectedContract?.contrato_numero || ""}
                onNewInvoice={() => {
                    setIsSheetOpen(false); // Fecha a lista
                    handleInvoiceAction(selectedContract); // Abre a modal de criação que já existia
                }}
            />

            <AmendmentCreateDialog
                open={amendmentOpen}
                setOpen={setAmendmentOpen}
                contractId={selectedContract?.id || 1}
            />

            {/* Sheet de Listagem de Amendments */}
            <ContractAmendmentsSheet
                open={isAmendmentSheetOpen}
                onOpenChange={setIsAmendmentSheetOpen}
                amendments={amendments}
                isLoading={loadingAmendments}
                contractNumber={selectedContract?.contrato_numero || ""}
                onNewAmendment={() => {
                    setIsAmendmentSheetOpen(false); // Fecha a lista
                    setAmendmentOpen(true);        // Abre o diálogo de criação (AmendmentCreateDialog)
                }}
            />
        </div>
    )
}