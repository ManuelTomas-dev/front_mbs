import { useQuery } from "@tanstack/react-query"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { getContactsByLocation } from "@/services/partner/contact"
import { Loader2, Mail, Phone, Linkedin } from "lucide-react"

interface ContactListProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    locationId: number
    locationName: string
}

export function LocationContactListDialog({ open, onOpenChange, locationId, locationName }: ContactListProps) {

    const { data: contacts, isLoading } = useQuery({
        queryKey: ["location-contacts", locationId],
        queryFn: () => getContactsByLocation(locationId),
        enabled: open, // Só busca quando o modal abre
    })

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle>Contatos de {locationName}</DialogTitle>
                </DialogHeader>

                {isLoading ? (
                    <div className="flex items-center justify-center p-8">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : (
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nome</TableHead>
                                    <TableHead>Contacto</TableHead>
                                    <TableHead>LinkedIn</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {contacts?.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                                            Nenhum contato encontrado.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    contacts?.map((contact) => (
                                        <TableRow key={contact.id}>
                                            <TableCell className="font-medium">{contact.nome_contato}</TableCell>
                                            <TableCell>
                                                <div className="flex flex-col gap-1 text-xs">
                                                    <span className="flex items-center gap-1">
                                                        <Phone className="h-3 w-3" /> {contact.phone}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Mail className="h-3 w-3" /> {contact.email}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {contact.linkedin && contact.linkedin !== "none" ? (
                                                    <a href={contact.linkedin} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">
                                                        <Linkedin className="h-4 w-4" />
                                                    </a>
                                                ) : "-"}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={contact.status_cliente_contacto ? "default" : "secondary"}>
                                                    {contact.status_cliente_contacto ? "Ativo" : "Inativo"}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}