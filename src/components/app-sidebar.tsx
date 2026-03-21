"use client";

import * as React from "react";
import { IconInnerShadowTop } from "@tabler/icons-react";

import { Sidebar } from "@/components/ui/sidebar";

import { Bell, ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DropdownMenuDemo } from "./internal-ui/DropdownMenuDemo";
import { useAuthStore } from "@/store/auth";
import { Avatar } from "./ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";

type NavItem = {
  title: string;
  href?: string;
  // icon?: LucideIcon
  items?: NavItem[]
}

const data = {
  user: {
    name: "Matuma",
    email: "matuma@netag.ao",
    avatar: "/avatars/shadcn.jpg",
  },
};

const moduleCategories: NavItem[] = [

  {
    title: "Home",
    //  //icon: Home,
    href: "/",
  },

  {
    title: "Dashboard",
    //icon: Building2,
    items: [
      { title: "General Performance", href: "#/contract" },
      {
        title: "Quotes Performance Views",
        href: "#/contract/client-management",
      },
      {
        title: "Contract Performance Views",
        href: "#/contract/purchase-orders",
      },
    ],
  },

  {
    title: "CRM",
    //icon: ShieldCheck,
    items: [
      { title: "BID Tracker", href: "/crm/bid-tracker" },
      { title: "Tracking", href: "/crm/tracking" },
      { title: "Enquiries", href: "/crm/enquiries" },
      { title: "Quotes", href: "/crm/quotes" },
      { title: "Tenders", href: "/crm/tenders" },
      { title: "Tender Proposal", href: "/crm/tender-proposal" },
      { title: "Proposal", href: "/crm/proposal" },
      { title: "Leads", href: "/crm/leads" },
      {
        title: "Contract",
        //icon: Building2,
        items: [
          { title: "Contract List", href: "/contract" },
          { title: "Client Management", href: "#/contract/client-management" },
          { title: "Purchase Orders", href: "#/contract/purchase-orders" },
          { title: "Work Location", href: "#/contract/work-location" },
        ],
      },
      {
        title: "Business",
        //icon: Briefcase,
        items: [
          { title: "Current Business", href: "#/business/current-business" },
          { title: "Upcoming Business", href: "#/business/upcoming-business" },
        ],
      },
    ],
  },

  {
    title: "Operation & QHSE",
    //icon: Briefcase,
    items: [
      {
        title: "QHSE",
        //icon: Briefcase,
        items: [
          { title: "Non-Conformity", href: "#/qhse/non-conformity" },
          { title: "Risk assessment", href: "#/qhse/risk-assessment" },
          { title: "SOC", href: "#/qhse/soc" },
          { title: "JSA", href: "#/qhse/jsa" },
          {
            title: "Permetwork",
            href: "#/qhse/permetwork",
          },
          {
            title: "Welding Work",
            href: "#/qhse/welding-work",
          },
          { title: "History", href: "#/qhse/history" },
          { title: "Audit", href: "#/qhse/audit" },
        ],
      },
      {
        title: "Operation",
        //icon: CircleIcon,
        items: [
          {
            title: "Services Order",
            items: [
              { title: "Personnel Details", href: "/operation/services-order/details" },
              { title: "Job Title", href: "#/personnel/job-title" },
              {
                title: "Qualification & Certification",
                href: "/operation/services-order/qualification-certification",
              },
              {
                title: "Qualification List",
                href: "/operation/services-order/qualification-list",
              },
            ],
          },
          {
            title: "Project",
            //icon: MapPin,
            items: [
              { title: "Tasks", href: "/operation/project/tasks" },
              {
                title: "Project Management",
                href: "/operation/project/project-management",
              },
            ],
          },
          {
            title: "Paperwork",
            //icon: ClipboardCheck,
            items: [
              { title: "Manifests", href: "#/paperwork/manifests#" },
              { title: "Delivery Notes", href: "#/paperwork/delivery-notes#" },
            ],
          },
          {
            title: "Rig",
            //icon: ShieldCheck,
            items: [
              { title: "Rig Report", href: "#/rig-report/rig-report#" },
              { title: "Charts", href: "#/rig-report/charts#" },
              {
                title: "Activity Graphs",
                href: "#/rig-report/activity-graphs#",
              },
            ],
          },
          {
            title: "Integrations",
            href: "#/rig-report/rig-report#"

          },
        ],
      }

    ],
  },

  {
    title: " Procurement & Finance",
    //icon: Briefcase,
    items: [
      {
        title: "Procurement",
        //icon: Briefcase,
        items: [
          { title: "Requests", href: "#/procurement/requests" },

          {
            title: "Purchase Orders", items: [
              { title: "Quotations", href: "/procurement/purchase-orders/quotations" },
              { title: "RF Aproval", href: "/procurement/purchase-orders/rf-approval" },
              { title: "P O", href: "#/procurement/inventory/inventory-management" },

            ]
          },
          {
            title: "Inventory",
            items: [
              {
                title: "PPE",
                href: "/procurement/inventory",
              },
              {
                title: "Tools",
                href: "#/procurement/inventory/inventory-management",
              },
              {
                title: "Consumables",
                href: "#/procurement/inventory/inventory-management",
              },
              {
                title: "Chemicals",
                href: "#/procurement/inventory/inventory-management",
              },
              {
                title: "Hoses",
                href: "#/procurement/inventory/inventory-management",
              },
              {
                title: "Others",
                href: "#/procurement/inventory/inventory-management",
              },
            ],
          },
        ],
      },
      {
        title: "Finance",
        //icon: Briefcase,

        items: [
          {
            title: "Account Received",
            items: [
              {
                title: "Invoices",
                items: [
                  { title: "New Invoice", href: "#/finance/account-received/invoices" },
                  { title: "Draft Invoices", href: "#/finance/account-received/invoices" },
                  { title: "Sent Invoices", href: "#/finance/account-received/receipts" },
                  { title: "Paid Invoices", href: "#/finance/account-received/receipts" },
                  { title: "Overdue", href: "#/finance/account-received/receipts" },
                ]
              },

              {
                title: "Receipt", items: [


                  { title: "Convert Invoice to receipt", href: "#/finance/account-received/receipts" },
                ]
              },


            ]
          },
          {
            title: "Account Payable", items: [
              { title: "P O", href: "#/finance/account-payable/bills" },
            ]
          },
          {
            title: "Treasury", items: [
              { title: "Billing", href: "#/finance/treasury/bank" },
              { title: "Payments", href: "#/finance/treasury/bank" },
            ]
          },
          { title: "Accounting", href: "#/finance/account" },
          { title: "Audit", href: "#/finance/audit" },


        ],
      },
    ],
  },

  {
    title: "People Management",
    // //icon: BadgeCheck,
    items: [
      {
        title: "Personnel",
        //icon: Users,
        items: [
          { title: "Personnel Details", href: "/personnel/details" },
          { title: "Job Title", href: "#/personnel/job-title" },
          { title: "Qualification & Certification", href: "#/personnel/qualification-certification" },
          { title: "Qualification List", href: "#/personnel/qualification-list" },
        ],
      },
      {
        title: "HR",
        //icon: ShieldCheck,
        items: [
          { title: "Management", href: "#" },
          { title: "Payroll", href: "#" },
          { title: "Career Plan", href: "#" },
          { title: "Labour litigation", href: "#" },
          { title: "Qualification", href: "#" },
          { title: "Categories Training", href: "#" },
        ],
      },
      {
        title: "Recruitment",
        //icon: ShieldCheck,
        items: [
          { title: "Request", href: "#" },
          { title: "Recruitment Process", href: "#" },
        ],
      },
      {
        title: "Document Library",
        //icon: Briefcase,
        items: [
          { title: "Meetings", href: "#/document-library/meetings" },
          { title: "Minutes", href: "#/document-library/minutes" },
          { title: "Organograms", href: "#/document-library/organograms" },
          {
            title: "Technical Library",
            href: "#/document-library/technical-library",
          },
          { title: "Orders", href: "#/document-library/orders" },
          { title: "Abbreviations", href: "#/document-library/abbreviations" },
        ],
      },
    ],
  },

  {
    title: "Knowledge & Social Midia",
    // //icon: Settings,
    items: [
      {
        title: "Knowledge",
        // //icon: BadgeCheck,
        items: [
          {
            title: "Document Library",
            //icon: Briefcase,
            items: [
              { title: "Meetings", href: "#/document-library/meetings" },
              { title: "Minutes", href: "#/document-library/minutes" },
              { title: "Organograms", href: "#/document-library/organograms" },
              { title: "Technical Library", href: "#/document-library/technical-library" },
              { title: "Orders", href: "#/document-library/orders" },
              { title: "Abbreviations", href: "#/document-library/abbreviations" },
            ],
          },
          { title: "General Notice", href: "#/Knowledge/general-notice" },
          { title: "Safety Notice", href: "#/Knowledge/safety-notice" },
          { title: "Onboarding", href: "#/Knowledge/onboarding" },
        ],
      },
      {
        title: "Social Media",
        // //icon: BadgeCheck,
        items: [
          {
            title: "Content Strategy & Creation",
            href: "#/social-media/content-strategy",
          },
          {
            title: "Audience Engagement",
            href: "#/social-media/audience-engagement",
          },
          { title: "Analytics & Reporting", href: "#/social-media/analytics" },
          {
            title: "Trend Monitoring",
            href: "#/social-media/trend-monitoring",
          },
        ],
      },
    ],
  },

  {
    title: "Partners",
    //icon: Briefcase,
    items: [
      {
        title: "Client Management", items: [
          { title: "Client List", href: "/partner/client" },
          { title: "Client Category", href: "#/partners/category-supplier" },

        ]
      },
      {
        title: "Supplier Management", items: [
          { title: "Supplier List", href: "#/partner/supplier" },
          { title: "Supplier Category", href: "#/partners/category-supplier" },

        ]
      },
      { title: "Work Location", href: "#/partners/work-location" },
    ],
  }


]
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <nav className="w-full bg-background py-4">
      <div className="flex items-center justify-center gap-8 px-4">
        <a href="/" className="flex items-center gap-2 shrink-0">
          <IconInnerShadowTop className="size-5" />
          <span className="text-base font-semibold"> MBS.</span>
        </a>

        <div className="flex items-center gap-2 rounded-full bg-gray-100 px-2 py-1.5 dark:bg-gray-90">
          {/* <NavDocumentsHorizontal items={modules} /> */}
          <CategorizedMenuNavigation items={moduleCategories} />
        </div>

        <div className="shrink-0">
          {/* <NavDocumentsHorizontal items={data.documents} /> */}
          {/* <NavSecondaryHorizontal items={data.navSecondary} /> */}
          <DropdownMenuDemo>
            <NavUserHorizontal user={data.user} />
          </DropdownMenuDemo>
        </div>
      </div>
    </nav>
  );
}

