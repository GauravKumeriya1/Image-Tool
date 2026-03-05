# Frontend Documentation

Modern Next.js + Tailwind CSS frontend for Subtitle AI SaaS platform.

## 📋 Overview

The frontend provides a complete user interface for:
- Landing page with feature showcase
- User authentication (Login/Signup)
- Media upload with drag-and-drop
- Transcription viewing and management
- Subtitle download in multiple formats
- User dashboard with statistics

## 🏗️ Project Structure

```
frontend/
├── app/
│   ├── (auth)/                          # Authentication routes
│   │   ├── login/page.tsx              # Login page
│   │   └── signup/page.tsx             # Signup page
│   ├── (dashboard)/                     # Dashboard routes (protected)
│   │   ├── layout.tsx                  # Dashboard layout with sidebar
│   │   └── dashboard/
│   │       ├── page.tsx                # Main dashboard
│   │       ├── upload/page.tsx         # Upload page
│   │       ├── transcript/[id]/page.tsx # Transcript viewer
│   │       ├── download/page.tsx       # Subtitle download center
│   │       ├── projects/page.tsx       # Projects management
│   │       └── settings/page.tsx       # User settings
│   ├── (admin)/                         # Admin routes
│   │   ├── admin/page.tsx              # Admin dashboard
│   │   ├── admin/users/page.tsx        # User management
│   │   ├── admin/projects/page.tsx     # Project management
│   │   └── admin/settings/page.tsx     # Admin settings
│   ├── layout.tsx                       # Root layout
│   └── page.tsx                         # Landing page
│
├── components/
│   ├── Header.tsx                       # Navigation header
│   └── Footer.tsx                       # Footer component
│
├── lib/
│   ├── api.ts                           # API client and functions
│   ├── types.ts                         # TypeScript interfaces
│   └── auth.ts                          # Auth utilities
│
├── hooks/
│   ├── useAuth.ts                       # Authentication hook
│   └── useUpload.ts                     # Upload handling hook
│
├── contexts/
│   └── AuthContext.ts                   # Auth context provider
│
├── styles/
│   └── globals.css                      # Global Tailwind CSS
│
├── public/
│   └── favicon.ico                      # Favicon
│
├── package.json                         # Dependencies
├── tsconfig.json                        # TypeScript config
├── tailwind.config.js                   # Tailwind config
├── postcss.config.js                    # PostCSS config
└── next.config.js                       # Next.js config
```

## 🎨 Component Pages

### Landing Page (`/`)
- Hero section with call-to-action
- Features showcase
- Pricing (ready for implementation)
- FAQ section (ready for implementation)

### Auth Pages (`/login`, `/signup`)
- User authentication forms
- Email validation
- Password strength indicators
- Social login (ready for implementation)

### Dashboard (`/dashboard`)
- Overview statistics
- Recent transcripts list
- Quick action buttons
- Success rate metrics

### Upload Page (`/dashboard/upload`)
- Drag-and-drop file upload
- File validation (audio/video only)
- Project name input
- Language selection
- Progress tracking

### Transcript Viewer (`/dashboard/transcript/[id]`)
- Full transcript display
- Subtitle format previews (SRT, VTT, STL)
- Download buttons for each format
- Transcript metadata
- Status indicator

### Download Center (`/dashboard/download`)
- List of all transcripts
- Search and filter
- Bulk download options
- Format selection (SRT, VTT, STL)
- Batch download support

### Projects Page (`/dashboard/projects`)
- Project list view
- Project creation
- Project management
- Archive/delete options

### Settings Page (`/dashboard/settings`)
- User profile management
- Password change
- API keys (ready)
- Notification preferences

## 🔌 API Integration

### API Functions (`lib/api.ts`)

```typescript
// File Upload
uploadFile(file: File, projectName: string, language: string): Promise<Upload>

// Transcription
startTranscription(uploadId: string): Promise<{ transcriptId: string }>

// Retrieve Transcript
getTranscript(transcriptId: string): Promise<Transcript>

// Download Subtitles
downloadSubtitle(transcriptId: string, format: 'srt' | 'vtt' | 'stl'): Promise<Blob>

// Health Check
healthCheck(): Promise<{ status: string; message: string }>
```

