"use client"

import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { projectsService } from '@/services/projects.service'
import { RefreshCcw } from 'lucide-react'

interface CreateProjectDialogProps {
    onProjectCreated: () => void
}

export function CreateProjectDialog({ onProjectCreated }: CreateProjectDialogProps) {
    const [open, setOpen] = useState(false)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [enableLogging, setEnableLogging] = useState(true)
    const [shareWithTeam, setShareWithTeam] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!name.trim()) return

        setLoading(true)
        setError(null)

        try {
            await projectsService.create({ name, description })
            setName('')
            setDescription('')
            setOpen(false)
            onProjectCreated()
        } catch (err) {
            const caughtError = err as Error
            setError(caughtError.message || 'Failed to create project')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary-hover text-white font-bold h-12 px-8 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center gap-2">
                    <span className="material-symbols-outlined">add</span>
                    New Project
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl bg-[#0d121a] border-slate-800 p-0 overflow-hidden sm:rounded-3xl">
                <form onSubmit={handleSubmit} className="flex flex-col">
                    {/* Header with Cancel */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/50">
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="text-primary font-semibold text-sm hover:underline"
                        >
                            Cancel
                        </button>
                        <DialogTitle className="text-white text-base font-bold">Create New Project</DialogTitle>
                        <div className="w-10"></div> {/* Spacer */}
                    </div>

                    <div className="p-6 space-y-8">
                        <DialogDescription className="text-slate-400 text-sm leading-relaxed">
                            Configure the initial settings for your debugging session. The project name will be used as the unique identifier within your workspace.
                        </DialogDescription>

                        {error && (
                            <div className="bg-error/10 text-error px-4 py-3 rounded-lg border border-error/20 text-sm">
                                {error}
                            </div>
                        )}

                        <div className="space-y-6">
                            {/* Project Name */}
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-slate-500">Project Name</Label>
                                <div className="relative">
                                    <Input
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="e.g., Auth Service Debug"
                                        className="bg-[#161d27] border-slate-800 h-12 rounded-xl focus:ring-primary focus:border-primary text-white"
                                        required
                                    />
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                        <div className="size-5 rounded border border-slate-700 flex items-center justify-center">
                                            <div className="size-2 rounded-full border border-slate-400"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <Label htmlFor="description" className="text-xs font-bold uppercase tracking-wider text-slate-500">Description</Label>
                                <Textarea
                                    id="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Briefly describe the scope or goal of this project..."
                                    className="bg-[#161d27] border-slate-800 min-h-[120px] rounded-xl focus:ring-primary focus:border-primary text-white resize-none"
                                />
                            </div>

                            {/* Toggles */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-[#161d27] border border-slate-800 rounded-xl">
                                    <div className="space-y-0.5">
                                        <Label className="text-sm font-bold text-white">Enable Logging</Label>
                                        <p className="text-xs text-slate-500">Capture console output</p>
                                    </div>
                                    <Switch
                                        checked={enableLogging}
                                        onCheckedChange={setEnableLogging}
                                    />
                                </div>

                                <div className="flex items-center justify-between p-4 bg-[#161d27] border border-slate-800 rounded-xl">
                                    <div className="space-y-0.5">
                                        <Label className="text-sm font-bold text-white">Share with Team</Label>
                                        <p className="text-xs text-slate-500">Make project public</p>
                                    </div>
                                    <Switch
                                        checked={shareWithTeam}
                                        onCheckedChange={setShareWithTeam}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Action */}
                    <div className="p-6 pt-0">
                        <Button
                            type="submit"
                            disabled={loading || !name.trim()}
                            className="w-full bg-primary hover:bg-primary-hover text-white font-bold h-14 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
                        >
                            {loading ? <RefreshCcw className="animate-spin size-5" /> : 'Create Project'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