export function CategorizedMenuNavigation({
  items,
  level = 0,
}: {
  items: NavItem[];
  level?: number;
}) {
  const pathname = usePathname();

  return (
    <div
      className={level === 0 ? "flex flex-row gap-2" : "flex flex-col w-full"}
    >
      {items.map((item) => {
        const hasChildren = !!item.items?.length;
        const isActive = pathname === item.href;

        // --- NÍVEL RAIZ (BARRA SUPERIOR) ---
        if (level === 0) {
          return (
            <Collapsible
              key={item.title}
              className="group/collapsible relative"
            >
              <CollapsibleTrigger asChild>
                <button className="flex items-center gap-2 rounded-full px-3 py-2 sm:text-xs font-medium hover:bg-accent transition-colors">
                  {/* {item.icon && <item.icon className="size-4" />} */}
                  <span>{item.title}</span>
                  {hasChildren && (
                    <ChevronDown className="size-3 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  )}
                </button>
              </CollapsibleTrigger>

              {hasChildren ? (
                /* Menu flutuante (Dropdown) */
                <CollapsibleContent className="absolute left-0 top-full mt-1 z-50">
                  <div className="w-80 rounded-md border bg-background shadow-lg overflow-hidden flex flex-col sm:text-xs ">
                    <CategorizedMenuNavigation
                      items={item.items!}
                      level={level + 1}
                    />
                  </div>
                </CollapsibleContent>
              ) : (
                /* Link simples no topo se não tiver filhos */
                !hasChildren &&
                item.href && (
                  <Link href={item.href} className="hidden" /> // Apenas para lógica se necessário
                )
              )}
            </Collapsible>
          );
        }

        // --- NÍVEIS INTERNOS (DROPDOWN RECURSIVO) ---
        if (hasChildren) {
          return (
            <details
              key={item.title}
              className="group/details border-b last:border-b-0"
            >
              <summary className="flex items-center gap-2 px-4 py-3 text-sm font-medium cursor-pointer hover:bg-accent list-none">
                {/* {item.icon && <item.icon className="size-4" />} */}
                <span>{item.title}</span>
                <ChevronDown className="ml-auto size-3 transition-transform group-open/details:rotate-180" />
              </summary>
              <div className="flex flex-col bg-muted/30 border-t">
                {/* RECURSÃO AQUI */}
                <CategorizedMenuNavigation
                  items={item.items!}
                  level={level + 1}
                />
              </div>
            </details>
          );
        }

        // Item Folha (Link final)
        return (
          <Link
            key={item.title}
            href={item.href || "#"}
            className={`flex items-center gap-2 px-8 py-2 text-xs transition-colors border-b last:border-b-0 ${isActive ? "bg-primary text-white" : "hover:bg-accent"
              }`}
          >
            {/* {item.icon && <item.icon className="size-4" />} */}
            {item.title}
          </Link>
        );
      })}
    </div>
  );
}

// Horizontal user component
function NavUserHorizontal({ user }: { user: any }) {
  const { user: useLoggedUser } = useAuthStore();
  return (
    <div className="flex items-center gap- border-l border-border pl-2 cursor-pointer ml-2">
      <div className="relative text-gray-600 hover:text-gray-900 mr-2">
        <div className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white font-bold">
          9
        </div>
        <Bell size={20} />
      </div>
      <Avatar className="bg-blue-200">
        <AvatarFallback  className="flex items-center justify-center">
        <span>
           {useLoggedUser.first_name[0]}{useLoggedUser.last_name[0]}</span>
        </AvatarFallback>
      </Avatar>
      {/* <img
        src={"https://media.licdn.com/dms/image/v2/D4E03AQF8nQkA6jIcSw/profile-displayphoto-crop_800_800/B4EZy.O2gOIEAI-/0/1772718090751?e=1775088000&v=beta&t=Vwqb-VFe25RUiY4kl17b-CW4NUFQB6Y46166aPUXMAo"}
        alt={useLoggedUser.first_name}
        className="size-8 rounded-full"
      /> */}
      <div className="hidden flex-col sm:flex">
        <p className="text-xs font-medium">{useLoggedUser.first_name} {useLoggedUser.last_name}</p>
        <p className="text-xs text-muted-foreground">{useLoggedUser.work_email}</p>
      </div>
    </div>
  );
}


