import { supabase } from './supabase';

class AdvertisementsService {
  // Get active advertisements by type
  async getAdvertisements(adType, options = {}) {
    try {
      let query = supabase
        .from('advertisements')
        .select(`
          *,
          tools!advertisements_tool_id_fkey (
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

      if (adType) {
        query = query.eq('ad_type', adType);
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
      return { success: false, error: 'Failed to load advertisements' };
    }
  }

  // Track ad impression
  async trackImpression(adId) {
    try {
      const { error } = await supabase
        .from('advertisements')
        .update({
          impressions: supabase.raw('impressions + 1'),
          updated_at: new Date().toISOString()
        })
        .eq('id', adId);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to track impression' };
    }
  }

  // Track ad click
  async trackClick(adId) {
    try {
      const { error } = await supabase
        .from('advertisements')
        .update({
          clicks: supabase.raw('clicks + 1'),
          updated_at: new Date().toISOString()
        })
        .eq('id', adId);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to track click' };
    }
  }

  // Admin: Create advertisement
  async createAdvertisement(adData) {
    try {
      const { data, error } = await supabase
        .from('advertisements')
        .insert([adData])
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'Failed to create advertisement' };
    }
  }

  // Admin: Update advertisement
  async updateAdvertisement(adId, updates) {
    try {
      const { data, error } = await supabase
        .from('advertisements')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', adId)
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'Failed to update advertisement' };
    }
  }

  // Admin: Delete advertisement
  async deleteAdvertisement(adId) {
    try {
      const { error } = await supabase
        .from('advertisements')
        .delete()
        .eq('id', adId);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to delete advertisement' };
    }
  }

  // Get advertisement statistics
  async getAdvertisementStats() {
    try {
      const { data, error } = await supabase
        .from('advertisements')
        .select('is_active, impressions, clicks, start_date, end_date, created_at');

      if (error) {
        return { success: false, error: error.message };
      }

      const now = new Date();
      const stats = {
        total: data?.length || 0,
        active: data?.filter(ad => 
          ad.is_active && 
          new Date(ad.start_date) <= now && 
          new Date(ad.end_date) >= now
        )?.length || 0,
        total_impressions: data?.reduce((sum, ad) => sum + (ad.impressions || 0), 0) || 0,
        total_clicks: data?.reduce((sum, ad) => sum + (ad.clicks || 0), 0) || 0,
        ctr: 0 // Click-through rate
      };

      // Calculate CTR
      if (stats.total_impressions > 0) {
        stats.ctr = ((stats.total_clicks / stats.total_impressions) * 100).toFixed(2);
      }

      return { success: true, data: stats };
    } catch (error) {
      return { success: false, error: 'Failed to get advertisement statistics' };
    }
  }
}

const advertisementsService = new AdvertisementsService();
export default advertisementsService;