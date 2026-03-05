# Frontend Quick Start Guide

Get your beautiful SaaS frontend running in minutes!

## ⚡ 5-Minute Setup

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Configure Environment (Optional)
```bash
# Create .env.local in frontend directory
echo "NEXT_PUBLIC_API_URL=http://localhost:3001" > .env.local
```

### 3. Start Development Server
```bash
npm run dev
```

**Access at:** http://localhost:3000

## 📖 What You Have

### Pages Ready to Use
- ✅ **Landing Page** (`/`) - Marketing homepage
- ✅ **Upload Page** (`/dashboard/upload`) - Media upload with drag-and-drop
- ✅ **Dashboard** (`/dashboard`) - Overview and statistics
- ✅ **Transcript Viewer** (`/dashboard/transcript/[id]`) - Full transcription and downloads
- ✅ **Download Center** (`/dashboard/download`) - Bulk subtitle downloads
- ✅ **Admin Pages** - User and project management (ready)

### Features Implemented
- ✅ Beautiful modern UI with Tailwind CSS
- ✅ Responsive design (mobile/tablet/desktop)
- ✅ File upload with drag-and-drop
- ✅ API integration for transcription
- ✅ Subtitle format previews (SRT, VTT, STL)
- ✅ Download functionality
- ✅ Toast notifications
- ✅ Loading states
- ✅ Error handling

## 🎨 Design Highlights

### Modern SaaS UI
- Clean, professional layout
- Intuitive navigation
- Consistent styling with Tailwind CSS
- Dark mode ready (can be enabled)
- Smooth animations and transitions

### Color Scheme
- Primary Blue: Great CTAs and highlights
- Clean Grays: Professional backgrounds
- Green/Red: Status indicators
- Icons: Using Lucide React

### Responsive Layouts
- Mobile-first design
- Tablet optimized
- Desktop fully featured
- Flex and grid layouts

## 🔌 API Integration

### Backend Connection
The frontend connects to backend API at:
```
http://localhost:3001
```

API endpoints integrated:
- `POST /api/upload` - Upload media files
- `POST /api/transcribe` - Start transcription
- `GET /api/transcript/:id` - Get transcript details
- `GET /api/download/srt/:id` - Download SRT
- `GET /api/download/vtt/:id` - Download VTT
- `GET /api/download/stl/:id` - Download STL

### Environment Variable
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Change this to point to your backend server.

## 📁 File Structure

```
frontend/
├── app/                     # Next.js App Router
│   ├── page.tsx            # Landing page
│   ├── (dashboard)/        # Protected routes
│   │   └── dashboard/
│   │       ├── page.tsx    # Main dashboard
│   │       ├── upload/     # Upload page
│   │       ├── transcript/ # Transcript viewer
│   │       └── download/   # Download center
│   └── (auth)/             # Login/signup
│
├── components/             # Reusable components
├── lib/                    # API and utilities
│   ├── api.ts             # API client functions
│   └── types.ts           # TypeScript types
│
├── styles/                # Global styling
│   └── globals.css        # Tailwind CSS
│
├── public/                # Static files
└── package.json           # Dependencies
```

## 🚀 Available Commands

