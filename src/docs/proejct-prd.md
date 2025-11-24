# Product Requirements Document (PRD)

# Bilingual Phonetics Study App

---

## 📋 Document Information

**Product Name:** PhonetiCards - Interactive Phonetics Learning Platform  
**Version:** 1.0  
**Date:** November 24, 2024  
**Author:** Kevin  
**Status:** Ready for Development

---

## 🎯 Executive Summary

PhonetiCards is a modern, mobile-first web application designed to help linguistics students master speech organ anatomy and phonetics concepts through interactive learning methods. The app features bilingual support (English-Thai), gamified flashcards, progress tracking, and an intuitive quiz system.

### Key Goals

- Enable quick and effective memorization of speech organ anatomy
- Provide seamless bilingual learning experience
- Create an engaging, distraction-free study environment
- Deploy rapidly with zero installation required

---

## 👥 Target Users

### Primary User Persona: University Linguistics Student

- **Age:** 18-25 years old
- **Background:** Studying English linguistics/phonetics at university level
- **Language:** Thai native speaker learning English phonetics
- **Tech Saviness:** High - comfortable with mobile apps and web platforms
- **Study Habits:** Studies on mobile device during commute, prefers visual learning
- **Pain Points:**
  - Difficulty memorizing anatomical terms
  - Need for quick review before exams
  - Language barrier with technical English terms
  - Lack of engaging study materials

### Secondary Users

- English language teachers preparing phonetics lessons
- Self-learners interested in pronunciation improvement
- Speech therapy students

---

## 🎨 Design Philosophy

### Core Principles

1. **Calm & Focused:** Clean interface without overwhelming elements
2. **Mobile-First:** Optimized for smartphone usage (primary study device)
3. **Bilingual by Design:** Seamless language switching, not an afterthought
4. **Progressive Disclosure:** Information revealed gradually to prevent cognitive overload
5. **Immediate Feedback:** Real-time response to user interactions

### Visual Style

