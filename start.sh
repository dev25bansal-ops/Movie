#!/bin/bash

echo "🚀 Starting AI-Powered Movie Recommendation Platform"
echo "================================================="
echo ""

# Check PostgreSQL (Optional)
echo "📦 Step 1: Checking PostgreSQL (Optional)..."
echo "Database is optional - app works without it for movie recommendations"
echo ""

if ! pg_isready > /dev/null 2>&1; then
    echo "⚠️  PostgreSQL is not running - favorites/history will be disabled"
    echo ""
    echo "To enable favorites/history, start PostgreSQL:"
    echo ""
    echo "Docker: docker run --name movie-db -e POSTGRES_DB=movie_recommendation_db -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres:15"
    echo ""
    echo "Continuing without database..."
fi

echo ""
echo "Step 2: Checking API Keys..."
if grep -q "your_gemini_api_key_here" backend/.env || grep -q "your_tmdb_api_key_here" backend/.env; then
    echo "⚠️  API keys not configured in backend/.env"
    echo ""
    echo "Please add your API keys to backend/.env:"
    echo ""
    echo "Required keys:"
    echo "  - GEMINI_API_KEY: Get from https://ai.google.dev/"
    echo "  - TMDB_API_KEY: Get from https://www.themoviedb.org/settings/api"
    echo ""
    echo "Press Enter when done..."
    read
fi

echo "✅ API keys configured!"
echo ""

# Start Backend
echo "🖥️  Step 3: Starting Backend server..."
echo "Backend will start on http://localhost:5000"
cd backend
npm run dev &
BACKEND_PID=$!
echo "Backend PID: $BACKEND_PID"

cd ..

# Wait for backend to start
echo "Waiting for backend to start..."
sleep 5

# Start Frontend
echo ""
echo "🎨 Step 4: Starting Frontend server..."
echo "Frontend will start on http://localhost:5173"
cd frontend
npm run dev &
FRONTEND_PID=$!
echo "Frontend PID: $FRONTEND_PID"

echo ""
echo "================================================="
echo "✨ Application Started Successfully!"
echo "================================================="
echo ""
echo "📍 Access the application:"
echo "   Frontend: http://localhost:5173"
echo "   Backend:  http://localhost:5000"
echo "   API Docs: http://localhost:5000/api/health"
echo ""
echo "🛑 To stop the application:"
echo "   Press Ctrl+C or run: kill $BACKEND_PID $FRONTEND_PID"
echo ""

# Keep script running
wait
