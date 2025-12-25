# VisualDebugger Frontend

## 🎨 Dashboard Frontend

Next.js dashboard để visualize debug sessions và flow execution từ SDK.

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
npm start
```

---

## 📁 Cấu trúc thư mục

> **📖 Xem chi tiết**: [FRONTEND_STRUCTURE.md](./docs/FRONTEND_STRUCTURE.md) - Tài liệu đầy đủ về cấu trúc dự án, best practices, và naming conventions.

```
VisualDebuggerFE/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # Root layout
│   │   ├── page.tsx                  # Landing page
│   │   ├── globals.css               # Global styles
│   │   │
│   │   ├── (auth)/                   # Auth routes group
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── register/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   │
│   │   ├── (dashboard)/              # Dashboard routes group
│   │   │   ├── layout.tsx            # Dashboard layout with sidebar
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx          # Main dashboard
│   │   │   ├── projects/
│   │   │   │   ├── page.tsx          # List projects
│   │   │   │   ├── new/
│   │   │   │   │   └── page.tsx      # Create project
│   │   │   │   └── [projectId]/
│   │   │   │       ├── page.tsx      # Project details
│   │   │   │       ├── sessions/
│   │   │   │       │   └── page.tsx  # Project sessions
│   │   │   │       └── settings/
│   │   │   │           └── page.tsx  # Project settings
│   │   │   ├── sessions/
│   │   │   │   ├── page.tsx          # All sessions
│   │   │   │   └── [sessionId]/
│   │   │   │       └── page.tsx      # Session detail (flow view)
│   │   │   └── settings/
│   │   │       └── page.tsx          # User settings
│   │   │
│   │   └── api/                      # API routes (if needed)
│   │       └── auth/
│   │           └── [...nextauth]/
│   │               └── route.ts
│   │
│   ├── components/
│   │   ├── ui/                       # Shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── input.tsx
│   │   │   ├── table.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── toast.tsx
│   │   │   └── ...
│   │   │
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── MobileNav.tsx
│   │   │
│   │   ├── auth/
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterForm.tsx
│   │   │   └── AuthProvider.tsx
│   │   │
│   │   ├── projects/
│   │   │   ├── ProjectCard.tsx
│   │   │   ├── ProjectList.tsx
│   │   │   ├── CreateProjectDialog.tsx
│   │   │   └── ApiKeyDisplay.tsx
│   │   │
│   │   ├── sessions/
│   │   │   ├── SessionList.tsx
│   │   │   ├── SessionCard.tsx
│   │   │   ├── SessionFilters.tsx
│   │   │   └── LiveIndicator.tsx
│   │   │
│   │   ├── debug/
│   │   │   ├── FlowDiagram/
│   │   │   │   ├── FlowDiagram.tsx       # Main flow component
│   │   │   │   ├── FlowNode.tsx          # Single node
│   │   │   │   ├── FlowEdge.tsx          # Connection line
│   │   │   │   ├── FlowControls.tsx      # Zoom, pan controls
│   │   │   │   └── FlowMinimap.tsx       # Minimap
│   │   │   ├── EventList/
│   │   │   │   ├── EventList.tsx         # Timeline view
│   │   │   │   ├── EventItem.tsx         # Single event
│   │   │   │   └── EventFilters.tsx
│   │   │   ├── CodeViewer/
│   │   │   │   ├── CodeViewer.tsx        # Syntax highlighted code
│   │   │   │   └── LineHighlight.tsx
│   │   │   ├── DataInspector/
│   │   │   │   ├── DataInspector.tsx     # JSON tree viewer
│   │   │   │   └── JsonTree.tsx
│   │   │   └── HttpViewer/
│   │   │       ├── HttpViewer.tsx        # HTTP request/response
│   │   │       ├── RequestPanel.tsx
│   │   │       └── ResponsePanel.tsx
│   │   │
│   │   └── common/
│   │       ├── LoadingSpinner.tsx
│   │       ├── EmptyState.tsx
│   │       ├── ErrorBoundary.tsx
│   │       ├── CopyButton.tsx
│   │       └── TimeAgo.tsx
│   │
│   ├── hooks/
│   │   ├── useAuth.ts                # Authentication hook
│   │   ├── useDebugStream.ts         # WebSocket connection
│   │   ├── useProjects.ts            # Projects CRUD
│   │   ├── useSessions.ts            # Sessions data
│   │   ├── useEvents.ts              # Events for a session
│   │   └── useFlowLayout.ts          # Calculate flow positions
│   │
│   ├── stores/
│   │   ├── authStore.ts              # Zustand auth store
│   │   ├── debugStore.ts             # Real-time debug state
│   │   └── uiStore.ts                # UI preferences
│   │
│   ├── services/
│   │   ├── api.ts                    # Axios instance
│   │   ├── authService.ts            # Auth API calls
│   │   ├── projectService.ts         # Projects API
│   │   ├── sessionService.ts         # Sessions API
│   │   └── websocketService.ts       # WebSocket client
│   │
│   ├── lib/
│   │   ├── utils.ts                  # Utility functions
│   │   ├── cn.ts                     # Class name helper
│   │   └── constants.ts              # App constants
│   │
│   └── types/
│       ├── auth.types.ts
│       ├── project.types.ts
│       ├── session.types.ts
│       ├── event.types.ts
│       └── api.types.ts
│
├── public/
│   ├── logo.svg
│   ├── favicon.ico
│   └── images/
│
├── .env.example
├── .env.local
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## 🎯 Tính năng chính

