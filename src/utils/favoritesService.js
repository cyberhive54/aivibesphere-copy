import { supabase } from './supabase';

class FavoritesService {
  // Add tool to favorites
  async addFavorite(userId, toolId) {
    try {
      const { data, error } = await supabase
        .from('user_favorites')
        .insert([{
          user_id: userId,
          tool_id: toolId
        }])
        .select()
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
      return { success: false, error: 'Failed to add favorite' };
    }
  }

  // Remove tool from favorites
  async removeFavorite(userId, toolId) {
    try {
      const { error } = await supabase
        .from('user_favorites')
        .delete()
        .eq('user_id', userId)
        .eq('tool_id', toolId);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to remove favorite' };
    }
  }

  // Check if tool is favorited by user
  async isToolFavorited(userId, toolId) {
    try {
      const { data, error } = await supabase
        .from('user_favorites')
        .select('id')
        .eq('user_id', userId)
        .eq('tool_id', toolId)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
        return { success: false, error: error.message };
      }

      return { success: true, isFavorited: !!data };
    } catch (error) {
      return { success: false, error: 'Failed to check favorite status' };
    }
  }

  // Get user's favorite tools
  async getUserFavorites(userId, options = {}) {
    try {
      let query = supabase
        .from('user_favorites')
        .select(`
          *,
          tools!user_favorites_tool_id_fkey (
            id,
            name,
            slug,
            category,
            description,
            logo_url,
            average_rating,
            rating_count,
            view_count,
            pricing_type,
            is_featured,
            created_at
          )
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (options.limit) {
        query = query.limit(options.limit);
      }

      const { data, error } = await query;

      if (error) {
        return { success: false, error: error.message };
      }

      // Extract tools from the joined data
      const tools = data?.map(favorite => favorite.tools).filter(tool => tool) || [];

      return { success: true, data: tools };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError') ||
          error?.name === 'TypeError' && error?.message?.includes('fetch')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
      return { success: false, error: 'Failed to load favorites' };
    }
  }

  // Get favorite tools count for user
  async getUserFavoritesCount(userId) {
    try {
      const { count, error } = await supabase
        .from('user_favorites')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, count: count || 0 };
    } catch (error) {
      return { success: false, error: 'Failed to get favorites count' };
    }
  }

  // Get most favorited tools
  async getMostFavoritedTools(limit = 10) {
    try {
      const { data, error } = await supabase
        .from('user_favorites')
        .select(`
          tool_id,
          tools!user_favorites_tool_id_fkey (
            id,
            name,
            slug,
            category,
            description,
            logo_url,
            average_rating,
            rating_count,
            view_count,
            pricing_type,
            is_featured
          )
        `);

      if (error) {
        return { success: false, error: error.message };
      }

      // Count favorites per tool
      const toolCounts = {};
      data?.forEach(favorite => {
        if (favorite.tools) {
          const toolId = favorite.tool_id;
          if (toolCounts[toolId]) {
            toolCounts[toolId].count++;
          } else {
            toolCounts[toolId] = {
              tool: favorite.tools,
              count: 1
            };
          }
        }
      });

      // Sort by count and return top tools
      const sortedTools = Object.values(toolCounts)
        .sort((a, b) => b.count - a.count)
        .slice(0, limit)
        .map(item => ({
          ...item.tool,
          favorites_count: item.count
        }));

      return { success: true, data: sortedTools };
    } catch (error) {
      return { success: false, error: 'Failed to load most favorited tools' };
    }
  }

  // Toggle favorite status
  async toggleFavorite(userId, toolId) {
    try {
      const checkResult = await this.isToolFavorited(userId, toolId);
      
      if (!checkResult.success) {
        return checkResult;
      }

      if (checkResult.isFavorited) {
        return await this.removeFavorite(userId, toolId);
      } else {
        return await this.addFavorite(userId, toolId);
      }
    } catch (error) {
      return { success: false, error: 'Failed to toggle favorite' };
    }
  }
}

const favoritesService = new FavoritesService();
export default favoritesService;