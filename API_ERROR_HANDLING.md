# API Error Handling Guide

## Problem: JSON Parse Error

### Error Message
```
Failed to load courses. Please try again later.
Error fetching courses: SyntaxError: Unexpected token '<', "<!doctype "... is not valid JSON
```

### Root Cause
When an API request fails (e.g., 500 error), the server returns HTML error page instead of JSON. The code tries to parse HTML as JSON, causing a SyntaxError.

### Solution
Check `response.ok` before parsing JSON and handle errors gracefully.

## Correct Error Handling Pattern

### ❌ Bad Practice
```javascript
const response = await fetch('/api/courses/grouped')
if (!response.ok) {
  throw new Error('Failed to fetch courses')  // Still tries to parse HTML
}
const data = await response.json()  // Fails if response is HTML
```

### ✅ Good Practice
```javascript
const response = await fetch('/api/courses/grouped')

if (!response.ok) {
  // Log full error to console for debugging
  console.error(`API Error: ${response.status} ${response.statusText}`)
  throw new Error(`HTTP ${response.status}: Failed to fetch courses`)
}

const data = await response.json()
```

## Implementation in Courses Component

```javascript
useEffect(() => {
  const fetchCourses = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/courses/grouped')
      
      if (!response.ok) {
        // Log full error to console for debugging
        console.error(`API Error: ${response.status} ${response.statusText}`)
        throw new Error(`HTTP ${response.status}: Failed to fetch courses`)
      }
      
      const data = await response.json()
      setGroupedCourses(data)
      setError(null)
    } catch (err) {
      // Log full error to console for debugging
      console.error('Error fetching courses:', err)
      
      // Show user-friendly message
      setError('Failed to load courses. Please try again later.')
      setGroupedCourses([])
    } finally {
      setLoading(false)
    }
  }

  fetchCourses()
}, [])
```

## Error Handling Flow

```
API Request
    ↓
Response received
    ↓
Check response.ok
    ├─ true: Parse JSON and display courses
    └─ false: Log error to console, show user-friendly message
    ↓
User sees: "Failed to load courses. Please try again later."
Developer sees: Full error details in console (F12 → Console)
```

## Console Output Examples

### Success
```
No errors - courses load normally
```

### API Error (e.g., 500)
```
API Error: 500 Internal Server Error
Error fetching courses: Error: HTTP 500: Failed to fetch courses
```

### Network Error
```
Error fetching courses: TypeError: Failed to fetch
```

### JSON Parse Error (HTML response)
```
Error fetching courses: SyntaxError: Unexpected token '<'
```

## HTTP Status Codes

| Status | Meaning | Action |
|--------|---------|--------|
| 200 | OK | Parse JSON and display data |
| 400 | Bad Request | Show "Please check your input" |
| 401 | Unauthorized | Show "Please login" |
| 403 | Forbidden | Show "Access denied" |
| 404 | Not Found | Show "Resource not found" |
| 500 | Server Error | Show "Something went wrong" |
| 503 | Service Unavailable | Show "Service temporarily unavailable" |

## Best Practices

### 1. Always Check response.ok
```javascript
if (!response.ok) {
  // Handle error
}
```

### 2. Log Full Error to Console
```javascript
console.error(`API Error: ${response.status} ${response.statusText}`)
```

### 3. Show User-Friendly Message
```javascript
setError('Failed to load courses. Please try again later.')
```

### 4. Handle Network Errors
```javascript
catch (err) {
  console.error('Error fetching courses:', err)
  setError('Failed to load courses. Please try again later.')
}
```

### 5. Always Clean Up
```javascript
finally {
  setLoading(false)
}
```

## Testing Error Handling

### Test 1: Simulate API Error
1. Stop backend server
2. Try to load courses
3. Should see: "Failed to load courses. Please try again later."
4. Console should show: "Error fetching courses: TypeError: Failed to fetch"

### Test 2: Check Console
1. Open browser DevTools (F12)
2. Go to Console tab
3. Load courses page
4. Should see error details in console

### Test 3: Verify User Message
1. User should see friendly error message
2. No technical details exposed
3. No HTML/JSON parsing errors

## Files Updated

1. **frontend/src/pages/Courses.jsx**
   - Improved error handling for API calls
   - Logs full error to console
   - Shows user-friendly message

## Related Files

- `frontend/src/components/auth/Login.jsx` - Auth error handling
- `frontend/src/components/auth/Register.jsx` - Auth error handling
- `backend/src/controllers/courseController.js` - API endpoints
- `backend/src/routes/courseRoutes.js` - Route definitions

## Debugging Tips

### Enable Console Logging
```javascript
// Already in code:
console.error('Error fetching courses:', err)
```

### Check Network Tab
1. Open DevTools (F12)
2. Go to Network tab
3. Reload page
4. Click on `/api/courses/grouped` request
5. Check Response tab to see actual response

### Common Issues

**Issue**: "SyntaxError: Unexpected token '<'"
- **Cause**: Server returned HTML instead of JSON
- **Fix**: Check backend is running and responding correctly

**Issue**: "TypeError: Failed to fetch"
- **Cause**: Network error or CORS issue
- **Fix**: Check backend is running on port 5000

**Issue**: "Error: HTTP 503"
- **Cause**: Service unavailable (e.g., Supabase not configured)
- **Fix**: Configure Supabase or check backend logs

## Summary

✅ Check `response.ok` before parsing JSON
✅ Log full error to console for debugging
✅ Show user-friendly message to users
✅ Handle network errors gracefully
✅ Always clean up in finally block
