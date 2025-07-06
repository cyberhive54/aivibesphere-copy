// Centralized category definitions matching the updated database enum
export const ALL_CATEGORIES = [
  // Original categories
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
  },

  // New categories
  { 
    id: 'content_creation', 
    name: 'Content Creation', 
    slug: 'content_creation', 
    icon: 'FileText', 
    color: 'from-blue-400 to-blue-500',
    count: 67 
  },
  { 
    id: 'data_analysis', 
    name: 'Data Analysis', 
    slug: 'data_analysis', 
    icon: 'BarChart', 
    color: 'from-orange-400 to-orange-500',
    count: 89 
  },
  { 
    id: 'image_generation', 
    name: 'Image Generation', 
    slug: 'image_generation', 
    icon: 'ImagePlus', 
    color: 'from-purple-400 to-purple-500',
    count: 156 
  },
  { 
    id: 'text_generation', 
    name: 'Text Generation', 
    slug: 'text_generation', 
    icon: 'Type', 
    color: 'from-blue-500 to-blue-600',
    count: 234 
  },
  { 
    id: 'voice_audio', 
    name: 'Voice & Audio', 
    slug: 'voice_audio', 
    icon: 'Volume2', 
    color: 'from-pink-400 to-pink-500',
    count: 78 
  },
  { 
    id: 'video_creation', 
    name: 'Video Creation', 
    slug: 'video_creation', 
    icon: 'VideoIcon', 
    color: 'from-red-400 to-red-500',
    count: 92 
  },
  { 
    id: 'development', 
    name: 'Development', 
    slug: 'development', 
    icon: 'Terminal', 
    color: 'from-indigo-400 to-indigo-500',
    count: 145 
  },
  { 
    id: 'customer_service', 
    name: 'Customer Service', 
    slug: 'customer_service', 
    icon: 'Headphones', 
    color: 'from-green-400 to-green-500',
    count: 45 
  },
  { 
    id: 'healthcare', 
    name: 'Healthcare', 
    slug: 'healthcare', 
    icon: 'Heart', 
    color: 'from-red-400 to-red-500',
    count: 34 
  },
  { 
    id: 'e_commerce', 
    name: 'E-commerce', 
    slug: 'e_commerce', 
    icon: 'ShoppingCart', 
    color: 'from-emerald-400 to-emerald-500',
    count: 67 
  },
  { 
    id: 'social_media', 
    name: 'Social Media', 
    slug: 'social_media', 
    icon: 'Share2', 
    color: 'from-cyan-400 to-cyan-500',
    count: 89 
  },
  { 
    id: 'fashion', 
    name: 'Fashion', 
    slug: 'fashion', 
    icon: 'Shirt', 
    color: 'from-pink-500 to-pink-600',
    count: 23 
  },
  { 
    id: 'wordpress', 
    name: 'WordPress', 
    slug: 'wordpress', 
    icon: 'Globe', 
    color: 'from-blue-600 to-blue-700',
    count: 45 
  },
  { 
    id: 'translation', 
    name: 'Translation', 
    slug: 'translation', 
    icon: 'Languages', 
    color: 'from-violet-400 to-violet-500',
    count: 34 
  },
  { 
    id: 'religion', 
    name: 'Religion', 
    slug: 'religion', 
    icon: 'Book', 
    color: 'from-amber-400 to-amber-500',
    count: 12 
  },
  { 
    id: 'astrology', 
    name: 'Astrology', 
    slug: 'astrology', 
    icon: 'Star', 
    color: 'from-purple-600 to-purple-700',
    count: 18 
  },
  { 
    id: 'students', 
    name: 'Students', 
    slug: 'students', 
    icon: 'BookOpen', 
    color: 'from-emerald-500 to-emerald-600',
    count: 67 
  },
  { 
    id: 'gift_ideas', 
    name: 'Gift Ideas', 
    slug: 'gift_ideas', 
    icon: 'Gift', 
    color: 'from-rose-400 to-rose-500',
    count: 15 
  },
  { 
    id: 'travel', 
    name: 'Travel', 
    slug: 'travel', 
    icon: 'MapPin', 
    color: 'from-teal-400 to-teal-500',
    count: 34 
  },
  { 
    id: 'ai_detection', 
    name: 'AI Detection', 
    slug: 'ai_detection', 
    icon: 'Eye', 
    color: 'from-orange-500 to-orange-600',
    count: 23 
  },
  { 
    id: 'fun_tools', 
    name: 'Fun Tools', 
    slug: 'fun_tools', 
    icon: 'Smile', 
    color: 'from-yellow-400 to-yellow-500',
    count: 45 
  },
  { 
    id: 'game_creation', 
    name: 'Game Creation', 
    slug: 'game_creation', 
    icon: 'Gamepad2', 
    color: 'from-indigo-500 to-indigo-600',
    count: 28 
  },
  { 
    id: '3d_generator', 
    name: '3D Generator', 
    slug: '3d_generator', 
    icon: 'Box', 
    color: 'from-slate-400 to-slate-500',
    count: 34 
  },
  { 
    id: 'gaming_ai', 
    name: 'Gaming AI', 
    slug: 'gaming_ai', 
    icon: 'Joystick', 
    color: 'from-violet-500 to-violet-600',
    count: 19 
  },
  { 
    id: 'interior_designer_ai', 
    name: 'Interior Design AI', 
    slug: 'interior_designer_ai', 
    icon: 'Home', 
    color: 'from-amber-500 to-amber-600',
    count: 21 
  },
  { 
    id: 'others', 
    name: 'Others', 
    slug: 'others', 
    icon: 'MoreHorizontal', 
    color: 'from-gray-400 to-gray-500',
    count: 156 
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

// Helper function to get categories by type
export const getCategoriesByType = (type) => {
  switch (type) {
    case 'popular':
      return ALL_CATEGORIES.filter(cat => cat.count > 100);
    case 'new':
      return ALL_CATEGORIES.filter(cat => ['content_creation', 'data_analysis', 'image_generation', 'text_generation'].includes(cat.slug));
    case 'trending':
      return ALL_CATEGORIES.filter(cat => ['ai_detection', 'gaming_ai', '3d_generator'].includes(cat.slug));
    default:
      return ALL_CATEGORIES;
  }
};