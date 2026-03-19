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
    Map,
    MapPin,
    CreditCard,
    Phone,
    Calendar,
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
import { ClientModuleSkeleton, ClientCardsSkeleton, ClientListSkeleton } from "./client-skeleton"
// import { ClientDetailsDialog } from "./client-details-dialog"
import { ClientFormDialog } from "./client-form-dialog"
// import { DeleteConfirmationDialog } from "./delete-confirmation-dialog"

import { useToast } from "@/hooks/use-toast"

import { IClient } from "@/types/partnercopy/client"
import { useClient } from "@/hooks/partner/client"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { LocationModule } from "./Location/location-module"
import { LocationModuleDialog } from "./Location/location-module-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { create } from "domain"

type ViewMode = "table" | "cards" | "list"

export function ClientModule() {
    const [searchTerm, setSearchTerm] = useState("")
    const [viewMode, setViewMode] = useState<ViewMode>("table")
    const [selectedClient, setSelectedClient] = useState<IClient | null>(null)
    const [detailsOpen, setDetailsOpen] = useState(false)
    const [formOpen, setFormOpen] = useState(false)
    const [editingClient, setEditingClient] = useState<IClient | null>(null)
    const [addLocationOpen, setAddLocationOpen] = useState(false)
    const [addContactOpen, setAddContactOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [clientToDelete, setClientToDelete] = useState<IClient | null>(null)

    const { createClient, deleteClient, updateClient, isLoading, clients, error } = useClient();
    const { toast } = useToast();

    const handleAction = (action: string, client: IClient) => {
        console.log(`[v0] ${action} action for client:`, client.nome_cliente)

        switch (action) {
            case "view":
                setSelectedClient(client)
                setDetailsOpen(true)
                break
            case "edit":
                setEditingClient(client)
                setFormOpen(true)
                break
            case "add-location":
                setAddLocationOpen(true)
                setSelectedClient(client)
                break
            case "duplicate":
                createClient({
                    nome_cliente: `${client.nome_cliente} (Cópia)`,
                    sede_cliente: client.sede_cliente,
                    telefone_principal: client.telefone_principal,
                })
                break
            case "delete":
                setClientToDelete(client)
                setDeleteDialogOpen(true)
                break
        }
    }

    const handleCreateSubmit = async (data: Partial<IClient>) => {
        await createClient(data)
    }

    const handleEditSubmit = async (data: Partial<IClient>) => {
        if (editingClient) {
            try {
                // Passamos um único objeto com id e payload conforme definido no hook
                await updateClient({
                    id: editingClient.id,
                    payload: data
                });
                // Opcional: fechar modal ou limpar estado de edição aqui
            } catch (err) {
                toast({
                    title: "Error",
                    description: "Failed to update title.",
                    variant: "destructive"
                });
            }
        }
    }
    // const handleDeleteConfirm = () => {
    //     if (clientToDelete) {
    //         deleteClient(clientToDelete.id)
    //         setDeleteDialogOpen(false)
    //         setClientToDelete(null)
    //     }
    // }

    const ActionDropdown = ({ client }: { client: IClient }) => (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleAction("view", client)}>
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAction("edit", client)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAction("add-location", client)}>
                    <Map className="mr-2 h-4 w-4" />
                    Ver Location
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAction("duplicate", client)}>
                    <Copy className="mr-2 h-4 w-4" />
                    Duplicate
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleAction("archive", client)}>
                    <Archive className="mr-2 h-4 w-4" />
                    Archive
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAction("delete", client)} className="text-red-600 focus:text-red-600">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )

    const renderTableView = () => (
        <div className="rounded-md border">
            <TableComponent>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Sede</TableHead>
                        <TableHead>Postal Code</TableHead>
                        <TableHead>NIF</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Created at</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredClients.map((client) => (
                        <TableRow key={client.id}>
                            <TableCell className="font-medium">{client.nome_cliente}</TableCell>
                            <TableCell className="font-medium">{client.sede_cliente}</TableCell>
                            <TableCell className="font-medium"> {client.codigo_postal}</TableCell>
                            <TableCell> {client.nif}   </TableCell>
                            <TableCell>  {client.telefone_principal}</TableCell>
                            <TableCell> {client.status_cliente ? "Active" : "Inactive"}</TableCell>
                            <TableCell>{new Date(client.data_registro_cliente).toLocaleDateString("en-US")}</TableCell>
                            <TableCell className="text-right">
                                <ActionDropdown client={client} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </TableComponent>
        </div>
    )

 const renderCardsView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.map((client) => (
            <Card key={client.id} className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow duration-300 bg-linear-to-br from-card to-muted/50">
                {/* Header decorativo estilo ID Card */}
                <div className="h-2 bg-primary w-full" />
                
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <Avatar className="h-16 w-16 border-2 border-background shadow-sm">
                        <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${client.nome_cliente}`} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                            {client.nome_cliente.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg font-bold truncate leading-tight">
                            {client.nome_cliente}
                        </CardTitle>
                        <Badge variant={client.status_cliente ? "default" : "secondary"} className="mt-1 text-[10px] h-5">
                            {client.status_cliente ? "ATIVO" : "INATIVO"}
                        </Badge>
                    </div>
                    
                    <ActionDropdown client={client} />
                </CardHeader>

                <CardContent className="pt-2">
                    {/* Linha Divisória Sutil */}
                    <div className="h-px w-full bg-border mb-4 opacity-50" />
                    
                    <div className="grid grid-cols-1 gap-y-3">
                        {/* Seção de Dados estilo Cartão de Identificação */}
                        <div className="flex items-center gap-3 text-sm text-muted-foreground group">
                            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                <CreditCard className="h-4 w-4 text-primary/70" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-semibold text-muted-foreground/50 uppercase tracking-widest">NIF</span>
                                <span className="font-mono text-xs">{client.nif || "000000000"}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 text-sm text-muted-foreground group">
                            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                <MapPin className="h-4 w-4 text-primary/70" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-semibold text-muted-foreground/50 uppercase tracking-widest">SEDE</span>
                                <span className="truncate text-xs font-medium">{client.sede_cliente}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 text-sm text-muted-foreground group">
                            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                <Phone className="h-4 w-4 text-primary/70" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-semibold text-muted-foreground/50 uppercase tracking-widest">CONTATO</span>
                                <span className="text-xs font-medium">{client.telefone_principal}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 text-sm text-muted-foreground group">
                            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                <Calendar className="h-4 w-4 text-primary/70" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-semibold text-muted-foreground/50 uppercase tracking-widest">REGISTRO</span>
                                <span className="text-xs font-medium">
                                    {new Date(client.data_registro_cliente).toLocaleDateString("en-US", {
                                        month: 'short',
                                        year: 'numeric'
                                    })}
                                </span>
                            </div>
                        </div>
                    </div>
                </CardContent>

                {/* Rodapé Decorativo discreto */}
                <div className="px-6 py-2 bg-muted/30 border-t border-border flex justify-between items-center">
                   <span className="text-[9px] font-bold text-muted-foreground/40 tracking-tighter uppercase">MBS Partner Client System</span>
                   <div className="flex gap-1">
                       <div className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-pulse" />
                   </div>
                </div>
            </Card>
        ))}
    </div>
)

    const renderListView = () => (
        <div className="space-y-2">
            {filteredClients.map((client) => (
                <Card key={client.id}>
                    <CardContent className="flex items-center justify-between p-4">
                        <div className="flex-1 space-y-1">
                            <div className="flex items-center gap-3">
                                <h3 className="font-medium">{client.nome_cliente}</h3>
                                <Badge variant={client.status_cliente ? "default" : "secondary"}>{client.status_cliente ? "Active" : "Inactive"}</Badge>
                            </div>
                            <div className="flex  items-center gap-4 text-sm text-muted-foreground ">
                                <span>Job description: {client.sede_cliente}</span>
                                <span>Work e-mail: {client.telefone_principal}</span>
                                <span>Created at: {new Date(client.data_registro_cliente).toLocaleDateString("en-US")}</span>
                            </div>
                        </div>
                        <ActionDropdown client={client} />
                    </CardContent>
                </Card>
            ))}
        </div>
    )

    const filteredClients = clients.filter((client) => client.nome_cliente.toLowerCase().includes(searchTerm.toLowerCase()) || client.sede_cliente.toLowerCase().includes(searchTerm.toLowerCase()))

    const activeClients = filteredClients.filter((client) => client.status_cliente).length
    const inactiveClients = filteredClients.filter((client) => !client.status_cliente).length

    if (isLoading) {
        return <ClientModuleSkeleton />
    }

    if (error) return <p>Error fetching data</p>

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Clients</h2>
                <p className="text-muted-foreground">
                    Manage and view client information in the MBS system.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Clients Count</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{filteredClients.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Clients Count</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{activeClients}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Inactive Clients Count</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{inactiveClients}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Activation Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {filteredClients.length > 0 ? Math.round((activeClients / filteredClients.length) * 100) : 0}%
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search clients..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-8 w-75"
                        />
                    </div>
                    <Button variant="outline" size="sm">
                        <Filter className="mr-2 h-4 w-4" />
                        Filters
                    </Button>
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        onClick={() => {
                            setEditingClient(null)
                            setFormOpen(true)
                        }}
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        New Client
                    </Button>
                    <Button variant={viewMode === "table" ? "default" : "outline"} size="sm" onClick={() => setViewMode("table")}>
                        <Table className="h-4 w-4" />
                    </Button>
                    <Button variant={viewMode === "cards" ? "default" : "outline"} size="sm" onClick={() => setViewMode("cards")}>
                        <Grid3X3 className="h-4 w-4" />
                    </Button>
                    <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>
                        <List className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {isLoading && viewMode === "table" && <ClientModuleSkeleton />}
            {isLoading && viewMode === "cards" && <ClientCardsSkeleton />}
            {isLoading && viewMode === "list" && <ClientListSkeleton />}

            {!isLoading && viewMode === "table" && renderTableView()}
            {!isLoading && viewMode === "cards" && renderCardsView()}
            {!isLoading && viewMode === "list" && renderListView()}

            {/* <DetailsDialog
                client={selectedClient}
                open={detailsOpen}
                onOpenChange={setDetailsOpen}
                onEdit={(client) => {
                    setEditingClient(client)
                    setFormOpen(true)
                }}
            /> */}

            <ClientFormDialog
                client={editingClient}
                open={formOpen}
                onOpenChange={(open) => {
                    setFormOpen(open)
                    if (!open) setEditingClient(null)
                }}
                onSubmit={editingClient ? handleEditSubmit : handleCreateSubmit}
            />

            <LocationModuleDialog open={addLocationOpen} onOpenChange={(open) => {
                setAddLocationOpen(open)
                if (!open) setSelectedClient(null) // Limpa ao fechar
            }} clientId={selectedClient ? selectedClient.id : ""} />
            
            {/* 
            <DeleteConfirmationDialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
                onConfirm={handleDeleteConfirm}
                title={clientToDelete?.nome_cliente || ""}
                description="This action cannot be undone. The client will be permanently removed from the system."
            /> */}


        </div>
    )
}
