The Plan
Phase 1: Database and Core Data Model Enhancements
This phase focuses on updating your Supabase schema to support the new categories, tool properties, and new data types for features like deals, bug reports, and feature requests.

Update tool_category Enum:

Supabase Change: Modify the tool_category enum in your Supabase database to include all the new categories you've listed. This is a critical first step as many other features depend on these categories.
Add the following new enum variants: content_creation, data_analysis, image_generation, text_generation, voice_audio, video_creation, development, customer_service, healthcare, e_commerce, social_media, fashion, wordpress, translation, religion, astrology, students, gift_ideas, travel, ai_detection, fun_tools, game_creation, 3d_generator, gaming_ai, interior_designer_ai, others.
Supabase Change: Modify the category column in the tools table from tool_category to tool_category[] (an array of tool_category enums) to support tools belonging to multiple categories.
File Change: Update src/utils/categories.js to include all the new categories with their respective slug, name, icon, and color properties. Ensure existing categories are also correctly represented.
Refine tools Table:

Supabase Change: Add new columns to the tools table:
is_trending (boolean, default false): To mark tools as trending.
is_just_launched (boolean, default false): To mark newly launched tools.
social_media_links (jsonb, nullable): To store social media URLs (e.g., { twitter: 'url', linkedin: 'url', facebook: 'url' }).
faq (jsonb, nullable): To store an array of FAQ objects (e.g., [{ question: '...', answer: '...' }]).
use_cases_details (jsonb, nullable): To store an array of use case objects (e.g., [{ title: '...', description: '...' }]).
analytics_data (jsonb, nullable): To store aggregated analytics data (e.g., monthly users, traffic sources, geography). This will be populated by a separate process, not directly by user input.
alternatives_data (jsonb, nullable): To store curated alternatives or a reference to a separate table. For initial implementation, a simple JSONB for a list of tool IDs or structured alternative data will suffice.
New Tables:

user_favorites table:
id (uuid, primary key, default gen_random_uuid())
user_id (uuid, foreign key to user_profiles.id, ON DELETE CASCADE)
tool_id (uuid, foreign key to tools.id, ON DELETE CASCADE)
created_at (timestamp with time zone, default now())
RLS: Enable Row Level Security (RLS) to ensure users can only manage their own favorites.
Constraint: Add a unique constraint on (user_id, tool_id) to prevent duplicate favorites.
deals table:
id (uuid, primary key, default gen_random_uuid())
tool_id (uuid, foreign key to tools.id, nullable, ON DELETE SET NULL): Link to a specific tool, or null for general deals.
title (text, not null)
description (text, not null)
discount_code (text, nullable)
deal_url (text, not null)
start_date (timestamp with time zone, not null)
end_date (timestamp with time zone, not null)
is_active (boolean, default true)
created_at (timestamp with time zone, default now())
updated_at (timestamp with time zone, default now())
RLS: Implement RLS for read access by all, write access by admins.
feature_requests table:
id (uuid, primary key, default gen_random_uuid())
user_id (uuid, foreign key to user_profiles.id, nullable, ON DELETE SET NULL): Nullable for anonymous submissions.
title (text, not null)
description (text, not null)
status (enum: pending, under_review, planned, completed, rejected, default pending)
upvotes (integer, default 0)
created_at (timestamp with time zone, default now())
updated_at (timestamp with time zone, default now())
RLS: Implement RLS for read access by all, insert by authenticated users, update/delete by admins.
bug_reports table:
id (uuid, primary key, default gen_random_uuid())
user_id (uuid, foreign key to user_profiles.id, nullable, ON DELETE SET NULL)
title (text, not null)
description (text, not null)
page_url (text, nullable)
screenshot_urls (text[], nullable): URLs to images stored in Supabase Storage.
status (enum: open, in_progress, resolved, closed, default open)
created_at (timestamp with time zone, default now())
updated_at (timestamp with time zone, default now())
RLS: Implement RLS for read access by all, insert by authenticated users, update/delete by admins.
advertisements table:
id (uuid, primary key, default gen_random_uuid())
ad_type (enum: sidebar_tool, in_grid_banner, homepage_banner, detail_page_banner, not null)
tool_id (uuid, foreign key to tools.id, nullable, ON DELETE SET NULL): Link to a specific tool for promoted listings.
image_url (text, not null)
target_url (text, not null)
title (text, nullable)
description (text, nullable)
budget (numeric, nullable)
start_date (timestamp with time zone, not null)
end_date (timestamp with time zone, not null)
is_active (boolean, default true)
impressions (integer, default 0)
clicks (integer, default 0)
created_at (timestamp with time zone, default now())
updated_at (timestamp with time zone, default now())
RLS: Implement RLS for read access by all, write access by admins.
category_features table:
id (uuid, primary key, default gen_random_uuid())
category_slug (text, not null): References tool_category enum.
feature_name (text, not null)
feature_slug (text, unique, not null): A machine-readable slug for the feature.
description (text, nullable): For hover tooltips.
input_type (enum: boolean, text, number, select, default boolean): To guide form input.
options (text[], nullable): For select input types.
is_filterable (boolean, default true): If this feature can be used in filters.
created_at (timestamp with time zone, default now())
updated_at (timestamp with time zone, default now())
RLS: Implement RLS for read access by all, write access by admins.
Supabase Storage:

