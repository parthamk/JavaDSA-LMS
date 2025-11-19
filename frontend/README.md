# JavaDSA LMS - Frontend

A modern React + Vite frontend for the JavaDSA Learning Management System.

## Features

- 🎓 **Structured Learning**: Browse and learn from comprehensive Java and DSA courses
- 💻 **Code Playground**: Write and execute code in real-time with Monaco Editor
- 📊 **Progress Tracking**: Track your learning progress with bookmarks and notes
- 🔐 **Secure Authentication**: JWT-based user authentication
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- 🎨 **Modern UI**: Clean and intuitive user interface

## Tech Stack

- **React 18**: UI library
- **Vite**: Fast build tool and dev server
- **React Router**: Client-side routing
- **Axios**: HTTP client
- **Monaco Editor**: Code editor component
- **React Markdown**: Markdown rendering
- **React Hot Toast**: Toast notifications

## Installation

### Prerequisites

- Node.js >= 16.0.0
- npm or yarn

### Setup

1. **Clone the repository**

   ```bash
   cd frontend
   ```
2. **Install dependencies**

   ```bash
   npm install
   ```
3. **Create environment file**

   ```bash
   cp .env.example .env
   ```
4. **Configure API URL** (edit `.env`)

   ```
   VITE_API_URL=http://localhost:5000
   ```
5. **Start development server**

   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── auth/              # Authentication components
│   │   ├── common/            # Reusable components (Navbar, Footer)
│   │   ├── home/              # Home page components
│   │   └── practice/          # Practice page components
│   ├── context/
│   │   └── AuthContext.jsx    # Authentication context
│   ├── pages/
│   │   ├── Home.jsx           # Home page
│   │   ├── Courses.jsx        # Courses listing
│   │   ├── CourseViewer.jsx   # Course content viewer
│   │   ├── Practice.jsx       # Code playground
│   │   └── About.jsx          # About page
│   ├── services/
│   │   ├── authService.js     # Auth API calls
│   │   ├── courseService.js   # Course API calls
│   │   └── codeExecutionService.js # Code execution API calls
│   ├── data/
│   │   └── courses.json       # Course content data
│   ├── App.jsx                # Main app component
│   ├── main.jsx               # Entry point
│   └── index.css              # Global styles
├── index.html
├── vite.config.js
├── package.json
└── .env.example
```

## Available Scripts

### Development

```bash
npm run dev
```

Starts the development server with hot module replacement.

### Build

```bash
npm run build
```

Builds the application for production.

### Preview

```bash
npm run preview
```

Preview the production build locally.

### Lint

```bash
npm run lint
```

Run ESLint to check code quality.

## Pages

### Home (`/`)

- Hero section with call-to-action
- Services overview
- Student testimonials
- Technology stack

### Courses (`/courses`)

- Browse available courses
- View course details
- Start learning

### Course Viewer (`/course/:courseId`)

- View course content
- Table of contents with progress
- Bookmark sections
- Add personal notes
- Navigate between sections

### Practice (`/practice`)

- Code editor with syntax highlighting
- Support for multiple languages
- Real-time code execution
- Input/output handling
- Theme selection (dark/light)

### About (`/about`)

- Project information
- Features overview
- Technology stack
- License information
- Contact details

### Authentication

- **Login** (`/login`): Sign in with email and password
- **Register** (`/register`): Create a new account

## API Integration

The frontend communicates with the backend API at the configured `VITE_API_URL`.

### Authentication Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile

### Course Endpoints

- `GET /api/courses` - Get all courses
- `GET /api/courses/:courseId` - Get course content
- `GET /api/courses/:courseId/section/:sectionId` - Get section content
- `POST /api/courses/:courseId/progress` - Update progress
- `POST /api/courses/:courseId/bookmark` - Toggle bookmark
- `POST /api/courses/:courseId/notes` - Save notes

### Code Execution Endpoints

- `POST /api/code/execute` - Execute code
- `GET /api/code/languages` - Get supported languages

## Authentication Flow

1. User registers or logs in
2. Backend returns JWT token
3. Token is stored in localStorage
4. Axios interceptor adds token to all requests
5. Protected routes check authentication status
6. Token expiration triggers automatic logout

## Styling

The application uses CSS with CSS variables for theming:

- **Primary Color**: `#3b82f6` (Blue)
- **Secondary Color**: `#8b5cf6` (Purple)
- **Accent Color**: `#10b981` (Green)
- **Background**: `#f9fafb` (Light Gray)
- **Text**: `#1f2937` (Dark Gray)

## Responsive Design

The application is fully responsive with breakpoints:

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Configure environment variables
4. Deploy

```bash
npm i -g vercel
vercel
```

### Netlify

1. Build the project

   ```bash
   npm run build
   ```
2. Deploy the `dist` folder to Netlify

### Other Platforms

Build the project and deploy the `dist` folder to any static hosting service.

## Environment Variables

Create a `.env` file in the root directory:

```
VITE_API_URL=http://localhost:5000
```

## Troubleshooting

### Port already in use

If port 5173 is already in use, Vite will automatically use the next available port.

### API connection issues

- Ensure backend is running on the configured URL
- Check CORS configuration on backend
- Verify network connectivity

### Authentication issues

- Clear localStorage: `localStorage.clear()`
- Check token expiration
- Verify JWT_SECRET on backend

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:

- GitHub Issues: [Project Issues](https://github.com/parthamk/JavaDSA-LMS/issues)

---

Made with ❤️ for learners worldwide