- **Color Palette:**
  - Primary: Soft Purple/Violet gradient (#667eea to #764ba2)
  - Secondary: Warm coral accent (#f5576c)
  - Success: Soft green (#10b981)
  - Background: Clean white with subtle grays
- **Typography:**
  - English: Inter or system font
  - Thai: Noto Sans Thai or Sarabun
  - Clear hierarchy with size variations
- **Spacing:** Generous padding, comfortable touch targets (min 44px)

---

## 🏗️ Technical Architecture

### Technology Stack

**Frontend Framework:**

- React 18+ (with hooks)
- TypeScript for type safety
- Vite for fast development and building

**UI Components:**

- shadcn/ui component library (Radix UI primitives)
- Tailwind CSS for styling
- Lucide React for icons

**State Management:**

- React Context API for global state (theme, language, progress)
- Local state with useState/useReducer
- localStorage for persistence

**Deployment:**

- Static site hosting (Vercel/Netlify)
- Single-page application (SPA)
- PWA capabilities for offline access

---

## 🎯 Core Features & Requirements

### 1. Language System

#### 1.1 Language Switcher

**Priority:** P0 (Must Have)

**Requirements:**

- Toggle between: English Only, Thai Only, Both Languages
- Persistent language preference (localStorage)
- Smooth transition without page reload
- Visual indicator of current language mode

**UI Components:**

- Toggle group (shadcn/ui)
- Language icons (Lucide: Languages, Globe)

**User Stories:**

- As a student, I want to switch languages instantly so I can learn in my preferred language
- As a bilingual learner, I want to see both languages simultaneously to build vocabulary connections

#### 1.2 Bilingual Content Display

**Priority:** P0 (Must Have)

**Content Strategy:**

- Key terms: English (Thai) format when "Both" selected
- Anatomical labels in both scripts
- Thai translations for all UI elements
- Culturally appropriate examples

**Technical Implementation:**

```typescript
interface BilingualText {
  en: string;
  th: string;
}

const content: Record<string, BilingualText> = {
  lungs: { en: "Lungs", th: "ปอด" },
  // ...
};
```

---

### 2. Study Modes

#### 2.1 Overview Mode

**Priority:** P0 (Must Have)

**Description:** Comprehensive reading material organized in digestible sections

**Features:**

- Collapsible sections (Accordion component)
- Smooth scrolling navigation
- Reading progress indicator
- Key terms highlighted with tooltips

**Sections:**

1. Three Main Systems overview
2. Respiratory System details
3. Phonatory System details
4. Articulatory System details
5. Quick Reference Charts

**UI Components:**

- Accordion (shadcn/ui)
- Card components for sections
- Badge for key terms
- Tooltip for definitions

**Icons:**

- BookOpen (overview)
- Wind (respiratory)
- Mic (phonatory)
- MessageSquare (articulatory)

---

#### 2.2 Flashcard Mode

**Priority:** P0 (Must Have)

**Description:** Interactive flashcards for active recall learning

**Features:**

- Card flipping animation (3D effect)
- Shuffle option
- "Know it" / "Study more" sorting
- Progress tracking per deck
- Card counter (e.g., "5/24")

**Card Categories:**

1. Organ Names (Front: English/Thai → Back: Location & Function)
2. Functions (Front: "What produces voiced sounds?" → Back: Answer)
3. Memory Tricks (Front: Acronym → Back: Full meaning)
4. Diagrams (Front: Labeled diagram → Back: Description)

**Gestures:**

- Tap to flip
- Swipe right: "Know it"
- Swipe left: "Study more"
- Optional: Space bar to flip (desktop)

**UI Components:**

- Custom Card component with flip animation
- Progress bar
- Button group for navigation
- Badge for card counter

**Icons:**

- CreditCard (card deck)
- RotateCw (flip)
- Check (know it)
- X (study more)
- Shuffle (randomize)

**State Management:**

```typescript
interface FlashCard {
  id: string;
  category: string;
  front: BilingualText;
  back: BilingualText;
  difficulty: "easy" | "medium" | "hard";
  lastStudied: Date | null;
  timesCorrect: number;
  timesIncorrect: number;
}
```

---

#### 2.3 Interactive Diagram Mode

**Priority:** P1 (Should Have)

**Description:** Clickable SVG diagram of speech organs with tooltips

**Features:**

- Hover/tap to highlight organ
- Click to show detailed info in side panel
- Visual pathways (e.g., airflow animation)
- Label toggle (show/hide)

**UI Components:**

- Custom SVG component
- Sheet (shadcn/ui) for detail panel
- Tooltip for quick info
- Switch for label visibility

**Icons:**

- Eye / EyeOff (toggle labels)
- Info (details)
- Zap (highlight active)

---

#### 2.4 Quiz Mode

**Priority:** P0 (Must Have)

**Description:** Self-assessment with immediate feedback

**Quiz Types:**

1. Multiple Choice (4 options)
2. True/False
3. Fill in the Blank
4. Image-based (click correct part)

**Features:**

- Randomized questions
- Immediate feedback (correct/incorrect)
- Explanation after each answer
- Score tracking
- Review incorrect answers
- Timer option (optional)
- Retry quiz

**Question Pool:**

- Minimum 30 questions across all topics
- Difficulty levels: Easy (40%), Medium (40%), Hard (20%)
- Adaptive difficulty (future enhancement)

**UI Components:**

- RadioGroup (for multiple choice)
- Button (submit answer)
- Alert (feedback)
- Progress indicators
- Card for question container

**Icons:**

- CircleHelp (question)
- CheckCircle2 (correct)
- XCircle (incorrect)
- BarChart3 (results)
- RotateCcw (retry)

**State Management:**

```typescript
interface QuizState {
  currentQuestion: number;
  answers: (string | null)[];
  score: number;
  startTime: Date;
  endTime: Date | null;
  mode: "practice" | "timed";
}
```

---

### 3. Progress Tracking

#### 3.1 Study Statistics

**Priority:** P1 (Should Have)

**Metrics:**

- Cards studied today/total
- Quiz scores (average, last 5 attempts)
- Time spent learning
- Mastery level per section
- Study streak (consecutive days)

**Visualization:**

- Progress bars for each section
- Line chart for quiz score trends (recharts)
- Circular progress for overall mastery
- Calendar heatmap for study streak (future)

**UI Components:**

- Progress component
- Card with statistics
- Badge for milestones

**Icons:**

- TrendingUp (progress)
- Award (achievements)
- Calendar (streak)
- Target (goals)

---

#### 3.2 Learning Goals

**Priority:** P2 (Nice to Have)

**Features:**

- Set daily study goals (cards/time)
- Goal progress notification
- Celebration animation on completion
- Weekly goal summary

**UI Components:**

- Slider (set goals)
- Progress bar
- Confetti animation (canvas-confetti)

---

### 4. Search & Navigation

#### 4.1 Quick Search

**Priority:** P1 (Should Have)

**Features:**

- Instant search across all content
- Keyboard shortcut (Cmd/Ctrl + K)
- Recent searches
- Fuzzy matching

**UI Components:**

- Command Menu (shadcn/ui)
- Input with search icon

**Icons:**

- Search
- Command (keyboard shortcut indicator)

---

#### 4.2 Navigation Structure

**Priority:** P0 (Must Have)

**Layout:**

- Sticky header with app name and language toggle
- Tab navigation for main modes (mobile: bottom, desktop: top)
- Breadcrumb for deep navigation (future)

**Tabs:**

1. 📚 Learn (Overview)
2. 🎴 Cards (Flashcards)
3. 🖼️ Diagram (Interactive)
4. ✅ Quiz
5. 📊 Progress

**UI Components:**

- Tabs (shadcn/ui)
- Sheet for mobile menu

---

### 5. Personalization

#### 5.1 Theme System

**Priority:** P2 (Nice to Have)

**Options:**

- Light mode (default)
- Dark mode
- System preference

**UI Components:**

- Toggle (shadcn/ui)

**Icons:**

- Sun (light)
- Moon (dark)
- Laptop (system)

---

#### 5.2 Study Preferences

**Priority:** P2 (Nice to Have)

**Settings:**

- Auto-play audio (future: pronunciation)
- Animation speed
- Card shuffle on start
- Show/hide memory tricks
- Font size adjustment

**UI Components:**

- Switch toggles
- Slider for adjustments
- Select for options

---

### 6. Data Persistence

#### 6.1 Local Storage Strategy

**Priority:** P0 (Must Have)

**Stored Data:**

- Language preference
- Study progress
- Flashcard performance
- Quiz history
- User settings
- Last visited section

**Data Structure:**

```typescript
interface UserData {
  preferences: {
    language: "en" | "th" | "both";
    theme: "light" | "dark" | "system";
  };
  progress: {
    cardsStudied: string[]; // card IDs
    sectionsCompleted: string[];
    quizAttempts: QuizAttempt[];
    lastStudyDate: Date;
  };
  stats: {
    totalStudyTime: number; // minutes
    studyStreak: number;
    masteryLevels: Record<string, number>; // section: percentage
  };
}
```

---

## 📱 Responsive Design Requirements

### Breakpoints

- Mobile: < 640px (primary focus)
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Mobile Optimizations

- Bottom tab navigation (thumb-friendly)
- Swipe gestures for flashcards
- Collapsible sections to reduce scrolling
- Large touch targets (min 44x44px)
- Optimized images (WebP format)

### Desktop Enhancements

- Side-by-side layout (content + diagram)
- Keyboard shortcuts
- Hover effects
- Multi-column layouts

---

## 🎨 Component Library (shadcn/ui)

### Required Components

- ✅ Accordion
- ✅ Alert / Alert Dialog
- ✅ Badge
- ✅ Button
- ✅ Card
- ✅ Command
- ✅ Dialog
- ✅ Progress
- ✅ RadioGroup
- ✅ Select
- ✅ Sheet
- ✅ Switch
- ✅ Tabs
- ✅ Toast
- ✅ Toggle / Toggle Group
- ✅ Tooltip

### Custom Components to Build

- FlashCard (with 3D flip animation)
- InteractiveDiagram (SVG with click handlers)
- QuizQuestion (polymorphic based on type)
- StatisticsCard
- ProgressRing (circular progress)

---

## 🎯 Lucide Icons Needed

### Navigation & Actions

- Menu, X, ChevronLeft, ChevronRight, ChevronDown, ChevronUp
- Home, ArrowLeft, ExternalLink

### Content & Learning

- BookOpen, BookMarked, Library, GraduationCap
- CreditCard, Layers, FolderOpen
- Eye, EyeOff, Info, HelpCircle

### Progress & Status

- CheckCircle2, XCircle, CircleHelp, AlertCircle
- TrendingUp, BarChart3, LineChart, PieChart
- Award, Trophy, Target, Star

### System & Settings

- Settings, Sliders, Palette, Volume2
- Sun, Moon, Laptop, Languages, Globe
- Search, Command, Keyboard

### Media & Interaction

- Play, Pause, RotateCw, RotateCcw, Shuffle
- ThumbsUp, ThumbsDown, Heart, Share2
- Download, Upload, RefreshCw

### Anatomical (if needed)

- Wind (respiratory), Mic (phonatory), MessageSquare (articulatory)
- Activity (vibration), Workflow (process)

---

## 📊 Success Metrics

### User Engagement

- Daily Active Users (DAU)
- Average session duration (target: 10-15 min)
- Cards studied per session (target: 15-20)
- Quiz completion rate (target: 70%+)

### Learning Effectiveness

- Quiz score improvement over time
- Section mastery percentage
- Retention rate (return after 7 days)
- Time to complete all sections (target: < 3 hours total)

### Technical Performance

- Page load time < 2 seconds
- Time to Interactive (TTI) < 3 seconds
- Lighthouse score > 90
- Zero crashes/errors in production

---

## 🚀 Development Phases

### Phase 1: MVP (Week 1)

**Goal:** Deployable app with core learning features

**Deliverables:**

- ✅ Project setup (React + Vite + TypeScript)
- ✅ shadcn/ui integration
- ✅ Language system (3 modes)
- ✅ Overview mode (all content)
- ✅ Basic flashcard mode (tap to flip)
- ✅ Simple quiz (10 questions, multiple choice)
- ✅ Progress tracking (localStorage)
- ✅ Responsive layout (mobile + desktop)
- ✅ Deployment to Vercel

### Phase 2: Enhanced Interaction (Week 2)

**Goal:** Gamification and better UX

**Deliverables:**

- ✅ Flashcard gestures (swipe)
- ✅ Advanced quiz types (T/F, fill-in-blank)
- ✅ Statistics dashboard
- ✅ Study streak tracking
- ✅ Search functionality
- ✅ Theme toggle (light/dark)
- ✅ Smooth animations

### Phase 3: Advanced Features (Week 3)

**Goal:** Interactive learning tools

**Deliverables:**

- ✅ Interactive diagram mode
- ✅ Audio pronunciation (future)
- ✅ Spaced repetition algorithm
- ✅ Goal setting
- ✅ Export progress (PDF)
- ✅ Share flashcards

### Phase 4: Polish & Optimization (Week 4)

**Goal:** Production-ready quality

**Deliverables:**

- ✅ Performance optimization
- ✅ Accessibility audit (WCAG 2.1 AA)
- ✅ PWA setup (offline mode)
- ✅ Error boundaries
- ✅ Loading states
- ✅ User testing & feedback
- ✅ Analytics integration (optional)

---

## 🎨 Detailed UI/UX Specifications

### Color System

```css
/* Light Mode */
--primary: 262 83% 58%; /* #667eea */
--primary-dark: 262 55% 45%; /* #764ba2 */
--accent: 353 91% 65%; /* #f5576c */
--success: 142 71% 45%; /* #10b981 */
--warning: 38 92% 50%; /* #f59e0b */
--error: 0 84% 60%; /* #ef4444 */

--background: 0 0% 100%; /* #ffffff */
--foreground: 222 47% 11%; /* #1e293b */
--muted: 210 40% 96%; /* #f8fafc */
--border: 214 32% 91%; /* #e2e8f0 */

/* Dark Mode (future) */
--background-dark: 222 47% 11%;
--foreground-dark: 210 40% 98%;
```

### Typography Scale

```css
/* Font Sizes */
--text-xs: 0.75rem; /* 12px */
--text-sm: 0.875rem; /* 14px */
--text-base: 1rem; /* 16px */
--text-lg: 1.125rem; /* 18px */
--text-xl: 1.25rem; /* 20px */
--text-2xl: 1.5rem; /* 24px */
--text-3xl: 1.875rem; /* 30px */
--text-4xl: 2.25rem; /* 36px */

/* Font Weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### Spacing System

```css
/* Follows 8px grid */
--spacing-1: 0.25rem; /* 4px */
--spacing-2: 0.5rem; /* 8px */
--spacing-3: 0.75rem; /* 12px */
--spacing-4: 1rem; /* 16px */
--spacing-5: 1.25rem; /* 20px */
--spacing-6: 1.5rem; /* 24px */
--spacing-8: 2rem; /* 32px */
--spacing-10: 2.5rem; /* 40px */
--spacing-12: 3rem; /* 48px */
```

### Border Radius

```css
--radius-sm: 0.375rem; /* 6px */
--radius-md: 0.5rem; /* 8px */
--radius-lg: 0.75rem; /* 12px */
--radius-xl: 1rem; /* 16px */
--radius-2xl: 1.5rem; /* 24px */
--radius-full: 9999px;
```

### Animation Timings

```css
--duration-fast: 150ms;
--duration-base: 250ms;
--duration-slow: 350ms;
--duration-slower: 500ms;

--easing-default: cubic-bezier(0.4, 0, 0.2, 1);
--easing-in: cubic-bezier(0.4, 0, 1, 1);
--easing-out: cubic-bezier(0, 0, 0.2, 1);
--easing-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

---

## 🎯 Key User Flows

### Flow 1: First-Time User

1. Land on app → See welcome screen (optional skip)
2. Choose language preference → Persisted
3. View quick tutorial (swipeable cards) → Skip option
4. Start with Overview mode → Progress indicator
5. Explore tabs → Tooltip hints on first visit
6. Complete first quiz → Celebration animation
7. View progress → Encourage return tomorrow

### Flow 2: Quick Review Session

1. Open app → Resume from last position
2. Navigate to Flashcards
3. Select "Today's Review" (due cards)
4. Swipe through 10-15 cards (5 min session)
5. See session summary
6. Optional: Quick quiz (5 questions)
7. Update streak + save progress

### Flow 3: Exam Preparation

1. Open app → See study goal reminder
2. Study Overview (read mode)
3. Practice with Flashcards (all categories)
4. Review Interactive Diagram
5. Take comprehensive Quiz (20 questions)
6. Review incorrect answers with explanations
7. Export summary/weak areas (future)

---

## 🔒 Privacy & Data

### Data Collection

- **NO personal information collected**
- **NO user accounts required**
- **NO analytics by default** (optional opt-in future)

### Data Storage

- All data stored locally (localStorage)
- No server-side storage
- User owns their data
- Export/import capability (future)

### GDPR Compliance

- Since no PII collected, minimal compliance needed
- Clear about what's stored locally
- Easy data deletion (clear all button)

---

## ♿ Accessibility Requirements

### WCAG 2.1 AA Compliance

**Keyboard Navigation:**

- All interactive elements keyboard accessible
- Visible focus indicators
- Logical tab order
- Skip to content link

**Screen Reader Support:**

- Semantic HTML
- ARIA labels where needed
- Alt text for all images/diagrams
- Announcement for dynamic content

**Visual:**

- Color contrast ratio ≥ 4.5:1 for text
- ≥ 3:1 for UI components
- No information conveyed by color alone
- Resizable text (up to 200%)
- Dyslexia-friendly font option (future)

**Motor:**

- Large touch targets (44x44px min)
- No timing-dependent actions
- Swipe alternative (buttons)
- Voice control compatible (future)

**Cognitive:**

- Clear, simple language
- Consistent navigation
- Error prevention & recovery
- Progress saved automatically

---

## 🐛 Error Handling

### Error Boundaries

- Catch React component errors
- Display friendly error message
- Option to reload or continue
- Log error to console (dev mode)

### Data Corruption

- Validate localStorage data on load
- Fallback to defaults if corrupted
- Backup before major updates
- Clear data option in settings

### Network Issues

- App works offline (after first load)
- Graceful degradation if CDN fails
- Retry mechanism for failed loads

---

## 🧪 Testing Strategy

### Unit Tests (Vitest)

- Utility functions (language switching, scoring)
- Data transformation logic
- Local storage operations

### Component Tests (React Testing Library)

- User interactions (click, swipe, type)
- Conditional rendering
- Prop variations

### Integration Tests

- Full user flows
- State persistence
- Cross-component communication

### E2E Tests (Playwright) - Phase 4

- Critical paths (study, quiz, progress)
- Cross-browser compatibility
- Mobile device testing

### Manual Testing Checklist

- [ ] All features work in latest Chrome, Firefox, Safari
- [ ] Mobile responsive (iOS Safari, Chrome Android)
- [ ] Keyboard navigation complete
- [ ] Screen reader announces correctly
- [ ] No console errors/warnings
- [ ] Fast load time on 3G
- [ ] Works offline after first visit

---

## 📦 Deployment Strategy

### Hosting: Vercel (Recommended)

**Why:**

- Zero-config deployment
- Automatic HTTPS
- Edge network (fast globally)
- Preview deployments
- Free tier sufficient

**Alternatives:**

- Netlify
- GitHub Pages
- Cloudflare Pages

### Domain

- Option 1: Free Vercel subdomain (phoneticards.vercel.app)
- Option 2: Custom domain (future purchase)

### CI/CD Pipeline

1. Push to GitHub
2. Automatic build on Vercel
3. Run tests
4. Deploy to preview URL
5. Merge to main → Production deploy

### Environment Variables

```env
VITE_APP_VERSION=1.0.0
VITE_APP_NAME=PhonetiCards
# Future: Analytics, feature flags
```

---

## 📚 Content Specifications

### Total Content Required

**Overview Mode:**

- ~2,500-3,000 words (English)
- ~2,500-3,000 words (Thai translation)
- 10-15 diagrams/illustrations
- 20-30 highlighted key terms

**Flashcards:**

- 50 cards minimum
  - 20 Organ Names
  - 15 Functions
  - 10 Memory Tricks
  - 5 Diagram-based

**Quiz Questions:**

- 30 questions minimum
  - 15 Multiple Choice
  - 10 True/False
  - 5 Fill-in-Blank (future: image-based)

**Interactive Diagram:**

- 1 main SVG diagram
- 12-15 clickable regions
- Detailed info for each organ (100-150 words)

---

## 🎨 Asset Requirements

### Images

- App icon (512x512px, PNG)
- Favicon (multiple sizes)
- OG image for social sharing (1200x630px)
- Speech organ diagram (SVG preferred)
- Placeholder images for loading states

### Icons

- All Lucide React (no custom needed initially)
- Future: Custom anatomical icons

### Fonts

- Primary: Inter (Google Fonts)
- Thai: Noto Sans Thai (Google Fonts)
- Fallback: System fonts

---

## 🔮 Future Enhancements (Post-MVP)

### Phase 5+

- 🔊 Audio pronunciation for phonetic symbols
- 🎥 Video explanations (embedded YouTube)
- 🤝 Collaborative study (share quiz results)
- 📱 Mobile app (React Native)
- 🧠 Spaced repetition algorithm (SM-2)
- 🏆 Achievements & badges
- 📊 Advanced analytics (study patterns)
- 🌏 More languages (Chinese, Japanese, Korean)
- 💾 Cloud sync (optional account)
- 📤 Export to Anki format
- 🎮 Gamification (XP, levels, leaderboards)
- 👥 Teacher dashboard (create custom quizzes)
- 📝 Note-taking feature
- 🔗 Integration with course management systems

---

## 📞 Support & Maintenance

### Documentation

- README with setup instructions
- Contributing guidelines
- Code comments for complex logic
- Component Storybook (future)

### User Support

- FAQ section in app
- Contact form (email)
- GitHub issues for bug reports

### Maintenance Plan

- Monthly dependency updates
- Quarterly content review
- Annual major version update

---

## 📄 Appendix

### A. Technical Dependencies

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@radix-ui/react-*": "latest", // shadcn/ui components
    "lucide-react": "^0.300.0",
    "tailwindcss": "^3.4.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.0.0",
    "date-fns": "^3.0.0", // Date formatting
    "zustand": "^4.4.0", // State management (alternative to Context)
    "react-router-dom": "^6.20.0" // If multi-page needed
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.2.0",
    "typescript": "^5.3.0",
    "vite": "^5.0.0",
    "vitest": "^1.0.0",
    "@testing-library/react": "^14.0.0",
    "eslint": "^8.55.0",
    "prettier": "^3.1.0"
  }
}
```

### B. Folder Structure

```
phoneticards/
├── public/
│   ├── favicon.ico
│   ├── logo.svg
│   └── diagrams/
│       └── speech-organs.svg
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   ├── FlashCard.tsx
│   │   ├── QuizQuestion.tsx
│   │   ├── InteractiveDiagram.tsx
│   │   └── StatisticsCard.tsx
│   ├── contexts/
│   │   ├── LanguageContext.tsx
│   │   ├── ProgressContext.tsx
│   │   └── ThemeContext.tsx
│   ├── data/
│   │   ├── content.ts       # Bilingual content
│   │   ├── flashcards.ts
│   │   └── quizQuestions.ts
│   ├── hooks/
│   │   ├── useLocalStorage.ts
│   │   ├── useProgress.ts
│   │   └── useLanguage.ts
│   ├── lib/
│   │   ├── utils.ts
│   │   └── storage.ts
│   ├── pages/
│   │   ├── Overview.tsx
│   │   ├── Flashcards.tsx
│   │   ├── Diagram.tsx
│   │   ├── Quiz.tsx
│   │   └── Progress.tsx
│   ├── styles/
│   │   └── globals.css
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   └── main.tsx
├── .env.example
├── .gitignore
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── README.md
```

### C. Code Standards

**TypeScript:**

- Strict mode enabled
- No `any` types (use `unknown` if needed)
- Explicit return types for functions
- Interface over Type for objects

**React:**

- Functional components only
- Custom hooks for reusable logic
- Props destructuring
- Meaningful component names (PascalCase)

**CSS:**

- Tailwind utility classes preferred
- Custom CSS only when necessary
- BEM methodology for custom classes
- Mobile-first media queries

**Git:**

- Conventional commits (feat, fix, docs, style, refactor, test, chore)
- Feature branches
- PR required for main branch

---

## ✅ Definition of Done

A feature is considered complete when:

- [ ] Code implemented and working
- [ ] Responsive on mobile & desktop
- [ ] Bilingual content added (EN & TH)
- [ ] Accessible (keyboard + screen reader)
- [ ] Unit tests written (if applicable)
- [ ] Manually tested in Chrome, Firefox, Safari
- [ ] No console errors or warnings
- [ ] Code reviewed and merged
- [ ] Deployed to production
- [ ] Documentation updated

---

## 📝 Sign-off

**Product Owner:** Kevin  
**Expected Launch:** Week 1 completion  
**Success Criteria:**

- MVP deployed and functional
- Positive feedback from girlfriend (primary user)
- Quiz score improvement demonstrated
- Daily usage for 7 consecutive days

---

**Document Version:** 1.0  
**Last Updated:** November 24, 2024  
**Next Review:** After Phase 1 completion

---

## 🎯 Quick Start Checklist for Developer

- [ ] Read full PRD
- [ ] Set up React + Vite + TypeScript project
- [ ] Install and configure shadcn/ui
- [ ] Create folder structure
- [ ] Set up Tailwind with color system
- [ ] Implement language context
- [ ] Build basic layout with tabs
- [ ] Create content data files (bilingual)
- [ ] Develop Overview page
- [ ] Build FlashCard component
- [ ] Create Quiz functionality
- [ ] Implement localStorage
- [ ] Make fully responsive
- [ ] Deploy to Vercel
- [ ] Test with real user
- [ ] Iterate based on feedback

**Ready to build! 🚀**
