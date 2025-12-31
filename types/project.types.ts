export interface Project {
    id: string;
    name: string;
    description?: string;
    apiKey: string;
    userId: string;
    storageUsage: string; // Serialized as string from BigInt
    storageLimit?: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateProjectInput {
    name: string;
    description?: string;
}

export interface UpdateProjectInput {
    name?: string;
    description?: string;
}
