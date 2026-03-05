# Visual User Journey & Feature Tour

Complete walkthrough of the Subtitle AI frontend experience.

## 🎬 User Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    SUBTITLE AI PLATFORM                          │
└─────────────────────────────────────────────────────────────────┘

                          LANDING PAGE
                    "Convert Media to Subtitles"
                              │
                              │ Click "Get Started"
                              ↓
                    ┌──────────────────┐
                    │  UPLOAD PAGE     │
                    └──────────────────┘
                   Drag & Drop File
                   ↓
           ┌─────────────────────────────┐
           │ File Uploaded Successfully  │
           │ Transcription Starting...   │
           └─────────────────────────────┘
                   ↓
         ┌──────────────────────────┐
         │ TRANSCRIPT VIEWER PAGE   │
         │ (Results Dashboard)      │
         └──────────────────────────┘
                   ↓
    ┌──────────────┬────────────┬──────────────┐
    ↓              ↓            ↓              ↓
  SRT PREVIEW   VTT PREVIEW  STL PREVIEW  DOWNLOAD BUTTONS
    ↓              ↓            ↓              ↓
    └──────────────┴────────────┴──────────────┘
                   ↓
         ┌──────────────────────────┐
         │  DOWNLOAD CENTER PAGE    │
         │  (Manage All Downloads)  │
         └──────────────────────────┘
            │
            ├─ View All Transcripts
            ├─ Search & Filter
            ├─ Bulk Download
            └─ Manage Files
