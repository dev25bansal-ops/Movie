@echo off
echo Starting AI-Powered Movie Recommendation Platform
echo ==================================================
echo.

echo Step 1: Checking PostgreSQL (Optional)...
echo Database is optional - app works without it for movie recommendations
echo.

where psql >nul 2>&1
if %errorlevel% neq 0 (
    echo PostgreSQL not found - favorites/history will be disabled
    echo.
    echo To enable favorites/history, start PostgreSQL:
    echo.
    echo Docker: docker run --name movie-db -e POSTGRES_DB=movie_recommendation_db -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres:15
    echo.
    echo Continuing without database...
)

echo.
echo Step 2: Checking API Keys...
findstr /C:"your_gemini_api_key_here" backend\.env >nul 2>&1
if %errorlevel% equ 0 (
    echo WARNING: API keys not configured in backend\.env
    echo.
    echo Please add your API keys to backend\.env:
    echo.
    echo Required keys:
    echo   - GEMINI_API_KEY: Get from https:^^/^^/ai.google.dev^/
    echo   - TMDB_API_KEY: Get from https:^^/^^/www.themoviedb.org/settings/api
    echo.
    pause
)

echo API keys configured!
echo.

echo Step 3: Starting servidor...
echo.
echo Frontend: http://localhost:5173
echo Backend:  http://localhost:5000
echo.
echo ==================================================
echo Application Ready!
echo ==================================================
echo.
echo Press Ctrl+C to stop both servers
echo.

start "Movie Recommendation Backend" cmd /k "cd backend && npm run dev"
cd frontend
start "Movie Recommendation Frontend" cmd /k "npm run dev"

echo Servers starting in new windows...
echo.
pause
