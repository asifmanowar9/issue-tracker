# IssueTracker

A full-stack task and issue tracking application built with Next.js, React Hook Form, TanStack Query, and Supabase.

## ✨ Features

- ✅ User registration and login with validation
- ✅ User authentication with session management
- ✅ Dashboard with statistics and quick access
- ✅ Project creation, editing, viewing, and **deletion**
- ✅ Issue creation, editing, viewing, and **deletion with confirmation**
- ✅ Issue filtering by status, priority, and title search
- ✅ All Issues view to browse issues across projects
- ✅ Real-time user display in navbar
- ✅ Project and issue data fetching with TanStack Query
- ✅ Form handling with React Hook Form
- ✅ Supabase PostgreSQL database
- ✅ Supabase Authentication
- ✅ Row Level Security (RLS)
- ✅ Responsive design for mobile and desktop
- ✅ **Confirmation dialogs for destructive actions**
- ✅ **Color-coded status and priority badges**

## Tech Stack

- **Frontend**: Next.js 16.3, React 19.2, TypeScript
- **State Management**: TanStack Query (React Query)
- **Forms**: React Hook Form
- **Backend**: Supabase (PostgreSQL + Authentication)
- **Styling**: Tailwind CSS 4, shadcn UI
- **Database**: PostgreSQL (via Supabase)

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd IssueTracker
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/
├── (auth)/
│   ├── login/page.tsx
│   └── register/page.tsx
├── (dashboard)/
│   ├── dashboard/page.tsx
│   ├── issues/page.tsx
│   ├── projects/page.tsx
│   └── projects/[projectId]/
│       ├── page.tsx
│       └── issues/[issueId]/page.tsx
components/
├── auth/
│   ├── LoginForm.tsx
│   ├── RegisterForm.tsx
│   └── LogoutButton.tsx
├── issues/
│   ├── CreateIssueForm.tsx
│   ├── EditIssueForm.tsx
│   ├── IssueFilters.tsx
│   ├── IssuesList.tsx
│   └── DeleteIssueButton.tsx
├── projects/
│   ├── CreateProjectForm.tsx
│   ├── EditProjectForm.tsx
│   ├── ProjectDetails.tsx
│   ├── ProjectsList.tsx
│   └── DeleteProjectButton.tsx
└── layout/
    ├── Navbar.tsx
    └── Sidebar.tsx
lib/
├── queries/
│   ├── issues.ts
│   └── projects.ts
└── supabase/
    ├── client.ts
    ├── server.ts
    └── proxy.ts
```

## Main Concepts

### React Hook Form

Used for:
- User registration and login
- Project creation and editing
- Issue creation and editing
- Form validation and error handling
- Form state management (`watch()`, `reset()`, `setValue()`)

### TanStack Query (React Query)

Used for:
- Fetching projects and issues with `useQuery`
- Mutations for create/update/delete with `useMutation`
- Query caching and automatic refetching
- Loading and error states management
- Query invalidation after changes

### Supabase

Used for:
- User authentication (email/password)
- PostgreSQL database for projects and issues
- Row-Level Security (RLS) for data protection
- Real-time data synchronization

## Key Features Explained

### Dashboard
- View statistics: Total projects, total issues, open issues, urgent issues
- Quick access to recent projects
- Quick access to recent issues
- Links to create new projects

### Projects Management
- Create new projects with name and description
- View all projects in a list
- Edit project information
- Delete projects (with confirmation - cascades to issues)
- View project details and associated issues

### Issues Management
- Create issues for specific projects
- Set status: OPEN, IN_PROGRESS, RESOLVED, CLOSED
- Set priority: LOW, MEDIUM, HIGH, URGENT
- Edit issue details
- Delete issues (with confirmation)
- Filter issues by status and priority
- Search issues by title
- View all issues across all projects

### Authentication
- Register new accounts with email validation
- Login with email and password
- Logout and session management
- User display in navbar with avatar and name

## Database Schema

### projects table
- `id` (UUID, Primary Key)
- `name` (TEXT, Required)
- `description` (TEXT)
- `owner_id` (UUID, Foreign Key to users)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### issues table
- `id` (UUID, Primary Key)
- `project_id` (UUID, Foreign Key to projects)
- `title` (TEXT, Required)
- `description` (TEXT)
- `status` (TEXT: OPEN, IN_PROGRESS, RESOLVED, CLOSED)
- `priority` (TEXT: LOW, MEDIUM, HIGH, URGENT)
- `created_by` (UUID, Foreign Key to users)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

## Available Routes

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | Home | Landing page |
| `/login` | LoginForm | User login |
| `/register` | RegisterForm | User registration |
| `/dashboard` | Dashboard | Main dashboard with stats |
| `/projects` | ProjectsList | All projects |
| `/projects/[id]` | ProjectDetails | Project details & issues |
| `/issues` | AllIssuesPage | Browse all issues |
| `/projects/[id]/issues/[id]` | EditIssueForm | Issue details & edit |

## API Functions

### Projects
- `getProjects()` - Fetch all projects
- `getProject(id)` - Fetch single project
- `createProject(input)` - Create new project
- `updateProject(input)` - Update project
- `deleteProject(id)` - Delete project

### Issues
- `getIssues(projectId, filters)` - Fetch project issues with optional filters
- `getIssue(id)` - Fetch single issue
- `createIssue(input)` - Create new issue
- `updateIssue(input)` - Update issue
- `deleteIssue(id)` - Delete issue

## Documentation Files

- **IMPLEMENTATION_GUIDE.md** - Comprehensive feature guide and architecture
- **PROJECT_COMPLETION_SUMMARY.md** - Summary of what was completed
- **QUICK_REFERENCE.md** - Quick reference for common tasks

## Testing Checklist

- [ ] Register a new user account
- [ ] Login with credentials
- [ ] View dashboard with statistics
- [ ] Create a new project
- [ ] View project details and issues
- [ ] Edit project information
- [ ] Create a new issue
- [ ] Filter issues by status and priority
- [ ] Search issues by title
- [ ] Edit an issue
- [ ] Delete an issue (with confirmation)
- [ ] Delete a project (with confirmation)
- [ ] Logout and login again
- [ ] Browse all issues page
- [ ] Test responsive design on mobile

## Future Enhancements

- [ ] Toast notifications for success/error messages
- [ ] Loading skeletons for better UX
- [ ] Dark mode support
- [ ] Issue comments and activity timeline
- [ ] Due dates and reminders
- [ ] User teams and collaboration
- [ ] Issue assignment to team members
- [ ] Export issues to CSV
- [ ] Project templates
- [ ] Email notifications
- [ ] URL search parameters for filter persistence

## Environment Requirements

- Node.js 18+
- npm or yarn
- Supabase account with configured project
- Environment variables set in `.env.local`

## Performance Optimization

- TanStack Query handles caching and synchronization
- Automatic query invalidation on mutations
- Server-side filtering for issues
- Lazy loading of components
- Tailwind CSS for optimized styling

## Security Features

- Row-Level Security (RLS) policies on database
- User authentication required for all operations
- User-owned data isolation
- Password validation on registration
- Email validation on registration and login

## License

This project is for learning and internship evaluation purposes.

## Support

For issues or questions, refer to:
- IMPLEMENTATION_GUIDE.md - Full feature documentation
- QUICK_REFERENCE.md - Quick answers to common questions
- Component comments - Inline documentation

---

**Status**: ✅ Production Ready
**Last Updated**: August 18, 2026
**Version**: 1.0
