import { supabase } from './supabase';

class DealsService {
  // Get active deals
  async getActiveDeals(options = {}) {
    try {
      let query = supabase
        .from('deals')
        .select(`
          *,
          tools!deals_tool_id_fkey (
            id,
            name,
            slug,
            logo_url,
            category
          )
        `)
        .eq('is_active', true)
        .lte('start_date', new Date().toISOString())
        .gte('end_date', new Date().toISOString())
        .order('created_at', { ascending: false });

      if (options.limit) {
        query = query.limit(options.limit);
      }

      if (options.toolId) {
        query = query.eq('tool_id', options.toolId);
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
      return { success: false, error: 'Failed to load deals' };
    }
  }

  // Get deal by ID
  async getDeal(dealId) {
    try {
      const { data, error } = await supabase
        .from('deals')
        .select(`
          *,
          tools!deals_tool_id_fkey (
            id,
            name,
            slug,
            logo_url,
            category
          )
        `)
        .eq('id', dealId)
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'Failed to load deal' };
    }
  }

  // Admin: Create deal
  async createDeal(dealData) {
    try {
      const { data, error } = await supabase
        .from('deals')
        .insert([dealData])
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'Failed to create deal' };
    }
  }

  // Admin: Update deal
  async updateDeal(dealId, updates) {
    try {
      const { data, error } = await supabase
        .from('deals')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', dealId)
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'Failed to update deal' };
    }
  }

  // Admin: Delete deal
  async deleteDeal(dealId) {
    try {
      const { error } = await supabase
        .from('deals')
        .delete()
        .eq('id', dealId);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to delete deal' };
    }
  }

  // Get deals statistics
  async getDealsStats() {
    try {
      const { data, error } = await supabase
        .from('deals')
        .select('is_active, start_date, end_date, created_at');

      if (error) {
        return { success: false, error: error.message };
      }

      const now = new Date();
      const stats = {
        total: data?.length || 0,
        active: data?.filter(deal => 
          deal.is_active && 
          new Date(deal.start_date) <= now && 
          new Date(deal.end_date) >= now
        )?.length || 0,
        upcoming: data?.filter(deal => 
          deal.is_active && 
          new Date(deal.start_date) > now
        )?.length || 0,
        expired: data?.filter(deal => 
          new Date(deal.end_date) < now
        )?.length || 0
      };

      return { success: true, data: stats };
    } catch (error) {
      return { success: false, error: 'Failed to get deals statistics' };
    }
  }

  // Get trending deals (most clicked)
  async getTrendingDeals(limit = 5) {
    try {
      const { data, error } = await supabase
        .from('deals')
        .select(`
          *,
          tools!deals_tool_id_fkey (
            id,
            name,
            slug,
            logo_url,
            category
          )
        `)
        .eq('is_active', true)
        .lte('start_date', new Date().toISOString())
        .gte('end_date', new Date().toISOString())
        .order('clicks', { ascending: false })
        .limit(limit);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data: data || [] };
    } catch (error) {
      return { success: false, error: 'Failed to load trending deals' };
    }
  }
}

const dealsService = new DealsService();
export default dealsService;