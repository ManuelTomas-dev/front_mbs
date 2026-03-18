"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, Eye, EyeOff, Loader2, Lock } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import { api } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"

type ChangePasswordInput = {
  oldPassword: string
  newPassword: string
}

type ValidationErrors = {
  oldPassword?: string
  newPassword?: string
  confirmPassword?: string
}

async function changePassword(payload: ChangePasswordInput): Promise<void> {
  await api.put("/users/change-password", payload)
}

interface ChangePasswordDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ChangePasswordDialog({ open, onOpenChange }: ChangePasswordDialogProps) {
  const { toast } = useToast()
  const [oldPassword, setoldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})

  const changePasswordMutation = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      toast({
        title: "Password changed",
        description: "Your password has been changed successfully.",
      })
      handleClose()
    },
    onError: (error: any) => {
      toast({
        title: "Error changing password",
        description: error?.response?.data?.message || "Unable to change password. Please check your current password.",
        variant: "destructive",
      })
    },
  })

  const validateoldPassword = (password: string): string | undefined => {
    if (!password || password.trim().length === 0) {
      return "Current password is required"
    }
    return undefined
  }

  const validateNewPassword = (password: string): string | undefined => {
    if (!password || password.trim().length === 0) {
      return "New password is required"
    }
    if (password.length < 8) {
      return "Password must be at least 8 characters"
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter"
    }
    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter"
    }
    if (!/[0-9]/.test(password)) {
      return "Password must contain at least one number"
    }
    if (password === oldPassword) {
      return "New password must be different from current password"
    }
    return undefined
  }

  const validateConfirmPassword = (password: string): string | undefined => {
    if (!password || password.trim().length === 0) {
      return "Confirmação de senha é obrigatória"
    }
    if (password !== newPassword) {
      return "As senhas não coincidem"
    }
    return undefined
  }

  const handleOldPasswordChange = (value: string) => {
    setoldPassword(value)
    const error = validateoldPassword(value)
    setValidationErrors((prev) => ({ ...prev, oldPassword: error }))
  }

  const handleNewPasswordChange = (value: string) => {
    setNewPassword(value)
    const error = validateNewPassword(value)
    setValidationErrors((prev) => ({ ...prev, newPassword: error }))

    // Revalidate confirm password if it has been filled
    if (confirmPassword) {
      const confirmError = value !== confirmPassword ? "Passwords do not match" : undefined
      setValidationErrors((prev) => ({ ...prev, confirmPassword: confirmError }))
    }
  }

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value)
    const error = validateConfirmPassword(value)
    setValidationErrors((prev) => ({ ...prev, confirmPassword: error }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const errors: ValidationErrors = {
      oldPassword: validateoldPassword(oldPassword),
      newPassword: validateNewPassword(newPassword),
      confirmPassword: validateConfirmPassword(confirmPassword),
    }

    setValidationErrors(errors)

    const hasErrors = Object.values(errors).some((error) => error !== undefined)
    if (hasErrors) {
      toast({
        title: "Validation error",
        description: "Please correct the errors before continuing.",
        variant: "destructive",
      })
      return
    }

    changePasswordMutation.mutate({
      oldPassword,
      newPassword,
    })
  }

  const handleClose = () => {
    setoldPassword("")
    setNewPassword("")
    setConfirmPassword("")
    setShowOldPassword(false)
    setShowNewPassword(false)
    setShowConfirmPassword(false)
    setValidationErrors({})
    onOpenChange(false)
  }

  const hasValidationErrors = Object.values(validationErrors).some((error) => error !== undefined)
  const isFormEmpty = !oldPassword || !newPassword || !confirmPassword

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Change Password
          </DialogTitle>
          <DialogDescription>Enter your current password and choose a new secure password.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <div className="relative">
                <Input
                  id="current-password"
                  type={showOldPassword ? "text" : "password"}
                  value={oldPassword}
                  onChange={(e) => handleOldPasswordChange(e.target.value)}
                  placeholder="Enter your current password"
                  className={validationErrors.oldPassword ? "border-destructive pr-10" : "pr-10"}
                  aria-invalid={!!validationErrors.oldPassword}
                  aria-describedby={validationErrors.oldPassword ? "current-password-error" : undefined}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  aria-label={showOldPassword ? "Hide password" : "Show password"}
                >
                  {showOldPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              {validationErrors.oldPassword && (
                <p id="current-password-error" className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {validationErrors.oldPassword}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <div className="relative">
                <Input
                  id="new-password"
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => handleNewPasswordChange(e.target.value)}
                  placeholder="Enter your new password"
                  className={validationErrors.newPassword ? "border-destructive pr-10" : "pr-10"}
                  aria-invalid={!!validationErrors.newPassword}
                  aria-describedby={validationErrors.newPassword ? "new-password-error" : undefined}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  aria-label={showNewPassword ? "Hide password" : "Show password"}
                >
                  {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              {validationErrors.newPassword && (
                <p id="new-password-error" className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {validationErrors.newPassword}
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                Minimum 8 characters, with uppercase, lowercase, and numbers
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                  placeholder="Confirm your new password"
                  className={validationErrors.confirmPassword ? "border-destructive pr-10" : "pr-10"}
                  aria-invalid={!!validationErrors.confirmPassword}
                  aria-describedby={validationErrors.confirmPassword ? "confirm-password-error" : undefined}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              {validationErrors.confirmPassword && (
                <p id="confirm-password-error" className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {validationErrors.confirmPassword}
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose} disabled={changePasswordMutation.isPending}>
              Cancel
            </Button>
            <Button type="submit" disabled={changePasswordMutation.isPending || isFormEmpty || hasValidationErrors}>
              {changePasswordMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Changing...
                </>
              ) : (
                "Change Password"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
