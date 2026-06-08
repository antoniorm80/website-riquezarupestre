
"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { PlusCircle, Folder, Users } from "lucide-react";

interface CreateProjectForm {
    name: string;
    description: string;
    visibility: "private" | "public" | "team";
    teamSize: string;
}

export default function PaintPage() {

  const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<CreateProjectForm>({
        name: "",
        description: "",
        visibility: "private",
        teamSize: "small",
    });

    const handleSubmit = async () => {
        setIsLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsLoading(false);
        setIsOpen(false);
    };

  return (
        <>
            <div className="flex justify-center">
                <Button
                    onClick={() => setIsOpen(true)}
                    className="bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
                >
                    <PlusCircle className="w-4 h-4 mr-2" />
                    New Project
                </Button>
            </div>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-131.25 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-xl font-semibold text-zinc-900 dark:text-white">
                            <Folder className="h-5 w-5" />
                            Create New Project
                        </DialogTitle>
                        <p className="text-sm text-zinc-600 dark:text-zinc-300">
                            Fill in the information below to create your new project workspace.
                        </p>
                    </DialogHeader>

                    <div className="space-y-6 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-sm font-medium text-zinc-900 dark:text-white">
                                Project Name
                            </Label>
                            <Input
                                id="name"
                                placeholder="Enter project name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 focus:ring-zinc-900 dark:focus:ring-zinc-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-sm font-medium text-zinc-900 dark:text-white">
                                Description
                            </Label>
                            <Textarea
                                id="description"
                                placeholder="What's this project about?"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="min-h-25 resize-none bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 focus:ring-zinc-900 dark:focus:ring-zinc-500"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="visibility" className="text-sm font-medium text-zinc-900 dark:text-white">
                                    Visibility
                                </Label>
                                <Select
                                    value={formData.visibility}
                                    onValueChange={(value: "private" | "public" | "team") =>
                                        setFormData({ ...formData, visibility: value })
                                    }
                                >
                                    <SelectTrigger className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                                        <SelectValue placeholder="Select visibility" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="private">Private</SelectItem>
                                        <SelectItem value="public">Public</SelectItem>
                                        <SelectItem value="team">Team</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="teamSize" className="text-sm font-medium text-zinc-900 dark:text-white">
                                    Team Size
                                </Label>
                                <Select
                                    value={formData.teamSize}
                                    onValueChange={(value) =>
                                        setFormData({ ...formData, teamSize: value })
                                    }
                                >
                                    <SelectTrigger className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                                        <SelectValue placeholder="Select size" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="small">1-5 members</SelectItem>
                                        <SelectItem value="medium">6-10 members</SelectItem>
                                        <SelectItem value="large">11+ members</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2">
                        <Button
                            variant="ghost"
                            onClick={() => setIsOpen(false)}
                            className="w-full sm:w-auto text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            disabled={isLoading}
                            className="w-full sm:w-auto bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
                        >
                            {isLoading ? (
                                <div className="flex items-center gap-2">
                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-200 border-t-zinc-600 dark:border-zinc-600 dark:border-t-zinc-200" />
                                    Creating...
                                </div>
                            ) : (
                                <>
                                    <Users className="w-4 h-4 mr-2" />
                                    Create Project
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
} 



    

   