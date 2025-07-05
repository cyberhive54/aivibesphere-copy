/*
  # Add Comprehensive AI Tools Catalog

  1. New Tools Added
    - 80+ tools across all 16 categories
    - Each category has 5-6 high-quality tools
    - Realistic pricing, ratings, and feature data
    - Professional descriptions and proper categorization

  2. Categories Covered
    - Productivity (6 tools): Notion, Todoist, Zapier, ClickUp, RescueTime, Forest
    - Design (6 tools): Figma, Adobe Creative Cloud, Sketch, Framer, InVision, Webflow
    - Writing (6 tools): Jasper AI, Copy.ai, Writesonic, Hemingway Editor, Ulysses, ProWritingAid
    - Coding (5 tools): Replit, CodePen, Tabnine, GitKraken, Postman
    - Marketing (6 tools): HubSpot, Mailchimp, Hootsuite, SEMrush, Buffer, ConvertKit
    - Sales (6 tools): Salesforce, Pipedrive, Outreach, Gong, ZoomInfo, Apollo
    - Analytics (6 tools): Google Analytics, Mixpanel, Amplitude, Hotjar, Tableau, Power BI
    - Video (6 tools): Loom, Camtasia, Premiere Pro, Final Cut Pro, DaVinci Resolve, Filmora
    - Audio (6 tools): Audacity, Adobe Audition, Logic Pro, Pro Tools, Reaper, FL Studio
    - Image (5 tools): Photoshop, GIMP, Affinity Photo, Pixelmator Pro, Luminar
    - Chatbot (5 tools): Claude, Bard, Intercom, Drift, Chatfuel
    - Automation (5 tools): IFTTT, Power Automate, n8n, Integromat, Automate.io
    - Business (6 tools): Slack, Microsoft Teams, Zoom, Asana, Trello, Monday.com
    - Education (6 tools): Khan Academy, Coursera, Udemy, Skillshare, Duolingo, Anki
    - Finance (6 tools): QuickBooks, Mint, YNAB, Personal Capital, Robinhood, FreshBooks
    - Research (6 tools): Zotero, Mendeley, ResearchGate, Evernote, Roam Research, Obsidian

  3. Data Quality
    - Realistic view counts, ratings, and review numbers
    - Proper pricing information for each tool
    - Comprehensive feature lists
    - High-quality logo URLs from Unsplash
    - Accurate referral URLs
*/

-- Insert comprehensive tools data for all categories
INSERT INTO public.tools (
  name, slug, category, description, features, logo_url, referral_url, 
  pricing_type, price_info, is_featured, view_count, average_rating, rating_count
) VALUES

-- Productivity Tools (6 tools)
('Notion', 'notion', 'productivity', 
'All-in-one workspace that combines notes, tasks, wikis, and databases for ultimate productivity.',
'{"Note Taking", "Task Management", "Database", "Templates", "Team Collaboration", "AI Assistant"}',
'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=128&h=128&fit=crop',
'https://notion.so', 'freemium', 'Free for personal use, $8/month for teams', true, 45000, 4.6, 892),

('Todoist', 'todoist', 'productivity',
'Powerful task management app that helps you organize your work and life.',
'{"Task Management", "Project Organization", "Natural Language", "Labels & Filters", "Karma System"}',
'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=128&h=128&fit=crop',
'https://todoist.com', 'freemium', 'Free tier, Pro at $4/month', false, 28500, 4.4, 567),

('Zapier', 'zapier', 'productivity',
'Automation platform that connects your favorite apps and services.',
'{"App Integrations", "Workflow Automation", "Triggers & Actions", "Multi-step Zaps", "Team Collaboration"}',
'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=128&h=128&fit=crop',
'https://zapier.com', 'freemium', 'Free for 100 tasks/month, $19.99/month for more', false, 67800, 4.5, 1203),

('ClickUp', 'clickup', 'productivity',
'Complete productivity platform with docs, reminders, goals, calendars, and chat.',
'{"Project Management", "Time Tracking", "Goal Setting", "Docs & Wiki", "Custom Fields"}',
'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=128&h=128&fit=crop',
'https://clickup.com', 'freemium', 'Free for small teams, $7/month per user', false, 34200, 4.3, 789),

('RescueTime', 'rescuetime', 'productivity',
'Time tracking software that helps you understand your daily habits.',
'{"Automatic Time Tracking", "Productivity Score", "Website Blocking", "Detailed Reports", "Goal Setting"}',
'https://images.unsplash.com/photo-1495364141860-b0d03eccd065?w=128&h=128&fit=crop',
'https://rescuetime.com', 'freemium', 'Free version, $12/month for premium', false, 19800, 4.2, 345),

('Forest', 'forest', 'productivity',
'Gamified focus app that helps you stay concentrated and build healthy habits.',
'{"Pomodoro Timer", "Gamification", "Focus Sessions", "Statistics", "Real Tree Planting"}',
'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=128&h=128&fit=crop',
'https://forestapp.cc', 'paid', '$3.99 one-time purchase', false, 15600, 4.7, 234),

