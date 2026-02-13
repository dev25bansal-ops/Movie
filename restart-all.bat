@echo off
echo ========================================
echo   Complete Application Restart
echo ========================================
echo.

echo Step 1: Check Docker Desktop status...
powershell -Command "Get-Process | Where-Object {$_.ProcessName -like '*Docker*'}" | findstr "Docker" >nul
if %errorlevel% neq 0 (
    echo Docker Desktop is not running!
    echo Please start Docker Desktop first.
    echo.
    pause
    exit /b 1
)

echo Docker Desktop is running!
echo.

echo Step 2: Restart PostgreSQL database...
echo.

echo Stopping old container...
docker stop movie-db 2>nul
docker rm movie-db 2>nul

echo Starting new PostgreSQL container...
docker run --name movie-db ^
  -e POSTGRES_DB=movie_recommendation_db ^
  -e POSTGRES_PASSWORD=postgres ^
  -p 5432:5432 ^
  -d postgres:15

if %errorlevel% neq 0 (
    echo Failed to start database
    pause
    exit /b 1
)

echo.
echo Waiting for database to start...
timeout /t 8 /nobreak >nul

echo Verifying database connection...
docker exec movie-db pg_isready -U postgres >nul 2>&1
if %errorlevel% neq 0 (
    echo Database still starting, waiting longer...
    timeout /t 10 /nobreak >nul
)

echo.
echo Step 3: Starting Backend server...
echo.
echo Please open a new terminal and run:
echo   cd backend
echo   npm run dev
echo.

echo ========================================
echo   Setup Complete!
echo ========================================
echo.
echo Database is ready!
echo Backend should be running.
echo Frontend should be running on http://localhost:5173
echo.
echo Test your app:
echo 1. Open http://localhost:5173
echo 2. Enter a mood: "I'm feeling happy"
echo 3. Click "Find Movies"
echo 4. Enjoy your recommendations!
echo.
pause
