export default function ProjectSessionsPage({ params }: { params: { id: string } }) {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Sessions for Project: {params.id}</h1>
            <p className="text-muted-foreground">Sessions list for this project implementation coming soon.</p>
        </div>
    );
}
