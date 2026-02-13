# AI-Powered Movie Recommendation Platform

Professional full-stack web application providing mood-based movie recommendations using Gemini AI and TMDB API.

**GitHub Repository**: https://github.com/dev25bansalops/Movie

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (React + TS)                   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  Pages   │  │Components│  │  Hooks   │  │ Context  │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└──────────────────────────┬──────────────────────────────────┘
                           │ REST APIs
                           ▼
┌─────────────────────────────────────────────────────────────┐
│               Backend (Node.js + Express + TS)              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │ Controllers  │  │  Services    │  │  Middleware  │    │
│  └──────────────┘  └──────────────┘  └──────────────┘    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │    Routes    │  │    Models    │  │ Utilities    │    │
│  └──────────────┘  └──────────────┘  └──────────────┘    │
└──────────────────────────┬──────────────────────────────────┘
                           │
        ┌──────────────────┼──────────────────┐
        ▼                  ▼                  ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ PostgreSQL   │  │ Gemini API   │  │  TMDB API    │
│ (with Prisma)│  │ (AI Service) │  │ (Movie Data) │
└──────────────┘  └──────────────┘  └──────────────┘
```

## 🚀 Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript 5
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS 3
- **HTTP Client**: Axios
- **State Management**: React Context API
- **Form Handling**: React Hook Form
- **UI Components**: Custom components

### Backend
- **Runtime**: Node.js 20 LTS
- **Framework**: Express 4 with TypeScript
- **Database**: PostgreSQL 15
- **ORM**: Prisma 5
- **Validation**: Zod 3
- **Logging**: Winston 3
- **Environment**: dotenv

### APIs
- **AI Service**: Google Gemini API (mood → genre conversion)
- **Movie Data**: TMDB API (movie recommendations)

## 📋 Features

### Core Functionality
- [x] Mood-based movie recommendations
- [x] AI-powered mood to genre conversion
- [x] Real-time movie search
- [x] Save favorites to database
- [x] View search history
- [x] Manage saved movies
- [x] Responsive UI design

### Security
- [x] Environment variable management
- [x] API key security
- [x] Input validation
- [x] SQL injection prevention (Prisma)
- [x] CORS configuration

## 🗂️ Project Structure

```
movie-recommendation-app/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page-level components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── context/         # Context providers
│   │   ├── services/        # API services
│   │   ├── types/           # TypeScript types
│   │   ├── utils/           # Utility functions
│   │   └── App.tsx
│   ├── public/
│   ├── tailwind.config.js
│   └── package.json
│
├── backend/                  # Express API server
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── services/        # Business logic
│   │   ├── models/          # Prisma models
│   │   ├── routes/          # API route definitions
│   │   ├── middleware/      # Express middleware
│   │   ├── config/          # Configuration files
│   │   ├── types/           # TypeScript types
│   │   └── utils/           # Utility functions
│   ├── prisma/              # Database schema
│   └── package.json
│
├── .env.example             # Environment variables template
├── .gitignore              # Git ignore rules
└── README.md               # This file
```

## 🔧 Prerequisites

- Node.js 20+ and npm
- PostgreSQL 15+
- TMDB API Key ([Get here](https://www.themoviedb.org/settings/api))
- Gemini API Key ([Get here](https://ai.google.dev/))

## 📦 Installation

### 1. Clone Repository
```bash
git clone <repository-url>
cd movie-recommendation-app
```

### 2. Install Dependencies
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 3. Environment Setup
Create `.env` files in both `backend/` and `frontend/` directories:

**Backend (`backend/.env`)**:
```env
NODE_ENV=development
PORT=5000

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/movie_db"

# API Keys
GEMINI_API_KEY=your_gemini_api_key
TMDB_API_KEY=your_tmdb_api_key

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

**Frontend (`frontend/.env`)**:
```env
VITE_API_URL=http://localhost:5000
```

### 4. Database Setup
```bash
cd backend
npx prisma generate
npx prisma migrate dev --name init
```

### 5. Start Development Servers

**Backend** (Terminal 1):
```bash
cd backend
npm run dev
```

**Frontend** (Terminal 2):
```bash
cd frontend
npm run dev
```

### 6. Access Application
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- API Docs: http://localhost:5000/api-docs

## 🔄 Git Workflow

### Branch Strategy
- `main`: Production-ready code
- `develop`: Active development
- `feature/*`: Feature branches
- `bugfix/*`: Bug fixes
- `hotfix/*`: Production hotfixes

### Commit Convention
```
<type>: <subject>

<scope>: detailed description

# Types: feat, fix, docs, style, refactor, test, chore
```

### Example Git Commits
```bash
git checkout -b feature/mood-to-genre-conversion
git add .
git commit -m "feat: add mood to genre conversion using Gemini API

backend: implement mood service with Gemini integration
frontend: create mood input component with validation"
git push origin feature/mood-to-genre-conversion
```

## 📡 API Endpoints

### Authentication & Users
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Movies
- `GET /api/movies/recommend` - Get mood-based recommendations
- `GET /api/movies/search` - Search movies
- `GET /api/movies/:id` - Get movie details

### Favorites & History
- `POST /api/favorites` - Add to favorites
- `GET /api/favorites` - Get user favorites
- `DELETE /api/favorites/:id` - Remove from favorites
- `GET /api/history` - Get search history
- `DELETE /api/history` - Clear history

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 📊 Database Schema

```prisma
model User {
  id        String     @id @default(uuid())
  email     String     @unique
  name      String?
  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt
  favorites Favorite[]
  history   History[]
}

model Favorite {
  id        String   @id @default(uuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  movieId   Int
  title     String
  posterPath String?
  addedAt   DateTime @default(now())

  @@index([userId])
}

model History {
  id        String   @id @default(uuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  mood      String
  genres    String[]
  searchedAt DateTime @default(now())

  @@index([userId])
}
```

## 🔐 Security Best Practices

1. **API**: Store keys in `.env`, never in code
2. **Database**: Use parameterized queries (Prisma ORM)
3. **CORS**: Whitelist frontend URL
4. **Input**: Validate all user inputs
5. **Passwords**: Hash with bcrypt
6. **Headers**: Use proper security headers

## 🚢 Deployment

### Production Build
```bash
# Frontend
cd frontend
npm run build

# Backend
cd backend
npm run build
```

### Docker Deployment (Optional)
```bash
docker-compose up -d
```

## 👥 Team

Senior Full-Stack Developer with experience in:
- Professional-grade architecture
- Clean code principles
- Production deployments
- Team collaboration

---

**Built with ❤️ for learning and community growth**
