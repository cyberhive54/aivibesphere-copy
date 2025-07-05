import { supabase } from './supabase';

class RatingsService {
  // Get ratings for a tool
  async getToolRatings(toolId, options = {}) {
    try {
      let query = supabase
        .from('ratings')
        .select(`
          *,
          user_profiles!ratings_user_id_fkey (
            full_name,
            avatar_url
          )
        `)
        .eq('tool_id', toolId)
        .order('created_at', { ascending: false });

      if (options.limit) {
        query = query.limit(options.limit);
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
      return { success: false, error: 'Failed to load ratings' };
    }
  }

  // Check if user has already rated a tool
  async hasUserRatedTool(userId, toolId) {
    try {
      const { data, error } = await supabase
        .from('ratings')
        .select('id')
        .eq('user_id', userId)
        .eq('tool_id', toolId)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
        return { success: false, error: error.message };
      }

      return { success: true, hasRated: !!data };
    } catch (error) {
      return { success: false, error: 'Failed to check rating status' };
    }
  }

  // Submit a rating
  async submitRating(userId, toolId, rating, comment = '') {
    try {
      // First check if user has already rated this tool
      const existingCheck = await this.hasUserRatedTool(userId, toolId);
      
      if (!existingCheck.success) {
        return existingCheck;
      }

      if (existingCheck.hasRated) {
        return { success: false, error: 'You have already rated this tool' };
      }

      const { data, error } = await supabase
        .from('ratings')
        .insert([{
          user_id: userId,
          tool_id: toolId,
          rating: rating,
          comment: comment.trim()
        }])
        .select(`
          *,
          user_profiles!ratings_user_id_fkey (
            full_name,
            avatar_url
          )
        `)
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
      return { success: false, error: 'Failed to submit rating' };
    }
  }

  // Update an existing rating
  async updateRating(ratingId, updates) {
    try {
      const { data, error } = await supabase
        .from('ratings')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', ratingId)
        .select(`
          *,
          user_profiles!ratings_user_id_fkey (
            full_name,
            avatar_url
          )
        `)
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'Failed to update rating' };
    }
  }

  // Delete a rating
  async deleteRating(ratingId) {
    try {
      const { error } = await supabase
        .from('ratings')
        .delete()
        .eq('id', ratingId);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to delete rating' };
    }
  }

  // Get user's rating for a specific tool
  async getUserRating(userId, toolId) {
    try {
      const { data, error } = await supabase
        .from('ratings')
        .select('*')
        .eq('user_id', userId)
        .eq('tool_id', toolId)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
        return { success: false, error: error.message };
      }

      return { success: true, data: data || null };
    } catch (error) {
      return { success: false, error: 'Failed to get user rating' };
    }
  }

  // Get rating statistics for a tool
  async getToolRatingStats(toolId) {
    try {
      const { data, error } = await supabase
        .from('tools')
        .select('average_rating, rating_count')
        .eq('id', toolId)
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      // Get rating distribution
      const { data: distribution, error: distError } = await supabase
        .from('ratings')
        .select('rating')
        .eq('tool_id', toolId);

      if (distError) {
        return { success: false, error: distError.message };
      }

      // Calculate rating distribution
      const ratingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
      distribution?.forEach(rating => {
        ratingCounts[rating.rating]++;
      });

      return { 
        success: true, 
        data: {
          average: data.average_rating,
          total: data.rating_count,
          distribution: ratingCounts
        }
      };
    } catch (error) {
      return { success: false, error: 'Failed to get rating statistics' };
    }
  }

  // Get top rated tools
  async getTopRatedTools(limit = 10) {
    try {
      const { data, error } = await supabase
        .from('tools')
        .select('*')
        .eq('is_active', true)
        .gte('rating_count', 3) // Only tools with at least 3 ratings
        .order('average_rating', { ascending: false })
        .limit(limit);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data: data || [] };
    } catch (error) {
      return { success: false, error: 'Failed to load top rated tools' };
    }
  }

  // Get most reviewed tools
  async getMostReviewedTools(limit = 10) {
    try {
      const { data, error } = await supabase
        .from('tools')
        .select('*')
        .eq('is_active', true)
        .order('rating_count', { ascending: false })
        .limit(limit);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data: data || [] };
    } catch (error) {
      return { success: false, error: 'Failed to load most reviewed tools' };
    }
  }
}

const ratingsService = new RatingsService();
export default ratingsService;