-- Design Tools (6 tools)
('Figma', 'figma', 'design',
'Collaborative design tool for creating user interfaces, prototypes, and design systems.',
'{"UI/UX Design", "Prototyping", "Team Collaboration", "Design Systems", "Auto Layout", "Plugins"}',
'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=128&h=128&fit=crop',
'https://figma.com', 'freemium', 'Free for individuals, $12/month per editor', true, 89000, 4.8, 1567),

('Adobe Creative Cloud', 'adobe-creative-cloud', 'design',
'Complete creative suite including Photoshop, Illustrator, InDesign, and more.',
'{"Photo Editing", "Vector Graphics", "Layout Design", "Video Editing", "Cloud Sync", "Creative Assets"}',
'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=128&h=128&fit=crop',
'https://adobe.com', 'paid', '$20.99/month for single app, $54.99/month for all apps', true, 156000, 4.5, 2890),

('Sketch', 'sketch', 'design',
'Digital design toolkit for creating beautiful user interfaces and experiences.',
'{"Vector Editing", "Symbols & Libraries", "Prototyping", "Collaboration", "Plugin Ecosystem"}',
'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=128&h=128&fit=crop',
'https://sketch.com', 'paid', '$9/month per editor', false, 45600, 4.4, 678),

('Framer', 'framer', 'design',
'Interactive design tool for creating high-fidelity prototypes and animations.',
'{"Interactive Prototyping", "Animation", "Design System", "Code Components", "Real Data"}',
'https://images.unsplash.com/photo-1558655146-d09347e92766?w=128&h=128&fit=crop',
'https://framer.com', 'freemium', 'Free for 3 projects, $20/month for unlimited', false, 23400, 4.6, 456),

('InVision', 'invision', 'design',
'Complete design platform for creating prototypes, collaboration, and workflow management.',
'{"Prototyping", "Design Collaboration", "Feedback Collection", "Design System Manager", "Handoff"}',
'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=128&h=128&fit=crop',
'https://invisionapp.com', 'freemium', 'Free for 1 prototype, $7.95/month for unlimited', false, 34500, 4.2, 567),

('Webflow', 'webflow', 'design',
'Visual web design tool that generates clean HTML, CSS, and JavaScript.',
'{"Visual Design", "CMS", "E-commerce", "Hosting", "Responsive Design", "Interactions"}',
'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=128&h=128&fit=crop',
'https://webflow.com', 'freemium', 'Free for 2 projects, $12/month for basic', false, 67800, 4.7, 890),

-- Writing Tools (6 tools)
('Jasper AI', 'jasper-ai', 'writing',
'AI writing assistant that helps create high-quality content for blogs, ads, and more.',
'{"AI Content Generation", "SEO Writing", "Brand Voice", "Template Library", "Plagiarism Checker"}',
'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=128&h=128&fit=crop',
'https://jasper.ai', 'paid', 'Starting at $29/month', true, 78900, 4.5, 1234),

('Copy.ai', 'copy-ai', 'writing',
'AI-powered copywriting tool for marketing content, emails, and social media.',
'{"Copy Generation", "Marketing Templates", "Blog Writing", "Email Templates", "Social Media Content"}',
'https://images.unsplash.com/photo-1486312338219-ce68e2c6b7d3?w=128&h=128&fit=crop',
'https://copy.ai', 'freemium', 'Free for 2000 words/month, $36/month for unlimited', false, 45600, 4.3, 789),

('Writesonic', 'writesonic', 'writing',
'AI writer that creates SEO-friendly content for blogs, Facebook ads, Google ads, and more.',
'{"Article Writing", "Ad Copy", "Landing Pages", "SEO Content", "Paraphrasing", "Summarizer"}',
'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=128&h=128&fit=crop',
'https://writesonic.com', 'freemium', 'Free for 10,000 words/month, $12.67/month for unlimited', false, 34200, 4.2, 567),

('Hemingway Editor', 'hemingway-editor', 'writing',
'Writing app that makes your writing bold and clear by highlighting complex sentences.',
'{"Readability Analysis", "Grammar Check", "Style Suggestions", "Word Count", "Publishing Tools"}',
'https://images.unsplash.com/photo-1471440671318-55bdbb772f93?w=128&h=128&fit=crop',
'https://hemingwayapp.com', 'freemium', 'Free web version, $19.99 for desktop app', false, 23400, 4.4, 345),

('Ulysses', 'ulysses', 'writing',
'Powerful writing app for Mac, iPad, and iPhone with markdown support and organization.',
'{"Markdown Writing", "Organization", "Publishing", "Goal Setting", "Distraction-Free Mode"}',
'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=128&h=128&fit=crop',
'https://ulysses.app', 'paid', '$5.99/month or $49.99/year', false, 19800, 4.6, 234),

