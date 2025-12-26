import { RefreshCcw } from "lucide-react";

export default function ProjectsLoading() {
    return (
        <div className="flex items-center justify-center min-h-[400px]">
            <RefreshCcw className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
    );
}
