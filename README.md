# TAIGPT - AI Chat Assistant

A beautiful ChatGPT clone with Apple-inspired UI/UX and Stripe-style graphics, built with modern web technologies.

![TAIGPT Screenshot](https://via.placeholder.com/800x400/667eea/ffffff?text=TAIGPT+Demo)

## ✨ Features

- **🎨 Apple-Inspired Design**: Clean, modern interface with SF Pro fonts and glass morphism effects
- **🌈 Stripe-Style Graphics**: Beautiful gradient backgrounds and smooth animations
- **💬 Real-time Chat**: Instant messaging with AI responses
- **🔐 User Authentication**: Secure JWT-based authentication system
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **⚡ Fast Performance**: Optimized for smooth, seamless interactions
- **🎯 Conversation Management**: Create, edit, and delete conversations
- **📝 Markdown Support**: Rich text formatting with syntax highlighting
- **🔒 Secure**: Rate limiting, CORS protection, and input validation

## 🚀 Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Socket.IO** - Real-time communication
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing

### Frontend
- **React 18** - UI library
- **Framer Motion** - Animations
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **React Markdown** - Markdown rendering
- **React Hot Toast** - Notifications
- **Axios** - HTTP client

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd taigpt
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` file with your configuration:
   ```env
   PORT=5000
   NODE_ENV=development
   JWT_SECRET=your-super-secret-jwt-key
   CLIENT_URL=http://localhost:3000
   ```

4. **Start the server**
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Navigate to client directory**
   ```bash
   cd client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

## 🎯 Usage

### Demo Account
Use these credentials to test the application:
- **Email**: `demo@taigpt.com`
- **Password**: `demo123`

### Features Guide

1. **Authentication**
   - Register a new account or use the demo credentials
   - Secure JWT-based authentication
   - Automatic session management

2. **Chat Interface**
   - Start new conversations
   - Send messages and receive AI responses
   - Markdown support with syntax highlighting
   - Real-time typing indicators

3. **Conversation Management**
   - Create unlimited conversations
   - Rename conversations
   - Delete conversations
   - View conversation history

4. **User Experience**
   - Responsive design for all devices
   - Smooth animations and transitions
   - Keyboard shortcuts (Enter to send, Shift+Enter for new line)
   - Auto-scroll to latest messages

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Conversations
- `GET /api/chat/conversations` - Get user conversations
- `POST /api/chat/conversations` - Create new conversation
- `PUT /api/chat/conversations/:id` - Update conversation title
- `DELETE /api/chat/conversations/:id` - Delete conversation

### Messages
- `GET /api/chat/conversations/:id/messages` - Get conversation messages
- `POST /api/chat/conversations/:id/messages` - Send message

## 🎨 Design System

### Colors
- **Primary**: Blue gradient (`#667eea` to `#764ba2`)
- **Secondary**: Purple gradient (`#f093fb` to `#f5576c`)
- **Accent**: Blue (`#007AFF`)
- **Background**: Glass morphism with blur effects

### Typography
- **SF Pro Display**: Headings and titles
- **SF Pro Text**: Body text and UI elements
- **SF Mono**: Code blocks

### Components
- **Glass Cards**: Translucent backgrounds with blur
- **Gradient Buttons**: Apple-style button design
- **Message Bubbles**: Chat-style message containers
- **Animated Transitions**: Smooth page and component transitions

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs for password security
- **Rate Limiting**: Prevent abuse with request limits
- **CORS Protection**: Configured for secure cross-origin requests
- **Input Validation**: Server-side validation for all inputs
- **Helmet Security**: Additional security headers

## 🚀 Deployment

### Backend Deployment (Heroku)
1. Create a new Heroku app
2. Set environment variables in Heroku dashboard
3. Deploy using Git:
   ```bash
   heroku git:remote -a your-app-name
   git push heroku main
   ```

### Frontend Deployment (Vercel/Netlify)
1. Build the React app:
   ```bash
   cd client
   npm run build
   ```
2. Deploy the `build` folder to your preferred platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Apple** - Design inspiration and SF Pro fonts
- **Stripe** - Gradient and visual design inspiration
- **OpenAI** - ChatGPT concept and functionality inspiration
- **React Community** - Amazing tools and libraries

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact the development team.

---

**Made with ❤️ by the TAIGPT Team** #   t a i g p t  
 