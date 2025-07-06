// Centralized category definitions matching the database enum
export const ALL_CATEGORIES = [
  { 
    id: 'productivity', 
    name: 'Productivity', 
    slug: 'productivity', 
    icon: 'Zap', 
    color: 'from-cyan-500 to-cyan-600',
    count: 43 
  },
  { 
    id: 'design', 
    name: 'Design', 
    slug: 'design', 
    icon: 'Palette', 
    color: 'from-yellow-500 to-yellow-600',
    count: 54 
  },
  { 
    id: 'writing', 
    name: 'AI Writing', 
    slug: 'writing', 
    icon: 'PenTool', 
    color: 'from-blue-500 to-blue-600',
    count: 245 
  },
  { 
    id: 'coding', 
    name: 'Code Assistant', 
    slug: 'coding', 
    icon: 'Code', 
    color: 'from-indigo-500 to-indigo-600',
    count: 76 
  },
  { 
    id: 'marketing', 
    name: 'Marketing', 
    slug: 'marketing', 
    icon: 'TrendingUp', 
    color: 'from-teal-500 to-teal-600',
    count: 65 
  },
  { 
    id: 'sales', 
    name: 'Sales', 
    slug: 'sales', 
    icon: 'DollarSign', 
    color: 'from-green-500 to-green-600',
    count: 87 
  },
  { 
    id: 'analytics', 
    name: 'Data Analysis', 
    slug: 'analytics', 
    icon: 'BarChart3', 
    color: 'from-orange-500 to-orange-600',
    count: 134 
  },
  { 
    id: 'video', 
    name: 'Video Editing', 
    slug: 'video', 
    icon: 'Video', 
    color: 'from-red-500 to-red-600',
    count: 98 
  },
  { 
    id: 'audio', 
    name: 'Voice & Audio', 
    slug: 'audio', 
    icon: 'Mic', 
    color: 'from-pink-500 to-pink-600',
    count: 87 
  },
  { 
    id: 'image', 
    name: 'Image Generation', 
    slug: 'image', 
    icon: 'Image', 
    color: 'from-purple-500 to-purple-600',
    count: 189 
  },
  { 
    id: 'chatbot', 
    name: 'Chatbots', 
    slug: 'chatbot', 
    icon: 'MessageCircle', 
    color: 'from-green-500 to-green-600',
    count: 156 
  },
  { 
    id: 'automation', 
    name: 'Automation', 
    slug: 'automation', 
    icon: 'Workflow', 
    color: 'from-violet-500 to-violet-600',
    count: 92 
  },
  { 
    id: 'business', 
    name: 'Business', 
    slug: 'business', 
    icon: 'Briefcase', 
    color: 'from-slate-500 to-slate-600',
    count: 78 
  },
  { 
    id: 'education', 
    name: 'Education', 
    slug: 'education', 
    icon: 'GraduationCap', 
    color: 'from-emerald-500 to-emerald-600',
    count: 56 
  },
  { 
    id: 'finance', 
    name: 'Finance', 
    slug: 'finance', 
    icon: 'Calculator', 
    color: 'from-amber-500 to-amber-600',
    count: 34 
  },
  { 
    id: 'research', 
    name: 'Research', 
    slug: 'research', 
    icon: 'Search', 
    color: 'from-rose-500 to-rose-600',
    count: 29 
  }
];

// Helper function to find category by display name
export const findCategoryByName = (name) => {
  return ALL_CATEGORIES.find(cat => cat.name === name);
};

// Helper function to find category by slug/id
export const findCategoryBySlug = (slug) => {
  return ALL_CATEGORIES.find(cat => cat.slug === slug || cat.id === slug);
};

// Helper function to get category display name from slug
export const getCategoryDisplayName = (slug) => {
  const category = findCategoryBySlug(slug);
  return category ? category.name : slug;
};

// Helper function to get category slug from display name
export const getCategorySlug = (name) => {
  const category = findCategoryByName(name);
  return category ? category.slug : name;
};