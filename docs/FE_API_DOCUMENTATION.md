# 📚 VisualDebugger Frontend - API & Components Documentation

Tài liệu này hướng dẫn chi tiết cách sử dụng các **Hooks**, **Services**, **Components** và **GraphQL APIs** trong dự án VisualDebugger Frontend.

---

## 📖 Mục lục

1. [Hooks](#-hooks)
2. [Services](#️-services)
3. [UI Components](#-ui-components)
4. [Feature Components](#-feature-components)
5. [GraphQL API](#-graphql-api)
6. [Utilities](#-utilities)

---

## 🪝 Hooks

Các custom hooks để quản lý state và data fetching với **SWR**.

### `useProjects(page, limit)`

Lấy danh sách tất cả projects với phân trang.

```tsx
import { useProjects } from '@/hooks/useProjects';

function ProjectsPage() {
    const { projects, totalCount, totalPages, isLoading, isError, mutate } = useProjects(1, 10);
    
    if (isLoading) return <Skeleton />;
    if (isError) return <Error />;
    
    return projects.map(project => <ProjectCard project={project} />);
}
```

| Parameter | Type | Default | Mô tả |
|-----------|------|---------|-------|
| `page` | `number` | `1` | Trang hiện tại |
| `limit` | `number` | `10` | Số items mỗi trang |

| Return | Type | Mô tả |
|--------|------|-------|
| `projects` | `Project[]` | Danh sách projects |
| `totalCount` | `number` | Tổng số projects |
| `totalPages` | `number` | Tổng số trang |
| `isLoading` | `boolean` | Trạng thái loading |
| `isError` | `Error \| undefined` | Error nếu có |
| `mutate` | `Function` | Revalidate data |

---

### `useProject(id)`

Lấy chi tiết 1 project theo ID.

```tsx
import { useProject } from '@/hooks/useProjects';

function ProjectDetail({ projectId }: { projectId: string }) {
    const { project, isLoading, isError, isValidating } = useProject(projectId);
    
    if (isLoading) return <Skeleton />;
    if (isError || !project) return <Error message="Project not found" />;
    
    return <div>{project.name}</div>;
}
```

| Parameter | Type | Mô tả |
|-----------|------|-------|
| `id` | `string \| null` | Project ID (UUID) |

| Return | Type | Mô tả |
|--------|------|-------|
| `project` | `Project \| undefined` | Chi tiết project |
| `isLoading` | `boolean` | Trạng thái loading ban đầu |
| `isValidating` | `boolean` | Đang revalidate data |
| `isError` | `Error \| undefined` | Error nếu có |

---

### `useDashboardStats(range)`

Lấy thống kê tổng quan dashboard. Auto-refresh mỗi 10 giây.

```tsx
import { useDashboardStats } from '@/hooks/useProjects';

function StatsGrid() {
    const { stats, isLoading, isError } = useDashboardStats('24h');
    
    return (
        <div>
            <StatCard label="Total Events" value={stats?.totalEvents} />
            <StatCard label="Error Rate" value={`${stats?.errorRate}%`} />
            <StatCard label="Avg Latency" value={stats?.avgLatency} />
        </div>
    );
}
```

| Parameter | Type | Default | Mô tả |
|-----------|------|---------|-------|
| `range` | `string` | `'24h'` | Khoảng thời gian: `'24h'`, `'7d'`, `'30d'` |

| Return.stats | Type | Mô tả |
|--------------|------|-------|
| `totalEvents` | `number` | Tổng số events |
| `errorRate` | `number` | Tỷ lệ lỗi (%) |
| `avgLatency` | `string` | Latency trung bình |
| `activeSessions` | `number` | Sessions đang active |
| `trend` | `TrendPoint[]` | Data cho biểu đồ trend |
| `*Change` | `number` | Thay đổi so với kỳ trước |

---

### `useProjectStats(projectId, range)`

Lấy thống kê cho 1 project cụ thể. Auto-refresh mỗi 5 giây.

```tsx
import { useProjectStats } from '@/hooks/useProjects';

function ProjectStats({ projectId }: { projectId: string }) {
    const { stats, isLoading } = useProjectStats(projectId, '24h');
    
    return <TrendChart data={stats?.trend} />;
}
```

---

### `useRecentSessions(page, limit)`

Lấy danh sách sessions gần đây (global). Auto-refresh mỗi 5 giây.

```tsx
import { useRecentSessions } from '@/hooks/useProjects';

function ActivityFeed() {
    const { sessions, totalPages, isLoading } = useRecentSessions(1, 5);
    
    return <ActivityLog activities={sessions} />;
}
```

---

### `useProjectSessions(projectId, page, limit)`

Lấy danh sách sessions theo project. Auto-refresh mỗi 5 giây.

```tsx
import { useProjectSessions } from '@/hooks/useProjects';

function ProjectSessions({ projectId }: { projectId: string }) {
    const { sessions, totalPages, isLoading } = useProjectSessions(projectId, 1, 10);
    
    return sessions.map(session => <SessionCard session={session} />);
}
```

---

### `useSession(id)`

Lấy chi tiết 1 session với đầy đủ events.

```tsx
import { useSession } from '@/hooks/useProjects';

function SessionDetail({ sessionId }: { sessionId: string }) {
    const { session, isLoading, isValidating } = useSession(sessionId);
    
    return (
        <div>
            <h1>Session: {session?.id}</h1>
            <EventList events={session?.events} />
        </div>
    );
}
```

---

### `mutateProjects()`

Trigger revalidation cho tất cả project queries.

```tsx
import { mutateProjects } from '@/hooks/useProjects';

// Sau khi tạo/xóa project, revalidate list
await projectsService.create({ name: 'New Project' });
mutateProjects(); // Refresh all project data
```

---

## 🛠️ Services

Các service functions để gọi API backend.

### `authService`

Quản lý authentication.

```tsx
import { authService } from '@/services/auth.service';
```

| Method | Parameters | Return | Mô tả |
|--------|------------|--------|-------|
| `login(input)` | `{ email, password }` | `{ accessToken, user }` | Đăng nhập, lưu token |
| `register(input)` | `{ email, password, name }` | `{ accessToken, user }` | Đăng ký, lưu token |
| `logout()` | - | `void` | Xóa token, redirect `/login` |
| `getToken()` | - | `string \| null` | Lấy token từ localStorage |
| `isAuthenticated()` | - | `boolean` | Kiểm tra đã login chưa |

**Ví dụ Login:**

```tsx
import { authService } from '@/services/auth.service';

const handleLogin = async (email: string, password: string) => {
    try {
        const result = await authService.login({ email, password });
        console.log('Logged in as:', result.user.name);
        // Token đã tự động lưu vào localStorage
        router.push('/projects');
    } catch (error) {
        console.error('Login failed:', error.message);
    }
};
```

---

### `projectsService`

Quản lý projects và sessions.

```tsx
import { projectsService } from '@/services/projects.service';
```

| Method | Parameters | Return | Mô tả |
|--------|------------|--------|-------|
| `fetchAll(page, limit)` | `number, number` | `PaginatedProjects` | Lấy danh sách projects |
| `create(input)` | `{ name, description? }` | `Project` | Tạo project mới |
| `fetchById(id)` | `string` | `Project` | Lấy chi tiết project |
| `fetchStats(range)` | `string` | `DashboardStats` | Thống kê dashboard |
| `fetchProjectStats(projectId, range)` | `string, string` | `ProjectStats` | Thống kê project |
| `fetchRecentSessions(page, limit)` | `number, number` | `PaginatedSessions` | Sessions gần đây |
| `fetchProjectSessions(projectId, page, limit)` | `string, number, number` | `PaginatedSessions` | Sessions của project |
| `fetchSessionById(id)` | `string` | `Session` | Chi tiết session |

**Ví dụ tạo Project:**

```tsx
import { projectsService } from '@/services/projects.service';

const createNewProject = async () => {
    const project = await projectsService.create({
        name: 'Auth Service Debug',
        description: 'Debugging authentication flow'
    });
    console.log('Created project with API key:', project.apiKey);
    return project;
};
```

---

### `graphqlRequest(query, variables)`

Helper function để gọi GraphQL API trực tiếp.

```tsx
import { graphqlRequest } from '@/services/api-client';
import { GetProjectDocument } from '@/graphql/generated/graphql';

const data = await graphqlRequest(GetProjectDocument, { id: 'project-uuid' });
console.log(data.project);
```

---

## 🎨 UI Components

Các reusable UI components dựa trên **Radix UI** và **shadcn/ui**.

### `Button`

```tsx
import { Button } from '@/components/ui/button';

// Variants
<Button variant="default">Primary</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Cancel</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Sizes
<Button size="default">Default</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Icon /></Button>

// With loading
<Button disabled>
    <RefreshCcw className="animate-spin mr-2" />
    Loading...
</Button>
```

| Prop | Type | Default | Mô tả |
|------|------|---------|-------|
| `variant` | `'default' \| 'destructive' \| 'outline' \| 'secondary' \| 'ghost' \| 'link'` | `'default'` | Style variant |
| `size` | `'default' \| 'sm' \| 'lg' \| 'icon'` | `'default'` | Kích thước |
| `asChild` | `boolean` | `false` | Render như child element |
| `disabled` | `boolean` | `false` | Vô hiệu hóa button |

---

### `Card`

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

<Card>
    <CardHeader>
        <CardTitle>Project Name</CardTitle>
        <CardDescription>Project description here</CardDescription>
    </CardHeader>
    <CardContent>
        {/* Content */}
    </CardContent>
    <CardFooter>
        <Button>Save</Button>
    </CardFooter>
</Card>
```

---

### `Dialog`

Modal dialog component.

```tsx
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';

<Dialog>
    <DialogTrigger asChild>
        <Button>Open Dialog</Button>
    </DialogTrigger>
    <DialogContent>
        <DialogTitle>Create Project</DialogTitle>
        <DialogDescription>Fill in the details below.</DialogDescription>
        {/* Form content */}
    </DialogContent>
</Dialog>
```

| Component | Mô tả |
|-----------|-------|
| `Dialog` | Container chính |
| `DialogTrigger` | Element trigger để mở dialog |
| `DialogContent` | Nội dung dialog |
| `DialogTitle` | Tiêu đề |
| `DialogDescription` | Mô tả phụ |

---

### `Input`

```tsx
import { Input } from '@/components/ui/input';

<Input 
    type="email"
    placeholder="Enter email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
/>
```

---

### `Textarea`

```tsx
import { Textarea } from '@/components/ui/textarea';

<Textarea 
    placeholder="Enter description..."
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    className="min-h-[120px]"
/>
```

---

### `Switch`

Toggle switch component.

```tsx
import { Switch } from '@/components/ui/switch';

<Switch 
    checked={isEnabled}
    onCheckedChange={setIsEnabled}
/>
```

---

### `Pagination`

```tsx
import { Pagination } from '@/components/ui/pagination';

<Pagination
    currentPage={currentPage}
    totalPages={totalPages}
    onPageChange={setCurrentPage}
    limit={limit}
    onLimitChange={setLimit}
/>
```

| Prop | Type | Mô tả |
|------|------|-------|
| `currentPage` | `number` | Trang hiện tại |
| `totalPages` | `number` | Tổng số trang |
| `onPageChange` | `(page: number) => void` | Callback khi đổi trang |
| `limit` | `number` | Items mỗi trang |
| `onLimitChange` | `(limit: number) => void` | Callback khi đổi limit |

---

### `Skeleton`

Loading placeholder.

```tsx
import { Skeleton } from '@/components/ui/skeleton';

<Skeleton className="h-4 w-[200px]" />
<Skeleton className="h-8 w-full rounded-xl" />
```

---

## 📦 Feature Components

Các components cho từng feature cụ thể.

### Projects

#### `ProjectCard`

Card hiển thị thông tin project.

```tsx
import { ProjectCard } from '@/components/features/projects/ProjectCard';

<ProjectCard project={project} />
```

| Prop | Type | Mô tả |
|------|------|-------|
| `project` | `Project` | Object project từ GraphQL |

**Features:**
- Hiển thị tên, status, platform
- Sparkline chart cho activity trend
- Nút analytics và settings
- Hover effect với border highlight

---

#### `CreateProjectDialog`

Dialog tạo project mới.

```tsx
import { CreateProjectDialog } from '@/components/features/projects/CreateProjectDialog';

<CreateProjectDialog onProjectCreated={() => mutateProjects()} />
```

| Prop | Type | Mô tả |
|------|------|-------|
| `onProjectCreated` | `() => void` | Callback sau khi tạo thành công |

**Features:**
- Form với validation
- Toggles: Enable Logging, Share with Team
- Loading state
- Error handling

---

#### `ActivityLog`

Hiển thị danh sách activities/sessions.

```tsx
import { ActivityLog } from '@/components/features/projects/ActivityLog';

const activities = [
    {
        id: 'sess-1',
        session: 'SESS-ABC1',
        method: 'GET',
        path: '/api/users',
        time: '5 minutes ago',
        duration: '120ms',
        status: '200',
        type: 'success'
    }
];

<ActivityLog activities={activities} />
```

| Prop | Type | Mô tả |
|------|------|-------|
| `activities` | `Activity[]` | Danh sách activities |

---

#### `StatCard`

Card hiển thị 1 stat metric.

```tsx
import { StatCard } from '@/components/features/projects/StatCard';

<StatCard
    label="Total Events"
    value="12,345"
    change="+12%"
    trend="up"
    sentiment="positive"
    icon="dataset"
    color="text-blue-500"
/>
```

| Prop | Type | Mô tả |
|------|------|-------|
| `label` | `string` | Tên metric |
| `value` | `string` | Giá trị hiển thị |
| `change` | `string` | Thay đổi (e.g., "+12%") |
| `trend` | `'up' \| 'down'` | Hướng trend |
| `sentiment` | `'positive' \| 'negative'` | Màu sắc (xanh/đỏ) |
| `icon` | `string` | Material icon name |
| `color` | `string` | Icon color class |

---

#### `TrendChart`

Biểu đồ trend theo thời gian.

```tsx
import { TrendChart } from '@/components/features/projects/TrendChart';

<TrendChart
    data={[{ hour: '00:00', requests: 120 }, { hour: '01:00', requests: 85 }]}
    title="Activity Trend"
    subtitle="Requests per hour"
    range="24h"
    onRangeChange={setRange}
/>
```

| Prop | Type | Mô tả |
|------|------|-------|
| `data` | `TrendPoint[]` | Data points `{ hour, requests }` |
| `title` | `string` | Tiêu đề |
| `subtitle` | `string` | Phụ đề |
| `range` | `string` | Range hiện tại |
| `onRangeChange` | `(range: string) => void` | Callback đổi range |

---

#### `ApiKeySection`

Hiển thị và copy API key.

```tsx
import { ApiKeySection } from '@/components/features/projects/ApiKeySection';

<ApiKeySection apiKey="vd_live_abc123xyz..." />
```

| Prop | Type | Mô tả |
|------|------|-------|
| `apiKey` | `string` | API key string |

**Features:**
- Masked display (chỉ hiện 4 ký tự đầu)
- Copy to clipboard button
- Hover reveal

---

#### `Sparkline`

Mini chart cho project card.

```tsx
import { Sparkline } from '@/components/features/projects/Sparkline';
import { ProjectStatus } from '@/components/features/projects/types';

<Sparkline 
    data={[10, 25, 15, 30, 45, 20]} 
    status={ProjectStatus.ONLINE} 
/>
```

---

### Auth

#### `LoginForm`

Form đăng nhập.

```tsx
import { LoginForm } from '@/components/features/auth/LoginForm';

// Trong page.tsx
export default function LoginPage() {
    return <LoginForm />;
}
```

**Features:**
- Email và password inputs
- Validation
- Error messages
- Remember me checkbox
- Forgot password link
- Register link

---

#### `RegisterForm`

Form đăng ký.

```tsx
import { RegisterForm } from '@/components/features/auth/RegisterForm';

export default function RegisterPage() {
    return <RegisterForm />;
}
```

---

## 📡 GraphQL API

### Queries

#### `GetProjects`

```graphql
query GetProjects($page: Int, $limit: Int) {
  projects(page: $page, limit: $limit) {
    items {
      id
      name
      description
      apiKey
      createdAt
      activityTrend
    }
    totalCount
    totalPages
  }
}
```

**Variables:**
```json
{ "page": 1, "limit": 10 }
```

---

#### `GetProject`

```graphql
query GetProject($id: ID!) {
  project(id: $id) {
    id
    name
    description
    apiKey
    createdAt
    updatedAt
    activityTrend
  }
}
```

---

#### `GetDashboardStats`

```graphql
query GetDashboardStats($range: String) {
  dashboardStats(range: $range) {
    totalEvents
    errorRate
    avgLatency
    activeSessions
    trend { hour, requests }
    totalEventsChange
    errorRateChange
    avgLatencyChange
    activeSessionsChange
  }
}
```

**Variables:**
```json
{ "range": "24h" }
```

---

#### `GetSession`

```graphql
query GetSession($id: ID!) {
  session(id: $id) {
    id
    environment
    startedAt
    events {
      id
      type
      name
      httpMethod
      httpUrl
      httpStatus
      duration
      errorMessage
      timestamp
    }
  }
}
```

---

### Mutations

#### `CreateProject`

```graphql
mutation CreateProject($input: CreateProjectInput!) {
  createProject(input: $input) {
    id
    name
    apiKey
  }
}
```

**Variables:**
```json
{
  "input": {
    "name": "My Project",
    "description": "Description here"
  }
}
```

---

#### `Login`

```graphql
mutation Login($input: LoginInput!) {
  login(input: $input) {
    accessToken
    user { id, email, name }
  }
}
```

---

#### `Register`

```graphql
mutation Register($input: RegisterInput!) {
  register(input: $input) {
    accessToken
    user { id, email, name }
  }
}
```

---

## 🔧 Utilities

### `cn()` - Class Name Helper

Merge Tailwind classes với `clsx` và `tailwind-merge`.

```tsx
import { cn } from '@/lib/utils';

<div className={cn(
    'base-class',
    isActive && 'active-class',
    variant === 'primary' ? 'bg-primary' : 'bg-secondary'
)} />
```

---

## 📋 Quick Reference

### Import Paths

```tsx
// Hooks
import { useProjects, useProject, useDashboardStats } from '@/hooks/useProjects';

// Services
import { authService } from '@/services/auth.service';
import { projectsService } from '@/services/projects.service';
import { graphqlRequest } from '@/services/api-client';

// UI Components
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';

// Feature Components
import { ProjectCard } from '@/components/features/projects/ProjectCard';
import { CreateProjectDialog } from '@/components/features/projects/CreateProjectDialog';
import { LoginForm } from '@/components/features/auth/LoginForm';

// GraphQL Types
import { Project, DebugSession, DebugEvent } from '@/graphql/generated/graphql';
```

---

### TypeScript Types

```tsx
// From GraphQL generated types
import { 
    Project,
    DebugSession,
    DebugEvent,
    LoginInput,
    RegisterInput,
    CreateProjectInput
} from '@/graphql/generated/graphql';

// Project type
interface Project {
    id: string;
    name: string;
    description?: string;
    apiKey: string;
    createdAt: string;
    updatedAt: string;
    activityTrend?: number[];
}

// Session type
interface DebugSession {
    id: string;
    environment: string;
    userAgent?: string;
    startedAt: string;
    endedAt?: string;
    project: Project;
    events: DebugEvent[];
}

// Event type
interface DebugEvent {
    id: string;
    type: 'HTTP_REQUEST' | 'ERROR' | 'LOG' | 'FUNCTION_ENTER' | 'FUNCTION_EXIT';
    name?: string;
    httpMethod?: string;
    httpUrl?: string;
    httpStatus?: number;
    duration?: number;
    errorMessage?: string;
    timestamp: string;
}
```

---

*Tài liệu được cập nhật: 29/12/2024*