('ProWritingAid', 'prowritingaid', 'writing',
'Grammar checker and writing mentor that helps improve your writing style and clarity.',
'{"Grammar Check", "Style Analysis", "Plagiarism Detection", "Readability Report", "Writing Goals"}',
'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=128&h=128&fit=crop',
'https://prowritingaid.com', 'freemium', 'Free for 500 words, $20/month for unlimited', false, 28500, 4.3, 456),

-- Coding Tools (5 tools - GitHub Copilot already exists)
('Replit', 'replit', 'coding',
'Online IDE that lets you instantly code in 50+ languages in your browser.',
'{"Online IDE", "Collaboration", "50+ Languages", "Deployment", "Version Control", "AI Assistant"}',
'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=128&h=128&fit=crop',
'https://replit.com', 'freemium', 'Free tier, $7/month for more resources', false, 56700, 4.4, 789),

('CodePen', 'codepen', 'coding',
'Online code editor and learning environment for front-end web development.',
'{"Code Editor", "Live Preview", "Collaboration", "CodePen Pro", "Asset Hosting", "Private Pens"}',
'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=128&h=128&fit=crop',
'https://codepen.io', 'freemium', 'Free for public pens, $8/month for pro features', false, 67800, 4.5, 1012),

('Tabnine', 'tabnine', 'coding',
'AI code completion tool that predicts and suggests your next lines of code.',
'{"AI Code Completion", "Multiple IDEs", "Team Learning", "Code Privacy", "Language Support"}',
'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=128&h=128&fit=crop',
'https://tabnine.com', 'freemium', 'Free for basic, $12/month for pro', false, 34200, 4.3, 567),

('GitKraken', 'gitkraken', 'coding',
'Git GUI client that makes Git commands and workflow simple and intuitive.',
'{"Git GUI", "Visual Commit History", "Merge Conflict Editor", "Integration", "Team Features"}',
'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=128&h=128&fit=crop',
'https://gitkraken.com', 'freemium', 'Free for public repos, $4.95/month for private', false, 23400, 4.2, 345),

('Postman', 'postman', 'coding',
'API development environment that makes it easy to create, share, test and document APIs.',
'{"API Testing", "Documentation", "Mock Servers", "Monitoring", "Team Collaboration", "Automation"}',
'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=128&h=128&fit=crop',
'https://postman.com', 'freemium', 'Free for small teams, $12/month per user', true, 89000, 4.6, 1456),

-- Marketing Tools (6 tools)
('HubSpot', 'hubspot', 'marketing',
'Complete CRM platform with marketing, sales, and service software.',
'{"CRM", "Email Marketing", "Lead Generation", "Analytics", "Content Management", "Social Media"}',
'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=128&h=128&fit=crop',
'https://hubspot.com', 'freemium', 'Free CRM, $45/month for marketing features', true, 123000, 4.5, 2345),

('Mailchimp', 'mailchimp', 'marketing',
'Email marketing platform that helps you design, send, and analyze email campaigns.',
'{"Email Marketing", "Automation", "Landing Pages", "Social Media Ads", "Analytics", "A/B Testing"}',
'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=128&h=128&fit=crop',
'https://mailchimp.com', 'freemium', 'Free for 2,000 contacts, $10/month for more features', false, 67800, 4.3, 1234),

('Hootsuite', 'hootsuite', 'marketing',
'Social media management platform that helps you schedule and manage all your social channels.',
'{"Social Media Scheduling", "Analytics", "Team Collaboration", "Content Curation", "Social Listening"}',
'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=128&h=128&fit=crop',
'https://hootsuite.com', 'freemium', 'Free for 3 social profiles, $49/month for more', false, 45600, 4.2, 789),

('SEMrush', 'semrush', 'marketing',
'All-in-one tool suite for improving online visibility and discovering marketing insights.',
'{"SEO Analysis", "Keyword Research", "Competitor Analysis", "PPC Management", "Content Marketing"}',
'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=128&h=128&fit=crop',
'https://semrush.com', 'paid', 'Starting at $119.95/month', true, 89000, 4.4, 1567),

('Buffer', 'buffer', 'marketing',
'Social media management tool that helps you schedule posts, analyze performance, and manage accounts.',
'{"Social Scheduling", "Analytics", "Team Collaboration", "Content Planning", "Publishing Tools"}',
'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=128&h=128&fit=crop',
'https://buffer.com', 'freemium', 'Free for 3 channels, $5/month for more', false, 34200, 4.1, 567),

('ConvertKit', 'convertkit', 'marketing',
'Email marketing platform designed for creators to grow and monetize their audience.',
'{"Email Marketing", "Automation", "Landing Pages", "Forms", "Tagging", "Subscriber Management"}',
'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=128&h=128&fit=crop',
'https://convertkit.com', 'freemium', 'Free for 1,000 subscribers, $29/month for more', false, 23400, 4.3, 345),

