# Component Guidelines - VisualDebugger Frontend

> **Hướng dẫn tạo và tổ chức components theo chuẩn best practices**

---

## 📋 Table of Contents

1. [Component Types](#component-types)
2. [Component Structure](#component-structure)
3. [Naming Conventions](#naming-conventions)
4. [Props & TypeScript](#props--typescript)
5. [Styling Guidelines](#styling-guidelines)
6. [State Management](#state-management)
7. [Performance Optimization](#performance-optimization)
8. [Testing](#testing)
9. [Examples](#examples)

---

## 🎯 Component Types

### 1. **UI Components** (`components/ui/`)

**Mục đích**: Base components, reusable, không chứa business logic

**Đặc điểm**:
- Nhận props để customize
- Không gọi API
- Không sử dụng stores
- Có thể sử dụng hooks cơ bản (useState, useEffect)
- Style với Tailwind + CVA (class-variance-authority)

**Ví dụ**: Button, Card, Dialog, Input, Dropdown

```typescript
// components/ui/button.tsx
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-primary text-white hover:bg-primary/90',
        outline: 'border border-input hover:bg-accent',
        ghost: 'hover:bg-accent',
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-10 px-4',
        lg: 'h-11 px-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

export function Button({ 
  className, 
  variant, 
  size, 
  isLoading,
  children,
  ...props 
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
}
```

---

### 2. **Feature Components** (`components/features/`)

**Mục đích**: Components chứa business logic cho feature cụ thể

**Đặc điểm**:
- Có thể gọi API (qua services)
- Có thể sử dụng stores
- Sử dụng custom hooks
- Compose từ UI components

**Ví dụ**: ProjectCard, SessionList, DebugConsole

```typescript
// components/features/projects/ProjectCard.tsx
import { Card } from '@/components/ui';
import { Project } from '@/types';
import { formatDate } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface ProjectCardProps {
  project: Project;
  onDelete?: (id: string) => void;
}

export function ProjectCard({ project, onDelete }: ProjectCardProps) {
  const router = useRouter();

  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => router.push(`/projects/${project.id}`)}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold">{project.name}</h3>
          <p className="text-sm text-muted-foreground">
            Created {formatDate(project.createdAt)}
          </p>
        </div>
        
        {onDelete && (
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(project.id);
            }}
          >
            Delete
          </Button>
        )}
      </div>
      
      <div className="mt-4">
        <code className="text-xs bg-muted p-2 rounded">
          {project.apiKey}
        </code>
      </div>
    </Card>
  );
}
```

---

### 3. **Layout Components** (`components/layout/`)

**Mục đích**: Structural components cho page layout

**Đặc điểm**:
- Wrapper components
- Navigation, header, footer, sidebar
- Responsive design

```typescript
// components/layout/Header.tsx
import { useAuthStore } from '@/store/auth.store';
import { Button } from '@/components/ui';

export function Header() {
  const { user, logout } = useAuthStore();

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <h1 className="text-xl font-bold">VisualDebugger</h1>
          <nav className="hidden md:flex gap-4">
            <a href="/projects">Projects</a>
            <a href="/sessions">Sessions</a>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-sm">{user?.email}</span>
          <Button variant="outline" onClick={logout}>
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
```

---

### 4. **Shared Components** (`components/shared/`)

**Mục đích**: Components dùng chung nhiều nơi, không thuộc feature cụ thể

**Ví dụ**: LoadingSpinner, EmptyState, ErrorBoundary, Pagination

```typescript
// components/shared/EmptyState.tsx
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({ 
  icon: Icon, 
  title, 
  description, 
  action 
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      {Icon && <Icon className="w-12 h-12 text-muted-foreground mb-4" />}
      <h3 className="text-lg font-semibold">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground mt-2 max-w-md">
          {description}
        </p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
```

---

## 🏗️ Component Structure

### File Organization

```typescript
// ✅ Good - Single component per file
// components/features/projects/ProjectCard.tsx
export function ProjectCard() { }

// ✅ Good - Related sub-components in same file
// components/features/sessions/SessionList.tsx
function SessionListItem() { }  // Internal component
export function SessionList() { }

// ❌ Bad - Multiple unrelated components
// components/stuff.tsx
export function ProjectCard() { }
export function SessionList() { }
```

### Component Template

```typescript
// 1. Imports
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card } from '@/components/ui';
import { Project } from '@/types';
import { formatDate } from '@/lib/utils';

// 2. Types/Interfaces
interface ComponentProps {
  data: Project;
  onAction?: (id: string) => void;
}

// 3. Component
export function Component({ data, onAction }: ComponentProps) {
  // 3.1. Hooks
  const router = useRouter();
  const [state, setState] = useState(false);
  
  // 3.2. Effects
  useEffect(() => {
    // ...
  }, []);
  
  // 3.3. Handlers
  const handleClick = () => {
    onAction?.(data.id);
  };
  
  // 3.4. Render helpers (if needed)
  const renderContent = () => {
    // ...
  };
  
  // 3.5. Early returns
  if (!data) return null;
  
  // 3.6. Main render
  return (
    <Card>
      {/* JSX */}
    </Card>
  );
}
```

---

## 📝 Naming Conventions

### Component Names

```typescript
// ✅ PascalCase for components
export function ProjectCard() { }
export function SessionList() { }

// ✅ Descriptive names
export function DebugEventTimeline() { }  // Good
export function Timeline() { }             // Too generic

// ❌ Avoid
export function projectCard() { }  // Wrong case
export function PC() { }           // Too short
```

### Props Names

```typescript
// ✅ Good
interface ProjectCardProps {
  project: Project;
  onSelect?: (project: Project) => void;
  onDelete?: (id: string) => void;
  isLoading?: boolean;
  className?: string;
}

// ❌ Bad
interface ProjectCardProps {
  data: any;              // Too generic, use 'any'
  onClick?: Function;     // Use specific function signature
  loading?: boolean;      // Use 'isLoading' for booleans
}
```

### Event Handlers

```typescript
// ✅ Good - Prefix with 'handle'
const handleClick = () => { };
const handleSubmit = () => { };
const handleChange = (value: string) => { };

// ✅ Good - Props prefix with 'on'
interface Props {
  onClick?: () => void;
  onSubmit?: (data: FormData) => void;
  onChange?: (value: string) => void;
}
```

---

## 🎨 Props & TypeScript

### Props Interface

```typescript
// ✅ Good - Explicit interface
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  onClick?: () => void;
}

export function Button({ children, variant = 'primary', ...props }: ButtonProps) {
  // ...
}
```

### Extending HTML Attributes

```typescript
// ✅ Good - Extend native HTML props
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export function Button({ isLoading, children, ...props }: ButtonProps) {
  return (
    <button {...props} disabled={isLoading || props.disabled}>
      {children}
    </button>
  );
}
```

### Optional vs Required Props

```typescript
interface ComponentProps {
  // Required
  id: string;
  name: string;
  
  // Optional
  description?: string;
  onAction?: () => void;
  
  // Optional with default
  variant?: 'primary' | 'secondary';  // Default in destructuring
}

export function Component({ 
  id, 
  name, 
  description, 
  variant = 'primary' 
}: ComponentProps) {
  // ...
}
```

---

## 🎨 Styling Guidelines

### Tailwind CSS

```typescript
// ✅ Good - Use Tailwind utilities
<div className="flex items-center gap-4 p-4 rounded-lg bg-white shadow-md">
  <h2 className="text-xl font-bold">Title</h2>
</div>

// ✅ Good - Use cn() for conditional classes
import { cn } from '@/lib/utils';

<div className={cn(
  'base-classes',
  isActive && 'active-classes',
  variant === 'primary' && 'primary-classes'
)}>
```

### Class Variance Authority (CVA)

```typescript
import { cva } from 'class-variance-authority';

const cardVariants = cva(
  'rounded-lg border p-4',  // Base classes
  {
    variants: {
      variant: {
        default: 'bg-white',
        primary: 'bg-blue-50 border-blue-200',
        danger: 'bg-red-50 border-red-200',
      },
      size: {
        sm: 'p-2',
        md: 'p-4',
        lg: 'p-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

// Usage
<div className={cardVariants({ variant: 'primary', size: 'lg' })}>
```

---

## 🔄 State Management

### Local State (useState)

```typescript
// ✅ Use for component-specific state
function Component() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* ... */}
    </Dialog>
  );
}
```

### Global State (Zustand)

```typescript
// ✅ Use for shared state across components
import { useAuthStore } from '@/store/auth.store';

function Component() {
  const { user, login, logout } = useAuthStore();
  
  return (
    <div>
      {user ? (
        <Button onClick={logout}>Logout</Button>
      ) : (
        <Button onClick={() => login(credentials)}>Login</Button>
      )}
    </div>
  );
}
```

### Server State (Custom Hooks)

```typescript
// ✅ Use custom hooks for API data
import { useProjects } from '@/hooks/useProjects';

function Component() {
  const { data: projects, isLoading, error, refetch } = useProjects();
  
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorState error={error} />;
  
  return (
    <div>
      {projects.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
```

---

## ⚡ Performance Optimization

### React.memo

```typescript
// ✅ Memoize expensive components
import { memo } from 'react';

interface Props {
  data: ComplexData;
}

export const ExpensiveComponent = memo(function ExpensiveComponent({ data }: Props) {
  // Complex rendering logic
  return <div>{/* ... */}</div>;
});
```

### useMemo & useCallback

```typescript
function Component({ items }: { items: Item[] }) {
  // ✅ Memoize expensive computations
  const sortedItems = useMemo(() => {
    return items.sort((a, b) => a.name.localeCompare(b.name));
  }, [items]);
  
  // ✅ Memoize callbacks passed to children
  const handleClick = useCallback((id: string) => {
    console.log('Clicked:', id);
  }, []);
  
  return (
    <div>
      {sortedItems.map(item => (
        <ItemCard key={item.id} item={item} onClick={handleClick} />
      ))}
    </div>
  );
}
```

### Lazy Loading

```typescript
// ✅ Lazy load heavy components
import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

function Page() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <HeavyComponent />
    </Suspense>
  );
}
```

---

## 🧪 Testing

### Component Test Template

```typescript
// components/ui/button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './button';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
  
  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  it('disables button when isLoading is true', () => {
    render(<Button isLoading>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

---

## 📚 Examples

### Complete Example: ProjectCard

```typescript
// components/features/projects/ProjectCard.tsx
import { memo } from 'react';
import { useRouter } from 'next/navigation';
import { MoreVertical, Copy, Trash } from 'lucide-react';
import { Card, Button, DropdownMenu } from '@/components/ui';
import { Project } from '@/types';
import { formatDate, copyToClipboard } from '@/lib/utils';
import { toast } from '@/components/ui/toast';

interface ProjectCardProps {
  project: Project;
  onDelete?: (id: string) => Promise<void>;
  className?: string;
}

export const ProjectCard = memo(function ProjectCard({ 
  project, 
  onDelete,
  className 
}: ProjectCardProps) {
  const router = useRouter();

  const handleCopyApiKey = async () => {
    await copyToClipboard(project.apiKey);
    toast.success('API Key copied to clipboard');
  };

  const handleDelete = async () => {
    if (!onDelete) return;
    
    if (confirm(`Delete project "${project.name}"?`)) {
      try {
        await onDelete(project.id);
        toast.success('Project deleted successfully');
      } catch (error) {
        toast.error('Failed to delete project');
      }
    }
  };

  return (
    <Card 
      className={cn(
        'cursor-pointer hover:shadow-lg transition-shadow',
        className
      )}
      onClick={() => router.push(`/projects/${project.id}`)}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{project.name}</h3>
          <p className="text-sm text-muted-foreground">
            Created {formatDate(project.createdAt)}
          </p>
        </div>
        
        <DropdownMenu>
          <DropdownMenu.Trigger asChild>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenu.Trigger>
          
          <DropdownMenu.Content>
            <DropdownMenu.Item onClick={handleCopyApiKey}>
              <Copy className="w-4 h-4 mr-2" />
              Copy API Key
            </DropdownMenu.Item>
            
            {onDelete && (
              <DropdownMenu.Item 
                onClick={handleDelete}
                className="text-destructive"
              >
                <Trash className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenu.Item>
            )}
          </DropdownMenu.Content>
        </DropdownMenu>
      </div>
      
      <div className="mt-4 p-2 bg-muted rounded">
        <code className="text-xs font-mono">{project.apiKey}</code>
      </div>
      
      <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
        <span>{project.sessionCount} sessions</span>
        <span>•</span>
        <span>{project.eventCount} events</span>
      </div>
    </Card>
  );
});
```

---

## ✅ Checklist

Khi tạo component mới, đảm bảo:

- [ ] Component name là PascalCase và descriptive
- [ ] Props được type với TypeScript interface
- [ ] Có default values cho optional props (nếu cần)
- [ ] Sử dụng `cn()` cho conditional classes
- [ ] Event handlers prefix với `handle`
- [ ] Props callbacks prefix với `on`
- [ ] Memoize nếu component re-render nhiều
- [ ] Extract logic phức tạp vào custom hooks
- [ ] Có loading và error states (nếu cần)
- [ ] Responsive design
- [ ] Accessible (ARIA labels, keyboard navigation)
- [ ] Có tests (nếu là critical component)

---

**Last Updated**: 2025-12-25  
**Version**: 1.0.0
