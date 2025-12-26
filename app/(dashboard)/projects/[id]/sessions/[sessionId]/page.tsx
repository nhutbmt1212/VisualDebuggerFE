export default function ProjectSessionDetailPage({ params }: { params: { id: string, sessionId: string } }) {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Session: {params.sessionId}</h1>
            <p className="text-muted-foreground">Session details for project {params.id} coming soon.</p>
        </div>
    );
}
