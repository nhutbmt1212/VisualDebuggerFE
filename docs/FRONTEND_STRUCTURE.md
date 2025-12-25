# Frontend Project Structure - VisualDebugger

> **Cấu trúc thư mục chuẩn cho Next.js 14 App Router với TypeScript**

## 📁 Tổng quan cấu trúc

```
VisualDebuggerFE/
├── app/                          # Next.js 14 App Router
│   ├── (auth)/                   # Route group cho authentication
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── register/
│   │   │   └── page.tsx
│   │   └── layout.tsx            # Auth layout wrapper
│   │
│   ├── (dashboard)/              # Route group cho authenticated pages
│   │   ├── projects/
│   │   │   ├── page.tsx          # /projects - danh sách projects
│   │   │   ├── [id]/
│   │   │   │   ├── page.tsx      # /projects/:id - chi tiết project
│   │   │   │   └── sessions/
│   │   │   │       ├── page.tsx  # /projects/:id/sessions
│   │   │   │       └── [sessionId]/
│   │   │   │           └── page.tsx
│   │   │   └── loading.tsx       # Loading skeleton
│   │   │
│   │   ├── sessions/
│   │   │   ├── page.tsx
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx
│   │   │   └── loading.tsx
│   │   │
│   │   └── layout.tsx            # Dashboard layout với sidebar/navbar
│   │
│   ├── api/                      # API Routes (nếu cần)
│   │   └── health/
│   │       └── route.ts
│   │
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Homepage (/)
│   ├── globals.css               # Global styles
│   ├── error.tsx                 # Global error boundary
│   ├── loading.tsx               # Global loading state
│   └── not-found.tsx             # 404 page
│
├── components/                   # React components
│   ├── ui/                       # Base UI components (shadcn/ui style)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── input.tsx
│   │   ├── skeleton.tsx
│   │   ├── toast.tsx
│   │   └── index.ts              # Barrel export
│   │
│   ├── features/                 # Feature-specific components
│   │   ├── auth/
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterForm.tsx
│   │   │   └── AuthGuard.tsx
│   │   │
│   │   ├── projects/
│   │   │   ├── ProjectCard.tsx
│   │   │   ├── ProjectList.tsx
│   │   │   ├── ProjectForm.tsx
│   │   │   └── ProjectDetails.tsx
│   │   │
│   │   ├── sessions/
│   │   │   ├── SessionCard.tsx
│   │   │   ├── SessionList.tsx
│   │   │   ├── SessionTimeline.tsx
│   │   │   └── SessionViewer.tsx
│   │   │
│   │   └── debug/
│   │       ├── EventList.tsx
│   │       ├── EventDetails.tsx
│   │       ├── DebugConsole.tsx
│   │       └── VariableInspector.tsx
│   │
│   ├── layout/                   # Layout components
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Footer.tsx
│   │   └── Container.tsx
│   │
│   └── shared/                   # Shared/common components
│       ├── LoadingSpinner.tsx
│       ├── ErrorBoundary.tsx
│       ├── EmptyState.tsx
│       └── Pagination.tsx
│
├── lib/                          # Utility functions & configurations
│   ├── utils.ts                  # General utilities (cn, formatters, etc.)
│   ├── constants.ts              # App constants
│   ├── api-client.ts             # Axios/fetch wrapper
│   ├── socket.ts                 # Socket.io client setup
│   └── validations.ts            # Validation schemas (Zod/Yup)
│
├── hooks/                        # Custom React hooks
│   ├── useAuth.ts
│   ├── useProjects.ts
│   ├── useSessions.ts
│   ├── useDebugEvents.ts
│   ├── useSocket.ts
│   ├── useLocalStorage.ts
│   └── useDebounce.ts
│
├── store/                        # State management (Zustand)
│   ├── auth.store.ts
│   ├── projects.store.ts
│   ├── sessions.store.ts
│   ├── ui.store.ts               # UI state (modals, sidebar, etc.)
│   └── index.ts
│
├── services/                     # API service layer
│   ├── auth.service.ts
│   ├── projects.service.ts
│   ├── sessions.service.ts
│   ├── events.service.ts
│   └── index.ts
│
├── types/                        # TypeScript type definitions
│   ├── auth.types.ts
│   ├── project.types.ts
│   ├── session.types.ts
│   ├── event.types.ts
│   ├── api.types.ts              # API response/request types
│   └── index.ts                  # Barrel export
│
├── config/                       # Configuration files
│   ├── env.ts                    # Environment variables validation
│   ├── routes.ts                 # Route constants
│   └── theme.ts                  # Theme configuration
│
├── styles/                       # Additional styles (nếu cần)
│   ├── animations.css
│   └── utilities.css
│
├── public/                       # Static assets
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── docs/                         # Documentation
│   ├── FRONTEND_STRUCTURE.md     # This file
│   ├── COMPONENTS.md             # Component guidelines
│   └── API_INTEGRATION.md        # API integration guide
│
├── .env.example                  # Environment variables template
├── .env.local                    # Local environment variables
├── next.config.js                # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
├── package.json
└── README.md
```