-- Sales Tools (6 tools)
('Salesforce', 'salesforce', 'sales',
'World\'s leading customer relationship management (CRM) platform.',
'{"CRM", "Sales Analytics", "Lead Management", "Opportunity Tracking", "Mobile App", "Automation"}',
'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=128&h=128&fit=crop',
'https://salesforce.com', 'paid', 'Starting at $25/month per user', true, 156000, 4.2, 3456),

('Pipedrive', 'pipedrive', 'sales',
'Sales CRM and pipeline management tool designed to help small sales teams sell more efficiently.',
'{"Pipeline Management", "Contact Management", "Email Integration", "Sales Reporting", "Mobile App"}',
'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=128&h=128&fit=crop',
'https://pipedrive.com', 'paid', 'Starting at $14.90/month per user', false, 67800, 4.4, 1234),

('Outreach', 'outreach', 'sales',
'Sales engagement platform that helps sales teams efficiently and effectively engage prospects.',
'{"Email Sequences", "Call Management", "Social Selling", "Analytics", "A/B Testing", "CRM Integration"}',
'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=128&h=128&fit=crop',
'https://outreach.io', 'paid', 'Contact for pricing', false, 45600, 4.3, 789),

('Gong', 'gong', 'sales',
'Revenue intelligence platform that captures and analyzes all sales communications.',
'{"Call Recording", "Conversation Analytics", "Deal Intelligence", "Coaching", "Forecasting"}',
'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop',
'https://gong.io', 'paid', 'Contact for pricing', true, 34200, 4.5, 567),

('ZoomInfo', 'zoominfo', 'sales',
'Go-to-market intelligence platform with comprehensive B2B database and insights.',
'{"Contact Database", "Company Intelligence", "Intent Data", "Email Finder", "CRM Integration"}',
'https://images.unsplash.com/photo-1486312338219-ce68e2c6b7d3?w=128&h=128&fit=crop',
'https://zoominfo.com', 'paid', 'Contact for pricing', false, 78900, 4.1, 1012),

('Apollo', 'apollo', 'sales',
'Unified platform that gives you the ability to find, engage, and close your ideal buyers.',
'{"Prospecting", "Email Sequences", "Dialer", "CRM", "Analytics", "Chrome Extension"}',
'https://images.unsplash.com/photo-1551434678-e076c223a692?w=128&h=128&fit=crop',
'https://apollo.io', 'freemium', 'Free for 50 contacts/month, $49/month for more', false, 23400, 4.2, 345),

-- Analytics Tools (6 tools)
('Google Analytics', 'google-analytics', 'analytics',
'Web analytics service that tracks and reports website traffic and user behavior.',
'{"Website Analytics", "Real-time Data", "Audience Insights", "Conversion Tracking", "Custom Reports"}',
'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=128&h=128&fit=crop',
'https://analytics.google.com', 'free', 'Free with Google account', true, 234000, 4.3, 4567),

('Mixpanel', 'mixpanel', 'analytics',
'Product analytics platform that helps you understand user behavior and improve engagement.',
'{"Event Tracking", "Funnel Analysis", "Cohort Analysis", "A/B Testing", "Push Notifications"}',
'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=128&h=128&fit=crop',
'https://mixpanel.com', 'freemium', 'Free for 100k events/month, $25/month for more', false, 89000, 4.4, 1234),

('Amplitude', 'amplitude', 'analytics',
'Digital analytics platform that helps you understand your users\' journey and optimize experiences.',
'{"User Journey Analysis", "Behavioral Cohorts", "Predictive Analytics", "Experimentation", "Personalization"}',
'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=128&h=128&fit=crop',
'https://amplitude.com', 'freemium', 'Free for 10M events/month, contact for pricing', true, 67800, 4.5, 890),

('Hotjar', 'hotjar', 'analytics',
'Website heatmaps and behavior analytics tool that shows you how users interact with your site.',
'{"Heatmaps", "Session Recordings", "Surveys", "Feedback Polls", "Conversion Funnels"}',
'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=128&h=128&fit=crop',
'https://hotjar.com', 'freemium', 'Free for 35 sessions/day, $32/month for more', false, 45600, 4.2, 678),

('Tableau', 'tableau', 'analytics',
'Business intelligence platform that helps you see and understand your data.',
'{"Data Visualization", "Interactive Dashboards", "Data Preparation", "Statistical Analysis", "Collaboration"}',
'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=128&h=128&fit=crop',
'https://tableau.com', 'paid', 'Starting at $70/month per user', true, 123000, 4.3, 1890),

('Power BI', 'power-bi', 'analytics',
'Business analytics tool by Microsoft that provides interactive visualizations and business intelligence.',
'{"Data Visualization", "Self-Service BI", "Real-time Analytics", "Mobile Apps", "AI Insights"}',
'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=128&h=128&fit=crop',
'https://powerbi.microsoft.com', 'freemium', 'Free version, $10/month per user for Pro', false, 89000, 4.1, 1567),

