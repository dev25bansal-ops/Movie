# Setup Checklist

## Prerequisites
- [x] Node.js 20+ installed (v24.12.0)
- [x] npm 10+ installed (v11.6.2)
- [x] Project dependencies installed
- [x] Environment files created
- [x] Startup scripts created
- [ ] PostgreSQL database running
- [ ] Gemini API key added to backend/.env
- [ ] TMDB API key added to backend/.env
- [ ] Database migrations run (npx prisma migrate)
- [ ] Backend server started (http://localhost:5000)
- [ ] Frontend server started (http://localhost:5173)

## Before Starting

1. **Get API Keys**
   - Gemini: https://ai.google.dev/
   - TMDB: https://www.themoviedb.org/settings/api

2. **Start Database**
   ```bash
   # Using Docker
   docker run --name movie-db -e POSTGRES_DB=movie_recommendation_db -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres:15
   ```

3. **Configure backend/.env**
   ```
   GEMINI_API_KEY=your_actual_gemini_key
   TMDB_API_KEY=your_actual_tmdb_key
   ```

4. **Run Migrations**
   ```bash
   cd backend
   npm run prisma:generate
   npm run prisma:migrate
   ```

5. **Start Application**
   ```bash
   start.bat
   # Or manually start both servers
   ```

## After Starting

6. Open http://localhost:5173
7. Try a mood input like "I'm feeling happy"
8. Explore movies, favorites, and history!

## URLs
- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- API Health: http://localhost:5000/api/health
