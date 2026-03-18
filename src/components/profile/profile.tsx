"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  User,
  Mail,
  Phone,
  Calendar,
  Clock,
  Edit3,
  Save,
  X,
  Camera,
  Briefcase,
  Building,
  Loader2,
  AlertCircle,
  KeyRound,
  ChevronLeft,
  MapPin,
} from "lucide-react"
import { api } from "@/lib/api"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ChangePasswordDialog } from "./change-password-dialog"
import { useRouter } from "next/navigation"
import { IPersonnel, IUpdatePersonnel, ValidationErrors} from "@/types/operation/personnel"
import { useAuthStore } from "@/store/auth"







async function getProfile(idUser: string): Promise<IPersonnel> {
  const { data } = await api.get(`/users/${idUser}`)
  return data
}

async function updateProfile(id: string, payload: IUpdatePersonnel): Promise<IPersonnel> {
  const { data } = await api.put(`/users/${id}`, payload)
  return data
}

const roleLabels: Record<IPersonnel["role"]["name"], string> = {
  superAdmin: "Super Administrator",
  admin: "Administrator",
}

export function ProfileModule() {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const [isEditing, setIsEditing] = useState(false)
  const [editedData, setEditedData] = useState<IUpdatePersonnel>({})
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false)
  const { getUserId } = useAuthStore()
  const {
    data: profile,
    error,
    isLoading,
  } = useQuery<IPersonnel>({
    queryKey: ["personnel"],
    queryFn: () => getProfile(getUserId() || ""),
    staleTime: 30000,
  })

  const router = useRouter();

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: IUpdatePersonnel }) =>
      updateProfile(id, payload),

    onSuccess: (data) => {
      queryClient.setQueryData(["me"], data)
      setIsEditing(false)
      setEditedData({})

      toast({
        title: "Profile updated",
        description: "Your information has been saved successfully.",
      })
    },

    onError: (error: any) => {
      toast({
        title: "Error updating",
        description:
          error?.response?.data?.message ||
          "It was not possible to save the changes.",
        variant: "destructive",
      })
    },
  })


  const validateUsername = (username: string): string | undefined => {
    if (!username || username.trim().length === 0) {
      return "Username is required"
    }
    if (username.trim().length < 3) {
      return "Username must have at least 3 characters"
    }
    if (username.trim().length > 50) {
      return "Username must have no more than 50 characters"
    }
    return undefined
  }

  const validateEmail = (email: string): string | undefined => {
    if (!email || email.trim().length === 0) {
      return "Email is required"
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Invalid email"
    }
    return undefined
  }

  const validatePhone = (phone: string): string | undefined => {
    if (!phone || phone.trim().length === 0) {
      return "Phone number is required"
    }
    const phoneRegex = /^\+244\s?[9]\d{2}\s?\d{3}\s?\d{3}$/
    if (!phoneRegex.test(phone)) {
      return "Invalid phone number. Use the format: +244 900 000 000"
    }
    return undefined
  }

  const formatPhoneNumber = (value: string): string => {
    const cleaned = value.replace(/[^\d+]/g, "")
    if (!cleaned.startsWith("+244")) {
      if (cleaned.startsWith("244")) {
        return "+244"
      }
      if (cleaned.startsWith("+")) {
        return "+244"
      }
      return "+244"
    }
    const digits = cleaned.slice(4)
    if (digits.length <= 3) {
      return `+244 ${digits}`
    } else if (digits.length <= 6) {
      return `+244 ${digits.slice(0, 3)} ${digits.slice(3)}`
    } else {
      return `+244 ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 9)}`
    }
  }

  const handleEdit = () => {
    if (profile) {
      setEditedData({
        first_name: profile.first_name,
        last_name: profile.last_name,
        address: profile.address,
        birthdate: profile.birthdate,
        expiration_date: profile.expiration_date,
        telephone: profile.telephone,
        identity_number: profile.identity_number,
        nationality: profile.nationality,
        personal_email: profile.personal_email,
        supervisor_id: profile.supervisor_id,

      })
    }
    setValidationErrors({})
    setIsEditing(true)
  }

  const handleSave = () => {
    const errors: ValidationErrors = {}

    if (editedData.first_name !== undefined) {
      const usernameError = validateUsername(editedData.first_name)
      if (usernameError) errors.first_name = usernameError
    }

    if (editedData.personal_email !== undefined) {
      const emailError = validateEmail(editedData.personal_email)
      if (emailError) errors.personal_email = emailError
    }

    if (editedData.telephone !== undefined) {
      const phoneError = validatePhone(editedData.telephone)
      if (phoneError) errors.telephone = phoneError
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors)
      toast({
        title: "Validation error",
        description: "Please correct the errors before saving.",
        variant: "destructive",
      })
      return
    }


    if (Object.keys(editedData).length > 0 && profile) {
      updateMutation.mutate({
        id: profile.id, payload: editedData
      }
      )


    }
  }

  const handleCancel = () => {
    setEditedData({})
    setValidationErrors({})
    setIsEditing(false)
  }

  const handleInputChange = (field: keyof IUpdatePersonnel, value: string) => {
    let processedValue = value

    if (field === "telephone") {
      processedValue = formatPhoneNumber(value)
    }

    setEditedData((prev) => ({
      ...prev,
      [field]: processedValue,
    }))

    let error: string | undefined
    if (field === "first_name" || field === "last_name") {
      error = validateUsername(processedValue)
    } else if (field === "personal_email") {
      error = validateEmail(processedValue)
    } else if (field === "telephone") {
      error = validatePhone(processedValue)
    }

    setValidationErrors((prev) => ({
      ...prev,
      [field]: error,
    }))
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (error || !profile) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">User Profile</h2>
          <p className="text-muted-foreground">View and edit your personal information</p>
        </div>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Failed to load profile data. Please try again later.</AlertDescription>
        </Alert>
      </div>
    )
  }

  const displayData = isEditing ? { ...profile, ...editedData } : profile
  const hasValidationErrors = Object.values(validationErrors).some((error) => error !== undefined)

  return (
    <div className="space-y-6">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">User Profile</h2>
          <p className="text-muted-foreground">View and edit your personal information</p>
        </div>
        <div className="flex gap-2">
          {!isEditing ? (
            <>
              <Button onClick={handleEdit} className="gap-2">
                <Edit3 className="h-4 w-4" />
                Edit Profile
              </Button>
              <Button onClick={() => setIsPasswordDialogOpen(true)} variant="outline" className="gap-2">
                <KeyRound className="h-4 w-4" />
                Change Password
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={handleSave}
                className="gap-2"
                disabled={updateMutation.isPending || Object.keys(editedData).length === 0 || hasValidationErrors}
              >
                {updateMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Save
              </Button>
              <Button
                onClick={handleCancel}
                variant="outline"
                className="gap-2 bg-transparent"
                disabled={updateMutation.isPending}
              >
                <X className="h-4 w-4" />
                Cancel
              </Button>
            </>
          )}
        </div>
      </div>

      <div>
        <Button variant={"ghost"} onClick={() => router.back()}> <ChevronLeft className="h-4 w-4" /> Voltar </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Card */}
        <Card className="lg:col-span-1">
          <CardHeader className="text-center">
            <div className="relative mx-auto">
              <Avatar className="h-24 w-24">
                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${profile.first_name}`} />
                <AvatarFallback className="text-lg">
                  {profile.first_name+" "+profile.last_name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <Button
                  size="sm"
                  variant="secondary"
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                  title="Change Profile Picture"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              )}
            </div>
            <div className="space-y-2">
              <CardTitle className="text-xl">{profile.first_name+" "+profile.last_name}</CardTitle>
              <p className="text-sm text-muted-foreground">{roleLabels[profile.role.name]}</p>
              <Badge variant={profile.is_active ? "default" : "secondary"}>
                {profile.is_active ? "Active" : "Inactive"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {profile.location && (
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="truncate">{profile.location.name}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
              <span>Since {formatDate(profile.created_at)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
              <span className="text-balance">Updated at {formatDateTime(profile.updated_at)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Profile Details */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                {isEditing ? (
                  <>
                    <Input
                      id="username"
                      value={displayData.first_name}
                      onChange={(e) => handleInputChange("first_name", e.target.value)}
                      placeholder="Enter your first_name"
                      className={validationErrors.first_name ? "border-destructive focus-visible:ring-destructive" : ""}
                      aria-invalid={!!validationErrors.first_name}
                      aria-describedby={validationErrors.first_name ? "first_name-error" : undefined}
                    />
                    {validationErrors.first_name && (
                      <p id="first_name-error" className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {validationErrors.first_name}
                      </p>
                    )}
                  </>
                ) : (
                  <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-md">
                    <User className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="truncate">{profile.first_name}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                {isEditing ? (
                  <>
                    <Input
                      id="email"
                      type="email"
                      value={displayData.personal_email}
                      onChange={(e) => handleInputChange("personal_email", e.target.value)}
                      placeholder="your@email.com"
                      className={validationErrors.personal_email ? "border-destructive focus-visible:ring-destructive" : ""}
                      aria-invalid={!!validationErrors.personal_email}
                      aria-describedby={validationErrors.personal_email ? "personal_email-error" : undefined}
                    />
                    {validationErrors.personal_email && (
                      <p id="personal_email-error" className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {validationErrors.personal_email}
                      </p>
                    )}
                  </>
                ) : (
                  <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-md">
                    <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="truncate">{profile.personal_email}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                {isEditing ? (
                  <>
                    <Input
                      id="phone"
                      value={displayData.telephone}
                      onChange={(e) => handleInputChange("telephone", e.target.value)}
                      placeholder="+244 900 000 000"
                      className={validationErrors.telephone ? "border-destructive focus-visible:ring-destructive" : ""}
                      aria-invalid={!!validationErrors.telephone}
                      aria-describedby={validationErrors.telephone ? "telephone-error" : undefined}
                      maxLength={17}
                    />
                    {validationErrors.telephone && (
                      <p id="telephone-error" className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {validationErrors.telephone}
                      </p>
                    )}
                  </>
                ) : (
                  <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-md">
                    <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span>{profile.telephone}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-md">
                  <Briefcase className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span>{roleLabels[profile.role.name]}</span>
                </div>
              </div>

              {profile.location && (
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="location">Location</Label>
                  <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-md">
                    <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span>{profile.location.name}</span>
                  </div>
                </div>
              )}
            </div>

            <Separator />

            <div className="grid gap-4 sm:grid-cols-2 text-sm">
              <div className="space-y-1">
                <p className="text-muted-foreground">User ID</p>
                <p className="font-mono text-xs bg-muted/50 p-2 rounded-md break-all">{profile.id}</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground">Account Status</p>
                <p className="font-medium">{profile.is_active ? "Active" : "Inactive"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <ChangePasswordDialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen} />
    </div>
  )
}
