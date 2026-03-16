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
import { PersonnelModuleSkeleton, PersonnelCardsSkeleton, PersonnelListSkeleton } from "./personnel-skeleton"
import { PersonnelDetailsDialog} from "./personnel-details-dialog"
import { PersonnelFormDialog} from "./personnel-form-dialog"
import { DeleteConfirmationDialog } from "./delete-confirmation-dialog"

import { useToast } from "@/hooks/use-toast"
import { IPersonnel } from "@/types/operation/personnel"
import { usePersonnel } from "@/hooks/operation/personnel"

type ViewMode = "table" | "cards" | "list"

export function PersonnelModule() {
    const [searchTerm, setSearchTerm] = useState("")
    const [viewMode, setViewMode] = useState<ViewMode>("table")
    const [selectedPersonnel, setSelectedPersonnel] = useState<IPersonnel | null>(null)
    const [detailsOpen, setDetailsOpen] = useState(false)
    const [formOpen, setFormOpen] = useState(false)
    const [editingPersonnel, setEditingPersonnel] = useState<IPersonnel | null>(null)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [personnelToDelete, setPersonnelToDelete] = useState<IPersonnel | null>(null)

    const { createPersonnel, deletePersonnel, updatePersonnel, isLoading, personnel, error } = usePersonnel();
    const { toast } = useToast();

    const handleAction = (action: string, personnel: IPersonnel) => {
        console.log(`[v0] ${action} action for personnel:`, personnel.first_name)

        switch (action) {
            case "view":
                setSelectedPersonnel(personnel)
                setDetailsOpen(true)
                break
            case "edit":
                setEditingPersonnel(personnel)
                setFormOpen(true)
                break
            case "duplicate":
                createPersonnel({
                    first_name: `${personnel.first_name} (Cópia)`,
                    last_name: personnel.last_name,
                    work_email: personnel.work_email,
                })
                break
            case "delete":
                setPersonnelToDelete(personnel)
                setDeleteDialogOpen(true)
                break
        }
    }

    const handleCreateSubmit = async (data: Partial<IPersonnel>) => {
        await createPersonnel(data)
    }

    const handleEditSubmit = async (data: Partial<IPersonnel>) => {
        if (editingPersonnel) {
            try {
                // Passamos um único objeto com id e payload conforme definido no hook
                await updatePersonnel({
                    id: editingPersonnel.id,
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
    const handleDeleteConfirm = () => {
        if (personnelToDelete) {
            deletePersonnel(personnelToDelete.id)
            setDeleteDialogOpen(false)
            setPersonnelToDelete(null)
        }
    }

    const ActionDropdown = ({ personnel }: { personnel: IPersonnel }) => (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleAction("view", personnel)}>
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAction("edit", personnel)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAction("duplicate", personnel)}>
                    <Copy className="mr-2 h-4 w-4" />
                    Duplicate
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleAction("archive", personnel)}>
                    <Archive className="mr-2 h-4 w-4" />
                    Archive
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAction("delete", personnel)} className="text-red-600 focus:text-red-600">
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
                        <TableHead>Designation</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Created at</TableHead>
                        <TableHead>Updated at</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredPersonnel.map((personnel) => (
                        <TableRow key={personnel.id}>
                            <TableCell className="font-medium">{personnel.first_name} {personnel.last_name}</TableCell>
                            <TableCell>
                                <Badge variant={personnel.isActive ? "default" : "secondary"}>{personnel.isActive ? "Active" : "Inactive"}</Badge>
                            </TableCell>
                            <TableCell>{new Date(personnel.createdAt).toLocaleDateString("en-US")}</TableCell>
                            <TableCell>{new Date(personnel.updatedAt).toLocaleDateString("en-US")}</TableCell>
                            <TableCell className="text-right">
                                <ActionDropdown personnel={personnel} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </TableComponent>
        </div>
    )

    const renderCardsView = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPersonnel.map((personnel) => (
                <Card key={personnel.id}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{personnel.first_name} {personnel.last_name}</CardTitle>
                        <ActionDropdown personnel={personnel} />
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <Badge variant={personnel.isActive ? "default" : "secondary"}>{personnel.isActive ? "Active" : "Inactive"}</Badge>
                            <div className="text-xs text-muted-foreground space-y-1">
                                <p>Created at: {new Date(personnel.createdAt).toLocaleDateString("en-US")}</p>
                                <p>Updated at: {new Date(personnel.updatedAt).toLocaleDateString("en-US")}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )

    const renderListView = () => (
        <div className="space-y-2">
            {filteredPersonnel.map((personnel) => (
                <Card key={personnel.id}>
                    <CardContent className="flex items-center justify-between p-4">
                        <div className="flex-1 space-y-1">
                            <div className="flex items-center gap-3">
                                <h3 className="font-medium">{personnel.first_name} {personnel.last_name}</h3>
                                <Badge variant={personnel.isActive ? "default" : "secondary"}>{personnel.isActive ? "Active" : "Inactive"}</Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span>Created at: {new Date(personnel.createdAt).toLocaleDateString("en-US")}</span>
                                <span>Updated at: {new Date(personnel.updatedAt).toLocaleDateString("en-US")}</span>
                            </div>
                        </div>
                        <ActionDropdown personnel={personnel} />
                    </CardContent>
                </Card>
            ))}
        </div>
    )

    const filteredPersonnel = personnel.filter((personnel) => personnel.first_name.toLowerCase().includes(searchTerm.toLowerCase()) || personnel.last_name.toLowerCase().includes(searchTerm.toLowerCase()))

    const activePersonnel = filteredPersonnel.filter((personnel) => personnel.isActive).length
    const inactivePersonnel = filteredPersonnel.filter((personnel) => !personnel.isActive).length

    if (isLoading) {
        return <PersonnelModuleSkeleton />
    }

    if (error) return <p>Error fetching data</p>

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Personnel</h2>
                <p className="text-muted-foreground">
                    Manage and view personnel information in theMBS system.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Personnel Count</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{filteredPersonnel.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Personnel Count</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{activePersonnel}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Inactive Personnel Count</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{inactivePersonnel}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Activation Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {filteredPersonnel.length > 0 ? Math.round((activePersonnel / filteredPersonnel.length) * 100) : 0}%
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search personnel..."
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
                            setEditingPersonnel(null)
                            setFormOpen(true)
                        }}
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        New Personnel
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

            {isLoading && viewMode === "table" && <PersonnelModuleSkeleton />}
            {isLoading && viewMode === "cards" && <PersonnelCardsSkeleton />}
            {isLoading && viewMode === "list" && <PersonnelListSkeleton />}

            {!isLoading && viewMode === "table" && renderTableView()}
            {!isLoading && viewMode === "cards" && renderCardsView()}
            {!isLoading && viewMode === "list" && renderListView()}

            <PersonnelDetailsDialog
                personnel={selectedPersonnel}
                open={detailsOpen}
                onOpenChange={setDetailsOpen}
                onEdit={(personnel) => {
                    setDetailsOpen(false)
                    setEditingPersonnel(personnel)
                    setFormOpen(true)
                }}
            />

            <PersonnelFormDialog
                personnel={editingPersonnel}
                open={formOpen}
                onOpenChange={(open) => {
                    setFormOpen(open)
                    if (!open) setEditingPersonnel(null)
                }}
                onSubmit={editingPersonnel ? handleEditSubmit : handleCreateSubmit}
            />

            {/* <DeleteConfirmationDialog

                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
                onConfirm={handleDeleteConfirm}
                title={personnelToDelete?.designation || ""}
                description="This action cannot be undone. The personnel will be permanently removed from the system."
            /> */}
        </div>
    )
}
