export default function ProjectDetailPage({ params }: { params: { id: string } }) {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Project Details: {params.id}</h1>
            <p className="text-muted-foreground">Project details implementation coming soon.</p>
        </div>
    );
}