Supabase Change: Create a new storage bucket (e.g., bug_screenshots) for bug report screenshots.
Supabase Change: Configure RLS policies for the new bucket to allow authenticated users to upload and read their own files, and admins to manage all files.
Phase 2: Core Feature Implementations & UI Updates
This phase focuses on implementing foundational features and updating existing UI components.

Centralized Category Management:

File Change: Ensure all components that interact with categories (Header, FilterPanel, ToolCard, ToolManagementTable, BasicInfoStep, CategoryChips, CategorySections, ToolDetailPage) import and use ALL_CATEGORIES and helper functions (getCategoryDisplayName, findCategoryBySlug) from src/utils/categories.js. This ensures consistency across the application.
View Count Logic:

File Change: Modify src/pages/tool-detail-page/index.jsx:
In the useEffect hook that loads tool data, implement a debounced view count increment.
When the tool detail page loads, record a timestamp in localStorage (e.g., viewed-${toolId}).
Start a 2-second timer. If the user remains on the page for 2 seconds and the localStorage timestamp is recent (e.g., within the last 24 hours to prevent excessive increments from the same user), call toolsService.incrementViewCount(toolId).
The increment_tool_views RPC function in Supabase will handle the actual database update.
File Change: src/utils/toolsService.js: Ensure incrementViewCount is correctly calling the Supabase RPC function.
Favorites/Bookmark Feature:

New File: Create src/utils/favoritesService.js to handle CRUD operations with the user_favorites table.
File Change: src/contexts/AuthContext.jsx: Add a function to fetch the current user's favorited tool IDs.
File Change: src/components/ui/Header.jsx: Add a "Favorites" link to the user profile dropdown, navigating to the new favorites page.
File Change: src/pages/tool-detail-page/components/ToolHero.jsx:
Update the onBookmark function to call favoritesService.addFavorite or favoritesService.removeFavorite based on the isBookmarked state.
The isBookmarked state should be initialized by checking favoritesService.isToolFavorited(user.id, tool.id).
Ensure the bookmark button is only visible/active for logged-in users.
File Change: src/pages/category-listing-page/components/ToolCard.jsx: Add a bookmark/favorite icon to each tool card. This icon will also interact with favoritesService and update its state based on whether the current user has favorited the tool.
New Page: Create src/pages/user-favorites-page/index.jsx to display all tools favorited by the logged-in user. This page will fetch data from the user_favorites table and then fetch the corresponding tool details.
Stripe Integration (for tool submission fees):

New File: Create src/utils/stripeService.js to encapsulate Stripe API calls.
Supabase Edge Function: Create a new Supabase Edge Function (e.g., stripe-checkout-session) that securely creates a Stripe Checkout Session. This function will be called from the frontend.
Supabase Edge Function: Create another Supabase Edge Function (e.g., stripe-webhook) to handle Stripe webhooks (e.g., checkout.session.completed). This webhook will update the submission status in your submissions table (e.g., from pending_payment to pending_review).
File Change: src/pages/tool-submission-form/index.jsx:
Modify the handleSubmit function in the ReviewStep to initiate a Stripe Checkout session by calling your stripe-checkout-session Edge Function.
Upon successful payment, update the submission status in the submissions table and then proceed with the success modal.
Add a new submission_status enum variant in Supabase: pending_payment.
User Login Requirement: Ensure the tool submission form is only accessible to logged-in users. (This is already handled by AuthContext).
Enhanced Authentication (Google/GitHub, Forgot Password):

