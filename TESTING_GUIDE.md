# Dayton Relo Website — Testing Guide
> Last updated: April 9, 2026
> Live site: https://daytonrelo.com

---

## Environment

- **Framework:** Next.js 16.2.2 (App Router)
- **Hosting:** Vercel — project `daytonrelo`, team `chris-8894s-projects`
- **Auth + DB:** Supabase — project `dayton-relo` (us-east-1, ACTIVE_HEALTHY)
- **Local dev:** `npm run dev` → http://localhost:3000

---

## Pre-Test Setup

```bash
cd ~/Documents/Claude/Claude/Projects/Set\ up\ open\ clay\ discord/dayton-relo-website
npm install
npm run dev
```

Confirm the server is running at http://localhost:3000.

---

## Auth Flow Testing

### Signup
1. Navigate to http://localhost:3000/auth/signup
2. Fill in: Full Name, Email, Password (min 8 chars), Phone (optional), Move Timeline, Persona
3. Check Terms checkbox → click "Create Account"
4. Expect redirect to verify page

### Email Verification
- In Supabase Dashboard → Authentication → Users → find user → check email status
- For local testing: manually confirm user in Supabase, or use magic link

### Login
1. Navigate to http://localhost:3000/auth/login
2. Enter credentials → "Sign In"
3. Expect redirect to `/profile`

### Magic Link
1. On login page → enter email → "Magic Link"
2. Check Supabase logs or email for link
3. Clicking should auto-sign in

### Forgot Password
1. Login page → "Forgot password?" → enter email → "Send Reset Link"
2. Confirm message shown
3. Follow reset link → set new password

### Sign Out
1. Click avatar dropdown → "Sign Out"
2. Expect redirect to home
3. Header should show Sign In / Sign Up buttons

### Protected Pages
1. While logged out, navigate to `/profile`
2. Expect redirect to `/auth/login?next=/profile`

---

## Profile Testing

1. When logged in, navigate to `/profile`
2. Verify: name, email, phone, persona, saved items section, change password link
3. Click Edit → modify fields → Save Changes → verify saved

---

## Header / Nav Testing

**Logged out state:** Header shows "Sign In" and "Sign Up" buttons.
**Logged in state:** Avatar with initials, name (desktop), dropdown: "My Profile" + "Sign Out".
**Mobile:** Hamburger menu includes auth buttons.

**Nav links to verify:**
- Search Homes → /listings
- Open Houses → /open-houses
- Military PCS → /military
- Neighborhoods → /neighborhoods
- Community → /community
- About → /about
- Saved (♥) → /saved
- Explore Dayton → /explore/restaurants (Local Restaurants), and other explore pages

---

## Listings Testing

1. Navigate to `/listings`
2. Filter by: status (Active/Pending/Open House), beds, baths, price range
3. Sort by newest/price
4. Click a listing card → expect `/listings/[key]` detail page
5. Save/unsave with heart icon → verify in `/saved`

> **Note:** Listings show mock data (Beavercreek, Fairborn, Centerville, Kettering, Springboro, Oakwood) until Trestle credentials are configured in Vercel env vars.

---

## Community Board Testing

1. Navigate to `/community`
2. Verify seed posts are visible
3. Test filtering by category
4. Post a reply (requires login)
5. Verify pinned posts appear at top

> **Note:** Website community board uses localStorage (`dr_community_posts`). It is separate from the app's Supabase-backed community board.

---

## Saved Homes Testing

1. Save a listing from `/listings` (heart icon)
2. Navigate to `/saved`
3. Verify saved listing appears
4. Unsave → verify removed

> **Note:** Website saved homes use localStorage (`dr_saved`). Separate from app's Supabase saved_items.

---

## Restaurants Page Testing

1. Navigate to `/explore/restaurants`
2. Verify tabs: Dayton Staples / Best of Dayton
3. Check 12 logos load correctly; 6 show gold letter-badge fallback (expected)
4. Verify "Get Directions" button links are correct

---

## Open Houses Testing

1. Navigate to `/open-houses`
2. Verify mock listings display in grid
3. Test the signup sidebar form (area chips, max price)

---

## Build / Deploy

```bash
# Local build test
cd dayton-relo-website
npm run build

# Push to GitHub (triggers Vercel auto-deploy)
git add .
git commit -m "your message"
git push origin main
```

Vercel deploys automatically on push to `main`. Check status at:
https://vercel.com/chris-8894s-projects/daytonrelo

---

## Vercel Environment Variables

Set at: https://vercel.com/chris-8894s-projects/daytonrelo/settings/environment-variables

| Variable | Status | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ Set | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ Set | Supabase anon key |
| `TRESTLE_CLIENT_ID` | ⚠️ Not set | Real MLS listings (pending DABR) |
| `TRESTLE_CLIENT_SECRET` | ⚠️ Not set | Real MLS listings (pending DABR) |
| `NEXT_PUBLIC_CRM_WEBHOOK_URL` | ⚠️ Not set | Lead forms → Lofty via Zapier |

---

## Common Issues & Fixes

**"Module not found" errors** — Run `npm install`, restart dev server.

**Session not persisting** — Check cookies are enabled; look for `sb-*` cookies in DevTools → Application → Cookies.

**Email verification not working** — Set up email provider in Supabase Dashboard → Project Settings → Auth → SMTP.

**Profile not loading** — Verify `profiles` table exists (it does — confirmed Apr 9 2026). Check RLS policies aren't blocking reads.

**Saved items not appearing** — `saved_items` table is live in Supabase. Website uses localStorage, not Supabase, for saved homes. App uses Supabase.

**Vercel build fails** — Check Settings → Build and Deployment: Framework = Next.js, Node = 20.x. Both are confirmed correct.

---

## Supabase Tables (confirmed live, RLS enabled — April 9, 2026)

| Table | Rows | Notes |
|---|---|---|
| `profiles` | 4 | `community_display_name` column present |
| `saved_items` | 3 | Used by app; website uses localStorage |
| `local_services` | 6 | Seeded |
| `temp_housing` | 4 | Seeded |
| `community_posts` | 2 | App community board |
| `community_replies` | 0 | App community board |
| `post_upvotes` | 1 | App community board |
| `leads` | 0 | Created Apr 9 2026 |
