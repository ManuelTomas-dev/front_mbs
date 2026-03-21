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

import { IQuote } from "@/types/crm/quotes"
import { useQuote } from "@/hooks/crm/quote"
import { QuoteCardsSkeleton, QuoteListSkeleton, QuoteModuleSkeleton } from "./quote-skeleton"
import DialogFormCopy from "./dialog-form copy"
import { QuoteItemsSidebar } from "@/components/module/crm/quotes/Product/QuoteItemsSidebar"
import { QuoteItemRegistrationDialog } from "./Items-quotes/RegistrationDialog"

type ViewMode = "table" | "cards" | "list"

export function QuoteModule() {
    const [searchTerm, setSearchTerm] = useState("")
    const [viewMode, setViewMode] = useState<ViewMode>("table")
    const [selectedQuote, setSelectedQuote] = useState<IQuote | null>(null)
    const [detailsOpen, setDetailsOpen] = useState(false)
    const [formOpen, setFormOpen] = useState(false)
    const [formItemsOpen, setFormItemsOpen] = useState(false)
    const [editingQuote, setEditingQuote] = useState<IQuote | null>(null)

    const { quotes, isLoading, error } = useQuote();

    const handleAction = (action: string, quotes: IQuote) => {

        switch (action) {
            case "view":
                setSelectedQuote(quotes)
                setDetailsOpen(true)
                break
            case "edit":
                setEditingQuote(quotes)
                setFormOpen(true)
                break
            case "add-service":
                setSelectedQuote(quotes)
                setFormItemsOpen(true)
                break
        }
    }

    const ActionDropdown = ({ quote }: { quote: IQuote }) => (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleAction("view", quote)}>
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAction("edit", quote)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAction("add-service", quote)}>
                    <Map className="mr-2 h-4 w-4" />
                    Services | Products
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAction("duplicate", quote)}>
                    <Copy className="mr-2 h-4 w-4" />
                    Duplicate
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleAction("archive", quote)}>
                    <Archive className="mr-2 h-4 w-4" />
                    Archive
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAction("delete", quote)} className="text-red-600 focus:text-red-600">
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
                        <TableHead> Code</TableHead>
                        <TableHead> Cost</TableHead>
                        <TableHead> Description</TableHead>
                        <TableHead> Notes</TableHead>
                        <TableHead> Status</TableHead>
                        <TableHead> Active</TableHead>
                        <TableHead> Created at</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredQuotes.map((quote) => (
                        <TableRow key={quote.id}>
                            <TableCell className="font-medium">{quote.codigo_quotacao}</TableCell>
                            <TableCell className="font-medium">{quote.custo}</TableCell>
                            <TableCell className="font-medium"> {quote.descricao}</TableCell>
                            <TableCell> {quote.notas}   </TableCell>
                            <TableCell>  {quote.status_quote}</TableCell>
                            <TableCell> {quote.status_quote ? "Active" : "Inactive"}</TableCell>
                            <TableCell>{quote.termos_condicoes}</TableCell>
                            <TableCell className="text-right">
                                <ActionDropdown quote={quote} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </TableComponent>
        </div>
    )

    const renderListView = () => (
        <div className="space-y-2">
            {filteredQuotes.map((quote) => (
                <Card key={quote.id}>
                    <CardContent className="flex items-center justify-between p-4">
                        <div className="flex-1 space-y-1">
                            <div className="flex items-center gap-3">
                                <h3 className="font-medium">{quote.codigo_quotacao}</h3>
                                <Badge variant={quote.is_active ? "default" : "secondary"}>{quote.descricao ? "Active" : "Inactive"}</Badge>
                            </div>
                            <div className="flex  items-center gap-4 text-sm text-muted-foreground ">
                                <span>Job description: {quote.fk_moeda}</span>
                                <span>Work e-mail: {quote.fk_cliente_contacto}</span>
                                <span>Created at: {new Date(quote.oportunidade_conversao).toLocaleDateString("en-US")}</span>
                            </div>
                        </div>
                        <ActionDropdown quote={quote} />
                    </CardContent>
                </Card>
            ))}
        </div>
    )

    const filteredQuotes = quotes.filter((quote) => quote.codigo_quotacao.toLowerCase().includes(searchTerm.toLowerCase()) || quote.status_quote.toLowerCase().includes(searchTerm.toLowerCase()))

    const activeQuotes = filteredQuotes.filter((quote) => quote.status_quote).length
    const inactiveQuotes = filteredQuotes.filter((quote) => !quote.status_quote).length

    if (isLoading) {
        return <QuoteModuleSkeleton />
    }

    if (error) return <p>Error fetching data</p>

    return (
        <div className="space-y-6 container mx-auto max-w-360">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Quotes</h2>
                <p className="text-muted-foreground">
                    Manage and view quotes  information in the MBS system.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Quotes Count</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{filteredQuotes.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Quotes Count</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{activeQuotes}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Inactive Quotes Count</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{inactiveQuotes}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Activation Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {filteredQuotes.length > 0 ? Math.round((activeQuotes / filteredQuotes.length) * 100) : 0}%
                        </div>
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
                                    placeholder="Search quotes..."
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
                                    setEditingQuote(null)
                                    setFormOpen(true)
                                }}
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                New Quote
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

                    {isLoading && viewMode === "table" && <QuoteModuleSkeleton />}
                    {isLoading && viewMode === "cards" && <QuoteCardsSkeleton />}
                    {isLoading && viewMode === "list" && <QuoteListSkeleton />}

                    {!isLoading && viewMode === "table" && renderTableView()}
                    {!isLoading && viewMode === "list" && renderListView()}
                </div>
                <div className="shrink-0">
                    <QuoteItemsSidebar />
                </div>
            </div>
            <DialogFormCopy onSubmitAction={(p) => alert(p)} open={formOpen} setOpen={setFormOpen} />
            <QuoteItemRegistrationDialog open={formItemsOpen} setOpen={setFormItemsOpen} quoteId={selectedQuote?.id ?? 0} />
        </div>
    )
}