File Change: src/components/auth/LoginForm.jsx: Add buttons for "Sign in with Google" and "Sign in with GitHub". These buttons will call authService.signInWithOAuth('google') or authService.signInWithOAuth('github').
File Change: src/components/auth/SignupForm.jsx: Similarly, add buttons for "Sign up with Google" and "Sign up with GitHub".
File Change: src/contexts/AuthContext.jsx: Implement signInWithOAuth and resetPassword functions that call authService.
File Change: src/utils/authService.js: Implement the actual Supabase Auth calls for signInWithOAuth and resetPasswordForEmail.
New Page: Create src/pages/forgot-password-page/index.jsx with a form to request a password reset email. This page will call authService.resetPassword(email).
New Page: Create src/pages/reset-password-page/index.jsx to handle the redirect from the password reset email and allow the user to set a new password.
Scroll to Top Button:

New Component: Create src/components/ui/ScrollToTopButton.jsx.
Logic: This component will listen to the window's scroll position. When the user scrolls down beyond a certain threshold (e.g., 200px), the button will appear. When clicked, it will smoothly scroll the window to the top.
File Change: Integrate ScrollToTopButton into src/App.jsx or src/Routes.jsx so it's globally available.
Custom Scrollbars:

File Change: Review all components that have overflow-y-auto or overflow-x-auto (e.g., FilterPanel, ActivityFeed, NotificationPanel, ToolSelector, ComparisonCart, CategoryChips).
File Change: Ensure the scrollbar-thin utility class (defined in src/styles/tailwind.css) is applied to these elements to provide a consistent custom scrollbar appearance.
Footer Updates:

File Change: Modify the footer in src/pages/homepage/index.jsx (or a dedicated Footer component if you create one).
Add links to all new pages: Featured Tools, Trending Tools, Just Launched, Deals, Request a Feature, Report Bug/Issue, Contact Us, Disclaimer, Advertise/Promote, Tool Directory.
Organize these links into logical sections (e.g., "Explore", "Resources", "Legal", "Company").
Phase 3: New Pages & Navigation
This phase involves creating the new pages and updating the application's routing.

Update Routes.jsx:

File Change: Add new Route entries for all the new pages you're creating.
Implement New Pages:

Featured Tools Page: This is already handled by src/pages/category-listing-page/index.jsx with a ?featured=true query parameter. Ensure all links pointing to this page use the correct parameter.
Trending Tools Page:
New File: src/pages/trending-tools-page/index.jsx.
Logic: This page will fetch tools from the tools table, ordered by view_count (descending) or a more sophisticated trending algorithm if you implement one later. The layout can be similar to CategoryListingPage.
Just Launched Page:
New File: src/pages/just-launched-page/index.jsx.
Logic: This page will fetch tools from the tools table, ordered by created_at (descending) and potentially filtered by is_just_launched = true. The layout can be similar to CategoryListingPage.
Deals Page:
New File: src/pages/deals-page/index.jsx.
Logic: Fetch active deals from the new deals table. Display each deal with its title, description, discount code, and a link to the deal URL.
Request a Feature Page:
New File: src/pages/request-feature-page/index.jsx.
Logic: Create a form with fields for title and description. On submission, call featureRequestsService.submitFeatureRequest. Include options for anonymous or logged-in submissions.
Report Bug/Issue Page:
New File: src/pages/report-bug-page/index.jsx.
Logic: Create a form with fields for title, description, page_url, and a file input for screenshot_urls. On submission, upload screenshots to Supabase Storage and then save the bug report details to the bug_reports table.
Contact Us Page:
New File: src/pages/contact-us-page/index.jsx.
Logic: A simple form with fields for name, email, and message. For initial implementation, this can just log to the console or display a success message. For a real backend, it would require a serverless function to send emails.
Disclaimer Page:
New File: src/pages/disclaimer-page/index.jsx.
Logic: A static content page to display your disclaimer text regarding affiliate links.
Advertise/Promote Page:
New File: src/pages/advertise-page/index.jsx.
Logic: Provide information about advertising opportunities on your platform. Include a contact form for inquiries (e.g., name, company, email, budget, requirements). This can save to a new ad_inquiries table or send an email.
Tool Directory Page:
New File: src/pages/tool-directory-page/index.jsx.
Logic:
Implement infinite scrolling to load tools in chunks (e.g., 50 per load). Use toolsService.getTools with limit and offset parameters.
Add a search input that filters tools by name/description without additional filters.
Display tools using a simplified ToolCard component (or a new DirectoryToolCard) showing only logo, name, and a very short description.
Each card should be clickable and redirect to the respective tool detail page.
Sidebar Ads: Fetch advertisements with ad_type: 'sidebar_tool' and display them in a dedicated sidebar section.
In-between Ads: Implement logic to insert advertisements with ad_type: 'in_grid_banner' after every N tools (e.g., 30, 40, 50, or 60 tools).
Ensure the page is fully responsive.
Update Header Navigation:

