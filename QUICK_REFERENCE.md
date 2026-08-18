# IssueTracker - Quick Reference Guide

## 🚀 Quick Start

```bash
# Install & Run
npm install
npm run dev

# Open http://localhost:3000
```

---

## 📝 Quick Feature Overview

### Authentication
| Feature | File | How It Works |
|---------|------|--------------|
| **Register** | `auth/RegisterForm.tsx` | Email, password, confirmation, full name |
| **Login** | `auth/LoginForm.tsx` | Email & password with error display |
| **Logout** | `auth/LogoutButton.tsx` | Clears session, redirects to login |

### Projects
| Feature | File | How It Works |
|---------|------|--------------|
| **Create** | `projects/CreateProjectForm.tsx` | Form with name & description |
| **List** | `projects/ProjectsList.tsx` | Clickable list of all projects |
| **View** | `projects/ProjectDetails.tsx` | Display project info |
| **Edit** | `projects/EditProjectForm.tsx` | Update name & description |
| **Delete** | `projects/DeleteProjectButton.tsx` | Confirmation dialog before delete |

### Issues
| Feature | File | How It Works |
|---------|------|--------------|
| **Create** | `issues/CreateIssueForm.tsx` | Title, description, status, priority |
| **List** | `issues/IssuesList.tsx` | Shows issues per project |
| **View** | `issues/EditIssueForm.tsx` | Display issue details |
| **Edit** | `issues/EditIssueForm.tsx` | Update any issue field |
| **Delete** | `issues/DeleteIssueButton.tsx` | Confirmation dialog before delete |
| **Filter** | `issues/IssueFilters.tsx` | Search, status, priority filters |
| **All Issues** | `(dashboard)/issues/page.tsx` | Browse all issues across projects |

### Dashboard
| Feature | File | How It Works |
|---------|------|--------------|
| **Stats** | `dashboard/page.tsx` | Shows 4 key metrics |
| **Recent Projects** | `dashboard/page.tsx` | Latest 5 projects |
| **Recent Issues** | `dashboard/page.tsx` | Latest 5 issues |

---

## 🔑 Key Components Explained

### 1. RegisterForm
```typescript
// Location: components/auth/RegisterForm.tsx
// Features:
- Full name input
- Email validation (RFC 5322)
- Password (min 6 chars)
- Password confirmation
- Error messages
- Submit loading state
```

### 2. LoginForm  
```typescript
// Location: components/auth/LoginForm.tsx
// Features:
- Email & password fields
- Error message display
- Submit loading state
- Link to register page
```

### 3. Navbar
```typescript
// Location: components/layout/Navbar.tsx
// Features:
- Dynamic user display
- Avatar with initials
- Real user metadata
- Logout button
- Responsive layout
```

### 4. DeleteIssueButton
```typescript
// Location: components/issues/DeleteIssueButton.tsx
// Features:
- Confirmation dialog
- Visual warning styling
- Loading state during deletion
- Query invalidation
- Redirect after delete
```

### 5. DeleteProjectButton
```typescript
// Location: components/projects/DeleteProjectButton.tsx
// Features:
- Confirmation dialog
- Cascade warning message
- Visual destructive styling
- Loading state handling
- Redirect after delete
```

### 6. IssueFilters
```typescript
// Location: components/issues/IssueFilters.tsx
// Features:
- Title search input
- Status dropdown (4 options)
- Priority dropdown (4 options)
- Search & Reset buttons
- Responsive grid layout
```

### 7. Dashboard
```typescript
// Location: app/(dashboard)/dashboard/page.tsx
// Features:
- 4 statistics cards
- Recent projects list
- Recent issues list
- Quick action links
- Loading states
```

---

## 💾 Database Schema

### Projects Table
```sql
id (UUID, Primary Key)
name (TEXT, Required)
description (TEXT, Optional)
owner_id (UUID, Foreign Key)
created_at (TIMESTAMP)
updated_at (TIMESTAMP)
```

### Issues Table
```sql
id (UUID, Primary Key)
project_id (UUID, Foreign Key)
title (TEXT, Required)
description (TEXT)
status (TEXT: OPEN | IN_PROGRESS | RESOLVED | CLOSED)
priority (TEXT: LOW | MEDIUM | HIGH | URGENT)
created_by (UUID, Foreign Key)
created_at (TIMESTAMP)
updated_at (TIMESTAMP)
```

---

## 🔄 Query Key Structure

```typescript
// Projects
['projects']                    // All projects
['projects', projectId]         // Single project

// Issues
['issues', projectId]           // Issues in project
['issues', projectId, issueId]  // Single issue
['allIssues']                   // All issues (dashboard)
```

---

