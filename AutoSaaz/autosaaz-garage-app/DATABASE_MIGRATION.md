# PostgreSQL Migration Guide

## Prerequisites

1. **Install PostgreSQL** on your system if not already installed:
   - Windows: Download from https://www.postgresql.org/download/windows/
   - macOS: `brew install postgresql`
   - Linux: `sudo apt-get install postgresql postgresql-contrib`

2. **Start PostgreSQL service**:
   - Windows: Service should start automatically
   - macOS: `brew services start postgresql`
   - Linux: `sudo service postgresql start`

## Database Setup

1. **Create the database**:
   ```bash
   # Connect to PostgreSQL as superuser
   psql -U postgres
   
   # Create the database
   CREATE DATABASE autosaaz_db;
   
   # Create a user (optional, you can use postgres user)
   CREATE USER autosaaz_user WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE autosaaz_db TO autosaaz_user;
   
   # Exit psql
   \q
   ```

2. **Update environment variables** in `.env` file:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=autosaaz_db
   DB_USER=postgres  # or autosaaz_user if you created one
   DB_PASSWORD=your_password
   ```

3. **Install dependencies** (if sqlite3 was removed):
   ```bash
   cd server
   npm install
   ```

4. **Setup database tables**:
   ```bash
   npm run setup-db
   ```

5. **Start the server**:
   ```bash
   npm run dev
   ```

## Migration Notes

- The SQLite database file (`database.sqlite`) is no longer used
- All existing data in SQLite will need to be manually migrated if needed
- PostgreSQL provides better performance and features for production use
- The application now supports SSL connections for production environments

## Troubleshooting

1. **Connection refused**: Make sure PostgreSQL is running
2. **Database does not exist**: Create the database using the SQL commands above
3. **Authentication failed**: Check your username and password in `.env`
4. **Permission denied**: Make sure the user has proper privileges on the database

## Environment Variables

Make sure these are set in your `.env` file:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=autosaaz_db
DB_USER=postgres
DB_PASSWORD=your_password

# Other configurations remain the same
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
PORT=5000
```