### 1. Dashboard Overview
- Thống kê tổng quan: sessions, events, errors
- Recent sessions list
- Project quick access

### 2. Project Management
- Tạo, sửa, xóa projects
- Quản lý API keys (generate, regenerate, copy)
- View sessions theo project

### 3. Session List
- Filter by: project, environment, date range
- Search by session ID
- Real-time indicator cho active sessions
- Quick stats: event count, duration, errors

### 4. Session Detail (Flow View)
- **Flow Diagram**: Visual representation của execution flow
  - Nodes cho mỗi function call
  - Edges hiển thị call hierarchy
  - Color coding theo event type
  - Zoom, pan, fit controls
  
- **Event Timeline**: Chronological list của events
  - Expandable details
  - Filter by type
  - Search
  
- **Data Inspector**: Xem arguments, return values
  - JSON tree view
  - Copy values
  
- **Code Viewer**: Highlight source code location
  - Line numbers
  - Syntax highlighting

### 5. Real-time Updates
- WebSocket connection cho live events
- Auto-scroll to new events
- Live session indicator

---

## 🔄 TypeScript Types

```typescript
// types/event.types.ts

export type EventType = 
  | 'session_start'
  | 'session_end'
  | 'function_enter'
  | 'function_exit'
  | 'function_error'
  | 'http_request'
  | 'http_response'
  | 'console_log'
  | 'error';

export interface DebugEvent {
  id: string;
  sessionId: string;
  parentEventId?: string;
  type: EventType;
  name?: string;
  
  // Source location
  filePath?: string;
  lineNumber?: number;
  columnNumber?: number;
  
  // Data
  arguments?: unknown[];
  returnValue?: unknown;
  errorMessage?: string;
  errorStack?: string;
  
  // HTTP
  httpMethod?: string;
  httpUrl?: string;
  httpStatus?: number;
  httpRequest?: Record<string, unknown>;
  httpResponse?: Record<string, unknown>;
  
  // Timing
  duration?: number;
  depth: number;
  timestamp: string;
}

export interface DebugSession {
  id: string;
  projectId: string;
  environment: string;
  startedAt: string;
  endedAt?: string;
  eventCount: number;
  errorCount: number;
  isLive: boolean;
}
```

---

## 🔌 WebSocket Hook

```typescript
// hooks/useDebugStream.ts

export function useDebugStream(projectId: string) {
  const [events, setEvents] = useState<DebugEvent[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  
  useEffect(() => {
    const socket = io(`${API_URL}/debug`, {
      auth: { token: getToken() }
    });
    
    socket.on('connect', () => {
      setIsConnected(true);
      socket.emit('subscribe', projectId);
    });
    
    socket.on('new_event', (event: DebugEvent) => {
      setEvents(prev => [...prev, event]);
    });
    
    socket.on('disconnect', () => {
      setIsConnected(false);
    });
    
    return () => {
      socket.disconnect();
    };
  }, [projectId]);
  
  return { events, isConnected };
}
```

---

## 🎨 UI Components (Flow Diagram)

Using **React Flow** for the visual diagram:

```typescript
// components/debug/FlowDiagram/FlowDiagram.tsx

import ReactFlow, { 
  Background, 
  Controls, 
  MiniMap 
} from 'reactflow';

export function FlowDiagram({ events }: { events: DebugEvent[] }) {
  const { nodes, edges } = useFlowLayout(events);
  
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      fitView
    >
      <Background />
      <Controls />
      <MiniMap />
    </ReactFlow>
  );
}
```

---

## 🔐 Environment Variables

```bash
# .env.local

# API
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_WS_URL=ws://localhost:3001

# Auth
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3000
```

---

## 📦 Dependencies

```json
{
  "dependencies": {
    "next": "14.x",
    "react": "18.x",
    "react-dom": "18.x",
    "typescript": "5.x",
    
    "reactflow": "^11.x",
    "zustand": "^4.x",
    "socket.io-client": "^4.x",
    "axios": "^1.x",
    
    "@radix-ui/react-dialog": "^1.x",
    "@radix-ui/react-dropdown-menu": "^2.x",
    "class-variance-authority": "^0.x",
    "clsx": "^2.x",
    "tailwind-merge": "^2.x",
    
    "react-syntax-highlighter": "^15.x",
    "date-fns": "^3.x",
    "lucide-react": "^0.x"
  }
}
```

---

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Connect to Vercel
npx vercel

# Set environment variables in Vercel dashboard
```

### Docker

```dockerfile
FROM node:20-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]
```
