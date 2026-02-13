# 🛠️ Manual Database Restart Guide

Since Docker commands aren't working through the terminal, you'll need to restart the database manually.

## ⚡ Quick Fix - Do These Steps Now!

### Step 1: Restart Docker Desktop Completely

1. **Close Docker Desktop** (click the whale icon → Quit Docker Desktop)
2. **Wait 10 seconds**
3. **Re-open Docker Desktop** from Windows menu
4. **Wait** until it shows "Docker Desktop is running" (30-60 seconds)

### Step 2: Open Docker Desktop Terminal

1. **Right-click the Docker whale icon** in your system tray (bottom-right)
2. **Select "Open in Terminal"** OR click the "Containers" icon in Docker Desktop

### Step 3: Run This Command in Docker Desktop Terminal

```bash
docker run --name movie-db -e POSTGRES_DB=movie_recommendation_db -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres:15
```

**Or if the container already exists:**
```bash
docker restart movie-db
```

### Step 4: Start Your Backend

Open PowerShell and run:
```powershell
cd backend
npm run dev
```

You should see:
```
Server running on port 5000
Environment: development
API Health Check: http://localhost:5000/api/health
Database connected successfully  ← This should appear!
```

### Step 5: Open Your Application

Open: **http://localhost:5173**

---

## 🔍 Alternative: Check What's Running

**In Docker Desktop:**
1. Click the "Containers" tab
2. Look for "movie-db"
3. If you see it, click the arrow to expand
4. Click "Restart" button (▶ icon)

## 🎯 Verify It's Working

**Test the database connection:**

Open PowerShell and run:
```powershell
curl http://localhost:5432
```

You should see database connection info.

## 🆘 Still Having Issues?

**Option 1: Use the Restart Script**
```powershell
.\restart-database.bat
```

**Option 2: Manual Docker Commands**
Open Docker Desktop terminal and run:
```bash
# Stop and remove old container
docker stop movie-db
docker rm movie-db

# Start new one
docker run --name movie-db -e POSTGRES_DB=movie_recommendation_db -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres:15
```

**Option 3: Check Docker Desktop**
- Make sure Docker Desktop says "Docker Desktop is running"
- Look in the "Containers" tab
- Check no errors in the "Logs" tab

---

## 📊 Once Database is Running

Your app will be fully functional:

✅ http://localhost:5173 - Frontend (working now!)
✅ http://localhost:5000 - Backend (waiting for DB)
✅ port 5432 - PostgreSQL (start this!)

---

## 🎬 Test Your App After Restart

1. Enter mood: "I'm feeling happy"
2. Click "Find Movies"
3. Watch AI work its magic! ✨

---

**Follow the steps above and let me know if it works!** 🚀