-- Video Tools (6 tools)
('Loom', 'loom', 'video',
'Video messaging tool that helps you communicate more effectively with quick screen recordings.',
'{"Screen Recording", "Webcam Recording", "Video Editing", "Sharing", "Analytics", "Transcription"}',
'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=128&h=128&fit=crop',
'https://loom.com', 'freemium', 'Free for 25 videos, $8/month for unlimited', true, 78900, 4.6, 1234),

('Camtasia', 'camtasia', 'video',
'Screen recording and video editing software for creating professional-looking videos.',
'{"Screen Recording", "Video Editing", "Templates", "Animations", "Captions", "Quizzing"}',
'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=128&h=128&fit=crop',
'https://techsmith.com/camtasia', 'paid', '$249.99 one-time purchase', false, 45600, 4.4, 567),

('Premiere Pro', 'premiere-pro', 'video',
'Professional video editing software used by filmmakers, YouTubers, and video professionals.',
'{"Professional Editing", "Color Grading", "Audio Editing", "Motion Graphics", "Multi-cam Editing"}',
'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=128&h=128&fit=crop',
'https://adobe.com/premiere', 'paid', '$20.99/month', true, 123000, 4.5, 2345),

('Final Cut Pro', 'final-cut-pro', 'video',
'Professional video editing application designed exclusively for Mac users.',
'{"Magnetic Timeline", "Multicam Editing", "360° Video", "HDR Support", "Advanced Color Grading"}',
'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=128&h=128&fit=crop',
'https://apple.com/final-cut-pro', 'paid', '$299.99 one-time purchase', false, 67800, 4.6, 890),

('DaVinci Resolve', 'davinci-resolve', 'video',
'Professional video editing, color correction, visual effects and audio post-production.',
'{"Video Editing", "Color Correction", "Visual Effects", "Audio Post", "Collaboration"}',
'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=128&h=128&fit=crop',
'https://blackmagicdesign.com/davinci', 'freemium', 'Free version, $295 for Studio', false, 89000, 4.7, 1456),

('Filmora', 'filmora', 'video',
'Easy-to-use video editing software with a wide range of creative features.',
'{"Drag & Drop Editing", "Effects Library", "Color Grading", "Audio Editing", "Screen Recording"}',
'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=128&h=128&fit=crop',
'https://filmora.wondershare.com', 'paid', '$49.99/year', false, 34200, 4.2, 456),

-- Audio Tools (6 tools)
('Audacity', 'audacity', 'audio',
'Free, open-source, cross-platform audio software for recording and editing sounds.',
'{"Audio Recording", "Multi-track Editing", "Effects", "Noise Reduction", "Export Formats"}',
'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=128&h=128&fit=crop',
'https://audacityteam.org', 'free', 'Free and open source', false, 67800, 4.3, 1234),

('Adobe Audition', 'adobe-audition', 'audio',
'Professional audio workstation for editing, mixing, and restoring audio content.',
'{"Multitrack Editing", "Spectral Display", "Audio Restoration", "Real-time Effects", "Mixing"}',
'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=128&h=128&fit=crop',
'https://adobe.com/audition', 'paid', '$20.99/month', true, 45600, 4.4, 678),

('Logic Pro', 'logic-pro', 'audio',
'Professional music production software with a complete library of instruments and effects.',
'{"Music Production", "Virtual Instruments", "MIDI Editing", "Audio Recording", "Mixing & Mastering"}',
'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=128&h=128&fit=crop',
'https://apple.com/logic-pro', 'paid', '$199.99 one-time purchase', true, 89000, 4.7, 1567),

('Pro Tools', 'pro-tools', 'audio',
'Industry-standard digital audio workstation used by audio professionals worldwide.',
'{"Professional Recording", "MIDI Sequencing", "Audio Editing", "Mixing", "Collaboration"}',
'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=128&h=128&fit=crop',
'https://avid.com/pro-tools', 'paid', 'Starting at $29.99/month', false, 56700, 4.2, 890),

('Reaper', 'reaper', 'audio',
'Digital audio workstation that offers a complete multitrack audio and MIDI recording environment.',
'{"Audio Recording", "MIDI Support", "Customizable Interface", "Scripting", "Plugin Support"}',
'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=128&h=128&fit=crop',
'https://reaper.fm', 'paid', '$60 for personal license', false, 34200, 4.5, 567),

('FL Studio', 'fl-studio', 'audio',
'Digital audio workstation known for its piano roll and lifetime free updates.',
'{"Piano Roll", "Step Sequencer", "Mixer", "Plugin Support", "Lifetime Updates"}',
'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=128&h=128&fit=crop',
'https://image-line.com', 'paid', 'Starting at $99 one-time', false, 78900, 4.6, 1234),

-- Image Tools (5 tools - Midjourney and Canva AI already exist)
('Photoshop', 'photoshop', 'image',
'Industry-standard image editing software with advanced tools for photo manipulation and digital art.',
'{"Photo Editing", "Digital Painting", "Layer Support", "Advanced Selection", "Content-Aware Fill"}',
'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=128&h=128&fit=crop',
'https://adobe.com/photoshop', 'paid', '$20.99/month', true, 189000, 4.5, 3456),

