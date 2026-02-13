# 🚀 Quick Start Instructions

## Prerequisites Checklist

Before starting, ensure you have:

- [ ] **Node.js 20+** installed (you have v24.12.0 ✅)
- [ ] **npm 10+** installed (you have 11.6.2 ✅)
- [ ] **PostgreSQL 15+** OR **Docker** installed
- [ ] **Gemini API Key** - Get from [ai.google.dev](https://ai.google.dev/)
- [ ] **TMDB API Key** - Get from [themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)

## Step-by-Step Setup

### 1️⃣ Get Your API Keys

**Gemini API Key** (Required for AI mood analysis):
1. Go to https://ai.google.dev/
2. Sign in with Google
3. Click "Get API Key"
4. Copy your API key

**TMDB API Key** (Required for movie data):
1. Go to https://www.themoviedb.org/settings/api
2. Sign in or create free account
3. Click "Create" under API Key
4. Copy your API key

### 2️⃣ Configure Environment Variables

Edit `backend/.env` file and replace:
```
GEMINI_API_KEY=your_gemini_api_key_here
TMDB_API_KEY=your_tmdb_api_key_here
```

With your actual API keys:
```
GEMINI_API_KEY=AIzaSyD...your_actual_key
TMDB_API_KEY=abcdef123...your_actual_key
```

### 3️⃣ Start PostgreSQL Database

**Option A: Using Docker (Easiest)**
```bash
# Make sure Docker Desktop is running
docker run --name movie-db ^
  -e POSTGRES_DB=movie_recommendation_db ^
  -e POSTGRES_PASSWORD=postgres ^
  -p 5432:5432 ^
  -d postgres:15
```

**Option B: Using Local PostgreSQL**
```bash
# Create database
createdb movie_recommendation_db

# Or using psql
psql -U postgres -c "CREATE DATABASE movie_recommendation_db;"
```

### 4️⃣ Setup Database (Optional)

**Note**: Database is **optional** - movie recommendations work without it.  
**Database is only needed for**: Saving favorites and tracking search history.

**If you want database features:**

```bash
cd backend

# Generate Prisma Client
npm run prisma:generate

# Run database migrations (creates tables)
npm run prisma:migrate
```

### 5️⃣ Start the Application

**Option A: Using Start Script (Recommended)**

**Windows:**
```bash
start.bat
```

**Linux/Mac:**
```bash
chmod +x start.sh
./start.sh
```

**Option B: Manual Start**

Open **Terminal 1** (Backend):
```bash
cd backend
npm run dev
```

Open **Terminal 2** (Frontend):
```bash
cd frontend
npm run dev
```

### 6️⃣ Access the Application

Once both servers are running:

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/api/health

### 7️⃣ Test the Application

1. Open http://localhost:5173 in your browser
2. Enter a mood like: "I'm feeling happy and want to watch something fun"
3. Click "Find Movies"
4. Wait for AI to generate recommendations (10-15 seconds)

**Note**: If you see "Failed to generate recommendations" error, it may be a network connectivity issue with TMDB. Try:
- Different network connection
- Disabling VPN
- Or deploying to cloud (Render.com has free tier)

## Troubleshooting

### Backend won't start?

**Error: Database connection failed**
```bash
# Solution: Check PostgreSQL is running
docker ps | grep movie-db
# Or
pg_isready
```

**Error: API key not found**
```bash
# Solution: Verify .env file has valid keys
cat backend/.env | grep API_KEY
```

### Frontend won't start?

**Error: Cannot connect to backend**
- Backend must be running on port 5000
- Check `VITE_API_URL` in frontend/.env

### Database migration failed?

```bash
cd backend
# Reset database (WARNING: deletes all data)
npx prisma db push --force-reset

# Or run migrations again
npm run prisma:migrate
```

### Port already in use?

```bash
# Find process using port 5000
netstat -ano | findstr :5000
# Kill the process
taskkill /PID <PID> /F

# Same for port 5173
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

## File Structure Verification

Ensure these files exist:
- ✅ `backend/.env` - Backend configuration
- ✅ `frontend/.env` - Frontend configuration
- ✅ `backend/node_modules/` - Backend dependencies
- ✅ `frontend/node_modules/` - Frontend dependencies

## Need Help?

- Check logs in terminal windows
- Open browser console (F12) for frontend errors
- Review [QUICKSTART.md](./QUICKSTART.md) for quick reference
- Check [README.md](./README.md) for full documentation

---

**Ready to watch some movies?** 🎬✨

Run the start script and enjoy your AI-powered movie recommendations!
