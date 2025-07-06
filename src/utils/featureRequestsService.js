import { supabase } from './supabase';

class FeatureRequestsService {
  // Submit a feature request
  async submitFeatureRequest(requestData) {
    try {
      const { data, error } = await supabase
        .from('feature_requests')
        .insert([{
          user_id: requestData.user_id || null,
          title: requestData.title,
          description: requestData.description
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
      return { success: false, error: 'Failed to submit feature request' };
    }
  }

  // Get all feature requests
  async getFeatureRequests(options = {}) {
    try {
      let query = supabase
        .from('feature_requests')
        .select(`
          *,
          user_profiles!feature_requests_user_id_fkey (
            full_name,
            email
          )
        `)
        .order('created_at', { ascending: false });

      if (options.status) {
        query = query.eq('status', options.status);
      }

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
      return { success: false, error: 'Failed to load feature requests' };
    }
  }

  // Admin: Update feature request status
  async updateFeatureRequestStatus(requestId, status, adminNotes = '') {
    try {
      const { data, error } = await supabase
        .from('feature_requests')
        .update({
          status,
          updated_at: new Date().toISOString()
        })
        .eq('id', requestId)
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'Failed to update feature request' };
    }
  }

  // Upvote a feature request
  async upvoteFeatureRequest(requestId) {
    try {
      const { data, error } = await supabase
        .from('feature_requests')
        .update({
          upvotes: supabase.raw('upvotes + 1'),
          updated_at: new Date().toISOString()
        })
        .eq('id', requestId)
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'Failed to upvote feature request' };
    }
  }

  // Get feature request by ID
  async getFeatureRequest(requestId) {
    try {
      const { data, error } = await supabase
        .from('feature_requests')
        .select(`
          *,
          user_profiles!feature_requests_user_id_fkey (
            full_name,
            email
          )
        `)
        .eq('id', requestId)
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'Failed to load feature request' };
    }
  }

  // Admin: Delete feature request
  async deleteFeatureRequest(requestId) {
    try {
      const { error } = await supabase
        .from('feature_requests')
        .delete()
        .eq('id', requestId);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to delete feature request' };
    }
  }

  // Get feature requests statistics
  async getFeatureRequestsStats() {
    try {
      const { data, error } = await supabase
        .from('feature_requests')
        .select('status, created_at, upvotes');

      if (error) {
        return { success: false, error: error.message };
      }

      const stats = {
        total: data?.length || 0,
        pending: data?.filter(req => req.status === 'pending')?.length || 0,
        under_review: data?.filter(req => req.status === 'under_review')?.length || 0,
        planned: data?.filter(req => req.status === 'planned')?.length || 0,
        completed: data?.filter(req => req.status === 'completed')?.length || 0,
        rejected: data?.filter(req => req.status === 'rejected')?.length || 0,
        total_upvotes: data?.reduce((sum, req) => sum + (req.upvotes || 0), 0) || 0
      };

      return { success: true, data: stats };
    } catch (error) {
      return { success: false, error: 'Failed to get feature requests statistics' };
    }
  }

  // Get most upvoted feature requests
  async getMostUpvotedRequests(limit = 10) {
    try {
      const { data, error } = await supabase
        .from('feature_requests')
        .select(`
          *,
          user_profiles!feature_requests_user_id_fkey (
            full_name
          )
        `)
        .order('upvotes', { ascending: false })
        .limit(limit);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data: data || [] };
    } catch (error) {
      return { success: false, error: 'Failed to load most upvoted requests' };
    }
  }
}

const featureRequestsService = new FeatureRequestsService();
export default featureRequestsService;