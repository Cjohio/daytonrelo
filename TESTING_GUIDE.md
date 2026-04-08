# Testing Guide for Supabase Authentication

## Pre-Setup

1. Install dependencies:
   ```bash
   npm install @supabase/supabase-js @supabase/ssr
   ```

2. Restart the dev server:
   ```bash
   npm run dev
   ```

3. Verify the server is running at http://localhost:3000

## Testing Signup

1. Navigate to http://localhost:3000/auth/signup
2. Fill in the form:
   - Full Name: e.g., "John Doe"
   - Email: e.g., "john@example.com"
   - Password: min 8 characters
   - Phone: (optional) e.g., "(555) 123-4567"
   - Move Timeline: Select from dropdown
   - Persona: Select one of the three options
3. Check the terms checkbox
4. Click "Create Account"
5. You should be redirected to the verify page

## Testing Email Verification

1. In Supabase dashboard, check the email sent:
   - Go to Authentication > Users
   - Find your test user
   - Email confirmation will show pending/confirmed status

2. For local testing without email setup:
   - You can manually mark the user as confirmed in Supabase
   - Or use the magic link functionality

## Testing Login

1. Navigate to http://localhost:3000/auth/login
2. Enter your email and password from signup
3. Click "Sign In"
4. You should be redirected to `/profile` page

## Testing Magic Link

1. On login page, enter email and click "Magic Link"
2. Check Supabase logs or your email for the magic link
3. Clicking the link should sign you in automatically

## Testing Profile Page

1. When logged in, navigate to http://localhost:3000/profile
2. Verify you see:
   - Your account information (name, email, phone, etc.)
   - Edit button to modify your profile
   - Saved items section (should be empty initially)
   - Change password link
   - Sign out button

## Testing Edit Profile

1. On profile page, click "Edit"
2. Modify:
   - Full Name
   - Phone
   - Move Timeline
   - Persona
3. Click "Save Changes"
4. Verify the changes are saved

## Testing Password Reset

1. On login page, click "Forgot password?"
2. Enter your email
3. Click "Send Reset Link"
4. You'll see a confirmation message
5. In development, check Supabase logs for the reset link
6. Click the reset link and set a new password

## Testing Header Integration

1. Log out from profile page
2. Go to home page
3. Verify header shows:
   - "Sign In" button (top right)
   - "Sign Up" button (top right)

4. Click Sign In/Sign Up, then return to home
5. After logging in, verify header shows:
   - Your avatar with initials
   - Your name (on desktop)
   - Dropdown menu with "My Profile" and "Sign Out"

## Testing Mobile Menu

1. Resize browser to mobile width (or test on actual mobile device)
2. Verify hamburger menu includes auth buttons
3. Click auth buttons and verify functionality

## Testing Sign Out

1. Click avatar dropdown in header
2. Click "Sign Out"
3. Verify redirected to home page
4. Verify header now shows Sign In/Sign Up buttons again

## Testing Protected Pages

1. Try navigating directly to /profile while logged out
2. Verify you're redirected to /auth/login with next=/profile

## Testing Cross-Platform Sync

1. Sign up a user on the website (or use existing account)
2. Try logging in with the same credentials on:
   - Another browser/private window
   - The mobile app (if available)
3. Verify you can access the same profile and data

## Common Issues & Solutions

### "Module not found" errors
- Run `npm install @supabase/supabase-js @supabase/ssr`
- Restart dev server with `npm run dev`

### Session not persisting
- Check that cookies are enabled in browser
- Verify .env.local has correct Supabase credentials
- Check browser DevTools > Application > Cookies for `sb-*` cookies

### Email verification not working
- Set up email provider in Supabase dashboard
- Or manually confirm users in Supabase > Authentication > Users

### Password reset not working
- Ensure email provider is configured in Supabase
- Check redirect URL in reset password link matches your domain

### Profile not loading
- Verify `profiles` table exists in Supabase
- Check Row Level Security (RLS) policies aren't blocking reads
- Verify profile was created when user signed up

### Saved items not appearing
- Verify `saved_items` table exists in Supabase
- Ensure items are being inserted with correct user_id
- Check RLS policies for saved_items table

## Production Checklist

Before deploying to production:

- [ ] Configure RLS policies in Supabase
- [ ] Set up email provider (SendGrid, Mailgun, etc.)
- [ ] Configure email templates for verification and password reset
- [ ] Update Supabase project redirect URLs
- [ ] Test authentication flow end-to-end
- [ ] Verify error handling and edge cases
- [ ] Test on multiple browsers
- [ ] Test on mobile devices
- [ ] Set up proper error logging/monitoring
- [ ] Document any custom configurations