```bash
# Development
npm run dev          # Start dev server (http://localhost:3000)

# Production
npm run build        # Build for production
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## 🧪 Testing the Frontend

### 1. Visit Landing Page
```
http://localhost:3000
```
See features and call-to-action buttons.

### 2. Navigate to Upload
Click "Upload Media" button on landing page or go to:
```
http://localhost:3000/dashboard/upload
```

### 3. Test Upload
- Drag and drop an audio/video file
- Enter project name
- Select language
- Click "Upload & Transcribe"

### 4. View Transcript
After transcription completes, you'll be redirected to:
```
http://localhost:3000/dashboard/transcript/[id]
```
See full transcript, preview formats, and download buttons.

### 5. Download Subtitles
Choose format (SRT, VTT, or STL) and download.

## 📱 Responsive Design

### Mobile (320px+)
- Single column layout
- Stacked cards
- Full-width inputs
- Touch-friendly buttons

### Tablet (768px+)
- Two-column grid
- Side-by-side previews
- Optimized spacing

### Desktop (1024px+)
- Multi-column layouts
- Full featured UI
- Enhanced interactions

## 🎯 Popular Pages

### Landing Page (`/`)
- Hero section with CTA
- Features showcase
- Professional design
- Conversion-focused

### Upload Page (`/dashboard/upload`)
- **Drag-and-drop zone** - Drop files here
- **Project name** - Name your project
- **Language selection** - Choose transcription language
- **Feature cards** - Show capabilities

**Flow:**
1. Drop file
2. Enter project name
3. Select language
4. Click "Upload & Transcribe"
5. Get redirected to results

### Transcript Viewer (`/dashboard/transcript/[id]`)
- **Full transcript** - Complete text output
- **SRT preview** - SubRip format
- **VTT preview** - WebVTT format
- **STL preview** - EBU-STL format
- **Download buttons** - Get each format
- **Metadata** - Status, language, duration

### Download Center (`/dashboard/download`)
- **List view** - All transcripts
- **Search** - Find transcripts
- **Bulk select** - Choose multiple
- **Batch download** - Download many at once
- **Format selection** - SRT, VTT, or STL

## 🔧 Customization

### Change API URL
Edit `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://your-api-server:3001
```

### Change Colors
Edit `tailwind.config.js`:
```js
theme: {
  colors: {
    primary: '#3B82F6', // Change primary blue
    // Add more colors
  }
}
```

### Add New Page
1. Create folder in `app/(dashboard)/dashboard/`
2. Add `page.tsx`
3. Update sidebar in `(dashboard)/layout.tsx`

### Customize Navigation
Edit `app/(dashboard)/layout.tsx` to add/remove menu items.

## 📚 Technologies

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Hook Form** - Form handling
- **Axios** - API requests
- **Lucide React** - Icons
- **React Hot Toast** - Notifications

## 🔒 Authentication

The frontend has authentication placeholders ready:
- Login page at `/login`
- Signup page at `/signup`
- Protected dashboard routes
- JWT token storage

Connect to your auth backend to enable.

## 📊 Dashboard Features

### Stats Cards
- Total Uploads count
- Total Transcripts count
- Minutes processed
- Success rate percentage

### Recent Transcripts
- Table of recent items
- Status indicators
- Quick view links
- Formatted dates

### Quick Actions
- Upload new media button
- Download subtitles button
- API status indicator

## 🎓 Learning Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Guide](https://tailwindcss.com/docs)
- [React Patterns](https://react.dev/learn)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

## ⚠️ Troubleshooting

### "Page not found"
- Make sure dev server is running: `npm run dev`
- Check URL matches your routes
- Clear browser cache

### "API request failed"
- Verify backend is running on `http://localhost:3001`
- Check `NEXT_PUBLIC_API_URL` is correct
- Verify CORS is enabled in backend

### "Styles look broken"
- Restart dev server: `npm run dev`
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`

### "Next not found"
- Install dependencies: `npm install`
- Make sure you're in `frontend` directory
- Try: `npx next dev`

## 🚀 Deploy to Production

### Vercel (Easiest)
1. Push code to GitHub
2. Connect repo to Vercel
3. Set `NEXT_PUBLIC_API_URL` environment variable
4. Deploy!

### Docker
```bash
docker build -t subtitle-ai-frontend .
docker run -p 3000:3000 subtitle-ai-frontend
```

### Traditional Server
```bash
npm run build
npm start
```

## 💡 Tips & Tricks

- Use Ctrl/Cmd+Shift+Dev Tools to inspect elements
- Use React DevTools extension for component debugging
- Test on mobile with `http://[your-ip]:3000`
- Clear browser storage if auth issues occur
- Check browser console for detailed error messages

## 📖 Next Steps

1. ✅ **Start dev server:** `npm run dev`
2. 🎨 **Explore pages:** Visit http://localhost:3000
3. 📤 **Test upload:** Upload an audio/video file
4. 🔍 **View results:** Check transcript viewer
5. 💾 **Download:** Get subtitle files
6. 🔗 **Connect backend:** Ensure backend API is running
7. 🚀 **Deploy:** Build and deploy to production

---

**Everything is ready!** 🎉

Your modern SaaS frontend is fully implemented with:
- ✅ Beautiful UI with Tailwind CSS
- ✅ Responsive design
- ✅ Full API integration
- ✅ Upload and transcription
- ✅ Subtitle downloads
- ✅ Dashboard with stats

**Start with:** `npm run dev`