File Change: Modify src/components/ui/Header.jsx to include new navigation links to the newly created pages in the main navigation bar and/or the user profile dropdown.
Phase 4: Tool Details Page Enhancements
This phase focuses on expanding the information available on the tool detail page.

Rename Overview Tab:

File Change: In src/pages/tool-detail-page/components/ToolTabs.jsx, change the label of the 'overview' tab to 'Product Details'.
Implement New Tabs:

File Change: In src/pages/tool-detail-page/components/ToolTabs.jsx, add new tabs to the tabs array: Analytics, Alternatives, Social Media, FAQ and Use Cases.
File Change: Implement the renderTabContent logic for each new tab:
Analytics Tab:
Data Source: Fetch analytics_data from the tools table.
UI: Use recharts (already installed) to display charts for metrics like monthly users, visit trends (monthly visit, avg visit duration, page per visit, bounce rate), recent three months traffic analysis, geography data (which country mostly used), device data (mobile, desktop, tabs, others), traffic sources (direct, search, referrals, social, display ads, mail, etc.), and a top keyword table. Initially, use mock data but structure it to accept real data from the analytics_data JSONB column.
Alternatives Tab:
Logic: Fetch alternative tools from the tools table based on the current tool's category. Implement the pricing-based sorting algorithm:
If the current tool is paid: display paid alternatives first, then freemium, then free.
If the current tool is freemium: display freemium alternatives first, then free, then paid.
If the current tool is free: display free alternatives first, then freemium, then paid.
Include "Compare" buttons for each alternative tool.
UI: Create a new component src/pages/tool-detail-page/components/ToolAlternatives.jsx to render this tab's content.
Social Media Tab:
Data Source: Fetch social_media_links from the tools table.
UI: Display social media icons (e.g., Twitter, LinkedIn, Facebook) with links.
FAQ and Use Cases Tab:
Data Source: Fetch faq and use_cases_details from the tools table.
UI: Render the FAQ as an accordion (expandable sections) and the use cases as a structured list.
Category-Specific Features with Hover Tooltips:

File Change: src/pages/tool-detail-page/components/ToolTabs.jsx (Features tab):
Fetch features from the category_features table based on the tool's category.
Display these features.
New Component: Create a reusable src/components/ui/Tooltip.jsx component.
Wrap feature names with the Tooltip component, passing the description from category_features as the tooltip content.
Phase 5: Form & Comparison Enhancements
This phase focuses on improving the tool submission form and the tool comparison page.

Submit Tool Page Enhancements (Feature Checkboxes):

File Change: Modify src/pages/tool-submission-form/components/DetailedInfoStep.jsx:
Instead of a free-form text input for features, fetch the relevant features from the category_features table based on the category selected in BasicInfoStep.
Display these features as checkboxes.
Allow an "Other" input field for users to add custom features not listed.
Update the formData structure to store selected features (e.g., as an array of feature slugs or a JSON object).
Comparison Page Enhancements:

