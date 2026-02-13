# ⚡ Quick Start Guide

Get the AI-Powered Movie Recommendation Platform running in minutes!

## 🚀 5-Minute Setup

### Prerequisites
- Node.js 20+ installed
- PostgreSQL 15+ installed
- TMDB API Key ([Get here](https://www.themoviedb.org/settings/api))
- Gemini API Key ([Get here](https://ai.google.dev/))

---

## 📝 Step 1: Database Setup

```bash
# Using Docker (easiest)
docker run --name movie-db -e POSTGRES_DB=movie_recommendation_db -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres:15

# Or using PostgreSQL directly (psql)
psql -U postgres
CREATE DATABASE movie_recommendation_db;
```

---

## 🔧 Step 2: Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
NODE_ENV=development
PORT=5000
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/movie_recommendation_db"
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
TMDB_API_KEY=YOUR_TMDB_API_KEY
JWT_SECRET=your_secret_key_change_in_production
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
TMDB_BASE_URL=https://api.themoviedb.org/3
TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
GEMINI_MODEL=gemini-pro
EOF

# Replace YOUR_GEMINI_API_KEY and YOUR_TMDB_API_KEY with actual keys

# Setup database
npm run prisma:generate
npm run prisma:migrate

# Start backend (keep this terminal open)
npm run dev
```

Backend should start at `http://localhost:5000`

---

## 🎨 Step 3: Frontend Setup

Open a **new terminal**:

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
VITE_API_URL=http://localhost:5000
EOF

# Start frontend (keep this terminal open)
npm run dev
```

Frontend should start at `http://localhost:5173`

---

## ✅ Step 4: Verify Setup

1. Open `http://localhost:5173` in your browser
2. Enter a mood like "I'm feeling happy"
3. Click "Find Movies"
4. You should see AI-generated movie recommendations!

---

## 🎯 Quick Commands Reference

### Backend

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run linter
npm run prisma:studio    # Open database GUI
npm run prisma:migrate   # Run database migrations
```

### Frontend

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run preview          # Preview production build
npm run lint             # Run linter
npm run format           # Format code
```

---

## 🐛 Common Issues

### Backend won't start?
- Check PostgreSQL is running: `pg_isready`
- Verify DATABASE_URL in `.env`
- Ensure API keys are correct

### Frontend can't connect?
- Backend must be running on port 5000
- Check `VITE_API_URL` in `.env`
- Open browser console for errors

### Database errors?
```bash
# Reset database
cd backend
npx prisma db push --force-reset
```

---

## 📚 Next Steps

- Read [SETUP.md](./SETUP.md) for detailed setup
- Check [DEVELOPMENT.md](./DEVELOPMENT.md) for customization
- Review [README.md](./README.md) for architecture

---

## 🤝 Git Workflow

```bash
# Create feature branch
git checkout -b feature/your-feature
git checkout develop -b feature/your-feature

# Make changes and commit
git add .
git commit -m "feat: add your feature"

# Push to GitHub
git push origin feature/your-feature
```

---

**Done!** 🎉 You're ready to build amazing movie recommendations!

Need help? Check [SETUP.md](./SETUP.md) for detailed instructions.
