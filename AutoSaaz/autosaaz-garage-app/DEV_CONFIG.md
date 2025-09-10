# Development Configuration

## Authentication Toggle

For frontend development, you can easily disable authentication to access all pages without needing a backend server.

### How to Toggle Authentication

1. **Using the Dev Toggle Button** (Recommended)
   - When running in development mode, look for the "Auth: ON/OFF" button in the header
   - Click it to toggle authentication on/off
   - The page will reload automatically to apply changes

2. **Using the Config File**
   - Open `src/config/dev.js`
   - Change `ENABLE_AUTH: false` to disable authentication
   - Change `ENABLE_AUTH: true` to enable authentication
   - Restart the development server

### When Authentication is Disabled

- All protected routes become accessible without login
- A mock user is automatically logged in with the following details:
  - Email: dev@autosaaz.com
  - Name: Developer User
  - Business: Dev Garage
- Login and registration forms will work but won't make API calls
- Perfect for frontend UI development and testing

### When Authentication is Enabled

- Normal authentication flow is enforced
- Backend server must be running
- Users must log in to access protected routes
- All API calls for auth are made normally

### Mock User Details

When auth is disabled, the following mock user is used:

```javascript
{
  id: 1,
  email: 'dev@autosaaz.com',
  firstName: 'Developer',
  lastName: 'User',
  isVerified: true,
  businessName: 'Dev Garage',
  businessAddress: '123 Dev Street'
}
```

### Error Message Styling

All error messages across the application now use consistent styling:
- Font size: 14px
- Padding: 12px 16px
- Border radius: 8px
- Red background with proper contrast
- Poppins font family
- Consistent margins and spacing

This ensures all error messages are properly visible at 100% browser zoom and maintain visual consistency throughout the application.
