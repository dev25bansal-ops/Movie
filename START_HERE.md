# 🚀 Quick Start After Docker Issues

## Current Status
✅ API Keys Configured (Gemini + TMDB)
✅ Frontend Running: http://localhost:5173
✅ Backend Ready (waiting for database)
❌ Database: Needs manual restart

## 🛠️ Fix Database in 3 Easy Ways

### Method 1: Use Docker Desktop GUI (Easiest)

1. **Open Docker Desktop**
2. **Click "Containers"** on the left
3. **Look for "movie-db"**
4. **Click the Restart button** (▶ arrow)
5. **Wait 30 seconds**

### Method 2: Use Docker Desktop Terminal

1. **Right-click Docker whale icon** in system tray
2. **Select "Open in Terminal"**
3. **Run this command:**
   ```bash
   docker restart movie-db
   ```

### Method 3: Create New Container

1. **Open Docker Desktop Terminal**
2. **Run:**
   ```bash
   docker run --name movie-db -e POSTGRES_DB=movie_recommendation_db -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres:15
   ```

---

## ✅ After Database Starts

### Start Backend (PowerShell):
```powershell
cd backend
npm run dev
```

**You should see:**
```
Server running on port 5000
Database connected successfully ✅
```

### Open App:
**http://localhost:5173**

---

## 🎬 Test It!

Enter: "I'm feeling happy"
Click: "Find Movies"
See AI magic! ✨

---

## 📚 Full Instructions

See `MANUAL_DB_RESTART.md` for detailed step-by-step guide.

## 🆘 Still Issues?

1. Make sure Docker Desktop says "Docker Desktop is running"
2. Check the "Containers" tab in Docker Desktop
3. Look for "movie-db" container
4. Click "Restart" or remove and re-create

---

**Ready to go! Restart the database and enjoy your app!** 🎉
