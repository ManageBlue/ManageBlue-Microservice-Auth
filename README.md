# ManageBlue-Backend
Backend Service for the ManageBlue App.

## Models

**User:**
- username (String 32)*
- firstName (String 32)*
- lastName (String 32)*
- email (String 128)*
- auto: createdAt(Date)
- auto: updatedAt(Date)

## API (`/api/version`)

### `/users`
- `/:id` (GET) - Return user by ID
- `/` (GET) - Return all users
- `/:id` (PUT) - Update user by ID
- `/:id` (DELETE) - Delete user by ID
- `/register` (POST) - Register new user


