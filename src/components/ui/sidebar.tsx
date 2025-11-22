

"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "./sheet"
import { Button } from "./button"
import { Menu } from "lucide-react"
import { ScrollArea } from "./scroll-area"
import { Slot } from "@radix-ui/react-slot"

const sidebarVariants = cva(
  "flex h-full flex-col bg-sidebar text-sidebar-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        primary: "bg-sidebar-primary text-sidebar-primary-foreground",
      },
      collapsed: {
        true: "w-14",
        false: "w-64",
      },
    },
    defaultVariants: {
      variant: "default",
      collapsed: false,
    },
  }
)

export interface SidebarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sidebarVariants> {
  collapsed?: boolean
  collapsible?: boolean
  setCollapsed?: React.Dispatch<React.SetStateAction<boolean>>
}

const SidebarContext = React.createContext<SidebarProps>({})

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

function SidebarProvider({
  children,
  ...props
}: { children: React.ReactNode } & SidebarProps) {
  const isMobile = useIsMobile()
  const [collapsed, setCollapsed] = React.useState(props.collapsed ?? false)

  const contextValue: SidebarProps = {
    ...props,
    collapsed: isMobile ? true : collapsed,
    setCollapsed: setCollapsed,
  }

  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
    </SidebarContext.Provider>
  )
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ className, variant, collapsed, ...props }, ref) => {
    const {
      collapsed: isCollapsed,
    } = useSidebar()
    const isMobile = useIsMobile()

    if (isMobile) {
      return (
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="fixed top-4 left-4 z-50"
            >
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <div
              ref={ref}
              className={cn(sidebarVariants({ variant, collapsed: false }), className)}
              {...props}
            />
          </SheetContent>
        </Sheet>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(sidebarVariants({ variant, collapsed: isCollapsed }), className)}
        {...props}
      />
    )
  }
)
Sidebar.displayName = "Sidebar"

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-4", className)}
    {...props}
  />
))
SidebarHeader.displayName = "SidebarHeader"

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <ScrollArea ref={ref} className={cn("flex-1", className)} {...props} />
))
SidebarContent.displayName = "SidebarContent"

const SidebarMenu = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-col gap-2 p-4 pt-0", className)}
    {...props}
  />
))
SidebarMenu.displayName = "SidebarMenu"

const SidebarMenuItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
))
SidebarMenuItem.displayName = "SidebarMenuItem"

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button> & { isActive?: boolean; asChild?: boolean }
>(({ isActive, asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    <Button
      variant={isActive ? "secondary" : "ghost"}
      className="h-10 w-full justify-start"
      ref={ref}
      {...props}
    />
  )
})
SidebarMenuButton.displayName = "SidebarMenuButton"


const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mt-auto p-4", className)}
    {...props}
  />
))
SidebarFooter.displayName = "SidebarFooter"

export {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  useSidebar,
}
