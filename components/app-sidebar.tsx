"use client"

import * as React from "react"
import {
  IconBox,
  IconBuilding,
  IconFileCheck,
  IconHelp,
  IconLayoutGrid,
  IconMessage,
  IconSettings,
  IconSearch,
} from "@tabler/icons-react"
import Link from "next/link"
import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Demo User",
    email: "demo@omnibuild.ai",
    avatar: "/avatars/user.jpg",
  },
  navMain: [
    {
      title: "Project Overview",
      url: "/dashboard",
      icon: IconLayoutGrid,
    },
    {
      title: "Compliance Auditor",
      url: "/dashboard/compliance",
      icon: IconFileCheck,
    },
    {
      title: "3D Visualization",
      url: "/dashboard/visualization",
      icon: IconBox,
    },
    {
      title: "Optimization Lab",
      url: "/dashboard/optimization",
      icon: IconMessage,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: IconSettings,
    },
    {
      title: "Help Center",
      url: "/dashboard/help",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
  documents: [],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link href="/dashboard">
                <IconBuilding className="size-5!" />
                <span className="text-base font-semibold">OmniBuild AI</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {data.documents.length > 0 && <NavDocuments items={data.documents} />}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