## 🎯 Common Tasks

### How to Add a New Field to Project Form
1. Edit `CreateProjectForm.tsx` or `EditProjectForm.tsx`
2. Add field to TypeScript type
3. Add input element with `register()`
4. Add validation rules in `register()`
5. Update Supabase table schema
6. Update query function

### How to Add a New Filter
1. Edit `components/issues/IssueFilters.tsx`
2. Add to `IssueFilterValues` type
3. Add form field with `register()`
4. Update `getIssues()` query function

### How to Add Error Toast Notification
1. Install: `npm install sonner`
2. Add `import { toast } from 'sonner'`
3. Call: `toast.error("Error message")`
4. Call: `toast.success("Success message")`

### How to Add Loading Skeleton
1. Create `components/ui/skeleton.tsx`
2. Use in place of content while loading
3. Show when `isLoading === true`

---

## 🧪 Testing Component

### Test LoginForm
```typescript
// Steps:
1. Navigate to /login
2. Enter test@example.com & password
3. Should redirect to /dashboard
4. Check user appears in navbar
```

### Test CreateIssue
```typescript
// Steps:
1. Go to project page
2. Fill in Create Issue form
3. Click Submit
4. Issue should appear in list
5. Verify status & priority badges
```

### Test FilterIssues
```typescript
// Steps:
1. Go to project issues
2. Search for title → Results filter
3. Select status → Results filter
4. Select priority → Results filter
5. Click Reset → All issues show
```

### Test DeleteProject
```typescript
// Steps:
1. Go to project edit page
2. Click "Delete Project"
3. Confirmation dialog appears
4. Click "Delete" 
5. Redirect to /projects
6. Project no longer in list
```

---

## 🔐 Environment Setup

### Required Variables
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxxxx
```

### Get From Supabase
1. Go to Supabase Dashboard
2. Select your project
3. Settings → API
4. Copy URL and anon key

---

## 📊 Status Codes

### Issue Status
- `OPEN` - New issue, not started
- `IN_PROGRESS` - Currently being worked on
- `RESOLVED` - Fixed/Complete
- `CLOSED` - Archived, no action needed

### Issue Priority
- `LOW` - Can wait
- `MEDIUM` - Standard priority
- `HIGH` - Important, soon
- `URGENT` - Critical, now

---

## 🎨 Color Coding

| Element | Color |
|---------|-------|
| Status Badge | Blue |
| Low Priority | Green |
| Medium Priority | Yellow |
| High Priority | Orange |
| Urgent Priority | Red |
| Open Issues | Orange |
| Urgent Issues | Red |

---

## ⚡ Performance Tips

1. **Caching**: React Query caches all queries
2. **Invalidation**: Automatically refreshes on mutations
3. **Lazy Loading**: Pages load data as needed
4. **Filtering**: Server-side filtering reduces data transfer
5. **Pagination**: Consider adding for large datasets

---

## 🐛 Common Issues & Solutions

### Issue: Form not submitting
**Solution**: Check form validation errors, ensure all required fields filled

### Issue: Changes not showing in list
**Solution**: This is query invalidation working, wait a moment and refresh

### Issue: Deleted item still showing
**Solution**: Page cache, try hard refresh (Ctrl+Shift+R)

### Issue: Login redirects to login again
**Solution**: Check Supabase credentials in `.env.local`

### Issue: No user showing in navbar
**Solution**: Ensure you're logged in and session is valid

---

## 📚 Documentation Files

1. **IMPLEMENTATION_GUIDE.md** - Comprehensive feature guide
2. **PROJECT_COMPLETION_SUMMARY.md** - What was completed
3. **QUICK_REFERENCE.md** - This file
4. **README.md** - Project overview

---

## 🚀 Deployment Checklist

- [ ] All environment variables set
- [ ] Database tables created
- [ ] RLS policies configured
- [ ] Test user creation flow
- [ ] Test full CRUD operations
- [ ] Check responsive design
- [ ] Verify error messages
- [ ] Test on different browsers
- [ ] Deploy to hosting platform

---

## 📞 Quick Links

- Supabase Dashboard: https://supabase.com
- Next.js Docs: https://nextjs.org
- React Query Docs: https://tanstack.com/query
- Tailwind CSS: https://tailwindcss.com
- Shadcn UI: https://ui.shadcn.com

---

## 💡 Pro Tips

1. **Search** is case-insensitive and searches in title field
2. **Filter Reset** clears all filters and refetches data
3. **Status Badges** use different colors for quick identification
4. **User Initials** are auto-generated from first letters of name
5. **Query Caching** means offline data might persist briefly

---

**Last Updated**: August 18, 2026
**For Quick Questions**: Check component comments in code
