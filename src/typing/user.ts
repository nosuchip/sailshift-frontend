export interface User {
    id: string;
    activatedAt: string;
    email: string;
    name: string;
    role: string;
}

export interface UserDocuments {
  current: Document[];
  past: Document[];
}