('GIMP', 'gimp', 'image',
'Free and open-source image editor with professional-grade features.',
'{"Photo Retouching", "Image Composition", "Image Authoring", "Plugin Support", "Customizable UI"}',
'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=128&h=128&fit=crop',
'https://gimp.org', 'free', 'Free and open source', false, 89000, 4.2, 1567),

('Affinity Photo', 'affinity-photo', 'image',
'Professional photo editing software with no subscription required.',
'{"Photo Editing", "RAW Processing", "HDR Merge", "Focus Stacking", "Professional Retouching"}',
'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=128&h=128&fit=crop',
'https://affinity.serif.com', 'paid', '$69.99 one-time purchase', false, 45600, 4.6, 678),

('Pixelmator Pro', 'pixelmator-pro', 'image',
'Professional image editing application designed exclusively for Mac.',
'{"AI-powered Tools", "Vector Graphics", "Photo Editing", "Digital Painting", "Layer Styles"}',
'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=128&h=128&fit=crop',
'https://pixelmator.com/pro', 'paid', '$39.99 one-time purchase', false, 23400, 4.4, 345),

('Luminar', 'luminar', 'image',
'AI-powered photo editing software that makes complex edits simple.',
'{"AI Sky Replacement", "AI Enhance", "Portrait Tools", "Landscape Tools", "Creative Effects"}',
'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=128&h=128&fit=crop',
'https://skylum.com/luminar', 'paid', '$99 one-time purchase', false, 34200, 4.3, 456),

-- Chatbot Tools (5 tools - ChatGPT already exists)
('Claude', 'claude', 'chatbot',
'AI assistant created by Anthropic that focuses on being helpful, harmless, and honest.',
'{"Conversational AI", "Text Analysis", "Code Help", "Writing Assistance", "Research Support"}',
'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=128&h=128&fit=crop',
'https://claude.ai', 'freemium', 'Free with usage limits, $20/month for Pro', true, 89000, 4.6, 1234),

('Bard', 'bard', 'chatbot',
'Google\'s experimental conversational AI service powered by LaMDA.',
'{"Conversational AI", "Real-time Information", "Creative Writing", "Code Generation", "Multi-modal"}',
'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=128&h=128&fit=crop',
'https://bard.google.com', 'free', 'Free with Google account', true, 123000, 4.3, 2345),

('Intercom', 'intercom', 'chatbot',
'Customer messaging platform with chatbot capabilities for customer support.',
'{"Live Chat", "Chatbots", "Help Desk", "Customer Data", "App Integration", "Mobile SDK"}',
'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=128&h=128&fit=crop',
'https://intercom.com', 'paid', 'Starting at $74/month', false, 67800, 4.2, 890),

('Drift', 'drift', 'chatbot',
'Conversational marketing platform that connects businesses with their best leads.',
'{"Conversational Marketing", "Lead Qualification", "Meeting Booking", "Email Integration", "Analytics"}',
'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=128&h=128&fit=crop',
'https://drift.com', 'paid', 'Starting at $50/month', false, 45600, 4.1, 567),

('Chatfuel', 'chatfuel', 'chatbot',
'Platform for creating chatbots for Facebook Messenger without coding.',
'{"No-Code Bot Builder", "Facebook Integration", "Broadcasting", "Analytics", "E-commerce Integration"}',
'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=128&h=128&fit=crop',
'https://chatfuel.com', 'freemium', 'Free for 50 conversations/month, $15/month for more', false, 23400, 4.0, 345),

-- Automation Tools (5 tools - Zapier already exists)
('IFTTT', 'ifttt', 'automation',
'Platform that helps you connect different apps and devices to automate your life.',
'{"App Connections", "Device Control", "Location-based Triggers", "Voice Control", "Webhooks"}',
'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=128&h=128&fit=crop',
'https://ifttt.com', 'freemium', 'Free for 3 applets, $3.99/month for unlimited', false, 45600, 4.2, 678),

('Microsoft Power Automate', 'power-automate', 'automation',
'Cloud-based service that makes it practical and simple to create automated workflows.',
'{"Workflow Automation", "App Integration", "Business Process", "AI Builder", "RPA"}',
'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=128&h=128&fit=crop',
'https://powerautomate.microsoft.com', 'freemium', 'Free with Office 365, $15/month for premium', false, 67800, 4.1, 890),

('n8n', 'n8n', 'automation',
'Open-source workflow automation tool that lets you connect any app with an API.',
'{"Workflow Automation", "Self-hosted", "Visual Editor", "Custom Nodes", "API Integration"}',
'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=128&h=128&fit=crop',
'https://n8n.io', 'freemium', 'Free self-hosted, $20/month for cloud', false, 23400, 4.4, 345),

('Integromat', 'integromat', 'automation',
'Visual automation platform that connects apps and transfers data between them automatically.',
'{"Visual Automation", "Complex Workflows", "Error Handling", "Real-time Processing", "API Connections"}',
'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=128&h=128&fit=crop',
'https://make.com', 'freemium', 'Free for 1000 operations/month, $9/month for more', false, 34200, 4.3, 456),

