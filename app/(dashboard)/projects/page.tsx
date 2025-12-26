'use client';

import { useEffect, useState } from 'react';
import { projectsService } from '@/services/projects.service';
import { Project } from '@/graphql/generated/graphql';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, RefreshCcw } from 'lucide-react';
import Link from 'next/link';

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadProjects = async () => {
        try {
            setLoading(true);
            const data = await projectsService.fetchAll();
            setProjects(data);
            setError(null);
        } catch (err: any) {
            setError(err.message || 'Failed to load projects');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProjects();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <RefreshCcw className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
                    <p className="text-muted-foreground">
                        Manage your debugged projects and API keys.
                    </p>
                </div>
                <Button asChild>
                    <Link href="/projects/new">
                        <Plus className="mr-2 h-4 w-4" /> New Project
                    </Link>
                </Button>
            </div>

            {error && (
                <div className="bg-destructive/15 text-destructive px-4 py-3 rounded-md">
                    {error}
                </div>
            )}

            {projects.length === 0 ? (
                <Card className="flex flex-col items-center justify-center p-12 text-center border-dashed">
                    <CardHeader>
                        <CardTitle>No projects found</CardTitle>
                        <CardDescription>
                            Get started by creating your first project.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button variant="outline" asChild>
                            <Link href="/projects/new">Create Project</Link>
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project) => (
                        <Link key={project.id} href={`/projects/${project.id}`}>
                            <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
                                <CardHeader>
                                    <CardTitle>{project.name}</CardTitle>
                                    <CardDescription className="line-clamp-2">
                                        {project.description || 'No description'}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-sm font-mono bg-muted p-2 rounded truncate">
                                        {project.apiKey}
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
