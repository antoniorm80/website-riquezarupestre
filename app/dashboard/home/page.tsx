"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
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
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface Project {
  id: string;
  title: string;
  thumbnail: string;
  status: "in-progress" | "completed";
  lastModified: string;
  collaborators: number;
  likes: number;
  views: number;
  comments: number;
  tags: string[];
  priority: "high" | "medium" | "low";
}

interface ProjectCardProps {
    project: Project;
    viewMode: "grid" | "list";
}

const keyboardShortcuts = {
    newProject: "⌘N",
    search: "⌘K",
    toggleView: "⌘V",
    filter: "⌘F",
} as const;


const dummyProjects: Project[] = [
  {
    id: "1",
    title: "Frutos Secos",
    //thumbnail:"https://ferf1mheo22r9ira.public.blob.vercel-storage.com/profile-mjss82WnWBRO86MHHGxvJ2TVZuyrDv.jpeg",
    thumbnail:"https://images.unsplash.com/photo-1579783902915-f0b0de2c2eb3?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    status: "in-progress",
    lastModified: "2h ago",
    collaborators: 3,
    likes: 24,
    views: 156,
    comments: 12,
    tags: ["branding", "logo"],
    priority: "high",
  },
  {
    id: "2",
    title: "Pueblo Mágico",
    // thumbnail:"https://ferf1mheo22r9ira.public.blob.vercel-storage.com/img-9bDCbtvn7vD4M8AXzS36TnUlkgBfuv.jpeg",
    thumbnail:"https://images.unsplash.com/photo-1532479255663-1ded0438a701?q=80&w=818&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    status: "completed",
    lastModified: "1d ago",
    collaborators: 5,
    likes: 45,
    views: 289,
    comments: 8,
    tags: ["mobile", "ui-kit"],
    priority: "medium",
  },
  {
    id: "3",
    title: "Colina en Chiapas",
    thumbnail:
      "https://images.unsplash.com/photo-1581337204873-ef36aa186caa?q=80&w=856&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    status: "completed",
    lastModified: "1d ago",
    collaborators: 5,
    likes: 45,
    views: 289,
    comments: 8,
    tags: ["mobile", "ui-kit"],
    priority: "medium",
  },
  {
    id: "4",
    title: "Angeles en el Cielo",
    thumbnail:
      "https://images.unsplash.com/photo-1556005693-00fff02f134c?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    status: "completed",
    lastModified: "1d ago",
    collaborators: 5,
    likes: 45,
    views: 289,
    comments: 8,
    tags: ["mobile", "ui-kit"],
    priority: "medium",
  },
  {
    id: "5",
    title: "Avenida del Centro de Monterrey",
    thumbnail:
      "https://images.unsplash.com/photo-1579762593131-b8945254345c?q=80&w=954&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    status: "completed",
    lastModified: "1d ago",
    collaborators: 5,
    likes: 45,
    views: 289,
    comments: 8,
    tags: ["mobile", "ui-kit"],
    priority: "medium",
  },
  {
    id: "6",
    title: "Piedars y Monolitos",
    thumbnail:
      "https://images.unsplash.com/photo-1579541591970-e5780dc6b31f?q=80&w=1043&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    status: "completed",
    lastModified: "3d ago",
    collaborators: 2,
    likes: 5,
    views: 89,
    comments: 10,
    tags: ["Paisaje", "Reliebe"],
    priority: "medium",
  },
] as const;

const statusColors = {
  active: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  archived: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  draft: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
} as const;

const priorities = {
  all: "All Priorities",
  high: "High Priority",
  medium: "Medium Priority",
  low: "Low Priority",
} as const;

const dateRanges = {
  all: "All Time",
  today: "Today",
  week: "This Week",
  month: "This Month",
  quarter: "This Quarter",
} as const;

interface ProjectCardProps {
  project: Project;
  viewMode: "grid" | "list";
}