---

## 🎯 Nguyên tắc tổ chức

### 1. **App Router (`app/`)**

- **Route Groups**: Sử dụng `(groupName)` để nhóm routes mà không ảnh hưởng URL
  - `(auth)`: Các trang authentication
  - `(dashboard)`: Các trang yêu cầu authentication
  
- **File Conventions**:
  - `page.tsx`: Route component
  - `layout.tsx`: Shared layout
  - `loading.tsx`: Loading UI (Suspense fallback)
  - `error.tsx`: Error boundary
  - `not-found.tsx`: 404 page

- **Dynamic Routes**: Sử dụng `[param]` cho dynamic segments
  ```
  projects/[id]/page.tsx → /projects/:id
  ```

### 2. **Components (`components/`)**

#### **UI Components** (`ui/`)
- Base components, reusable, không chứa business logic
- Style với Tailwind CSS + class-variance-authority
- Export qua `index.ts` để import dễ dàng

```typescript
// components/ui/index.ts
export { Button } from './button';
export { Card } from './card';
```

#### **Feature Components** (`features/`)
- Nhóm theo feature/module
- Chứa business logic cụ thể
- Có thể sử dụng hooks, stores

#### **Layout Components** (`layout/`)
- Components cho layout structure
- Header, Sidebar, Footer, Container

#### **Shared Components** (`shared/`)
- Components dùng chung nhiều nơi
- Không thuộc feature cụ thể nào

### 3. **Hooks (`hooks/`)**

- Prefix với `use`
- Mỗi hook một file
- Export default

```typescript
// hooks/useAuth.ts
export default function useAuth() {
  // ...
}

// Usage
import useAuth from '@/hooks/useAuth';
```

### 4. **Services (`services/`)**

- API calls tập trung
- Mỗi module một file
- Return typed data

```typescript
// services/projects.service.ts
export const projectsService = {
  getAll: async (): Promise<Project[]> => {
    const response = await apiClient.get('/projects');
    return response.data;
  },
  
  getById: async (id: string): Promise<Project> => {
    const response = await apiClient.get(`/projects/${id}`);
    return response.data;
  },
};
```

### 5. **Store (`store/`)**

- Zustand stores
- Mỗi domain một store
- Typed với TypeScript

```typescript
// store/auth.store.ts
import { create } from 'zustand';

interface AuthState {
  user: User | null;
  token: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  login: async (credentials) => {
    // ...
  },
  logout: () => {
    set({ user: null, token: null });
  },
}));
```

### 6. **Types (`types/`)**

- Centralized type definitions
- Export qua `index.ts`
- Naming: `*.types.ts`

```typescript
// types/project.types.ts
export interface Project {
  id: string;
  name: string;
  apiKey: string;
  createdAt: string;
}

export interface CreateProjectDto {
  name: string;
}
```

---

## 📝 Naming Conventions

