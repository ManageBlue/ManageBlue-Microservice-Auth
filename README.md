# ManageBlue-Backend
Backend Service for the ManageBlue App.

## Models

**User:**
- username (String 32)*
- hashedPassword (String)*
- salt (String)*
- firstName (String 32)*
- lastName (String 32)*
- email (String 128)*
- auto: createdAt(Date)
- auto: updatedAt(Date)

**Token:**
- token (String)*
- date (Date)*

## API (`/api/version`)

### `/auth`
- `/register` (POST) - Register new user
- `/login` (POST) - Login user
- `/logout` (POST) - Logout user
- `/verify` (GET) - Verify token

### `/users`
- `/:id` (GET) - Return user by ID
- `/` (GET) - Return all users
- `/:id` (PUT) - Update user by ID
- `/pass/:id` (PUT) - Update user password by ID
- `/:id` (DELETE) - Delete user by ID


