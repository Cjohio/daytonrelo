# Supabase Authentication Setup

The authentication system for Dayton Relo website has been configured to work seamlessly with the mobile app using the same Supabase project.

## Installation

To enable authentication, run the following command in the website directory:

```bash
npm install @supabase/supabase-js @supabase/ssr
```

Then restart the development server:

```bash
npm run dev
```

## Configuration

The following environment variables are already configured in `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://balotlqhkvyulcarezkg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_th8-FmvK2OWJrPapm747hQ_FGnZOUOb
```

## Features

### Authentication Pages
- **Sign Up** (`/auth/signup`): Create a new account with email, password, phone, move timeline, and persona selection
- **Sign In** (`/auth/login`): Log in with email and password, or use magic link
- **Forgot Password** (`/auth/forgot-password`): Reset password via email
- **Reset Password** (`/auth/reset-password`): Set a new password after receiving reset link
- **Verify Email** (`/auth/verify`): Confirmation page after signup
- **Auth Error** (`/auth/error`): Error handling page

### User Profile
- **Profile Page** (`/profile`): View and edit user information including name, phone, move timeline, and persona
- Shows saved items from the `saved_items` table
- Option to change password
- Sign out functionality
- Links to download the mobile app

### Header Integration
- **AuthButton Component** (`src/components/AuthButton.tsx`):
  - Shows user initials and name when logged in
  - Dropdown menu with profile link and sign out
  - Sign In / Sign Up buttons when logged out
  - Integrated into the header for easy access

## Database Tables

The Supabase project includes two tables for authentication:

### profiles
- `id` (uuid): User ID from auth.users
- `full_name` (text): User's full name
- `email` (text): User's email
- `phone` (text): User's phone number
- `move_timeline` (text): When the user plans to move
- `persona` (text): User type - 'military', 'relocation', or 'discover'
- `created_at` (timestamptz): Account creation timestamp

### saved_items
- `id` (uuid): Item ID
- `user_id` (uuid): References auth.users
- `item_type` (text): Type of item - 'listing', 'tool', or 'page'
- `item_id` (text): ID of the saved item
- `title` (text): Item title
- `subtitle` (text): Item subtitle
- `route` (text): URL path to the item
- `metadata` (jsonb): Additional data as JSON
- `created_at` (timestamptz): When item was saved

## Account Sync

Users who sign up on the website will automatically be able to log in on the mobile app with the same credentials. Both the website and mobile app share the same Supabase authentication project, enabling:

- Single sign-on across platforms
- Unified user profiles
- Cross-platform saved items (if integrated)
- Synchronized user data

## Authentication Flow

1. User signs up or logs in on the website
2. Credentials are validated with Supabase Auth
3. Session token is stored in secure HTTP-only cookies
4. User profile data is stored in the `profiles` table
5. Auth middleware checks session on every request
6. Session is automatically refreshed when needed

## Security Notes

- All authentication is handled by Supabase Auth
- Passwords are never stored or exposed
- Session tokens are secure HTTP-only cookies
- The anon key is publishable and can be used in client-side code
- Row-level security (RLS) policies should be enabled in Supabase for production

## Next Steps

1. Ensure Supabase RLS policies are configured for `profiles` and `saved_items` tables
2. Set up email templates in Supabase for verification and password reset emails
3. Test authentication flow on both website and mobile app
4. Configure redirect URLs in Supabase settings if deploying to a custom domain