### API Configuration
- Base URL: `http://localhost:3001` (configurable via `NEXT_PUBLIC_API_URL`)
- Content-Type: `application/json` (form-data for uploads)
- Authentication: Bearer token in Authorization header
- Error handling: Automatic 401 redirect on auth failure

## 📦 Dependencies

### Core
- **next** (^14.0.0) - React framework
- **react** (^18.2.0) - UI library
- **typescript** (^5.3.0) - Type safety

### Styling
- **tailwindcss** (^3.3.0) - CSS framework
- **postcss** (^8.4.0) - CSS processing
- **autoprefixer** (^10.4.0) - Browser prefix support

### UI Components
- **lucide-react** (^0.292.0) - Icon library
- **react-hot-toast** (^2.4.0) - Toast notifications
- **recharts** (^2.10.0) - Charts visualization

### Data & Forms
- **react-hook-form** (^7.48.0) - Form handling
- **zod** (^3.22.0) - Data validation
- **@hookform/resolvers** (^3.3.0) - Form resolvers
- **date-fns** (^2.30.0) - Date utilities

### API & State
- **axios** (^1.6.0) - HTTP client
- **zustand** (^4.4.0) - State management
- **next-auth** (^4.24.0) - Authentication framework
- **jose** (^5.0.0) - JWT handling

## 🎯 Features Implemented

### Upload Page
- ✅ Drag-and-drop file upload
- ✅ File validation (audio/video MIME types)
- ✅ File size display
- ✅ Project name input
- ✅ Language selection (10 languages)
- ✅ Automatic transcription start
- ✅ Loading states
- ✅ Error handling with toast notifications
- ✅ Feature showcase cards

### Transcript Viewer
- ✅ Full transcript text display
- ✅ Metadata display (status, language, duration)
- ✅ SRT format preview
- ✅ VTT format preview
- ✅ STL format preview
- ✅ Individual download buttons
- ✅ Bulk download capability
- ✅ Loading states
- ✅ Error handling

### Download Center
- ✅ Transcript list view
- ✅ Search functionality
- ✅ Filter options
- ✅ Select/deselect transcripts
- ✅ Bulk download actions
- ✅ Status badges
- ✅ Duration formatting
- ✅ Language display

### Dashboard
- ✅ Statistics cards (uploads, transcripts, minutes, success rate)
- ✅ Quick action buttons
- ✅ Recent transcripts list
- ✅ Status indicators
- ✅ View transcript links
- ✅ Empty state placeholder
- ✅ Responsive grid layout

## 🔐 Authentication

### Features
- JWT token storage in localStorage
- Automatic token inclusion in requests
- Auto-logout on 401 Unauthorized
- Redirect to login on auth error
- Auth context for global state

### Protected Routes
- Dashboard routes require authentication
- Admin routes require admin role
- Login/Signup routes redirect to dashboard if authenticated

## 🎨 Styling

### Tailwind CSS Configuration
- Custom colors and spacing
- Component classes (btn-primary, btn-secondary, card, input-field)
- Responsive design (mobile-first)
- Smooth animations and transitions

