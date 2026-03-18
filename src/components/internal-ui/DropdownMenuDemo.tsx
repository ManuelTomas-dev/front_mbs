import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuthStore } from "@/store/auth"
import Link from "next/link"

const settings = [
  { title: "Access Log", href: "#/system-settings/access-log" },
  { title: "My Location", href: "#/system-settings/my-location" },
  { title: "Country", href: "#/system-settings/country-custom-codes" },
  { title: "Custom Codes", href: "#/system-settings/country-custom-codes" },
  { title: "Currencies", href: "#/system-settings/supplier-currencies" },
  { title: "Product Line", href: "#/system-settings/product-line-revenue-value" },
  { title: "Revenue Value", href: "#/system-settings/product-line-revenue-value" },
]

export function DropdownMenuDemo({ children }: { children: React.ReactNode }) {
  const { logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    // Redirecionar para login ou homepage
    window.location.href = "/login"
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="start">
        <DropdownMenuGroup>
          <DropdownMenuLabel >My Account</DropdownMenuLabel>
          <Link className="" href="/profile">
            <DropdownMenuItem >
              Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Settings</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                {settings.map((setting) => (
                  <DropdownMenuItem key={setting.title}>
                    <Link href={setting.href}>{setting.title}</Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem>More...</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleLogout}>
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

