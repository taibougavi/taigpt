# TAIGPT Setup Guide

## Prerequisites Installation

### 1. Install Node.js

**Windows:**
1. Go to [https://nodejs.org/](https://nodejs.org/)
2. Download the LTS version (recommended)
3. Run the installer and follow the setup wizard
4. Verify installation by opening Command Prompt and running:
   ```bash
   node --version
   npm --version
   ```

**macOS:**
1. Install using Homebrew (recommended):
   ```bash
   brew install node
   ```
2. Or download from [https://nodejs.org/](https://nodejs.org/)

**Linux (Ubuntu/Debian):**
```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 2. Install Git (if not already installed)

**Windows:**
- Download from [https://git-scm.com/](https://git-scm.com/)

**macOS:**
```bash
brew install git
```

**Linux:**
```bash
sudo apt-get install git
```

## Project Setup

### 1. Clone or Download the Project

If you have Git:
```bash
git clone <repository-url>
cd taigpt
```

Or download the ZIP file and extract it.

### 2. Install Dependencies

**Backend Dependencies:**
```bash
npm install
```

**Frontend Dependencies:**
```bash
cd client
npm install
cd ..
```

### 3. Environment Configuration

1. Copy the example environment file:
   ```bash
   cp env.example .env
   ```

2. Edit the `.env` file with your settings:
   ```env
   PORT=5000
   NODE_ENV=development
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   CLIENT_URL=http://localhost:3000
   ```

### 4. Start the Application

**Option 1: Run Both Backend and Frontend (Recommended)**

In the root directory:
```bash
# Terminal 1 - Start backend
npm run dev

# Terminal 2 - Start frontend
cd client
npm start
```

**Option 2: Run Backend Only**
```bash
npm run dev
```

**Option 3: Run Frontend Only (for development)**
```bash
cd client
npm start
```

### 5. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/api/health

## Demo Account

Use these credentials to test the application:
- **Email**: `demo@taigpt.com`
- **Password**: `demo123`

## Troubleshooting

### Common Issues

1. **"npm is not recognized"**
   - Node.js is not installed or not in PATH
   - Restart your terminal after installing Node.js

2. **"Port 3000 is already in use"**
   - Kill the process using port 3000:
     ```bash
     # Windows
     netstat -ano | findstr :3000
     taskkill /PID <PID> /F
     
     # macOS/Linux
     lsof -ti:3000 | xargs kill -9
     ```

3. **"Port 5000 is already in use"**
   - Change the PORT in your `.env` file
   - Or kill the process using port 5000

4. **"Module not found" errors**
   - Delete `node_modules` folder and `package-lock.json`
   - Run `npm install` again

5. **CORS errors**
   - Ensure the `CLIENT_URL` in `.env` matches your frontend URL
   - Check that both backend and frontend are running

### Development Tips

1. **Use VS Code** for the best development experience
2. **Install recommended extensions**:
   - ESLint
   - Prettier
   - Auto Rename Tag
   - Bracket Pair Colorizer

3. **Enable auto-save** in your editor

4. **Use browser dev tools** to debug frontend issues

5. **Check the console** for error messages

## Production Deployment

### Backend (Heroku)
1. Create a Heroku account
2. Install Heroku CLI
3. Create a new app:
   ```bash
   heroku create your-app-name
   ```
4. Set environment variables in Heroku dashboard
5. Deploy:
   ```bash
   git push heroku main
   ```

### Frontend (Vercel/Netlify)
1. Build the app:
   ```bash
   cd client
   npm run build
   ```
2. Deploy the `build` folder to your preferred platform

## Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Search for similar issues on GitHub
3. Open an issue with detailed error information
4. Include your operating system and Node.js version

## Quick Start (Alternative)

If you want to see the application running immediately without Node.js:

1. Open `client/public/index.html` in your browser
2. This will show a static version of the landing page
3. For full functionality, you'll need to install Node.js and follow the setup above 