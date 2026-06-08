"use client";

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

const dummyProjects: Project[] = [
    {
        id: "1",
        title: "Brand Redesign 2024",
        thumbnail:
            "https://ferf1mheo22r9ira.public.blob.vercel-storage.com/profile-mjss82WnWBRO86MHHGxvJ2TVZuyrDv.jpeg",
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
        title: "Mobile App UI Kit",
        thumbnail:
            "https://ferf1mheo22r9ira.public.blob.vercel-storage.com/img-9bDCbtvn7vD4M8AXzS36TnUlkgBfuv.jpeg",
        status: "completed",
        lastModified: "1d ago",
        collaborators: 5,
        likes: 45,
        views: 289,
        comments: 8,
        tags: ["mobile", "ui-kit"],
        priority: "medium",
    },
] as const;

const statusColors = {
    active: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    archived: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    draft: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
} as const;

const keyboardShortcuts = {
    newProject: "⌘N",
    search: "⌘K",
    toggleView: "⌘V",
    filter: "⌘F",
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

interface SidebarProps {
    isOpen: boolean;
    onOpenChange: (value: boolean) => void;
    isNewProjectOpen: boolean;
    onNewProjectOpenChange: (value: boolean) => void;
}

interface ProjectCardProps {
    project: Project;
    viewMode: "grid" | "list";
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
                        <SheetDescription>Main navigation for the application</SheetDescription>
                    </SheetHeader>
                    <div className="flex h-14 items-center px-4 border-b border-zinc-200 dark:border-zinc-800/50">
                        <FolderOpen className="h-6 w-6 text-zinc-500 dark:text-zinc-400" />
                        <span className="ml-2 text-sm font-medium">Design System</span>
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
                                        New Project
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
                                            <Label htmlFor="project-name">
                                                Project name
                                            </Label>
                                            <Input
                                                id="project-name"
                                                placeholder="Enter project name"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="project-description">
                                                Description
                                            </Label>
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

                        <div className="px-3 py-2">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                                <Input
                                    placeholder="Search..."
                                    className="pl-9 bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-800"
                                />
                                <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-xs bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded">
                                    {keyboardShortcuts.search}
                                </kbd>
                            </div>
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
                                    Design System
                                    <span className="ml-auto text-xs bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full">
                                        12
                                    </span>
                                </Button>
                                <Button
                                    variant="ghost"
                                    className="w-full justify-start gap-2 hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
                                >
                                    <div className="h-4 w-4 rounded bg-linear-to-br from-blue-500 to-cyan-500" />
                                    Mobile App
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

                            <Separator className="bg-zinc-200 dark:bg-zinc-800" />

                            <div className="space-y-1">
                                <div className="flex items-center justify-between px-3">
                                    <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                                        Team Members
                                    </p>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-5 w-5"
                                    >
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
                                        Sarah Chen
                                        <span className="ml-auto text-xs text-zinc-400">
                                            Lead
                                        </span>
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        className="w-full justify-start gap-2 hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
                                    >
                                        <div className="relative">
                                            <div className="h-4 w-4 rounded-full bg-orange-500" />
                                            <div className="absolute bottom-0 right-0 h-1.5 w-1.5 rounded-full bg-zinc-400 ring-2 ring-white dark:ring-zinc-900" />
                                        </div>
                                        Mike Rivera
                                        <span className="ml-auto text-xs text-zinc-400">
                                            Design
                                        </span>
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        className="w-full justify-start gap-2 hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
                                    >
                                        <div className="relative">
                                            <div className="h-4 w-4 rounded-full bg-blue-500" />
                                            <div className="absolute bottom-0 right-0 h-1.5 w-1.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-zinc-900" />
                                        </div>
                                        Lisa Wong
                                        <span className="ml-auto text-xs text-zinc-400">
                                            Dev
                                        </span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </nav>
                </SheetContent>
            </Sheet>

            {/* Desktop Sidebar */}
            <div className="hidden lg:flex lg:flex-col lg:w-64 border-r border-zinc-200 dark:border-zinc-800/50 bg-white dark:bg-zinc-900">
                <div className="flex h-14 items-center px-4 border-b border-zinc-200 dark:border-zinc-800/50 bg-white dark:bg-zinc-900/90">
                    <FolderOpen className="h-6 w-6 text-zinc-500 dark:text-zinc-400" />
                    <span className="ml-2 text-sm font-medium">Design System</span>
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
                                    New Project
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
                                        <Label htmlFor="project-name">
                                            Project name
                                        </Label>
                                        <Input
                                            id="project-name"
                                            placeholder="Enter project name"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="project-description">
                                            Description
                                        </Label>
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

                    <div className="px-3 py-2">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                            <Input
                                placeholder="Search..."
                                className="pl-9 bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-800"
                            />
                            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-xs bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded">
                                {keyboardShortcuts.search}
                            </kbd>
                        </div>
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
                                Design System
                                <span className="ml-auto text-xs bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full">
                                    12
                                </span>
                            </Button>
                            <Button
                                variant="ghost"
                                className="w-full justify-start gap-2 hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
                            >
                                <div className="h-4 w-4 rounded bg-linear-to-br from-blue-500 to-cyan-500" />
                                Mobile App
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

                        <Separator className="bg-zinc-200 dark:bg-zinc-800" />

                        <div className="space-y-1">
                            <div className="flex items-center justify-between px-3">
                                <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                                    Team Members
                                </p>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-5 w-5"
                                >
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
                                    Sarah Chen
                                    <span className="ml-auto text-xs text-zinc-400">
                                        Lead
                                    </span>
                                </Button>
                                <Button
                                    variant="ghost"
                                    className="w-full justify-start gap-2 hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
                                >
                                    <div className="relative">
                                        <div className="h-4 w-4 rounded-full bg-orange-500" />
                                        <div className="absolute bottom-0 right-0 h-1.5 w-1.5 rounded-full bg-zinc-400 ring-2 ring-white dark:ring-zinc-900" />
                                    </div>
                                    Mike Rivera
                                    <span className="ml-auto text-xs text-zinc-400">
                                        Design
                                    </span>
                                </Button>
                                <Button
                                    variant="ghost"
                                    className="w-full justify-start gap-2 hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
                                >
                                    <div className="relative">
                                        <div className="h-4 w-4 rounded-full bg-blue-500" />
                                        <div className="absolute bottom-0 right-0 h-1.5 w-1.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-zinc-900" />
                                    </div>
                                    Lisa Wong
                                    <span className="ml-auto text-xs text-zinc-400">
                                        Dev
                                    </span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </nav>

                <div className="p-4 border-t border-zinc-200 dark:border-zinc-800/50 bg-white dark:bg-zinc-900">
                    <div className="flex items-center">
                        <Image
                            src="https://bykuknqwpctcjrowysyf.supabase.co/storage/v1/object/public/assets/avatar-01.png"
                            alt="Alex Morgan"
                            width={32}
                            height={32}
                            className="rounded-full"
                        />
                        <div className="ml-3">
                            <p className="text-sm font-medium">Alex Morgan</p>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                Product Designer
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function ProjectCard({ project, viewMode }: ProjectCardProps) {
    return (
        <div
            className={cn(
                "group rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/50",
                "hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-lg",
                "transition-all duration-200",
                viewMode === "grid" ? "p-4" : "p-3"
            )}
        >
            <div
                className={cn(
                    "flex",
                    viewMode === "grid" ? "flex-col" : "items-center gap-4"
                )}
            >
                <div className="relative w-full aspect-video rounded-lg bg-zinc-900 overflow-hidden">
                    <Image
                        src={project.thumbnail}
                        alt={project.title}
                        fill
                        className="object-cover"
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

export default function DesignerDashboard() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);

    return (
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
                                        <BreadcrumbLink href="#">
                                            Home
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbLink href="#">
                                            Projects
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>
                                            All Projects
                                        </BreadcrumbPage>
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

                <main className="flex-1 overflow-y-auto bg-zinc-50 dark:bg-zinc-950/50">
                    {/* Adjust padding for mobile */}
                    <div className="px-3 py-4 lg:px-4 lg:py-6">
                        {/* Adjust mobile layout for filters and view toggles */}
                        <div className="flex flex-col gap-4 mb-6 lg:flex-row lg:items-center lg:justify-between">
                            <h1 className="text-xl font-semibold">Projects</h1>
                            
                            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0">
                                <Sheet>
                                    <SheetTrigger asChild>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="rounded-xl whitespace-nowrap"
                                        >
                                            <Filter className="h-4 w-4 mr-2" />
                                            Filter
                                        </Button>
                                    </SheetTrigger>
                                    <SheetContent>
                                        <SheetHeader>
                                            <SheetTitle>Filter Projects</SheetTitle>
                                            <SheetDescription>Customize your project view filters</SheetDescription>
                                        </SheetHeader>
                                        <div className="mt-6 space-y-6">
                                            <div className="space-y-2">
                                                <Label>Priority</Label>
                                                <Select defaultValue="all">
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select priority" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {Object.entries(
                                                            priorities
                                                        ).map(
                                                            ([
                                                                key,
                                                                value,
                                                            ]) => (
                                                                <SelectItem
                                                                    key={
                                                                        key
                                                                    }
                                                                    value={
                                                                        key
                                                                    }
                                                                >
                                                                    {value}
                                                                </SelectItem>
                                                            )
                                                        )}
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
                                                        {Object.entries(
                                                            dateRanges
                                                        ).map(
                                                            ([
                                                                key,
                                                                value,
                                                            ]) => (
                                                                <SelectItem
                                                                    key={
                                                                        key
                                                                    }
                                                                    value={
                                                                        key
                                                                    }
                                                                >
                                                                    {value}
                                                                </SelectItem>
                                                            )
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-2">
                                                <Label>Tags</Label>
                                                <div className="flex flex-wrap gap-2">
                                                    {[
                                                        "branding",
                                                        "logo",
                                                        "mobile",
                                                        "ui-kit",
                                                        "web",
                                                    ].map((tag) => (
                                                        <Button
                                                            key={tag}
                                                            variant="outline"
                                                            size="sm"
                                                            className="rounded-full"
                                                        >
                                                            {tag}
                                                        </Button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label>Team Members</Label>
                                                <div className="space-y-2">
                                                    {[
                                                        "Sarah Chen",
                                                        "Mike Rivera",
                                                        "Lisa Wong",
                                                    ].map((member) => (
                                                        <div
                                                            key={member}
                                                            className="flex items-center space-x-2"
                                                        >
                                                            <Checkbox
                                                                id={member}
                                                            />
                                                            <label
                                                                htmlFor={
                                                                    member
                                                                }
                                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                            >
                                                                {member}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <Separator />

                                            <div className="flex justify-end gap-2">
                                                <Button variant="outline">
                                                    Reset
                                                </Button>
                                                <Button>
                                                    Apply Filters
                                                </Button>
                                            </div>
                                        </div>
                                    </SheetContent>
                                </Sheet>

                                <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-xl p-1">
                                    <Button
                                        variant={
                                            viewMode === "grid"
                                                ? "default"
                                                : "ghost"
                                        }
                                        size="sm"
                                        onClick={() => setViewMode("grid")}
                                    >
                                        <Grid className="h-4 w-4" />
                                        <kbd className="ml-2 text-xs bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded">
                                            {keyboardShortcuts.toggleView}
                                        </kbd>
                                    </Button>
                                    <Button
                                        variant={
                                            viewMode === "list"
                                                ? "default"
                                                : "ghost"
                                        }
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
                                            : "grid-cols-1"
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
                                            : "grid-cols-1"
                                    )}
                                >
                                    {dummyProjects
                                        .filter(
                                            (project) =>
                                                project.status === "in-progress"
                                        )
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
                                            : "grid-cols-1"
                                    )}
                                >
                                    {dummyProjects
                                        .filter(
                                            (project) =>
                                                project.status === "completed"
                                        )
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
                </main>
            </div>
        </div>
    );
}
