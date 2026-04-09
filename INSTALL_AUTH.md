# Dayton Relo Website — Supabase Auth Setup
> Last updated: April 9, 2026 — all setup confirmed complete

---

## Status: Fully Installed ✅

Authentication and database are live. No installation steps required for a fresh clone — just run `npm install` and `npm run dev`.

---

## Supabase Project

- **Project name:** `dayton-relo`
- **URL:** `https://balotlqhkvyulcarezkg.supabase.co`
- **Region:** us-east-1
- **Status:** ACTIVE_HEALTHY
- **Dashboard:** https://supabase.com/dashboard/project/balotlqhkvyulcarezkg

---

## Environment Variables

Already configured in `.env.local` (website) and Vercel:

```
NEXT_PUBLIC_SUPABASE_URL=https://balotlqhkvyulcarezkg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_th8-FmvK2OWJrPapm747hQ_FGnZOUOb
```

---

## Auth Features Live

| Feature | Route | Status |
|---|---|---|
| Sign Up | `/auth/signup` | ✅ |
| Sign In | `/auth/login` | ✅ |
| Magic Link | `/auth/login` | ✅ |
| Forgot Password | `/auth/forgot-password` | ✅ |
| Reset Password | `/auth/reset-password` | ✅ |
| Email Verify | `/auth/verify` | ✅ |
| Auth Error | `/auth/error` | ✅ |
| User Profile | `/profile` | ✅ |
| Edit Profile | `/profile` (inline edit) | ✅ |
| Auth Header | All pages | ✅ |
| Protected Routes | `/profile`, `/mission-control` | ✅ |

---

## Database Tables (all confirmed live, RLS enabled — April 9, 2026)

### `profiles`
Synced with Supabase auth.users via trigger on signup.

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | FK → auth.users |
| `full_name` | text | |
| `email` | text | |
| `phone` | text | nullable |
| `move_timeline` | text | default '3-6 months' |
| `persona` | text | 'military', 'relocation', or 'discover' |
| `community_display_name` | text | nullable — chosen on first community post |
| `created_at` | timestamptz | |

### `saved_items`
App bookmarks (website uses localStorage instead of this table).

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | |
| `user_id` | uuid | FK → auth.users |
| `item_type` | text | 'listing', 'tool', 'page' |
| `item_id` | text | |
| `title` | text | |
| `subtitle` | text | nullable |
| `route` | text | nullable |
| `metadata` | jsonb | nullable |
| `created_at` | timestamptz | |

### `community_posts`
App's real-time community board.

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | |
| `user_id` | uuid | FK → profiles |
| `display_name` | text | |
| `category` | text | general, pcs, neighborhoods, schools, events, restaurants, feedback |
| `title` | text | |
| `body` | text | |
| `is_pinned` | boolean | default false |
| `upvote_count` | integer | auto-updated by trigger |
| `reply_count` | integer | auto-updated by trigger |
| `created_at` | timestamptz | |

### `community_replies`
| Column | Type |
|---|---|
| `id` | uuid |
| `post_id` | uuid (FK → community_posts) |
| `user_id` | uuid (FK → profiles) |
| `display_name` | text |
| `body` | text |
| `created_at` | timestamptz |

### `post_upvotes`
One row per user per post (unique constraint enforced).

| Column | Type |
|---|---|
| `id` | uuid |
| `post_id` | uuid (FK → community_posts) |
| `user_id` | uuid (FK → profiles) |
| `created_at` | timestamptz |

### `leads`
Created April 9, 2026. Captures every contact form submission from the app.

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | |
| `name` | text | |
| `email` | text | indexed |
| `phone` | text | nullable |
| `move_timeline` | text | nullable |
| `employer` | text | nullable |
| `message` | text | nullable |
| `source` | text | default 'Dayton Relo App' |
| `submitted_at` | timestamptz | indexed desc |
| `created_at` | timestamptz | |

### `local_services` / `temp_housing`
Reference tables seeded with Dayton-area data. RLS enabled (read-only for public).

### Social media tables (`content_items`, `content_versions`, etc.)
Used by `/mission-control` dashboard. All RLS enabled.

---

## Database Triggers

| Trigger | Table | Function |
|---|---|---|
| `trg_reply_count` | community_replies | `update_reply_count()` — keeps reply_count in sync |
| `trg_upvote_count` | post_upvotes | `update_upvote_count()` — keeps upvote_count in sync |

---

## Auth Flow (how it works)

1. User signs up or logs in
2. Supabase Auth validates credentials
3. Session stored in secure HTTP-only cookies (managed by `@supabase/ssr`)
4. Middleware at `src/middleware.ts` checks + refreshes session on every request
5. Profile data stored/read from `profiles` table
6. RLS policies ensure users can only read/write their own data

---

## Cross-Platform Sync

Website and app share the same Supabase project:
- A user who signs up on the website can log in on the app with the same credentials
- Profile, persona, and saved items are shared
- Community board (app only — uses Supabase realtime)

---

## Pending Setup (not yet configured)

- **Email templates** — Customize verification and password reset emails in Supabase → Project Settings → Auth → Email Templates
- **SMTP provider** — Set up SendGrid or similar in Supabase for reliable email delivery in production
- **Redirect URLs** — Confirm `https://daytonrelo.com/**` is in Supabase → Auth → URL Configuration → Redirect URLs

---

## Re-running Migrations (if needed)

All migrations are safe to re-run (use `CREATE TABLE IF NOT EXISTS`, `ADD COLUMN IF NOT EXISTS`, etc.).

SQL files:
- `dayton-relo-app/supabase/community_schema.sql`
- `dayton-relo-app/supabase/leads_schema.sql`
- `dayton-relo-app/supabase-setup.sql`
- `dayton-relo-app/supabase-new-tables.sql`

Run in: Supabase Dashboard → SQL Editor → paste and execute.
