# HireMatch.ai Guidelines

## Architecture

HireMatch.ai is a full-stack interview preparation platform with:
- **Backend**: Express.js API with MongoDB, JWT authentication, file upload for resumes, and AI-powered interview report generation
- **Frontend**: React application with Vite, using Context API for state management and React Router for navigation

Key components:
- User authentication with protected routes
- Interview report generation from job descriptions and resumes
- PDF export of interview reports

## Build and Test

### Backend
- Install: `npm install` (in backend/)
- Run: `npm start` (uses nodemon for auto-reload)
- Test: Not configured yet

### Frontend
- Install: `npm install` (in frontend/)
- Dev: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`

## Conventions

- **Backend**: Async/await with try-catch error handling, consistent JSON error responses (status + message), feature-based folder structure (auth/, interview/)
- **Frontend**: Feature-based architecture with pages, services, hooks, and styles per feature; BEM naming in SCSS; custom hooks for API calls
- **API**: Axios with credentials, FormData for file uploads, consistent response format { success, data|error, status }

## Common Pitfalls

- PDF parsing may fail with certain files or Node versions - added error handling
- AI service now uses Google Gemini for dynamic report generation (previously mocked)
- CORS allows all origins by default - secure in production
- JWT tokens not HttpOnly - vulnerable to XSS
- Hardcoded base URL in frontend - use environment variables
- Auth state doesn't persist on page reload (getme commented out)

Reference key files: [backend/src/app.js](backend/src/app.js), [frontend/src/App.jsx](frontend/src/App.jsx)</content>
<parameter name="filePath">/workspaces/HireMatch.ai/.github/copilot-instructions.md