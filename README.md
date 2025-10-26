# PropManager - Property Management System

A comprehensive React-based property management application for landlords and tenants.

## Features

### Landing Page
- Role selection (Landlord/Tenant)
- Feature showcase (M-Pesa Integration, Property Management, Real-time Chat)

### Landlord Dashboard
- Property portfolio overview with statistics
- Property management (add/edit/delete)
- Payment tracking and history
- Multi-tenant chat interface
- Visual payment status indicators

### Tenant Portal
- Property details and rental information
- M-Pesa STK Push payment simulation
- Payment history with transaction tracking
- Direct messaging with landlord
- Payment status dashboard

## Tech Stack

- **Frontend**: React 18
- **Routing**: React Router v6
- **Forms**: React Hook Form
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

```
src/
├── components/
│   ├── LandingPage.js      # Main landing page with role selection
│   ├── LandlordDashboard.js # Landlord interface with property management
│   ├── TenantPortal.js     # Tenant interface with payment features
│   ├── PropertyForm.js     # Form for adding/editing properties
│   ├── STKPushPayment.js   # M-Pesa payment simulation
│   └── Chat.js             # Real-time messaging component
├── App.js                  # Main app component with routing
├── index.js               # App entry point
└── index.css              # Tailwind CSS imports

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App

## Demo Data

The application uses mock data for demonstration purposes. All data is stored in component state and will reset on page refresh.# Build trigger
