"use client"

import { useState, useEffect } from "react"
import {
    Search,
    Filter,
    MoreHorizontal,
    Eye,
    Edit,
    Copy,
    Trash2,
    Table,
    Grid3X3,
    List,
    Plus,
    UserPlus,
    Users,
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
import {
    Table as TableComponent,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    LocationModuleSkeleton,
    LocationCardsSkeleton,
    LocationListSkeleton,
} from "./location-skeleton"
import { LocationFormDialog } from "./location-form-dialog"
import { useToast } from "@/hooks/use-toast"
import { ILocation } from "@/types/partner/location"
import { useLocation } from "@/hooks/partner/location"
import { ContactDialog } from "../Contact/contact-client-form-dialog"
import { LocationContactListDialog } from "../Contact/location-contact-list-dialog"


type ViewMode = "table" | "cards" | "list"

interface LocationModuleProps {
    clientId: string
    onLocationSelect?: (location: ILocation) => void
}

export function LocationModule({ clientId, onLocationSelect }: LocationModuleProps) {
    const [searchTerm, setSearchTerm] = useState("")
    const [viewMode, setViewMode] = useState<ViewMode>("table")
    const [formOpen, setFormOpen] = useState(false)
    const [editingLocation, setEditingLocation] = useState<ILocation | null>(null)
    const [selectedLocation, setSelectedLocation] = useState<ILocation | null>(null)

    const [contactDialogOpen, setContactDialogOpen] = useState(false)
    const [selectedLocationForContact, setSelectedLocationForContact] = useState<ILocation | null>(null)
    const [listDialogOpen, setListDialogOpen] = useState(false)
    const [selectedLocationForList, setSelectedLocationForList] = useState<ILocation | null>(null)
    const {
        createLocation,
        // deleteLocation,
        updateLocation,
        isLoading,
        locations,
        error,
    } = useLocation(clientId)

    const { toast } = useToast()

    // Filter locations by client ID


    const handleAction = (action: string, location: ILocation) => {
        console.log(`[v0] ${action} action for location:`, location.designacao_localidade_cliente)

        switch (action) {
            case "view":
                setSelectedLocation(location)
                if (onLocationSelect) onLocationSelect(location)
                break
            case "edit":
                setEditingLocation(location)
                setFormOpen(true)
                break
            case "add_contact":
                setSelectedLocationForContact(location)
                setContactDialogOpen(true)
                break;
            case "view_contacts": // <-- Nova ação
                setSelectedLocationForList(location)
                setListDialogOpen(true)
                break;
            //   case "duplicate":
            //     createLocation({
            //       designacao_localidade_cliente: `${location.designacao_localidade_cliente} (Cópia)`,
            //       endereco: location.endereco,
            //       cidade: location.cidade,
            //     })
            //     break
            //   case "delete":
            //     if (confirm("Are you sure you want to delete this location?")) {
            //       deleteLocation(location.id)
            //     }
            //     break
        }
    }

    const handleCreateSubmit = async (data: Partial<ILocation>) => {
        await createLocation(data)
        setFormOpen(false)
    }

    const handleEditSubmit = async (data: Partial<ILocation>) => {
        if (editingLocation) {
            try {
                await updateLocation({
                    id: editingLocation.id,
                    payload: data,
                })
                setEditingLocation(null)
                setFormOpen(false)
            } catch (err) {
                toast({
                    title: "Error",
                    description: "Failed to update location.",
                    variant: "destructive",
                })
            }
        }
    }

    const ActionDropdown = ({ location }: { location: ILocation }) => (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleAction("view", location)}>
                    <Eye className="mr-2 h-4 w-4" /> Ver Detalhes
                </DropdownMenuItem>

                {/* NOVAS OPÇÕES */}
                <DropdownMenuItem onClick={() => handleAction("add_contact", location)}>
                    <UserPlus className="mr-2 h-4 w-4" /> Adicionar Contato
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAction("view_contacts", location)}>
                    <Users className="mr-2 h-4 w-4" /> Listar Contatos
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleAction("edit", location)}>
                    <Edit className="mr-2 h-4 w-4" /> Editar
                </DropdownMenuItem>
                {/* ... delete etc */}
            </DropdownMenuContent>
        </DropdownMenu>
    )

    const renderTableView = () => (
        <div className="rounded-md border">
            <TableComponent>
                <TableHeader>
                    <TableRow>
                        <TableHead>Location Name</TableHead>
                        <TableHead>Address</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredLocations.map((location) => (
                        <TableRow key={location.id}>
                            <TableCell className="font-medium">
                                {location.designacao_localidade_cliente}
                            </TableCell>
                            <TableCell>{location.endereco}</TableCell>
                            <TableCell>
                                <Badge variant={location.status_localizacao_cliente ? "default" : "secondary"}>
                                    {location.status_localizacao_cliente ? "Active" : "Inactive"}
                                </Badge>
                            </TableCell>

                            <TableCell className="text-right">
                                <ActionDropdown location={location} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </TableComponent>
        </div>
    )

    const renderCardsView = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredLocations.map((location) => (
                <Card key={location.id}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            {location.designacao_localidade_cliente}
                        </CardTitle>
                        <ActionDropdown location={location} />
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <Badge variant={location.status_localizacao_cliente ? "default" : "secondary"}>
                                {location.status_localizacao_cliente ? "Active" : "Inactive"}
                            </Badge>
                            <div className="text-xs text-muted-foreground space-y-1">
                                <p className="truncate">
                                    <strong>Address:</strong> {location.endereco}
                                </p>

                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )

    const renderListView = () => (
        <div className="space-y-2">
            {filteredLocations.map((location) => (
                <Card key={location.id}>
                    <CardContent className="flex items-center justify-between p-4">
                        <div className="flex-1 space-y-1">
                            <div className="flex items-center gap-3">
                                <h3 className="font-medium">{location.designacao_localidade_cliente}</h3>
                                <Badge variant={location.status_localizacao_cliente ? "default" : "secondary"}>
                                    {location.status_localizacao_cliente ? "Active" : "Inactive"}
                                </Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span>{location.endereco}</span>
                            </div>
                        </div>
                        <ActionDropdown location={location} />
                    </CardContent>
                </Card>
            ))}
        </div>
    )

    const filteredLocations = locations.filter(
        (location) =>
            location.designacao_localidade_cliente
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            location.endereco.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const activeLocations = filteredLocations.filter(
        (location) => location.status_localizacao_cliente
    ).length
    const inactiveLocations = filteredLocations.filter(
        (location) => !location.status_localizacao_cliente
    ).length

    if (isLoading) {
        return <LocationModuleSkeleton />
    }

    if (error) return <p className="text-red-500">Error: {error.message}</p>

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Locations</h2>
                <p className="text-muted-foreground">
                    Manage and view client locations.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Locations</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{filteredLocations.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Locations</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{activeLocations}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Inactive Locations</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{inactiveLocations}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Activation Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {filteredLocations.length > 0
                                ? Math.round((activeLocations / filteredLocations.length) * 100)
                                : 0}
                            %
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search locations..."
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
                            setEditingLocation(null)
                            setFormOpen(true)
                        }}
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        New Location
                    </Button>
                    <Button
                        variant={viewMode === "table" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setViewMode("table")}
                    >
                        <Table className="h-4 w-4" />
                    </Button>
                    <Button
                        variant={viewMode === "cards" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setViewMode("cards")}
                    >
                        <Grid3X3 className="h-4 w-4" />
                    </Button>
                    <Button
                        variant={viewMode === "list" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setViewMode("list")}
                    >
                        <List className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {isLoading && viewMode === "table" && <LocationModuleSkeleton />}
            {isLoading && viewMode === "cards" && <LocationCardsSkeleton />}
            {isLoading && viewMode === "list" && <LocationListSkeleton />}

            {!isLoading && viewMode === "table" && renderTableView()}
            {!isLoading && viewMode === "cards" && renderCardsView()}
            {!isLoading && viewMode === "list" && renderListView()}

            <LocationFormDialog
                location={editingLocation}
                open={formOpen}
                onOpenChange={(open) => {
                    setFormOpen(open)
                    if (!open) setEditingLocation(null)
                }}
                onSubmit={editingLocation ? handleEditSubmit : handleCreateSubmit}
                clientId={clientId}
            />

            {selectedLocationForContact && (
                <ContactDialog
                    open={contactDialogOpen}
                    onOpenChange={setContactDialogOpen}
                    locationId={Number(selectedLocationForContact.id)}
                    locationName={selectedLocationForContact.designacao_localidade_cliente}
                />
            )}

            {/* Modal de Listagem */}
            {selectedLocationForList && (
                <LocationContactListDialog
                    open={listDialogOpen}
                    onOpenChange={setListDialogOpen}
                    locationId={Number(selectedLocationForList.id)}
                    locationName={selectedLocationForList.designacao_localidade_cliente}
                />
            )}
        </div>
    )
}
