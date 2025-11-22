# Authentication Issue - Root Cause & Fix

## Problem Summary

Users were unable to login/signup and were not receiving error alerts. The issue had multiple causes:

### Root Causes

1. **Backend Supabase Dependency**
   - Auth controller required Supabase database to be configured
   - Supabase credentials were not provided in `.env`
   - Backend would crash when trying to authenticate without Supabase

2. **Missing Error Handling**
   - Backend returned 503 Service Unavailable but without proper error messages
   - Frontend auth service didn't have explicit error handling for database unavailability

3. **API URL Configuration**
   - authService.js was using incorrect API URL construction with `import.meta.env.VITE_API_URL`
   - Should use relative paths that work with Vite's proxy configuration

## Solutions Implemented

### 1. Backend Auth Controller Fix
**File:** `backend/src/controllers/authController.js`

Added explicit checks for Supabase availability before attempting database operations:

```javascript
// Check if Supabase is configured
if (!supabase) {
  return res.status(503).json({ 
    message: "Database service is not available. Please configure Supabase credentials." 
  });
}
```

**Applied to:**
- `register()` endpoint - Line 25-30
- `login()` endpoint - Line 81-86

### 2. Frontend Auth Service Fix
**File:** `frontend/src/services/authService.js`

Changed API URL from:
```javascript
const API_URL = new URL("/api/auth", import.meta.env.VITE_API_URL).toString();
```

To:
```javascript
const API_URL = "/api/auth";
```

This allows the Vite proxy (configured in `vite.config.js`) to properly route requests to the backend.

### 3. Supabase Configuration
**File:** `backend/src/config/supabase.js`

Already fixed in previous session to make Supabase optional for development:
- Allows running without credentials in development mode
- Only throws error in production if credentials are missing
- Gracefully handles missing Supabase connection

## How It Works Now

### Development Mode (Without Supabase)
1. Backend starts without Supabase credentials
2. Auth endpoints return 503 error with clear message: "Database service is not available"
3. Frontend receives error and displays it via toast notification
4. User sees: "Database service is not available. Please configure Supabase credentials."

### Production Mode (With Supabase)
1. Backend requires `SUPABASE_URL` and `SUPABASE_KEY` in `.env`
2. Auth endpoints work normally with database
3. Users can login/signup successfully

## Error Flow

```
User submits login form
    ↓
Frontend authService.js calls POST /api/auth/login
    ↓
Vite proxy routes to http://localhost:5000/api/auth/login
    ↓
Backend login controller checks if supabase is configured
    ↓
If not configured: Returns 503 with error message
If configured: Queries database and authenticates user
    ↓
Frontend catches error/success and displays toast notification
```

## Testing

### To Test Error Messages
1. Start backend without Supabase credentials (current state)
2. Try to login/register
3. Should see error toast: "Database service is not available..."

### To Enable Full Authentication
1. Configure Supabase:
   - Create Supabase project at https://supabase.com
   - Get `SUPABASE_URL` and `SUPABASE_KEY`
   - Create `users` table with columns: id, username, email, password, created_at, last_login

2. Create `.env` file in backend:
   ```
   PORT=5000
   JWT_SECRET=your_secret_key_here
   NODE_ENV=development
   PISTON_API_URL=https://emkc.org/api/v2/piston
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_anon_key
   ```

3. Restart backend server

## Files Modified

1. **backend/src/controllers/authController.js**
   - Added Supabase availability checks in `register()` and `login()`

2. **frontend/src/services/authService.js**
   - Fixed API URL to use relative path for Vite proxy

3. **backend/src/config/supabase.js** (Previously fixed)
   - Made Supabase optional for development mode

## Error Messages

### When Supabase is Not Configured
- **Status:** 503 Service Unavailable
- **Message:** "Database service is not available. Please configure Supabase credentials."

### When Credentials Are Invalid
- **Status:** 401 Unauthorized
- **Message:** "Invalid credentials"

### When Required Fields Are Missing
- **Status:** 400 Bad Request
- **Message:** "Missing fields" or "Missing credentials"

### When User Already Exists
- **Status:** 400 Bad Request
- **Message:** "User already exists"

## Next Steps

1. Configure Supabase credentials for full authentication
2. Test login/signup with valid credentials
3. Verify token is stored in localStorage
4. Test protected routes (e.g., /course/:courseId)
5. Test logout functionality