File Change: Modify src/pages/tool-comparison-page/components/ComparisonTable.jsx:
Update the comparisonData object and renderCellValue function to display all the new relevant data points from the tools table (e.g., social_media_links, faq, use_cases_details, analytics_data, alternatives_data).
Ensure features, ratings, and other data are clearly presented for comparison.
Logic: Only allow comparison of tools that share at least one common category.
File Change: Modify src/pages/tool-comparison-page/index.jsx and src/components/ui/ComparisonCart.jsx:
When a user attempts to add a tool to the comparison cart, check if the cart is empty. If it is, the first tool's categories set the "comparison context".
If the cart is not empty, check if the new tool shares any category with all existing tools in the comparison cart. If not, prevent the addition and display an informative message.
Advanced Filter System:

File Change: Modify src/pages/category-listing-page/components/FilterPanel.jsx:
Expand the filter options to include new categories.
Add filters for new tool properties like is_trending, is_just_launched.
Add filters based on category_features (e.g., filter by tools that have a specific feature, or a feature with a certain value). This will require fetching category_features and dynamically generating filter UI.
File Change: Modify src/utils/toolsService.js: Update the getTools function to accept and apply these new filter parameters when querying the Supabase tools table.
Phase 6: Admin Dashboard & Content Management
This phase involves extending the admin dashboard to manage all the new data and features.

Extend Admin Dashboard:
File Change: Modify src/pages/admin-dashboard/index.jsx:
Add new tabs or sections for managing:
Categories: UI to view, add, edit, and delete categories (interacting with the tool_category enum and category_features table). This might require custom Supabase functions for enum management.
Deals: CRUD interface for the deals table.
Feature Requests: View, update status, and delete feature requests from the feature_requests table.
Bug Reports: View, update status, and delete bug reports from the bug_reports table. Include links to screenshots.
Advertisements: CRUD interface for the advertisements table.
Tool Properties: Add UI elements to easily toggle is_trending and is_just_launched for tools.
User Management: Enhance the existing user management table to allow admins to update user roles (user_role enum: admin, user), suspend/activate users (e.g., by adding an is_active column to user_profiles), and delete users.
Reviews: Implement a section to view and moderate user reviews (from the ratings table), allowing admins to delete inappropriate comments.
New Components: Create new React components within src/pages/admin-dashboard/components/ for each new management section (e.g., DealsManagementTable.jsx, FeatureRequestsTable.jsx, BugReportsTable.jsx, AdvertisementsManagementTable.jsx).
New Service Files: Create new utility service files (e.g., src/utils/dealsService.js, src/utils/featureRequestsService.js, src/utils/bugReportsService.js, src/utils/advertisementsService.js) to handle API interactions with the new Supabase tables.
Phase 7: Ads & Responsiveness
This phase ensures ads are strategically placed and the application remains responsive.

Strategic Ad Placement:

File Change: In src/pages/tool-directory-page/index.jsx, implement the logic for displaying sidebar ads and in-grid banner ads as described in Phase 3.2.
File Change: Modify src/pages/tool-detail-page/components/AdBanner.jsx to fetch and display ads from the advertisements table based on the placement prop and ad_type.
Review: Carefully review all new pages and existing pages for optimal ad placement, ensuring they do not disrupt the user experience or core content flow.
Responsiveness:

Global: Throughout the entire implementation process, ensure that all new components and modifications to existing components are fully responsive. Use Tailwind CSS utility classes and breakpoints (sm, md, lg, xl) to adapt layouts and styles for different screen sizes. Test thoroughly on various devices and screen resolutions.
Phase 8: Polish & Error Handling
This final phase ensures a smooth and robust user experience.

Loaders, Empty States, Messages:

Global: For every data fetching operation (both new and existing features), consistently implement:
Loading Indicators: Display loaders (e.g., spinners, skeleton loaders) while data is being fetched.
Empty States: Show clear and user-friendly messages when no data is available (e.g., "No tools found," "No deals currently available").
Error Messages: Display informative error messages to the user if data fetching fails (e.g., "Failed to load tools. Please try again.").
File Change: Review all new and modified components to ensure these states are handled gracefully.
Rating and Review Count System:

File Change: Ensure src/utils/ratingsService.js and the Supabase trigger update_tool_rating are robustly implemented to accurately calculate and update average_rating and rating_count in the tools table whenever a rating is submitted, updated, or deleted.
File Change: Verify that ToolCard.jsx and ToolHero.jsx correctly display the average_rating and rating_count from the tools table.
By following this detailed plan, you can systematically implement all the requested features and enhancements for your application.
