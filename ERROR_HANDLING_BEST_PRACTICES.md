# Error Handling Best Practices

## Principle: Never Expose Server Errors to Users

### ❌ Bad Practice
```javascript
catch (error) {
  // Showing raw server error to user
  const message = error.response?.data?.message || 'Login failed'
  toast.error(message)  // User sees: "Database service is not available..."
}
```

### ✅ Good Practice
```javascript
catch (error) {
  // Log full error to console for debugging
  console.error('Login error:', error)
  
  // Show user-friendly message based on status code
  const statusCode = error.response?.status
  let userMessage = 'Login failed. Please try again.'
  
  if (statusCode === 401) {
    userMessage = 'Invalid email or password'
  } else if (statusCode === 400) {
    userMessage = 'Please check your input and try again'
  } else if (statusCode === 503) {
    userMessage = 'Service temporarily unavailable. Please try again later.'
  }
  
  toast.error(userMessage)  // User sees: "Invalid email or password"
}
```

## Error Handling Strategy

### 1. **Log to Console**
- Full error details go to browser console
- Developers can debug using F12 → Console tab
- Includes stack trace and full error object

### 2. **Map Status Codes to User Messages**
- 400 Bad Request → "Please check your input and try again"
- 401 Unauthorized → "Invalid email or password"
- 403 Forbidden → "You don't have permission to access this"
- 404 Not Found → "Resource not found"
- 500 Server Error → "Something went wrong. Please try again later"
- 503 Service Unavailable → "Service temporarily unavailable. Please try again later"

### 3. **Generic Fallback Message**
- Always have a default message for unexpected errors
- Don't expose technical details to users

## Implementation in Login Component

```javascript
const handleSubmit = async (e) => {
  e.preventDefault()
  const newErrors = validateForm()
  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors)
    return
  }

  setLoading(true)
  try {
    await login(formData.email, formData.password)
    toast.success('Login successful!')
    navigate('/')
  } catch (error) {
    // Step 1: Log to console
    console.error('Login error:', error)
    
    // Step 2: Extract status code
    const statusCode = error.response?.status
    
    // Step 3: Map to user-friendly message
    let userMessage = 'Login failed. Please try again.'
    
    if (statusCode === 401) {
      userMessage = 'Invalid email or password'
    } else if (statusCode === 400) {
      userMessage = 'Please check your input and try again'
    } else if (statusCode === 503) {
      userMessage = 'Service temporarily unavailable. Please try again later.'
    }
    
    // Step 4: Show user-friendly message
    toast.error(userMessage)
  } finally {
    setLoading(false)
  }
}
```

## Implementation in Register Component

```javascript
const handleSubmit = async (e) => {
  e.preventDefault()
  const newErrors = validateForm()
  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors)
    return
  }

  setLoading(true)
  try {
    await register(formData.username, formData.email, formData.password)
    toast.success('Registration successful!')
    navigate('/')
  } catch (error) {
    // Step 1: Log to console
    console.error('Registration error:', error)
    
    // Step 2: Extract status code and server message
    const statusCode = error.response?.status
    const serverMessage = error.response?.data?.message
    
    // Step 3: Map to user-friendly message
    let userMessage = 'Registration failed. Please try again.'
    
    if (statusCode === 400) {
      if (serverMessage?.includes('already exists')) {
        userMessage = 'This email or username is already registered'
      } else if (serverMessage?.includes('Invalid')) {
        userMessage = 'Please check your input and try again'
      } else {
        userMessage = 'Please check your input and try again'
      }
    } else if (statusCode === 503) {
      userMessage = 'Service temporarily unavailable. Please try again later.'
    }
    
    // Step 4: Show user-friendly message
    toast.error(userMessage)
  } finally {
    setLoading(false)
  }
}
```

## Benefits

✅ **Security**: Doesn't expose internal system details
✅ **User Experience**: Clear, actionable messages
✅ **Debugging**: Full error details in console for developers
✅ **Professionalism**: Polished error handling
✅ **Maintainability**: Easy to update messages without changing logic

## Files Updated

1. **frontend/src/components/auth/Login.jsx**
   - Logs full error to console
   - Shows user-friendly messages based on HTTP status codes

2. **frontend/src/components/auth/Register.jsx**
   - Logs full error to console
   - Shows user-friendly messages based on HTTP status codes
   - Handles specific server messages (e.g., "already exists")

## Testing Error Handling

### To Test in Browser Console
1. Open browser DevTools (F12)
2. Go to Console tab
3. Try to login/register
4. Full error details appear in console
5. User sees friendly message in toast notification

### Console Output Example
```
Login error: AxiosError {
  message: "Request failed with status code 503"
  response: {
    status: 503
    data: { message: "Database service is not available..." }
  }
  ...
}
```

### User Sees
```
"Service temporarily unavailable. Please try again later."
```

## Related Files

- `frontend/src/components/auth/Login.jsx` - Login error handling
- `frontend/src/components/auth/Register.jsx` - Registration error handling
- `frontend/src/services/authService.js` - API calls
- `backend/src/controllers/authController.js` - Server error responses
