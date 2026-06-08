"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import {
  Menu,
  Plus,
  Settings,
  Search,
  Filter,
  Grid,
  List,
  Share2,
  Star,
  Clock,
  Bell,
  MessageSquare,
  Heart,
  Eye,
  MoreVertical,
  FolderOpen,
  PanelsTopLeft
} from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet";
import Avatar from '@/public/img/nino1.png'

const keyboardShortcuts = {
  newProject: "⌘N",
  search: "⌘K",
  toggleView: "⌘V",
  filter: "⌘F",
} as const;

interface SidebarProps {
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
  isNewProjectOpen: boolean;
  onNewProjectOpenChange: (value: boolean) => void;
}

function Sidebar({
  isOpen,
  onOpenChange,
  isNewProjectOpen,
  onNewProjectOpenChange,
}: SidebarProps) {
  return (
    <>
      {/* Mobile Sidebar */}
      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <SheetContent side="left" className="w-70 p-0">
          <SheetHeader className="sr-only">
            <SheetTitle>Navigation Menu</SheetTitle>
            <SheetDescription>
              Main navigation for the application
            </SheetDescription>
          </SheetHeader>
          <div className="flex h-14 items-center px-4 border-b border-zinc-200 dark:border-zinc-800/50">
            <PanelsTopLeft className="h-6 w-6 text-zinc-500 dark:text-zinc-400" />
            <span className="ml-2 text-sm font-medium">
              Panel Administrativo
            </span>
          </div>
          {/* Rest of sidebar content */}
          <nav className="flex-1 overflow-y-auto">
            <div className="p-3">
              <Dialog
                open={isNewProjectOpen}
                onOpenChange={onNewProjectOpenChange}
              >
                <DialogTrigger asChild>
                  <Button className="w-full justify-start gap-2 bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-100 text-white dark:text-zinc-900">
                    <Plus className="h-4 w-4" />
                    Nueva Pintura
                    <kbd className="ml-auto text-xs bg-zinc-800 dark:bg-zinc-200 px-2 py-0.5 rounded">
                      {keyboardShortcuts.newProject}
                    </kbd>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Project</DialogTitle>
                    <DialogDescription>
                      Enter the details for your new project
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="project-name">Project name</Label>
                      <Input
                        id="project-name"
                        placeholder="Enter project name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="project-description">Description</Label>
                      <Input
                        id="project-description"
                        placeholder="Brief project description"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit">Create Project</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
        

            <div className="space-y-6 p-3">
              <div className="space-y-1">
                <p className="px-3 text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                  Workspaces
                </p>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
                >
                  <div className="h-4 w-4 rounded bg-linear-to-br from-purple-500 to-pink-500" />
                  Design Systemas
                  <span className="ml-auto text-xs bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full">
                    12
                  </span>
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
                >
                  <div className="h-4 w-4 rounded bg-linear-to-br from-blue-500 to-cyan-500" />
                  Mobilse Applets
                  <span className="ml-auto text-xs bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full">
                    8
                  </span>
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
                >
                  <div className="h-4 w-4 rounded bg-linear-to-br from-amber-500 to-orange-500" />
                  Marketing
                  <span className="ml-auto text-xs bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full">
                    5
                  </span>
                </Button>
              </div>

              <Separator className="bg-zinc-200 dark:bg-zinc-800" />

              <div className="space-y-2">
                <div className="flex items-center justify-between px-3">
                  <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                    Smart Lists
                  </p>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-1.5 px-2">
                  <Button
                    variant="ghost"
                    className="h-auto p-2 justify-start bg-zinc-100/50 dark:bg-zinc-800/50 hover:bg-zinc-200/50 dark:hover:bg-zinc-800 border border-zinc-200/50 dark:border-zinc-800"
                  >
                    <div className="flex flex-col items-start gap-1">
                      <Clock className="h-3.5 w-3.5 text-zinc-400 dark:text-zinc-500" />
                      <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                        Due Soon
                      </p>
                      <p className="text-[10px] text-zinc-500 dark:text-zinc-400">
                        12 items
                      </p>
                    </div>
                  </Button>

                  <Button
                    variant="ghost"
                    className="h-auto p-2 justify-start bg-zinc-100/50 dark:bg-zinc-800/50 hover:bg-zinc-200/50 dark:hover:bg-zinc-800 border border-zinc-200/50 dark:border-zinc-800"
                  >
                    <div className="flex flex-col items-start gap-1">
                      <Star className="h-3.5 w-3.5 text-zinc-400 dark:text-zinc-500" />
                      <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                        Favorites
                      </p>
                      <p className="text-[10px] text-zinc-500 dark:text-zinc-400">
                        8 items
                      </p>
                    </div>
                  </Button>

                  <Button
                    variant="ghost"
                    className="h-auto p-2 justify-start bg-zinc-100/50 dark:bg-zinc-800/50 hover:bg-zinc-200/50 dark:hover:bg-zinc-800 border border-zinc-200/50 dark:border-zinc-800"
                  >
                    <div className="flex flex-col items-start gap-1">
                      <Eye className="h-3.5 w-3.5 text-zinc-400 dark:text-zinc-500" />
                      <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                        Recent
                      </p>
                      <p className="text-[10px] text-zinc-500 dark:text-zinc-400">
                        15 items
                      </p>
                    </div>
                  </Button>

                  <Button
                    variant="ghost"
                    className="h-auto p-2 justify-start bg-zinc-100/50 dark:bg-zinc-800/50 hover:bg-zinc-200/50 dark:hover:bg-zinc-800 border border-zinc-200/50 dark:border-zinc-800"
                  >
                    <div className="flex flex-col items-start gap-1">
                      <MessageSquare className="h-3.5 w-3.5 text-zinc-400 dark:text-zinc-500" />
                      <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                        Comments
                      </p>
                      <p className="text-[10px] text-zinc-500 dark:text-zinc-400">
                        6 items
                      </p>
                    </div>
                  </Button>
                </div>

                <Button
                  variant="ghost"
                  className="w-full text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
                >
                  Show all lists
                </Button>
              </div>
             
            </div>
          </nav>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 border-r border-zinc-200 dark:border-zinc-800/50 bg-white dark:bg-zinc-900">
        <div className="flex h-14 items-center px-4 border-b border-zinc-200 dark:border-zinc-800/50 bg-white dark:bg-zinc-900/90">
          <PanelsTopLeft className="h-6 w-6 text-zinc-500 dark:text-zinc-400" />
          <span className="ml-2 text-sm font-medium">Panel Administrativo</span>
        </div>

        <nav className="flex-1 overflow-y-auto">
          <div className="p-3">
            <Dialog
              open={isNewProjectOpen}
              onOpenChange={onNewProjectOpenChange}
            >
              <DialogTrigger asChild>
                <Button className="w-full justify-start gap-2 bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-100 text-white dark:text-zinc-900">
                  <Plus className="h-4 w-4" />
                  Nueva Pintura
                  {/* <kbd className="ml-auto text-xs bg-zinc-800 dark:bg-zinc-200 px-2 py-0.5 rounded">
                    {keyboardShortcuts.newProject}
                  </kbd> */}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Nueva Pintura</DialogTitle>
                  <DialogDescription>
                    Captura los detalles de la <b>Nueva Pintura</b>  
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="project-name">Nombre de la Pintura</Label>
                    <Input id="project-name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="project-description">Descripción</Label>
                    <Input
                      id="project-description"                      
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button type="submit">Crear Pintura</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="px-3 py-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <Input
                placeholder="Search..."
                className="pl-9 bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-800"
              />              
            </div>
          </div>

          <div className="space-y-6 p-3">
            <div className="space-y-1">
              <p className="px-3 text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                Obras de Arte
              </p>
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
              >
                <div className="h-4 w-4 rounded bg-linear-to-br from-purple-500 to-pink-500" />
                Ciuades
                <span className="ml-auto text-xs bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full">
                  12
                </span>
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
              >
                <div className="h-4 w-4 rounded bg-linear-to-br from-blue-500 to-cyan-500" />
                Naturaleza
                <span className="ml-auto text-xs bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full">
                  8
                </span>
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
              >
                <div className="h-4 w-4 rounded bg-linear-to-br from-amber-500 to-orange-500" />
                Religiosos
                <span className="ml-auto text-xs bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full">
                  5
                </span>
              </Button>
            </div>

            <Separator className="bg-zinc-200 dark:bg-zinc-800" />

            <div className="space-y-2">
              <div className="flex items-center justify-between px-3">
                <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                  Características
                </p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-1.5 px-2">
                <Button
                  variant="ghost"
                  className="h-auto p-2 justify-start bg-zinc-100/50 dark:bg-zinc-800/50 hover:bg-zinc-200/50 dark:hover:bg-zinc-800 border border-zinc-200/50 dark:border-zinc-800"
                >
                  <div className="flex flex-col items-start gap-1">
                    <Clock className="h-3.5 w-3.5 text-zinc-400 dark:text-zinc-500" />
                    <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                      Próximamente
                    </p>
                    <p className="text-[10px] text-zinc-500 dark:text-zinc-400">
                      12 items
                    </p>
                  </div>
                </Button>

                <Button
                  variant="ghost"
                  className="h-auto p-2 justify-start bg-zinc-100/50 dark:bg-zinc-800/50 hover:bg-zinc-200/50 dark:hover:bg-zinc-800 border border-zinc-200/50 dark:border-zinc-800"
                >
                  <div className="flex flex-col items-start gap-1">
                    <Star className="h-3.5 w-3.5 text-zinc-400 dark:text-zinc-500" />
                    <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                      Favoritos
                    </p>
                    <p className="text-[10px] text-zinc-500 dark:text-zinc-400">
                      8 items
                    </p>
                  </div>
                </Button>

                <Button
                  variant="ghost"
                  className="h-auto p-2 justify-start bg-zinc-100/50 dark:bg-zinc-800/50 hover:bg-zinc-200/50 dark:hover:bg-zinc-800 border border-zinc-200/50 dark:border-zinc-800"
                >
                  <div className="flex flex-col items-start gap-1">
                    <Eye className="h-3.5 w-3.5 text-zinc-400 dark:text-zinc-500" />
                    <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                      Recientes
                    </p>
                    <p className="text-[10px] text-zinc-500 dark:text-zinc-400">
                      15 items
                    </p>
                  </div>
                </Button>

                <Button
                  variant="ghost"
                  className="h-auto p-2 justify-start bg-zinc-100/50 dark:bg-zinc-800/50 hover:bg-zinc-200/50 dark:hover:bg-zinc-800 border border-zinc-200/50 dark:border-zinc-800"
                >
                  <div className="flex flex-col items-start gap-1">
                    <MessageSquare className="h-3.5 w-3.5 text-zinc-400 dark:text-zinc-500" />
                    <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                      Cometnarios
                    </p>
                    <p className="text-[10px] text-zinc-500 dark:text-zinc-400">
                      6 items
                    </p>
                  </div>
                </Button>
              </div>

              <Button
                variant="ghost"
                className="w-full text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
              >
                Show all lists
              </Button>
            </div>

            <Separator className="bg-zinc-200 dark:bg-zinc-800" />

            <div className="space-y-1">
              <div className="flex items-center justify-between px-3">
                <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                  Equipo de Pintores
                </p>
                <Button variant="ghost" size="icon" className="h-5 w-5">
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
              <div className="space-y-1">
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
                >
                  <div className="relative">
                    <div className="h-4 w-4 rounded-full bg-emerald-500" />
                    <div className="absolute bottom-0 right-0 h-1.5 w-1.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-zinc-900" />
                  </div>
                  Asistente
                  <span className="ml-auto text-xs text-zinc-400">Lead</span>
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
                >
                  <div className="relative">
                    <div className="h-4 w-4 rounded-full bg-orange-500" />
                    <div className="absolute bottom-0 right-0 h-1.5 w-1.5 rounded-full bg-zinc-400 ring-2 ring-white dark:ring-zinc-900" />
                  </div>
                  Alumno
                  <span className="ml-auto text-xs text-zinc-400">Design</span>
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
                >
                  <div className="relative">
                    <div className="h-4 w-4 rounded-full bg-blue-500" />
                    <div className="absolute bottom-0 right-0 h-1.5 w-1.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-zinc-900" />
                  </div>
                  Soporte
                  <span className="ml-auto text-xs text-zinc-400">Dev</span>
                </Button>
              </div>
            </div>
          </div>
        </nav>

        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800/50 bg-white dark:bg-zinc-900">
          <div className="flex items-center">
            <Image
              src={Avatar}
              alt="Rubén Rivera"
              width={32}
              height={32}
              className="rounded-full"
              priority
              sizes="auto"
            />
            <div className="ml-3">
              <p className="text-sm font-medium">Rubén Rivera</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Maestro de Pintura
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);

  return (
    <>
      <div className="h-screen flex overflow-hidden bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
        <Sidebar
          isOpen={isMenuOpen}
          onOpenChange={setIsMenuOpen}
          isNewProjectOpen={isNewProjectOpen}
          onNewProjectOpenChange={setIsNewProjectOpen}
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="h-14 flex items-center justify-between px-4 border-b border-zinc-200 dark:border-zinc-800/50 bg-white dark:bg-zinc-900">
            <div className="flex items-center flex-1 gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsMenuOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>

              {/* Hide breadcrumbs on mobile, show simplified title */}
              <h2 className="text-sm font-medium lg:hidden">All Projects</h2>

              <div className="hidden lg:block">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="#">Panel</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink href="#">Pinturas</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Todas las Pinturas</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Simplified mobile header actions */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsNewProjectOpen(true)}
              >
                <Plus className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
              >
                <Bell className="h-4 w-4" />
              </Button>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto bg-zinc-50 dark:bg-zinc-950/50 pl-3">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