('Automate.io', 'automate-io', 'automation',
'Cloud-based automation platform that integrates your cloud applications.',
'{"Cloud Integration", "Pre-built Bots", "Custom Workflows", "Real-time Sync", "Enterprise Features"}',
'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=128&h=128&fit=crop',
'https://automate.io', 'freemium', 'Free for 300 actions/month, $9.99/month for more', false, 19800, 4.0, 234),

-- Business Tools (6 tools)
('Slack', 'slack', 'business',
'Business communication platform that brings teams together through channels and messaging.',
'{"Team Messaging", "Channel Organization", "File Sharing", "Video Calls", "App Integrations"}',
'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=128&h=128&fit=crop',
'https://slack.com', 'freemium', 'Free for small teams, $6.67/month per user', true, 156000, 4.4, 2890),

('Microsoft Teams', 'microsoft-teams', 'business',
'Collaboration platform that combines workplace chat, meetings, and file collaboration.',
'{"Video Conferencing", "Team Chat", "File Collaboration", "App Integration", "Phone System"}',
'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=128&h=128&fit=crop',
'https://teams.microsoft.com', 'freemium', 'Free version, $4/month per user for more features', true, 234000, 4.2, 4567),

('Zoom', 'zoom', 'business',
'Video conferencing platform for virtual meetings, webinars, and collaboration.',
'{"Video Meetings", "Webinars", "Screen Sharing", "Recording", "Breakout Rooms", "Chat"}',
'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=128&h=128&fit=crop',
'https://zoom.us', 'freemium', 'Free for 40-minute meetings, $14.99/month for unlimited', false, 189000, 4.3, 3456),

('Asana', 'asana', 'business',
'Work management platform that helps teams organize, track, and manage their work.',
'{"Project Management", "Task Tracking", "Team Collaboration", "Timeline View", "Custom Fields"}',
'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=128&h=128&fit=crop',
'https://asana.com', 'freemium', 'Free for teams up to 15, $10.99/month per user', false, 89000, 4.3, 1567),

('Trello', 'trello', 'business',
'Visual collaboration tool that creates a shared perspective on any project using boards and cards.',
'{"Kanban Boards", "Card Management", "Team Collaboration", "Power-Ups", "Automation"}',
'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=128&h=128&fit=crop',
'https://trello.com', 'freemium', 'Free for personal use, $5/month per user for teams', false, 67800, 4.2, 1234),

('Monday.com', 'monday-com', 'business',
'Work operating system that powers teams to run projects and workflows with confidence.',
'{"Project Management", "Workflow Automation", "Time Tracking", "Dashboards", "Integration"}',
'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=128&h=128&fit=crop',
'https://monday.com', 'paid', 'Starting at $8/month per user', false, 78900, 4.4, 1890),

-- Education Tools (6 tools)
('Khan Academy', 'khan-academy', 'education',
'Free online education platform offering practice exercises and instructional videos.',
'{"Video Lessons", "Practice Exercises", "Progress Tracking", "Personalized Learning", "Free Access"}',
'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=128&h=128&fit=crop',
'https://khanacademy.org', 'free', 'Completely free', true, 123000, 4.7, 2345),

('Coursera', 'coursera', 'education',
'Online learning platform offering courses, specializations, and degrees from top universities.',
'{"University Courses", "Certificates", "Specializations", "Degrees", "Financial Aid"}',
'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=128&h=128&fit=crop',
'https://coursera.org', 'freemium', 'Free courses, $39-79/month for certificates', true, 189000, 4.5, 4567),

('Udemy', 'udemy', 'education',
'Online learning marketplace with thousands of courses on various topics.',
'{"Video Courses", "Lifetime Access", "Certificate of Completion", "Mobile Learning", "Practice Tests"}',
'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=128&h=128&fit=crop',
'https://udemy.com', 'paid', 'Courses range from $10-200', false, 156000, 4.3, 3456),

('Skillshare', 'skillshare', 'education',
'Creative learning community where millions come together to take the next step in their creative journey.',
'{"Creative Classes", "Project-based Learning", "Community", "Offline Viewing", "Premium Content"}',
'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=128&h=128&fit=crop',
'https://skillshare.com', 'freemium', 'Free classes, $99/year for premium', false, 89000, 4.2, 1567),

('Duolingo', 'duolingo', 'education',
'Language learning platform that makes learning fun through gamification.',
'{"Language Learning", "Gamification", "Progress Tracking", "Stories", "Podcasts", "Offline Mode"}',
'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=128&h=128&fit=crop',
'https://duolingo.com', 'freemium', 'Free with ads, $6.99/month for Plus', true, 234000, 4.6, 5678),

