import { supabase } from './supabase';

class ToolsService {
  // Get all tools with optional filters
  async getTools(filters = {}) {
    try {
      let query = supabase
        .from('tools')
        .select('*')
        .eq('is_active', true);

      // Apply filters
      if (filters.category) {
        query = query.eq('category', filters.category);
      }

      if (filters.featured) {
        query = query.eq('is_featured', true);
      }

      if (filters.search) {
        query = query.or(`name.ilike.%${filters.search}%, description.ilike.%${filters.search}%`);
      }

      if (filters.minRating) {
        query = query.gte('average_rating', filters.minRating);
      }

      // Apply sorting
      if (filters.sortBy) {
        switch (filters.sortBy) {
          case 'name':
            query = query.order('name', { ascending: true });
            break;
          case 'rating':
            query = query.order('average_rating', { ascending: false });
            break;
          case 'views':
            query = query.order('view_count', { ascending: false });
            break;
          case 'newest':
            query = query.order('created_at', { ascending: false });
            break;
          default:
            query = query.order('created_at', { ascending: false });
        }
      } else {
        query = query.order('created_at', { ascending: false });
      }

      // Apply pagination
      if (filters.limit) {
        query = query.limit(filters.limit);
      }

      if (filters.offset) {
        query = query.range(filters.offset, filters.offset + (filters.limit || 20) - 1);
      }

      const { data, error } = await query;

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data: data || [] };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError') ||
          error?.name === 'TypeError' && error?.message?.includes('fetch')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
      return { success: false, error: 'Failed to load tools' };
    }
  }

  // Get tool by ID or slug
  async getTool(identifier) {
    try {
      const { data, error } = await supabase
        .from('tools')
        .select('*')
        .or(`id.eq.${identifier},slug.eq.${identifier}`)
        .eq('is_active', true)
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError') ||
          error?.name === 'TypeError' && error?.message?.includes('fetch')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
      return { success: false, error: 'Failed to load tool' };
    }
  }

  // Get featured tools
  async getFeaturedTools(limit = 6) {
    try {
      const { data, error } = await supabase
        .from('tools')
        .select('*')
        .eq('is_featured', true)
        .eq('is_active', true)
        .order('average_rating', { ascending: false })
        .limit(limit);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data: data || [] };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError') ||
          error?.name === 'TypeError' && error?.message?.includes('fetch')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
      return { success: false, error: 'Failed to load featured tools' };
    }
  }

  // Get tools by category
  async getToolsByCategory(category, limit = 12) {
    try {
      const { data, error } = await supabase
        .from('tools')
        .select('*')
        .eq('category', category)
        .eq('is_active', true)
        .order('average_rating', { ascending: false })
        .limit(limit);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data: data || [] };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError') ||
          error?.name === 'TypeError' && error?.message?.includes('fetch')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
      return { success: false, error: 'Failed to load category tools' };
    }
  }

  // Get related tools (same category, excluding current tool)
  async getRelatedTools(toolId, category, limit = 4) {
    try {
      const { data, error } = await supabase
        .from('tools')
        .select('*')
        .eq('category', category)
        .eq('is_active', true)
        .neq('id', toolId)
        .order('average_rating', { ascending: false })
        .limit(limit);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data: data || [] };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError') ||
          error?.name === 'TypeError' && error?.message?.includes('fetch')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
      return { success: false, error: 'Failed to load related tools' };
    }
  }

  // Increment tool view count
  async incrementViewCount(toolId) {
    try {
      // Use the increment function from the database
      const { error } = await supabase.rpc('increment_tool_views', {
        tool_uuid: toolId
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to update view count' };
    }
  }

  // Search tools
  async searchTools(searchTerm, filters = {}) {
    try {
      let query = supabase
        .from('tools')
        .select('*')
        .eq('is_active', true);

      if (searchTerm) {
        query = query.or(`name.ilike.%${searchTerm}%, description.ilike.%${searchTerm}%`);
      }

      if (filters.category) {
        query = query.eq('category', filters.category);
      }

      if (filters.minRating) {
        query = query.gte('average_rating', filters.minRating);
      }

      query = query.order('average_rating', { ascending: false });

      if (filters.limit) {
        query = query.limit(filters.limit);
      }

      const { data, error } = await query;

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data: data || [] };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError') ||
          error?.name === 'TypeError' && error?.message?.includes('fetch')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
      return { success: false, error: 'Failed to search tools' };
    }
  }

  // Get popular tools (most viewed)
  async getPopularTools(limit = 8) {
    try {
      const { data, error } = await supabase
        .from('tools')
        .select('*')
        .eq('is_active', true)
        .order('view_count', { ascending: false })
        .limit(limit);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data: data || [] };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError') ||
          error?.name === 'TypeError' && error?.message?.includes('fetch')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
      return { success: false, error: 'Failed to load popular tools' };
    }
  }

  // Get tools for comparison
  async getToolsForComparison(toolIds) {
    try {
      const { data, error } = await supabase
        .from('tools')
        .select('*')
        .in('id', toolIds)
        .eq('is_active', true);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data: data || [] };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError') ||
          error?.name === 'TypeError' && error?.message?.includes('fetch')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
      return { success: false, error: 'Failed to load comparison tools' };
    }
  }

  // Admin functions
  async createTool(toolData) {
    try {
      const { data, error } = await supabase
        .from('tools')
        .insert([toolData])
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'Failed to create tool' };
    }
  }

  async updateTool(toolId, updates) {
    try {
      const { data, error } = await supabase
        .from('tools')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', toolId)
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'Failed to update tool' };
    }
  }

  async deleteTool(toolId) {
    try {
      const { error } = await supabase
        .from('tools')
        .update({ is_active: false })
        .eq('id', toolId);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to delete tool' };
    }
  }
}

const toolsService = new ToolsService();
export default toolsService;