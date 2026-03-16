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
import type { Title } from "@/types/system/job-title"
import { TitleModuleSkeleton, TitleCardsSkeleton, TitleListSkeleton } from "./title-skeleton"
import { TitleDetailsDialog } from "./title-details-dialog"
import { TitleFormDialog } from "./title-form-dialog"
import { DeleteConfirmationDialog } from "./delete-confirmation-dialog"

import { useTitles } from "@/hooks/system/work-title"
import { useToast } from "@/hooks/use-toast"

type ViewMode = "table" | "cards" | "list"

export function TitleModule() {
    const [searchTerm, setSearchTerm] = useState("")
    const [viewMode, setViewMode] = useState<ViewMode>("table")
    const [selectedTitle, setSelectedTitle] = useState<Title | null>(null)
    const [detailsOpen, setDetailsOpen] = useState(false)
    const [formOpen, setFormOpen] = useState(false)
    const [editingTitle, setEditingTitle] = useState<Title | null>(null)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [titleToDelete, setTitleToDelete] = useState<Title | null>(null)

    const { createTitle, deleteTitle, updateTitle, isLoading, titles, error } = useTitles();
    const { toast } = useToast();

    const handleAction = (action: string, title: Title) => {
        console.log(`[v0] ${action} action for title:`, title.designation)

        switch (action) {
            case "view":
                setSelectedTitle(title)
                setDetailsOpen(true)
                break
            case "edit":
                setEditingTitle(title)
                setFormOpen(true)
                break
            case "duplicate":
                createTitle({
                    designation: `${title.designation} (Cópia)`,
                    isActive: title.isActive,
                })
                break
            case "delete":
                setTitleToDelete(title)
                setDeleteDialogOpen(true)
                break
        }
    }

    const handleCreateSubmit = async (data: Partial<Title>) => {
        await createTitle(data)
    }

    const handleEditSubmit = async (data: Partial<Title>) => {
        if (editingTitle) {
            try {
                // Passamos um único objeto com id e payload conforme definido no hook
                await updateTitle({
                    id: editingTitle.id,
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
        if (titleToDelete) {
            deleteTitle(titleToDelete.id)
            setDeleteDialogOpen(false)
            setTitleToDelete(null)
        }
    }

    const ActionDropdown = ({ title }: { title: Title }) => (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleAction("view", title)}>
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAction("edit", title)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAction("duplicate", title)}>
                    <Copy className="mr-2 h-4 w-4" />
                    Duplicate
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleAction("archive", title)}>
                    <Archive className="mr-2 h-4 w-4" />
                    Archive
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAction("delete", title)} className="text-red-600 focus:text-red-600">
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
                    {filteredTitles.map((title) => (
                        <TableRow key={title.id}>
                            <TableCell className="font-medium">{title.designation}</TableCell>
                            <TableCell>
                                <Badge variant={title.isActive ? "default" : "secondary"}>{title.isActive ? "Active" : "Inactive"}</Badge>
                            </TableCell>
                            <TableCell>{new Date(title.createdAt).toLocaleDateString("en-US")}</TableCell>
                            <TableCell>{new Date(title.updatedAt).toLocaleDateString("en-US")}</TableCell>
                            <TableCell className="text-right">
                                <ActionDropdown title={title} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </TableComponent>
        </div>
    )

    const renderCardsView = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTitles.map((title) => (
                <Card key={title.id}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{title.designation}</CardTitle>
                        <ActionDropdown title={title} />
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <Badge variant={title.isActive ? "default" : "secondary"}>{title.isActive ? "Active" : "Inactive"}</Badge>
                            <div className="text-xs text-muted-foreground space-y-1">
                                <p>Created at: {new Date(title.createdAt).toLocaleDateString("en-US")}</p>
                                <p>Updated at: {new Date(title.updatedAt).toLocaleDateString("en-US")}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )

    const renderListView = () => (
        <div className="space-y-2">
            {filteredTitles.map((title) => (
                <Card key={title.id}>
                    <CardContent className="flex items-center justify-between p-4">
                        <div className="flex-1 space-y-1">
                            <div className="flex items-center gap-3">
                                <h3 className="font-medium">{title.designation}</h3>
                                <Badge variant={title.isActive ? "default" : "secondary"}>{title.isActive ? "Active" : "Inactive"}</Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span>Created at: {new Date(title.createdAt).toLocaleDateString("en-US")}</span>
                                <span>Updated at: {new Date(title.updatedAt).toLocaleDateString("en-US")}</span>
                            </div>
                        </div>
                        <ActionDropdown title={title} />
                    </CardContent>
                </Card>
            ))}
        </div>
    )

    const filteredTitles = titles.filter((title) => title.designation.toLowerCase().includes(searchTerm.toLowerCase()))

    const activeTitles = filteredTitles.filter((title) => title.isActive).length
    const inactiveTitles = filteredTitles.filter((title) => !title.isActive).length

    if (isLoading) {
        return <TitleModuleSkeleton />
    }

    if (error) return <p>Error fetching data</p>

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Titles</h2>
                <p className="text-muted-foreground">
                    Generate professional titles for equipment certification in theMBS system.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Titles Count</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{filteredTitles.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Titles Count</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{activeTitles}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Inactive Title Count</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{inactiveTitles}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Activation Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {filteredTitles.length > 0 ? Math.round((activeTitles / filteredTitles.length) * 100) : 0}%
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search titles..."
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
                            setEditingTitle(null)
                            setFormOpen(true)
                        }}
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        New Title
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

            {isLoading && viewMode === "table" && <TitleModuleSkeleton />}
            {isLoading && viewMode === "cards" && <TitleCardsSkeleton />}
            {isLoading && viewMode === "list" && <TitleListSkeleton />}

            {!isLoading && viewMode === "table" && renderTableView()}
            {!isLoading && viewMode === "cards" && renderCardsView()}
            {!isLoading && viewMode === "list" && renderListView()}

            <TitleDetailsDialog
                title={selectedTitle}
                open={detailsOpen}
                onOpenChange={setDetailsOpen}
                onEdit={(title) => {
                    setDetailsOpen(false)
                    setEditingTitle(title)
                    setFormOpen(true)
                }}
            />

            <TitleFormDialog
                title={editingTitle}
                open={formOpen}
                onOpenChange={(open) => {
                    setFormOpen(open)
                    if (!open) setEditingTitle(null)
                }}
                onSubmit={editingTitle ? handleEditSubmit : handleCreateSubmit}
            />

            <DeleteConfirmationDialog

                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
                onConfirm={handleDeleteConfirm}
                title={titleToDelete?.designation || ""}
                description="This action cannot be undone. The title will be permanently removed from the system."
            />
        </div>
    )
}
