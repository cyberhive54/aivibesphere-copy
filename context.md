AI VibeSphere
🏗️ Architecture Overview
Tech Stack
Frontend: React 18 + Vite + TailwindCSS
Database: Supabase (PostgreSQL)
Authentication: Supabase Auth
State Management: React Context + Local Storage
Routing: React Router v6
Styling: Custom design system with neumorphic cards


Core Database Schema
- user_profiles (id, email, full_name, role, avatar_url)
- tools (id, name, slug, category, description, features[], logo_url, referral_url, pricing_type, average_rating, view_count, is_featured)
- ratings (id, user_id, tool_id, rating, comment, is_verified)
- submissions (id, submitter_name, tool_name, status, admin_notes)
- tool_comparisons (id, user_id, tool_ids[], comparison_data)

🎯 Key Features & Pages
1. Homepage (/homepage)
Hero section with search
Category chips navigation
Featured tools showcase
Category sections (productivity, design, writing, coding)
Newsletter signup
All data from Supabase via toolsService

2. Tool Detail Page (/tool-detail-page)
Tool hero with logo, rating, stats
Tabbed interface (overview, features, pricing, reviews)
Rating system for authenticated users
Related tools sidebar
Comparison cart integration

3. Category Listing (/category-listing-page)
Advanced filtering (category, rating, price, type)
Sorting options (name, rating, views, recent)
Tool grid with pagination
Active filters display
Search functionality

4. Tool Comparison (/tool-comparison-page)
Side-by-side comparison table
Mobile-optimized view
Export to PDF functionality
Persistent comparison cart
Local storage integration

5. Tool Submission (/tool-submission-form)
Multi-step form (5 steps)
Auto-save drafts
Media upload handling
Admin review workflow
Success modal with tracking

6. Admin Dashboard (/admin-dashboard)
Metrics cards with statistics
Pending submissions management
User management table
Tool management with inline editing
Analytics charts (Recharts)
Activity feed & notifications

🔧 Core Services & Utils
Authentication (authService.js)
Supabase auth integration
User profile management
Role-based access (admin/user)
Session handling with error recovery
Tools Management (toolsService.js)
CRUD operations for tools
Search & filtering
View count tracking
Category-based queries
Featured tools logic
Ratings System (ratingsService.js)
User rating submission
Rating statistics
Duplicate prevention
Review management
Submissions (submissionsService.js)
Tool submission workflow
Admin approval process
Status tracking
Bulk operations
🎨 Design System

Color Scheme (Dark Theme)

- Primary: #6366F1 (indigo)
- Secondary: #8B5CF6 (violet)
- Accent: #10B981 (emerald)
- Background: #0A0A0A (black)
- Surface: #1A1A1A (dark gray)
- Text Primary: #F9FAFB (light)

Key Components

Neumorphic Cards: Custom shadow system
Glass Panels: Backdrop blur effects
Smooth Transitions: 200ms cubic-bezier
Focus Rings: Accessibility-first
Responsive Grid: Mobile-first approach

🔄 State Management
Authentication Context
User session state
Profile data
Loading states
Error handling
Comparison Cart
Persistent local storage
Max 4 tools limit
Cross-page synchronization
Event-driven updates
Form State
Auto-save drafts
Multi-step validation
Error state management
Progress tracking

📱 Responsive Design
Breakpoints
Mobile: < 768px
Tablet: 768px - 1024px
Desktop: > 1024px
Mobile Optimizations
Collapsible navigation
Touch-friendly buttons
Swipe gestures
Optimized comparison view

🔐 Security & Permissions
Row Level Security (RLS)
User profiles: Own data access
Ratings: Authenticated users only
Tools: Public read, admin write
Submissions: Public create, admin manage
Admin Features
Protected routes
Role-based UI
Bulk operations
Analytics access

📊 Data Flow
Tool Discovery Flow
Homepage → Category selection
Category page → Filtering/Search
Tool detail → Rating/Comparison
Comparison page → Decision making
Submission Flow
Form submission → Database storage
Admin review → Approval/Rejection
Tool creation → Public listing
User notification → Email updates

🚀 Performance Optimizations
Loading States
Skeleton loaders for all data fetching
Progressive image loading
Lazy loading for heavy components
Error boundaries for resilience
Caching Strategy
Local storage for user preferences
Session storage for form drafts
Optimistic UI updates
Debounced search/filters

🎯 Key Business Logic
Tool Categories (16 total)
productivity, design, writing, coding
marketing, sales, analytics, video
audio, image, chatbot, automation
business, education, finance, research
Pricing Types
free, freemium, paid, one_time
Rating System
1-5 star scale
One rating per user per tool
Automatic average calculation
Review comments optional
Submission Workflow
pending → approved/rejected
Admin notes and tracking
Email notifications
Tool creation on approval
