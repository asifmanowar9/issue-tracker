# IssueTracker

A full-stack task and issue tracking application built with Next.js, React Hook Form, TanStack Query, and Supabase.

## Features

- User registration and login
- Project creation and management
- Issue creation, editing, viewing, and deletion
- Issue filtering by status and priority
- Project and issue data fetching with TanStack Query
- Form handling with React Hook Form
- Supabase PostgreSQL database
- Supabase Authentication
- Row Level Security (RLS)

## Tech Stack

- Next.js
- React
- TypeScript
- React Hook Form
- TanStack Query
- Supabase
- PostgreSQL

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

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run the development server

```bash
npm run dev
```

Open `http://localhost:3000`.

## Main Concepts

### React Hook Form

Used for:

- Issue forms
- Project forms
- Form validation and errors
- Form state
- `watch()`
- `reset()`
- `setValue()`
- `getValues()`

### TanStack Query

Used for:

- Fetching projects and issues with `useQuery`
- Query caching
- Loading and error states
- Query keys
- Refetching
- Mutations
- Query invalidation after changes

## Project Structure

```text
app/
components/
lib/
  queries/
  supabase/
types/
```

## License

This project is for learning and internship evaluation purposes.
