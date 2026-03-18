// "use client"
// import { Calendar, Clock, CheckCircle, XCircle } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { Badge } from "@/components/ui/badge"
// import { Separator } from "@/components/ui/separator"
// import { IPersonnel } from "@/types/operation/personnel"

// interface DetailsDialogProps {
//   personnel: IPersonnel | null
//   open: boolean
//   onOpenChange: (open: boolean) => void
//   onEdit?: (personnel: IPersonnel) => void
// }

// export function PersonnelDetailsDialog({ personnel, open, onOpenChange, onEdit }: PersonnelDetailsDialogProps) {
//   if (!personnel) return null

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="max-w-2xl">
//         <DialogHeader>
//           <DialogTitle className="flex items-center gap-2">
//             {personnel.is_active ? (
//               <CheckCircle className="h-5 w-5 text-green-600" />
//             ) : (
//               <XCircle className="h-5 w-5 text-gray-400" />
//             )}
//             {personnel.first_name} {personnel.last_name}
//           </DialogTitle>
//           <DialogDescription>Complete professional personnel details</DialogDescription>
//         </DialogHeader>

//         <div className="space-y-6">
//           {/* Status Section */}
//           <div className="flex flex-row gap-2  space-y-3">
//             <div>
//               <div className="space-y-3">
//                 <h3 className="text-sm font-medium text-muted-foreground">Work Title</h3>
//                 <p className="text-sm">
//                   {personnel.work_title.name} at {personnel.location.name}
//                 </p>
//               </div>
//               <div className="space-y-3">
//                 <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
//                 <Badge variant={personnel.is_active ? "default" : "secondary"} className="text-sm">
//                   {personnel.is_active ? "Active" : "Inactive"}
//                 </Badge>
//               </div>
//             </div>
//             {/* Timestamps */}
//             <div className="space-y-3">
//               <h3 className="text-sm font-medium text-muted-foreground">History</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="flex items-center gap-2">
//                   <Calendar className="h-4 w-4 text-muted-foreground" />
//                   <div className="space-y-1">
//                     <p className="text-sm font-medium">Created at</p>
//                     <p className="text-sm text-muted-foreground">
//                       {new Date(personnel.created_at).toLocaleDateString("en-US", {
//                         day: "2-digit",
//                         month: "2-digit",
//                         year: "numeric",
//                         hour: "2-digit",
//                         minute: "2-digit",
//                       })}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Clock className="h-4 w-4 text-muted-foreground" />
//                   <div className="space-y-1">
//                     <p className="text-sm font-medium">Last updated</p>
//                     <p className="text-sm text-muted-foreground">
//                       {new Date(personnel.updated_at).toLocaleDateString("en-US", {
//                         day: "2-digit",
//                         month: "2-digit",
//                         year: "numeric",
//                         hour: "2-digit",
//                         minute: "2-digit",
//                       })}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <Separator />

//           {/* Basic Information */}
//           <div className="space-y-3">
//             <h3 className="text-sm font-medium text-muted-foreground">Basic Information</h3>
//             <div className="grid grid-cols-4 gap-4">
//               <div className="space-y-1">
//                 <label className="text-sm font-medium">Name</label>
//                 <p className="text-sm text-muted-foreground">{personnel.first_name} {personnel.last_name}</p>
//               </div>
//               <div className="space-y-1">
//                 <label className="text-sm font-medium">System ID</label>
//                 <p className="text-sm text-muted-foreground">#{personnel.id}</p>
//               </div>
//               <div className="space-y-1">
//                 <label className="text-sm font-medium">Personal Email</label>
//                 <p className="text-sm text-muted-foreground">#{personnel.personal_email}</p>
//               </div>
//               <div className="space-y-1">
//                 <label className="text-sm font-medium">Work Title</label>
//                 <p className="text-sm text-muted-foreground">#{personnel.work_title.name}</p>
//               </div>
//               <div className="space-y-1">
//                 <label className="text-sm font-medium">Nationality</label>
//                 <p className="text-sm text-muted-foreground">#{personnel.nationality}</p>
//               </div>
//               <div className="space-y-1">
//                 <label className="text-sm font-medium">Personal Email</label>
//                 <p className="text-sm text-muted-foreground">#{personnel.birthdate}</p>
//               </div>
//               <div className="space-y-1">
//                 <label className="text-sm font-medium">Personal Email</label>
//                 <p className="text-sm text-muted-foreground">#{personnel.address}</p>
//               </div>
//               <div className="space-y-1">
//                 <label className="text-sm font-medium">Role</label>
//                 <p className="text-sm text-muted-foreground">#{personnel.role.name}</p>
//               </div>
//               <div className="space-y-1">
//                 <label className="text-sm font-medium"> Identity Number</label>
//                 <p className="text-sm text-muted-foreground">#{personnel.identity_number}</p>
//               </div>
//               <div className="space-y-1">
//                 <label className="text-sm font-medium">Expiration Date</label>
//                 <p className="text-sm text-muted-foreground">#{personnel.expiration_date}</p>
//               </div>
//             </div>
//           </div>

//           <Separator />



//           {/* Actions */}
//           <div className="flex justify-end gap-2 pt-4">
//             <Button variant="outline" onClick={() => onOpenChange(false)}>
//               Close
//             </Button>
//             {onEdit && <Button onClick={() => onEdit(personnel)}>Edit Title</Button>}
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   )
// }
