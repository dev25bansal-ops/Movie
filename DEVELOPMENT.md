# 👨‍💻 Developer Guide - AI-Powered Movie Recommendation Platform

This guide is for developers who want to contribute or extend the project.

## 🏗️ Architecture Overview

### Backend Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Express API Server                        │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │   Routes     │  │ Controllers  │  │  Services    │    │
│  │              │──▶│              │──▶│              │    │
│  │  /api/*      │  │ (handlers)   │  │ (business)   │    │
│  └──────────────┘  └──────────────┘  └──────────────┘    │
│                                                     │      │
│                        ┌────────────────────────────┘      │
│                        ▼                                   │
│              ┌──────────────────┐                         │
│              │   Prisma ORM     │◀────────┐               │
│              └──────────────────┘         │               │
│                       │                 │               │
│                       ▼                 │               │
│              ┌──────────────────┐       │               │
│              │   PostgreSQL DB  │       │               │
│              └──────────────────┘       │               │
└───────────────────────────────────────┼───────────────┘
                                        │
                    ┌───────────────────┼───────────────────┐
                    ▼                   ▼                   ▼
            ┌──────────────┐   ┌──────────────┐   ┌──────────────┐
            │ Gemini API   │   │  TMDB API    │   │ Logger/Utils │
            └──────────────┘   └──────────────┘   └──────────────┘
```

### Frontend Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      React Application                       │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │     Pages    │  │ Components   │  │   Context    │    │
│  │              │  │              │  │              │    │
│  │  Home.tsx    │  │  MovieCard   │  │  AppProvider│    │
│  │  Favorites   │  │  MoodInput   │  │   (state)    │    │
│  │  History     │  │  Navbar      │  │              │    │
│  └──────────────┘  └──────────────┘  └──────────────┘    │
│                       │                                   │
│                       ▼                                   │
│              ┌──────────────────┐                         │
│              │   API Services   │◀────────┐               │
│              │                  │         │               │
│              │  axios instance  │         │               │
│              └──────────────────┘         │               │
│                       │                 │               │
│                       ▼                 │               │
│              ┌──────────────────┐       │               │
│              │  Backend API     │       │               │
│              │  /api/*          │       │               │
│              └──────────────────┘       │               │
└─────────────────────────────────────────┼───────────────┘
                                        │
                                ┌───────┴────────┐
                                ▼                ▼
                         ┌──────────┐    ┌──────────┐
                         │  Types   │    │  Utils   │
                         └──────────┘    └──────────┘
```

## 🎯 Key Features & Implementation

### 1. Mood-to-Genre Conversion (Gemini API)

**Location**: `backend/src/config/gemini.ts`

```typescript
export const analyzeMood = async (mood: string): Promise<string[]> => {
  const prompt = `Analyze this mood/situation and suggest 2-3 appropriate movie genres: "${mood}"`;
  
  const result = await geminiModel.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  
  // Parse genre array from response
  const genresMatch = text.match(/\[([^\]]+)\]/);
  return genresMatch ? JSON.parse(genresMatch[0]) : [];
};
```

### 2. Movie Recommendations (TMDB API)

**Location**: `backend/src/services/movie.service.ts`

```typescript
async getMoviesByGenreIds(genreIds: number[], page: number): Promise<MovieResponse[]> {
  const { data } = await tmdbClient.get('/discover/movie', {
    params: {
      with_genres: genreIds.join(','),
      page,
      sort_by: 'popularity.desc',
      'vote_average.gte': 6, // Only high-rated movies
    },
  });
  return data.results.map(this.mapToMovieResponse);
}
```

### 3. Database Operations (Prisma)

**Location**: `backend/src/services/favorite.service.ts`

```typescript
async addToFavorite(userId: string, favoriteData: FavoriteRequest) {
  const existing = await db.favorite.findUnique({
    where: { userId_movieId: { userId, movieId: favoriteData.movieId } },
  });
  
  if (existing) throw new Error('Movie already in favorites');
  
  return await db.favorite.create({ data: { ...favoriteData, userId } });
}
```

### 4. Frontend State Management

**Location**: `frontend/src/context/AppContext.tsx`

Uses React Context API for managing:
- User favorites
- Search history
- Loading states
- CRUD operations

## 🔧 Development Workflow

### Adding a New Feature

1. **Create a feature branch**:
```bash
git checkout develop
git checkout -b feature/your-feature-name
```

2. **Backend Changes** (if needed):
   - Add service layer logic in `backend/src/services/`
   - Add controller in `backend/src/controllers/`
   - Add route in `backend/src/routes/`
   - Update TypeScript types if needed

3. **Frontend Changes**:
   - Add new component in `frontend/src/components/`
   - Add new page in `frontend/src/pages/`
   - Update context/state if needed
   - Add API service calls in `frontend/src/services/api.ts`

4. **Test thoroughly**:
```bash
# Backend
cd backend
npm run dev

# Frontend (new terminal)
cd frontend
npm run dev
```

5. **Commit with proper convention**:
```bash
git add .
git commit -m "feat: add [feature name]

[Detailed description of changes]"
```

6. **Push and create PR**:
```bash
git push origin feature/your-feature-name
# Then create pull request on GitHub
```

### Commit ConventionFollow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>: <subject>

<body>

<footer>
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples**:
```
feat: add movie search functionality

frontend: create search bar component
backend: implement search endpoint with TMDB API

Closes #123
```

```
fix: handle empty mood input gracefully

Added validation to prevent API calls with empty strings
Returns user-friendly error message
```

## 🧪 Testing

### Backend Testing Structure

```typescript
// backend/src/services/movie.service.test.ts
import { describe, it, expect } from '@jest/globals';
import { movieService } from './movie.service';

describe('MovieService', () => {
  it('should get movies by genre ids', async () => {
    const movies = await movieService.getMoviesByGenreIds([28, 35], 1);
    expect(movies).toHaveLength(12);
    expect(movies[0]).toHaveProperty('id');
    expect(movies[0]).toHaveProperty('title');
  });
});
```

### Frontend Testing Structure

```typescript
// frontend/src/components/MoodInput.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { MoodInput } from './MoodInput';

describe('MoodInput', () => {
  it('should submit mood on button click', () => {
    const mockOnSubmit = jest.fn();
    render(<MoodInput onSubmit={mockOnSubmit} isLoading={false} />);
    
    const input = screen.getByPlaceholderText(/how are you feeling/i);
    fireEvent.change(input, { target: { value: 'happy' } });
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(mockOnSubmit).toHaveBeenCalledWith('happy');
  });
});
```

## 📊 Database Schema

### Models

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
  id         String    @id @default(uuid())
  userId     String
  user       User      @relation(fields: [userId], references: [id])
  movieId    Int
  title      String
  posterPath String?
  genres     String[]
  addedAt    DateTime  @default(now())
  
  @@unique([userId, movieId])
}

model History {
  id         String    @id @default(uuid())
  userId     String
  user       User      @relation(fields: [userId], references: [id])
  mood       String
  genres     String[]
  movieCount Int
  searchedAt DateTime  @default(now())
}
```

### Using Prisma Studio

```bash
cd backend
npm run prisma:studio
```

Opens a browser-based GUI to view and edit database data.

## 🔐 Security Best Practices

1. **Environment Variables**: Never commit `.env` files
2. **Input Validation**: Use Zod schemas for validation
3. **SQL Injection**: Prisma ORM prevents this automatically
4. **XSS**: sanitize user input (React handles this)
5. **CORS**: Whitelist only production domains
6. **Rate Limiting**: Prevent API abuse
7. **JWT Secrets**: Use strong, unique secrets

## 🐛 Debugging

### Backend Debugging

```typescript
// Enable debug logging in backend/src/config/logger.ts
const logger = winston.createLogger({
  level: 'debug', // Set to debug for detailed logs
  // ...
});
```

### Frontend Debugging

```typescript
// Add console logs in components
console.log('Movie data:', movie);
console.log('API response:', response.data);

// Use React DevTools extension
```

### Database Debugging

```bash
# View Prisma queries
cd backend
DEBUG="prisma:query" npm run dev
```

## 📈 Performance Optimization

### Frontend

1. **Code Splitting**: Already configured in Vite
2. **Image Lazy Loading**: Added to MovieCard component
3. **Memoization**: Use `React.memo` for expensive components
4. **Debounce**: Add to search input for API calls

### Backend

1. **Database Indexes**: Already defined in Prisma schema
2. **Pagination**: Implemented in movie search
3. **Caching**: Add Redis for frequently accessed data
4. **Compression**: Use compression middleware (optional)

## 🎨 UI/UX Improvements

### Adding Animations

Use Tailwind CSS animations in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    animation: {
      'fade-in': 'fadeIn 0.3s ease-in',
      'slide-up': 'slideUp 0.4s ease-out',
    },
  }
}
```

### Responsive Design

Tailwind responsive classes:
- Mobile first: `class="text-sm md:text-base lg:text-lg"`
- Hide components: `hidden md:block`
- Grid columns: `grid-cols-1 md:grid-cols-3 lg:grid-cols-6`

## 📚 API Endpoints Reference

### Backend APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/mood/recommend` | Get mood-based recommendations |
| GET | `/api/movies/search` | Search movies |
| GET | `/api/movies/popular` | Get popular movies |
| GET | `/api/movies/trending` | Get trending movies |
| GET | `/api/movies/:id` | Get movie details |
| POST | `/api/favorites` | Add to favorites |
| GET | `/api/favorites` | Get user favorites |
| DELETE | `/api/favorites/:id` | Remove from favorites |
| GET | `/api/history` | Get search history |
| DELETE | `/api/history` | Clear history |

## 🔮 Future Enhancements

### Potential Features

1. **User Authentication**
   - Register/Login endpoints
   - JWT-based auth
   - Protected routes

2. **Recommendation Engine**
   - Collaborative filtering
   - Content-based filtering
   - User preferences learning

3. **Social Features**
   - Share recommendations
   - User reviews
   - Rating system

4. **Advanced Search**
   - Filter by year, rating, genre
   - Advanced mood analysis
   - Similar movies

5. **Analytics Dashboard**
   - User activity tracking
   - Popular moods
   - Recommendation statistics

## 🤝 Code Review Guidelines

When reviewing PRs, check:

1. **Code Quality**: Clean, readable, well-documented
2. **TypeScript**: Proper typing, no `any` types
3. **Error Handling**: Proper try-catch blocks
4. **Security**: No exposed secrets, proper validation
5. **Performance**: No unnecessary re-renders, optimized queries
6. **Testing**: Tests for new features
7. **Documentation**: Updated README if needed

## 📖 Useful Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Express Guide](https://expressjs.com/en/guide/routing.html)
- [Prisma Docs](https://www.prisma.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Zod Validation](https://zod.dev/)

---

**Happy Coding!** 🚀
