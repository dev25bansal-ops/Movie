@echo off
echo ========================================
echo   Restarting PostgreSQL Database
echo ========================================
echo.

echo Checking Docker status...
powershell -Command "docker ps" >nul 2>&1
if %errorlevel% neq 0 (
    echo Docker CLI is not responding. Please:
    echo 1. Close Docker Desktop completely
    echo 2. Re-open Docker Desktop
    echo 3. Wait until it says "Docker Desktop is running"
    echo 4. Run this script again
    echo.
    pause
    exit /b 1
)

echo Docker is running!
echo.

echo Checking if movie-db container exists...
docker ps -a | findstr movie-db >nul
if %errorlevel% equ 0 (
    echo Container exists, removing it...
    docker stop movie-db 2>nul
    docker rm movie-db 2>nul
    echo.
)

echo Starting new PostgreSQL container...
docker run --name movie-db ^
  -e POSTGRES_DB=movie_recommendation_db ^
  -e POSTGRES_PASSWORD=postgres ^
  -p 5432:5432 ^
  -d postgres:15

if %errorlevel% neq 0 (
    echo Failed to start PostgreSQL container
    pause
    exit /b 1
)

echo.
echo Waiting for PostgreSQL to start...
timeout /t 5 /nobreak >nul

echo Verifying database connection...
docker exec movie-db pg_isready -U postgres >nul 2>&1
if %errorlevel% neq 0 (
    echo Database not ready yet, waiting longer...
    timeout /t 10 /nobreak >nul
)

echo.
echo ========================================
echo   PostgreSQL Database Started Successfully!
echo ========================================
echo.
echo Container: movie-db
echo Port: 5432
echo Database: movie_recommendation_db
echo.
echo You can now start the backend with:
echo   cd backend
echo   npm run dev
echo.
pause
