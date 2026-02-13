@echo off
echo Starting AI-Powered Movie Recommendation Platform
echo ==================================================
echo.

echo Step 1: Checking PostgreSQL...
where psql >nul 2>&1
if %errorlevel% neq 0 (
    echo PostgreSQL CLI not found in PATH
    echo.
    echo Please start PostgreSQL using one of these methods:
    echo.
    echo Option 1: Docker (Recommended)
    echo --------------------------------
    echo 1. Open Docker Desktop
    echo 2. Run: docker run --name movie-db -e POSTGRES_DB=movie_recommendation_db -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres:15
    echo.
    echo Option 2: Local PostgreSQL
    echo --------------------------
    echo 1. Ensure PostgreSQL is installed and running
    echo 2. Create database: createdb movie_recommendation_db
    echo.
    pause
)

echo PostgreSQL configuration checked
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

echo API keys configuration checked
echo.

echo Step 3: Setting up database...
cd backend
call npm run prisma:generate
call npm run prisma:migrate
echo.

echo Database setup complete!
echo.

echo Step 4: Starting servers...
echo.
echo Backend will start on http://localhost:5000
echo Frontend will start on http://localhost:5173
echo.
echo ==================================================
echo Application Ready!
echo ==================================================
echo.
echo Access the application at:
echo   Frontend: http://localhost:5173
echo   Backend:  http://localhost:5000
echo   API Docs: http://localhost:5000/api/health
echo.
echo Press Ctrl+C to stop both servers
echo.

start "Movie Recommendation Backend" cmd /k "npm run dev"
cd frontend
start "Movie Recommendation Frontend" cmd /k "npm run dev"

echo Servers starting in new windows...
echo.
pause