### Color Scheme
- Primary: Blue (#3B82F6)
- Secondary: Gray (#6B7280)
- Success: Green (#10B981)
- Warning: Yellow (#F59E0B)
- Error: Red (#EF4444)
- Neutral: Gray scale

### Responsive Breakpoints
- Mobile (default)
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
- 2xl: 1536px

## 🚀 Development Setup

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
cd frontend
npm install
```

### Development Server
```bash
npm run dev
```
Access at: http://localhost:3000

### Production Build
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

## 📝 Environment Variables

Create `.env.local` in the frontend root:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001

# Auth (if needed)
NEXT_PUBLIC_AUTH_DOMAIN=your-auth-domain

# Other public variables (prefix with NEXT_PUBLIC_)
NEXT_PUBLIC_APP_NAME=Subtitle AI
```

## 🧪 Testing

### Manual Testing Checklist
- [ ] Landing page loads and displays features
- [ ] Login/Signup forms validate input
- [ ] Dashboard displays stats and recent transcripts
- [ ] Upload page accepts file drag-and-drop
- [ ] Upload to backend succeeds with error handling
- [ ] Transcription starts and redirects to viewer
- [ ] Transcript viewer displays all formats
- [ ] Downloads work for SRT/VTT/STL
- [ ] Bulk download from Download Center works
- [ ] Responsive design on mobile/tablet/desktop
- [ ] Toast notifications appear correctly
- [ ] Toast notifications appear correctly
- [ ] Navigation sidebar collapses/expands
- [ ] All buttons and forms are functional

### Browser Compatibility
- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🔧 Customization

### Add New Features

#### Add New Page
1. Create route folder in `app/(dashboard)/dashboard/`
2. Add `page.tsx` with your component
3. Update sidebar navigation in `(dashboard)/layout.tsx`

#### Add New API Call
1. Add function in `lib/api.ts`
2. Define type in `lib/types.ts`
3. Use in components with error handling

#### Customize Styling
1. Edit `styles/globals.css` for global styles
2. Edit `tailwind.config.js` for Tailwind customization
3. Use Tailwind classes directly in JSX

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Push to GitHub
git push origin main

# Connect to Vercel dashboard
# Select repository and deploy
```

### Docker
```bash
# Build image
docker build -t subtitle-ai-frontend .

# Run container
docker run -p 3000:3000 subtitle-ai-frontend
```

### Environment Setup for Production
1. Set `NEXT_PUBLIC_API_URL` to production API URL
2. Configure CORS in backend
3. Enable HTTPS
4. Setup error logging/monitoring
5. Configure CDN for static assets

## 📊 Types & Interfaces

### User
```typescript
interface User {
  id: string
  name: string
  email: string
  createdAt: Date
}
```

### Upload
```typescript
interface Upload {
  id: string
  fileName: string
  filePath: string
  fileSize: number
  mimeType: string
  projectName: string
  language: string
  status: 'uploaded' | 'processing' | 'completed' | 'failed'
  createdAt: Date
  updatedAt: Date
}
```

### Transcript
```typescript
interface Transcript {
  id: string
  uploadId: string
  fullText: string
  language: string
  duration: number
  srtContent: string
  vttContent: string
  stlContent: string
  jsonContent: string
  status: 'processing' | 'completed' | 'failed'
  createdAt: Date
  updatedAt: Date
}
```

## 🎯 Next Steps

### Frontend Enhancements
- [ ] Implement real authentication with NextAuth
- [ ] Add data persistence with Zustand
- [ ] Implement real-time notifications (WebSocket)
- [ ] Add video/audio preview player
- [ ] Implement transcript editing UI
- [ ] Add export to other formats (PDF, DOCX)
- [ ] Implement collaborative features
- [ ] Add advanced search and filtering

### Backend Integration
- [ ] Connect to real backend API
- [ ] Setup proper error handling
- [ ] Implement rate limiting
- [ ] Add request/response logging
- [ ] Setup API versioning

### Testing & QA
- [ ] Write unit tests (Jest)
- [ ] Write integration tests (Cypress)
- [ ] Performance testing
- [ ] Accessibility testing (WCAG)
- [ ] Security testing

### Analytics & Monitoring
- [ ] Setup error tracking (Sentry)
- [ ] Add analytics (Google Analytics)
- [ ] Monitor API performance
- [ ] Track user engagement

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## 💡 Best Practices

1. **Component Organization**: Keep components small and focused
2. **API Calls**: Always handle loading and error states
3. **Form Handling**: Use react-hook-form for validation
4. **State Management**: Use Zustand for global state
5. **Error Handling**: Show user-friendly error messages
6. **Loading States**: Indicate to users when operations are in progress
7. **Accessibility**: Use semantic HTML and proper ARIA labels
8. **Performance**: Lazy load components and images when possible

---

**Development Server Running!** 🚀

Start with: `npm run dev`

Your modern SaaS frontend is ready to use!