```

## 📄 Page Designs

### 1. LANDING PAGE (/)

```
╔════════════════════════════════════════════════════════════════╗
║ NAVBAR:  Subtitle AI    [Login] [Sign Up]                     ║
╠════════════════════════════════════════════════════════════════╣
║                                                                ║
║     HERO SECTION                                              ║
║     "Convert Audio & Video to Subtitles with AI"              ║
║     Powered by Whisper AI                                    ║
║     [Get Started]  [Learn More]                              ║
║                                                                ║
╠════════════════════════════════════════════════════════════════╣
║                                                                ║
║  FEATURES (3-COLUMN GRID)                                     ║
║                                                                ║
║  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        ║
║  │   🎥 EASY    │  │  🤖 AI       │  │  📝 FORMATS  │        ║
║  │   Upload     │  │  Powered     │  │  Multiple    │        ║
║  └──────────────┘  └──────────────┘  └──────────────┘        ║
║                                                                ║
║  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        ║
║  │   ⚡ FAST    │  │  💾 SECURE   │  │  📊 STATS    │        ║
║  │   Processing │  │  Your Data   │  │  Dashboard   │        ║
║  └──────────────┘  └──────────────┘  └──────────────┘        ║
║                                                                ║
╠════════════════════════════════════════════════════════════════╣
║ FOOTER:  Privacy | Terms | Contact                            ║
╚════════════════════════════════════════════════════════════════╝
```

### 2. UPLOAD PAGE (/dashboard/upload)

```
╔════════════════════════════════════════════════════════════════╗
║ HEADER:  Upload Media                                         ║
║          Upload your audio or video file                      ║
╠════════════════════════════════════════════════════════════════╣
║                                                                ║
║  ┌──────────────────────────────────────────────────────┐    ║
║  │                    DROP ZONE                         │    ║
║  │                                                      │    ║
║  │              📁 sample_video.mp4                     │    ║
║  │         or click to select from computer            │    ║
║  │    Supported: MP4, MOV, WAV, MP3 (Max 100MB)       │    ║
║  │                                                      │    ║
║  │              Size: 45.2 MB                          │    ║
║  │                                                      │    ║
║  └──────────────────────────────────────────────────────┘    ║
║                                                                ║
║  ┌────────────────────────────────┬──────────────────┐       ║
║  │ Project Name *                 │ Language         │       ║
║  │ [My Video Podcast__________]   │ [English     ✓] │       ║
║  └────────────────────────────────┴──────────────────┘       ║
║                                                                ║
║              [Upload & Transcribe]                           ║
║                                                                ║
╠════════════════════════════════════════════════════════════════╣
║  FEATURES BOX                                                  ║
║  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        ║
║  │   🎥 MULTIPLE │  │  🤖 AI       │  │  📝 SRT/VTT │        ║
║  │   FORMATS    │  │  POWERED     │  │  /STL       │        ║
║  └──────────────┘  └──────────────┘  └──────────────┘        ║
╚════════════════════════════════════════════════════════════════╝
```

### 3. TRANSCRIPT VIEWER (/dashboard/transcript/[id])

```
╔════════════════════════════════════════════════════════════════╗
║ HEADER:  Transcript Viewer                                    ║
║          Review and download generated subtitles              ║
║                                         [SRT] [VTT] [STL]    ║
╠════════════════════════════════════════════════════════════════╣
║                                                                ║
║  METADATA CARDS (4 COLUMNS)                                   ║
║  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐        ║
║  │ ✓ Status │ │ 📝 EN    │ │ 🕐 2:15  │ │ ID: abc  │        ║
║  │Completed │ │ Language │ │ Duration │ │ Shortcut │        ║
║  └──────────┘ └──────────┘ └──────────┘ └──────────┘        ║
║                                                                ║
╠════════════════════════════════════════════════════════════════╣
║                                                                ║
║  FULL TRANSCRIPT                                              ║
║  ┌──────────────────────────────────────────────────────┐    ║
║  │ "This is a sample transcript. The platform takes    │    ║
║  │ your audio or video files and converts them to      │    ║
║  │ professional subtitles using OpenAI's Whisper API.  │    ║
║  │ You can download in SRT, VTT, or STL formats."      │    ║
║  │                                                      │    ║
║  │ MAX HEIGHT 400px - SCROLLABLE                       │    ║
║  └──────────────────────────────────────────────────────┘    ║
║                                                                ║
╠════════════════════════════════════════════════════════════════╣
║                                                                ║
║  SUBTITLE FORMAT PREVIEWS (3-COLUMN GRID)                    ║
║                                                                ║
║  ┌─ SRT FORMAT ───┐  ┌─ VTT FORMAT ───┐  ┌─ STL FORMAT ──┐  ║
║  │                │  │                │  │                │  ║
║  │ 1              │  │ WEBVTT         │  │ STL content    │  ║
║  │ 00:00:00,000 →│  │                │  │                │  ║
║  │ 00:00:05,000  │  │ 00:00:00.000 →│  │ (frame based)   │  ║
║  │                │  │ 00:00:05.000  │  │                │  ║
║  │ This is text...│  │                │  │ Max 500 chars  │  ║
║  │                │  │ This is text...│  │ SCROLLABLE     │  ║
║  │ [Download ↓]   │  │ [Download ↓]   │  │ [Download ↓]   │  ║
║  └────────────────┘  └────────────────┘  └────────────────┘  ║
║                                                                ║
╠════════════════════════════════════════════════════════════════╣
║  [Back to Dashboard] [Refresh Transcript]                     ║
╚════════════════════════════════════════════════════════════════╝
```

### 4. DASHBOARD PAGE (/dashboard)

```
╔════════════════════════════════════════════════════════════════╗
║ HEADER:  Dashboard | Welcome back!                            ║
║                                              [Upload Media]   ║
╠════════════════════════════════════════════════════════════════╣
║                                                                ║
║  QUICK ACTIONS (3-COLUMN)                                     ║
║  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐║
║  │📁 Upload Media  │ │⬇️  Download     │ │⚪ API Status   ║
║  │Start new        │ │Get subtitles    │ │All systems up  ║
║  │transcription    │ │                 │ │                ║
║  └─────────────────┘ └─────────────────┘ └─────────────────┘║
║                                                                ║
╠════════════════════════════════════════════════════════════════╣
║                                                                ║
║  STATISTICS (4-COLUMN CARD GRID)                             ║
║  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌────────┐ ║
║  │ 12          │ │ 10          │ │ 620         │ │ 80%    │ ║
║  │ Uploads     │ │ Transcripts │ │ Min         │ │ Success│ ║
║  └─────────────┘ └─────────────┘ └─────────────┘ └────────┘ ║
║                                                                ║
╠════════════════════════════════════════════════════════════════╣
║                                                                ║
║  RECENT TRANSCRIPTS TABLE                                     ║
║  ┌────────────────┬──────────┬────────────┬───────────────┐  ║
║  │ NAME           │ DURATION │ STATUS     │ DATE          │  ║
║  ├────────────────┼──────────┼────────────┼───────────────┤  ║
║  │ Product Demo   │ 4m 5s    │ ✓ Complete │ 2 days ago    │ ║
║  │ Podcast Ep 15  │ 3m 0s    │ ▪ Process  │ Yesterday     │ ║
║  │ Interview      │ 1m 35s   │ ✓ Complete │ 3 days ago    │ ║
║  └────────────────┴──────────┴────────────┴───────────────┘  ║
║                                                                ║
║                    [View All →]                               ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝
```

### 5. DOWNLOAD CENTER (/dashboard/download)

```
╔════════════════════════════════════════════════════════════════╗
║ HEADER:  Download Subtitles                                   ║
║          Download your generated subtitles                    ║
║                                    [Bulk: SRT] [Bulk: VTT]   ║
╠════════════════════════════════════════════════════════════════╣
║                                                                ║
║  SEARCH & FILTERS                                             ║
║  ┌──────────────────────────────┐  [All] [Select All]       ║
║  │ 🔍 Search transcripts...     │                            ║
║  └──────────────────────────────┘                            ║
║                                                                ║
╠════════════════════════════════════════════════════════════════╣
║                                                                ║
║  TRANSCRIPT LIST (with checkboxes)                            ║
║                                                                ║
║  ☑ ┌────────────────────────────────────────────────────┐   ║
║    │ Transcript abc1234                                 │   ║
║    │ "This is a sample transcript..."                   │   ║
║    │ 2min 15sec • EN • ✓ Complete • 2 days ago         │   ║
║    │ [SRT] [VTT] [STL]                                 │   ║
║    └────────────────────────────────────────────────────┘   ║
║                                                                ║
║  ☐ ┌────────────────────────────────────────────────────┐   ║
║    │ Transcript def5678                                 │   ║
║    │ "Another transcript example..."                    │   ║
║    │ 1min 35sec • EN • ✓ Complete • 3 days ago         │   ║
║    │ [SRT] [VTT] [STL]                                 │   ║
║    └────────────────────────────────────────────────────┘   ║
║                                                                ║
║  ☐ ┌────────────────────────────────────────────────────┐   ║
║    │ Transcript ghi9012                                 │   ║
║    │ "Once more, sample transcript content..."          │   ║
║    │ 3min 45sec • EN • ▪ Processing • Today            │   ║
║    │ [SRT] [VTT] [STL]                                 │   ║
║    └────────────────────────────────────────────────────┘   ║
║                                                                ║
╠════════════════════════════════════════════════════════════════╣
║                                                                ║
║     [2 selected]                                [Clear]       ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝
```

## 🎨 Design System

### Colors
```
Primary Blue:    #3B82F6  (CTAs, Links, Highlights)
Secondary Gray:  #6B7280  (Text, Secondary)
Success Green:   #10B981  (Completed status)
Warning Yellow:  #F59E0B  (Processing status)
Error Red:       #EF4444  (Errors)
Background:      #F9FAFB  (Light gray)
White:           #FFFFFF  (Cards, Text bg)
```

### Typography
```
Heading 1: 30px, Bold, #111827
Heading 2: 24px, Bold, #111827
Heading 3: 20px, Bold, #111827
Body:      16px, Regular, #374151
Small:     14px, Regular, #6B7280
```

### Spacing
```
xs: 2px
sm: 4px
md: 8px
lg: 16px
xl: 24px
2xl: 32px
```

### Components
```
Buttons:       16px padding, 8px radius, transition
Cards:         White bg, shadow-sm, border gray
Input Fields:  Full width, border, 8px padding
Status Badge:  Small px, bold text, colored bg
```

## 📱 Responsive Behavior

### Mobile (320px - 640px)
```
┌──────────────────┐
│  SIDEBAR CLOSED  │  ← Hamburger menu
│  MAIN CONTENT    │  ← Full width
│  - 1 column      │  ← Stacked cards
│  - Touch-friendly│  ← Larger buttons
└──────────────────┘
```

### Tablet (768px - 1024px)
```
┌─────────┬──────────────────┐
│ SIDEBAR │  MAIN CONTENT    │  ← Side-by-side
│         │  - 2 columns     │  ← More space
│         │  - Optimized     │  ← Balanced
└─────────┴──────────────────┘
```

### Desktop (1280px+)
```
┌─────────┬───────────────────────────────┐
│ SIDEBAR │  MAIN CONTENT                 │  ← Full power
│         │  - 3-4 columns                │  ← All features
│         │  - Rich interactions          │  ← Complex layouts
└─────────┴───────────────────────────────┘
```

## 🔄 Interactive States

### Button States
```
Normal:    bg-blue-600, hover:bg-blue-700
Disabled:  opacity-50, cursor-not-allowed
Loading:   spinner animation, text changes
Active:    bg-blue-800, shadow-lg
```

### Form States
```
Empty:       border-gray-300, placeholder text
Focused:     border-blue-500, ring-2 ring-blue-500
Filled:      border-gray-300, value visible
Error:       border-red-500, error message below
Success:     border-green-500, checkmark icon
```

### Toast Notifications
```
Success:  Green bg, checkmark icon, auto-dismiss
Error:    Red bg, error icon, auto-dismiss
Info:     Blue bg, info icon, auto-dismiss
Warning:  Yellow bg, warning icon, auto-dismiss
```

## 📊 Data Visualization

### Status Indicators
```
Completed:   ✓ Green badge
Processing:  ▪ Blue badge
Failed:      ✗ Red badge
Pending:     ○ Yellow badge
```

### Progress Indicators
```
Uploading:    Progress bar 0-100%
Transcribing: Spinner animation
Downloading:  Progress bar 0-100%
```

## 🎯 Key Interactions

### Common User Actions
1. **Upload File**
   - Drag & drop OR click to select
   - File validation in real-time
   - Progress indicator during upload
   - Toast confirmation on success

2. **View Transcript**
   - Automatic format generation
   - Clickable preview cards
   - Download each format separately

3. **Download Subtitles**
   - Choose format (SRT/VTT/STL)
   - Browser download starts
   - Success toast notification

4. **Manage Multiple Files**
   - Checkbox selection
   - Bulk actions
   - Batch download option

## ✨ UX Patterns

### Feedback
- Every action gets visual feedback
- Loading states shown during waits
- Success/error messages clear
- Tooltips for help text

### Navigation
- Clear page hierarchy
- Always know where you are
- Easy to go back/forward
- Sidebar provides quick access

### Error Handling
- User-friendly messages
- Suggestions to fix
- Never blame the user
- Clear next steps

---

**This is what your users will see and experience!**

Your frontend is built for modern, intuitive interaction. 🎨✨