function ProjectCard({ project, viewMode }: ProjectCardProps) {
  return (
    <div
      className={cn(
        "group rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/50",
        "hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-lg",
        "transition-all duration-200",
        viewMode === "grid" ? "p-4" : "p-3",
      )}
    >
      <div
        className={cn(
          "flex",
          viewMode === "grid" ? "flex-col" : "items-center gap-4",
        )}
      >
        <div className="relative w-full aspect-video rounded-lg bg-zinc-900 overflow-hidden">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover"
            priority
            sizes="auto"
          />
        </div>

        <div className="flex-1 mt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">{project.title}</h3>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>

          <div className="mt-1 flex items-center gap-2 text-xs text-zinc-400">
            <span>{project.lastModified}</span>
            <span>•</span>
            <span>{project.collaborators} collaborators</span>
          </div>

          <div className="mt-3 flex gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md text-xs 
                                         bg-zinc-100/80 dark:bg-zinc-800/80 
                                         text-zinc-600 dark:text-zinc-300
                                         hover:bg-zinc-200 dark:hover:bg-zinc-700
                                         transition-colors duration-200"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="flex items-center gap-1 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
              >
                <Heart className="h-3.5 w-3.5" />
                {project.likes}
              </button>
              <button
                type="button"
                className="flex items-center gap-1 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                {project.comments}
              </button>
              <button
                type="button"
                className="flex items-center gap-1 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
              >
                <Eye className="h-3.5 w-3.5" />
                {project.views}
              </button>
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg"
            >
              <Share2 className="h-3.5 w-3.5 mr-1" />
              Share
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);

  return (
    <>
      <div className="px-3 py-4 lg:px-4 lg:py-6">
        {/* Adjust mobile layout for filters and view toggles */}
        <div className="flex flex-col gap-4 mb-6 lg:flex-row lg:items-center lg:justify-between">
          <h1 className="text-xl font-semibold">Pinturas</h1>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-xl whitespace-nowrap"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filtros
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-amber-300">
                <SheetHeader>
                  <SheetTitle>Filter Projects</SheetTitle>
                  <SheetDescription>
                    Customize your project view filters
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-6">
                  <div className="space-y-2">
                    <Label>Priority</Label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(priorities).map(([key, value]) => (
                          <SelectItem key={key} value={key}>
                            {value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Date Range</Label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="Select date range" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(dateRanges).map(([key, value]) => (
                          <SelectItem key={key} value={key}>
                            {value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Tags</Label>
                    <div className="flex flex-wrap gap-2">
                      {["branding", "logo", "mobile", "ui-kit", "web"].map(
                        (tag) => (
                          <Button
                            key={tag}
                            variant="outline"
                            size="sm"
                            className="rounded-full"
                          >
                            {tag}
                          </Button>
                        ),
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Team Members</Label>
                    <div className="space-y-2">
                      {["Sarah Chen", "Mike Rivera", "Lisa Wong"].map(
                        (member) => (
                          <div
                            key={member}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox id={member} />
                            <label
                              htmlFor={member}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {member}
                            </label>
                          </div>
                        ),
                      )}
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Reset</Button>
                    <Button>Apply Filters</Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-xl p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />               
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsContent value="all">
            <div
              className={cn(
                "grid gap-4 transition-[grid-template-columns] duration-300 ease-out",
                viewMode === "grid"
                  ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
                  : "grid-cols-1",
              )}
            >
              {dummyProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  viewMode={viewMode}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="active">
            <div
              className={cn(
                "grid gap-4",
                viewMode === "grid"
                  ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
                  : "grid-cols-1",
              )}
            >
              {dummyProjects
                .filter((project) => project.status === "in-progress")
                .map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    viewMode={viewMode}
                  />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="archived">
            <div
              className={cn(
                "grid gap-4",
                viewMode === "grid"
                  ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
                  : "grid-cols-1",
              )}
            >
              {dummyProjects
                .filter((project) => project.status === "completed")
                .map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    viewMode={viewMode}
                  />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
