# AutoSaaz Garage App

A comprehensive PERN (PostgreSQL, Express.js, React, Node.js) stack application for managing garage appointments and services.

## Features

- User Authentication (Login/Register with email verification)
- Dashboard with appointment overview
- Appointment management system
- Real-time appointment status updates
- Responsive design matching the provided UI mockups
- RESTful API architecture
- PostgreSQL database with Sequelize ORM

## Technology Stack

### Frontend
- React 18
- React Router v6
- Axios for API calls
- Custom CSS for styling
- Context API for state management

### Backend
- Node.js with Express.js
- PostgreSQL with Sequelize ORM
- JWT authentication
- bcrypt for password hashing
- CORS enabled
- Input validation

## Project Structure

```
autosaaz-garage-app/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom hooks
│   │   ├── context/       # React context
│   │   ├── services/      # API services
│   │   ├── styles/        # CSS files
│   │   └── utils/         # Utility functions
│   └── package.json
├── server/                # Node.js backend
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── models/        # Sequelize models
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Express middleware
│   │   ├── config/        # Configuration files
│   │   └── utils/         # Utility functions
│   └── package.json
├── database/              # Database scripts
│   ├── migrations/        # SQL migration files
│   └── seeds/            # Seed data
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### 1. Clone the Repository
```bash
git clone <repository-url>
cd autosaaz-garage-app
```

### 2. Database Setup
1. Install and start PostgreSQL
2. Create a database named `autosaaz_db`
3. Run the migration files in order:
   ```bash
   psql -U postgres -d autosaaz_db -f database/migrations/001_create_users_table.sql
   psql -U postgres -d autosaaz_db -f database/migrations/002_create_businesses_table.sql
   psql -U postgres -d autosaaz_db -f database/migrations/003_create_bookings_table.sql
   ```
4. (Optional) Run seed data:
   ```bash
   psql -U postgres -d autosaaz_db -f database/seeds/initial_data.sql
   ```

### 3. Server Setup
```bash
cd server
npm install
cp .env.example .env
# Edit .env file with your database credentials
npm run dev
```

The server will start on http://localhost:5000

### 4. Client Setup
```bash
cd client
npm install
cp .env.example .env
# Edit .env file if needed
npm start
```

The client will start on http://localhost:3000

## Environment Variables

### Server (.env)
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=autosaaz_db
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=your_jwt_secret
PORT=5000
NODE_ENV=development
```

### Client (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/verify` - Email verification

### Appointments
- `GET /api/appointments` - Get all appointments
- `GET /api/appointments/:id` - Get specific appointment
- `PUT /api/appointments/:id/accept` - Accept appointment
- `PUT /api/appointments/:id/cancel` - Cancel appointment
- `POST /api/appointments` - Create new appointment

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

## Usage

1. Register a new account or login with existing credentials
2. Navigate to the dashboard to see appointment overview
3. Use the appointments page to manage upcoming appointments
4. Click on appointments to view details and take actions
5. Accept or cancel appointments as needed

## Features Implemented

- ✅ User authentication with JWT
- ✅ Responsive dashboard layout
- ✅ Appointment listing with filtering
- ✅ Appointment detail view
- ✅ Accept/Cancel appointment functionality
- ✅ Real-time status updates
- ✅ Modern UI matching provided mockups
- ✅ PostgreSQL database integration
- ✅ RESTful API architecture
- ✅ Input validation and error handling

## Production Deployment

### Database
1. Set up PostgreSQL instance (AWS RDS, Google Cloud SQL, etc.)
2. Run migrations in production environment
3. Update environment variables

### Backend
1. Deploy to platform like Heroku, Railway, or AWS
2. Set production environment variables
3. Enable SSL/TLS for secure connections

### Frontend
1. Build the React app: `npm run build`
2. Deploy to platform like Netlify, Vercel, or AWS S3
3. Update API URL in environment variables

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues and questions, please open an issue in the repository or contact the development team.