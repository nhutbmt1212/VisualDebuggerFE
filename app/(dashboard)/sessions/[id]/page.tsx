export default function SessionDetailPage({ params }: { params: { id: string } }) {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Session Details: {params.id}</h1>
            <p className="text-muted-foreground">Session details implementation coming soon.</p>
        </div>
    );
}