('Anki', 'anki', 'education',
'Flashcard program that uses spaced repetition to help you remember information.',
'{"Spaced Repetition", "Custom Decks", "Multimedia Cards", "Sync Across Devices", "Add-ons"}',
'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=128&h=128&fit=crop',
'https://ankiweb.net', 'freemium', 'Free on desktop, $24.99 for mobile app', false, 45600, 4.4, 678),

-- Finance Tools (6 tools)
('QuickBooks', 'quickbooks', 'finance',
'Accounting software for small businesses to manage finances, track expenses, and generate reports.',
'{"Accounting", "Invoicing", "Expense Tracking", "Tax Preparation", "Payroll", "Bank Integration"}',
'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=128&h=128&fit=crop',
'https://quickbooks.intuit.com', 'paid', 'Starting at $15/month', true, 123000, 4.3, 2345),

('Mint', 'mint', 'finance',
'Personal finance app that helps you track spending, create budgets, and monitor credit scores.',
'{"Budget Tracking", "Bill Reminders", "Credit Score", "Investment Tracking", "Goal Setting"}',
'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=128&h=128&fit=crop',
'https://mint.com', 'free', 'Free with ads', false, 89000, 4.1, 1567),

('YNAB', 'ynab', 'finance',
'Budgeting software that helps you gain control of your money through proactive budgeting.',
'{"Zero-based Budgeting", "Goal Setting", "Debt Payoff", "Reports", "Mobile Sync", "Education"}',
'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=128&h=128&fit=crop',
'https://youneedabudget.com', 'paid', '$14/month or $98/year', false, 45600, 4.5, 678),

('Personal Capital', 'personal-capital', 'finance',
'Wealth management and financial planning platform with investment tracking.',
'{"Investment Tracking", "Net Worth Calculation", "Fee Analyzer", "Retirement Planning", "Advisory Services"}',
'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=128&h=128&fit=crop',
'https://personalcapital.com', 'freemium', 'Free tools, advisory services for $100k+', false, 67800, 4.2, 890),

('Robinhood', 'robinhood', 'finance',
'Commission-free trading platform for stocks, ETFs, options, and cryptocurrency.',
'{"Commission-free Trading", "Fractional Shares", "Crypto Trading", "Cash Management", "Research Tools"}',
'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=128&h=128&fit=crop',
'https://robinhood.com', 'freemium', 'Free trading, $5/month for premium features', false, 156000, 4.0, 2890),

('FreshBooks', 'freshbooks', 'finance',
'Cloud-based accounting software designed for small business owners and freelancers.',
'{"Invoicing", "Time Tracking", "Expense Management", "Project Management", "Client Portal"}',
'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=128&h=128&fit=crop',
'https://freshbooks.com', 'paid', 'Starting at $15/month', false, 34200, 4.4, 456),

-- Research Tools (6 tools)
('Zotero', 'zotero', 'research',
'Free reference management software to collect, organize, cite, and share research.',
'{"Reference Management", "PDF Annotation", "Citation Generation", "Group Libraries", "Web Integration"}',
'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=128&h=128&fit=crop',
'https://zotero.org', 'free', 'Free with 300MB storage, $20/year for 2GB', false, 45600, 4.4, 678),

('Mendeley', 'mendeley', 'research',
'Reference manager and academic social network that helps you organize your research.',
'{"Reference Management", "PDF Viewer", "Citation Plugin", "Social Network", "Research Analytics"}',
'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=128&h=128&fit=crop',
'https://mendeley.com', 'freemium', 'Free for 2GB storage, $4.99/month for more', false, 67800, 4.2, 890),

('ResearchGate', 'researchgate', 'research',
'Professional network for scientists and researchers to share papers and collaborate.',
'{"Publication Sharing", "Researcher Network", "Q&A Platform", "Project Collaboration", "Job Board"}',
'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=128&h=128&fit=crop',
'https://researchgate.net', 'free', 'Free for all users', true, 89000, 4.1, 1234),

('Evernote', 'evernote', 'research',
'Note-taking app that helps you capture, organize, and share notes across all your devices.',
'{"Note Taking", "Web Clipper", "Document Scanning", "Search", "Templates", "Collaboration"}',
'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=128&h=128&fit=crop',
'https://evernote.com', 'freemium', 'Free for basic features, $7.99/month for premium', false, 123000, 4.3, 1890),

('Roam Research', 'roam-research', 'research',
'Note-taking tool for networked thought that helps you organize your research and ideas.',
'{"Bidirectional Linking", "Graph Database", "Block References", "Daily Notes", "Knowledge Graph"}',
'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=128&h=128&fit=crop',
'https://roamresearch.com', 'paid', '$15/month or $165/year', false, 23400, 4.0, 234),

('Obsidian', 'obsidian', 'research',
'Knowledge management app that works on top of local folder of plain text Markdown files.',
'{"Linked Notes", "Graph View", "Plugin Ecosystem", "Local Files", "Markdown Support", "Canvas"}',
'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=128&h=128&fit=crop',
'https://obsidian.md', 'freemium', 'Free for personal use, $50/year for commercial', true, 78900, 4.6, 1456);