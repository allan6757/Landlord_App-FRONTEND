# Development Setup Guide

## Quick Start

### 1. Install Frontend Dependencies
```bash
npm install
```

### 2. Start Backend Server
```bash
npm run backend
```
This will:
- Create Python virtual environment
- Install backend dependencies
- Initialize database
- Start Flask server on http://localhost:5000

### 3. Start Frontend (in new terminal)
```bash
npm run dev
```
Frontend will run on http://localhost:5173

## Alternative: Run Both Together
```bash
npm install -g concurrently
npm run fullstack
```

## Backend API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/profile` - Get user profile

### Properties (Landlord only)
- GET `/api/properties` - List properties
- POST `/api/properties` - Create property
- GET `/api/properties/:id` - Get property details
- PUT `/api/properties/:id` - Update property
- DELETE `/api/properties/:id` - Delete property

### Payments
- GET `/api/payments` - List payments
- POST `/api/payments` - Create payment/STK Push

### Chat
- GET `/api/conversations` - List conversations
- POST `/api/conversations` - Create conversation
- GET `/api/conversations/:id/messages` - Get messages
- POST `/api/conversations/:id/messages` - Send message

## Test Users

Create test users via registration or use the backend's init_db.py script.

## Environment Variables

Frontend (.env):
```
VITE_API_BASE_URL=http://localhost:5000
```

Backend (.env):
```
SECRET_KEY=dev-secret-key
JWT_SECRET_KEY=dev-jwt-secret
DATABASE_URL=sqlite:///landlord_app.db
CORS_ORIGINS=http://localhost:3000,http://localhost:5173
```

## Troubleshooting

1. **Backend not starting**: Check Python version (3.8+)
2. **CORS errors**: Ensure backend CORS_ORIGINS includes frontend URL
3. **Database errors**: Delete `instance/landlord_app.db` and restart backend
4. **Port conflicts**: Change ports in .env files if needed