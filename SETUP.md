# 🚀 Setup Guide - AI-Powered Movie Recommendation Platform

This guide will help you set up and run the AI-Powered Movie Recommendation Platform from scratch.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 20+ LTS (Download from [nodejs.org](https://nodejs.org/))
- **npm** 10+ (comes with Node.js)
- **PostgreSQL** 15+ (Download from [postgresql.org](https://www.postgresql.org/download/))
- **Git** (Download from [git-scm.com](https://git-scm.com/downloads))

## 🔑 Required API Keys

1. **TMDB API Key** - Get it free from [TMDB Settings](https://www.themoviedb.org/settings/api)
2. **Gemini API Key** - Get it from [Google AI Studio](https://ai.google.dev/)

## 📁 Project Structure

```
movie-recommendation-app/
├── backend/                  # Express API server
│   ├── src/
│   │   ├── config/          # Configuration files
│   │   ├── controllers/     # Request handlers
│   │   ├── services/        # Business logic
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Express middleware
│   │   └── types/           # TypeScript types
│   ├── prisma/              # Database schema
│   └── package.json
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # UI components
│   │   ├── pages/           # Page components
│   │   ├── context/         # React context
│   │   ├── services/        # API services
│   │   └── types/           # TypeScript types
│   └── package.json
└── README.md
```

## 🗄️ Step 1: Database Setup

### Create PostgreSQL Database

1. Open PostgreSQL (using pgAdmin or psql)
2. Create a new database:
```sql
CREATE DATABASE movie_recommendation_db;
```

3. Create a user (optional, if you don't want to use postgres user):
```sql
CREATE USER movie_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE movie_recommendation_db TO movie_user;
```

### Alternative: Use Docker for PostgreSQL

```bash
docker run --name movie-db \
  -e POSTGRES_DB=movie_recommendation_db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 \
  -d postgres:15
```

## 🔧 Step 2: Backend Setup

### 2.1 Install Dependencies

```bash
cd backend
npm install
```

### 2.2 Configure Environment Variables

Create a `.env` file in the `backend` directory:

```bash
# Backend Environment Variables
NODE_ENV=development
PORT=5000

# Database Connection
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/movie_recommendation_db"

# Replace with your actual API keys
GEMINI_API_KEY=your_gemini_api_key_here
TMDB_API_KEY=your_tmdb_api_key_here

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRES_IN=7d

# CORS
FRONTEND_URL=http://localhost:5173

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# API Endpoints
TMDB_BASE_URL=https://api.themoviedb.org/3
TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p

# Gemini Model
GEMINI_MODEL=gemini-pro
```

**Important**: Replace `your_gemini_api_key_here` and `your_tmdb_api_key_here` with your actual API keys.

### 2.3 Generate Prisma Client

```bash
npm run prisma:generate
```

### 2.4 Run Database Migrations

```bash
npm run prisma:migrate
```

This will create the following tables in your database:
- `User` - User information
- `Favorite` - User's favorite movies
- `History` - Search history

### 2.5 Start the Backend Server

```bash
npm run dev
```

The backend will start on `http://localhost:5000`

**Verify it's working:**
- Visit `http://localhost:5000/api/health` - You should see a JSON response with status "ok"

## 🎨 Step 3: Frontend Setup

### 3.1 Install Dependencies

Open a new terminal (keep the backend running):

```bash
cd frontend
npm install
```

### 3.2 Configure Environment Variables

Create a `.env` file in the `frontend` directory:

```bash
# Frontend Environment Variables
VITE_API_URL=http://localhost:5000
```

### 3.3 Start the Frontend Development Server

```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

**Verify it's working:**
- Visit `http://localhost:5173` - You should see the MovieAI homepage

## ✅ Step 4: Testing the Application

### Test Mood-Based Recommendations

1. On the homepage, enter a mood like:
   - "I'm feeling happy and want to watch something fun"
   - "I'm sad after a breakup"
   - "I need action and excitement"

2. Click "Find Movies" or press Enter

3. Wait for the AI to analyze your mood and generate movie recommendations

### Test Favorites Feature

1. Click on any movie card to view details
2. Click the heart icon or "Add to Favorites" button
3. Navigate to the "Favorites" page to see saved movies

### Test Search History

1. Make several mood-based searches
2. Navigate to the "History" page
3. You'll see all your search history with timestamps
4. Click "Search Again" on any history item to repeat the search

## 🐛 Troubleshooting

### Backend Won't Start

**Error: Database connection failed**
- Check PostgreSQL is running: `pg_isready` or check Docker container
- Verify DATABASE_URL in `.env` matches your PostgreSQL credentials
- Ensure database `movie_recommendation_db` exists

**Error: API key not found**
- Verify GEMINI_API_KEY and TMDB_API_KEY in `.env`
- Ensure API keys are valid and active

### Frontend Won't Start

**Error: Module not found**
- Run `npm install` in the frontend directory
- Check that Node.js version is 20+

**Error: API request failed**
- Ensure backend is running on `http://localhost:5000`
- Check VITE_API_URL in `.env`
- Check browser console for specific error messages

### Prisma Issues

**Error: P3003 / P3008**
- Run `npm run prisma:migrate` to update schema
- Or reset database: `npx prisma db push --force-reset`

**Migration conflicts**
```bash
npx prisma migrate resolve --applied "migration_name"
```

## 🔒 Security Notes

### Before Production:

1. **Change JWT Secret**: Generate a secure random string for JWT_SECRET
2. **Use Environment Variables**: Never commit `.env` files
3. **Enable CORS Properly**: Only allow your production domain
4. **Rate Limiting**: Adjust RATE_LIMIT_MAX_REQUESTS based on traffic
5. **Database Security**: Use strong passwords, restrict network access
6. **HTTPS**: Use HTTPS/SSL in production
7. **API Headers**: Add security headers using Helmet middleware (already included)

## 🚀 Production Deployment

### Backend Deployment Options:

1. **Render.com** - Free tier available
2. **Railway.app** - Easy deployment
3. **Heroku** - Requires paid plan for PostgreSQL
4. **AWS EC2** - Full control, requires configuration
5. **Vercel/Netlify** - With serverless functions

### Frontend Deployment:

1. **Vercel** - Best for React/Vite
2. **Netlify** - Easy deployment
3. **Render.com** - Free tier
4. **GitHub Pages** - Static site hosting

### Production Build Commands:

```bash
# Frontend
cd frontend
npm run build

# Backend
cd backend
npm run build
npm start
```

## 📊 Project Status Checklist

- [x] Project structure created
- [x] Backend API implemented
- [x] Frontend UI implemented
- [x] Database schema designed
- [x] Git workflow setup
- [x] Environment variables configured
- [x] API integration (Gemini + TMDB)
- [ ] User authentication (optional)
- [ ] Unit tests (optional)
- [ ] CI/CD pipeline (optional)
- [ ] Production deployment (optional)

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [Express Documentation](https://expressjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Gemini API](https://ai.google.dev/docs)
- [TMDB API](https://developers.themoviedb.org/3)

## 💡 Development Tips

1. **Hot Reloading**: Both frontend and backend support hot reload during development
2. **Database Browser**: Use `npm run prisma:studio` to view/edit database
3. **API Documentation**: Backend has built-in routes at `/api`
4. **Logging**: Check console for detailed logs and error messages

## 🤝 Contributing

When contributing, follow the Git workflow:

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make changes and commit: `git commit -m "feat: description"`
3. Push to branch: `git push origin feature/your-feature`
4. Create pull request to `develop` branch

---

**Need Help?** Check the issues section or create a new issue with your question!