### Files & Folders

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `ProjectCard.tsx` |
| Hooks | camelCase với prefix `use` | `useAuth.ts` |
| Utils | camelCase | `formatDate.ts` |
| Types | camelCase với suffix `.types` | `project.types.ts` |
| Services | camelCase với suffix `.service` | `auth.service.ts` |
| Stores | camelCase với suffix `.store` | `auth.store.ts` |
| Constants | UPPER_SNAKE_CASE | `API_ENDPOINTS.ts` |

### Code

```typescript
// ✅ Good
export interface User { }
export type UserId = string;
export const API_BASE_URL = 'https://api.example.com';
export function formatDate(date: Date): string { }
export const useAuth = () => { };

// ❌ Bad
export interface user { }
export type user_id = string;
export const apiBaseUrl = 'https://api.example.com';
export function FormatDate(date: Date): string { }
export const UseAuth = () => { };
```

---

## 🔧 Import Aliases

Cấu hình trong `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"],
      "@/components/*": ["./components/*"],
      "@/lib/*": ["./lib/*"],
      "@/hooks/*": ["./hooks/*"],
      "@/types/*": ["./types/*"],
      "@/services/*": ["./services/*"],
      "@/store/*": ["./store/*"]
    }
  }
}
```

Usage:
```typescript
import { Button } from '@/components/ui';
import { useAuth } from '@/hooks/useAuth';
import { Project } from '@/types';
import { projectsService } from '@/services';
```

---

## 🎨 Component Structure Template

```typescript
// components/features/projects/ProjectCard.tsx
import { Card } from '@/components/ui';
import { Project } from '@/types';
import { formatDate } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
  onSelect?: (project: Project) => void;
}

export function ProjectCard({ project, onSelect }: ProjectCardProps) {
  return (
    <Card onClick={() => onSelect?.(project)}>
      <h3>{project.name}</h3>
      <p>{formatDate(project.createdAt)}</p>
    </Card>
  );
}
```

---

## 🚀 Best Practices

### 1. **Separation of Concerns**
- UI components không gọi API trực tiếp
- Business logic trong hooks/services
- State management trong stores

### 2. **Type Safety**
- Luôn type props, state, API responses
- Sử dụng `interface` cho objects, `type` cho unions/intersections
- Avoid `any`, sử dụng `unknown` nếu cần

### 3. **Code Reusability**
- Extract common logic vào hooks
- Extract common UI vào components
- Extract common utilities vào `lib/`

### 4. **Performance**
- Lazy load components khi cần: `const Component = lazy(() => import('./Component'))`
- Memoize expensive computations: `useMemo`, `useCallback`
- Optimize images: sử dụng Next.js `Image` component

### 5. **Error Handling**
- Error boundaries cho components
- Try-catch trong async functions
- Toast notifications cho user feedback

### 6. **Testing**
```
components/
  features/
    projects/
      ProjectCard.tsx
      ProjectCard.test.tsx  ← Test cùng folder
```

---

## 📦 Dependencies Organization

### Core
- `next`: Framework
- `react`, `react-dom`: UI library
- `typescript`: Type safety

### UI
- `tailwindcss`: Styling
- `class-variance-authority`: Component variants
- `clsx`, `tailwind-merge`: Class utilities
- `lucide-react`: Icons
- `@radix-ui/*`: Headless UI components

### State & Data
- `zustand`: State management
- `axios`: HTTP client
- `socket.io-client`: Real-time communication

### Forms & Validation
- `react-hook-form`: Form handling
- `zod`: Schema validation

### Utilities
- `date-fns`: Date utilities

---

## 🔄 Migration Path (Nếu cần refactor)

1. **Tạo folders mới** theo structure trên
2. **Di chuyển components** theo nhóm feature
3. **Tạo barrel exports** (`index.ts`)
4. **Update imports** sử dụng aliases
5. **Test thoroughly** sau mỗi bước

---

## 📚 Related Documentation

- [Next.js App Router Docs](https://nextjs.org/docs/app)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)

---

**Last Updated**: 2025-12-25  
**Version**: 1.0.0
