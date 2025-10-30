# PropManager - Property Management System (Frontend)

A comprehensive React-based property management application for landlords and tenants, built as a capstone project demonstrating full-stack development skills.

## 🏗️ Project Overview

PropManager is a modern property management platform that streamlines the relationship between landlords and tenants. The application provides role-based dashboards, secure authentication, payment processing through M-Pesa integration, and real-time communication features.

### 🎯 Learning Goals Demonstrated

This project showcases proficiency in:
- **React 18** with modern hooks and patterns
- **React Router v6** for client-side routing
- **React Hook Form** for form management and validation
- **Tailwind CSS** for responsive, utility-first styling
- **Context API** for global state management
- **JWT Authentication** with role-based access control
- **RESTful API** integration patterns
- **Component composition** and reusability
- **Error handling** and user experience best practices

## ✨ Features

### 🏠 Landing Page
- **Role Selection**: Choose between Landlord and Tenant accounts
- **Feature Showcase**: Highlights M-Pesa Integration, Property Management, and Real-time Chat
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI**: Clean, professional interface with smooth animations

### 🔐 Authentication System
- **JWT-based Authentication**: Secure token-based authentication
- **Role-Based Access Control (RBAC)**: Separate interfaces for landlords and tenants
- **Form Validation**: Comprehensive validation with user-friendly error messages
- **Password Security**: Strong password requirements and confirmation matching
- **Persistent Sessions**: Automatic login restoration using localStorage

### 👨‍💼 Landlord Dashboard
- **Property Portfolio Overview**: Visual statistics and key metrics
- **Property Management**: Add, edit, and manage multiple properties
- **Tenant Management**: Track tenant information and lease details
- **Payment Tracking**: Monitor rent payments and pending amounts
- **Revenue Analytics**: Monthly revenue tracking and reporting
- **Quick Actions**: Easy access to common tasks

### 🏠 Tenant Portal
- **Rent Status Dashboard**: Clear view of payment due dates and amounts
- **M-Pesa Payment Integration**: Seamless rent payments via STK Push
- **Payment History**: Complete transaction history with receipts
- **Maintenance Requests**: Submit and track property maintenance issues
- **Landlord Communication**: Direct messaging with property owners

### 💬 Real-time Features
- **Instant Messaging**: Direct communication between landlords and tenants
- **Notifications**: Real-time updates for payments, messages, and requests
- **Status Updates**: Live updates on payment and maintenance request status

## 🛠️ Tech Stack

### Frontend Technologies
- **React 18**: Modern React with hooks and concurrent features
- **React Router v6**: Declarative routing for single-page applications
- **React Hook Form**: Performant forms with easy validation
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Lucide React**: Beautiful, customizable SVG icons
- **Vite**: Fast build tool and development server

### Development Tools
- **ESLint**: Code linting for consistent code quality
- **Prettier**: Code formatting for consistent style
- **Git**: Version control with conventional commit messages

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Git for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/landlord-app-frontend.git
   cd landlord-app-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   VITE_API_BASE_URL=http://localhost:5000
   VITE_APP_NAME=PropManager
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Dashboard.jsx    # Main dashboard with role-based rendering
│   ├── LandingPage.jsx  # Home page with feature showcase
│   ├── Login.jsx        # User authentication form
│   ├── Register.jsx     # User registration with role selection
│   └── ProtectedRoute.jsx # Route protection and RBAC
├── contexts/            # React Context providers
│   └── AuthContext.jsx  # Authentication state management
├── App.jsx             # Main application component with routing
├── main.jsx            # Application entry point
└── index.css           # Global styles and Tailwind imports
```

### Component Architecture

- **App.jsx**: Root component managing routing and global providers
- **AuthContext.jsx**: Centralized authentication state and methods
- **ProtectedRoute.jsx**: Higher-order component for route protection
- **Dashboard.jsx**: Role-based dashboard rendering
- **LandingPage.jsx**: Marketing page with feature highlights
- **Login/Register.jsx**: Authentication forms with validation

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality
- `npm run lint:fix` - Fix ESLint issues automatically

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#2563eb) - Trust, professionalism
- **Success**: Green (#16a34a) - Payments, positive actions
- **Warning**: Yellow (#eab308) - Pending items, caution
- **Error**: Red (#dc2626) - Errors, urgent items
- **Gray Scale**: Various shades for text and backgrounds

### Typography
- **Headings**: Inter font family, bold weights
- **Body Text**: Inter font family, regular weight
- **UI Elements**: Medium weight for buttons and labels

### Responsive Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🔐 Authentication Flow

### Registration Process
1. User selects role (Landlord/Tenant)
2. Fills registration form with validation
3. Account created with JWT token
4. Automatic login and redirect to dashboard

### Login Process
1. User enters email and password
2. Credentials validated against backend
3. JWT token stored in localStorage
4. User redirected to role-appropriate dashboard

### Role-Based Access
- **Landlords**: Access to property management, tenant oversight, revenue tracking
- **Tenants**: Access to payment portal, maintenance requests, communication

## 🧪 Demo Credentials

For testing purposes, use these credentials:

**Landlord Account:**
- Email: `landlord@test.com`
- Password: `password123`

**Tenant Account:**
- Email: `tenant@test.com`
- Password: `password123`

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Configure environment variables in Netlify dashboard

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts to deploy

## 🔗 API Integration

This frontend is designed to work with the PropManager Flask backend API. Key integration points:

- **Authentication**: `/api/auth/login`, `/api/auth/register`
- **Properties**: `/api/properties` (CRUD operations)
- **Payments**: `/api/payments` (M-Pesa integration)
- **Messages**: `/api/messages` (Real-time chat)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Commit Convention
We use Conventional Commits for clear commit messages:
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation updates
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test additions or updates

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Allan Maina**
- GitHub: [@allan6757](https://github.com/allan6757)
- Email: allanmaina@example.com

## 🙏 Acknowledgments

- **Moringa School** for the comprehensive full-stack development curriculum
- **React Team** for the excellent documentation and tools
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide** for the beautiful icon library

## 📚 Learning Resources

This project demonstrates concepts learned from:
- React Official Documentation
- React Router Documentation
- Tailwind CSS Documentation
- MDN Web Docs for JavaScript fundamentals
- Moringa School Full-Stack Development Curriculum

---

**Built with ❤️ for Moringa School Capstone Project**