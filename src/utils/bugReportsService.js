import { supabase } from './supabase';

class BugReportsService {
  // Submit a bug report
  async submitBugReport(reportData) {
    try {
      const { data, error } = await supabase
        .from('bug_reports')
        .insert([{
          user_id: reportData.user_id || null,
          title: reportData.title,
          description: reportData.description,
          page_url: reportData.page_url || null,
          screenshot_urls: reportData.screenshot_urls || []
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
      return { success: false, error: 'Failed to submit bug report' };
    }
  }

  // Get all bug reports
  async getBugReports(options = {}) {
    try {
      let query = supabase
        .from('bug_reports')
        .select(`
          *,
          user_profiles!bug_reports_user_id_fkey (
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
      return { success: false, error: 'Failed to load bug reports' };
    }
  }

  // Admin: Update bug report status
  async updateBugReportStatus(reportId, status) {
    try {
      const { data, error } = await supabase
        .from('bug_reports')
        .update({
          status,
          updated_at: new Date().toISOString()
        })
        .eq('id', reportId)
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'Failed to update bug report' };
    }
  }

  // Get bug report by ID
  async getBugReport(reportId) {
    try {
      const { data, error } = await supabase
        .from('bug_reports')
        .select(`
          *,
          user_profiles!bug_reports_user_id_fkey (
            full_name,
            email
          )
        `)
        .eq('id', reportId)
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'Failed to load bug report' };
    }
  }

  // Admin: Delete bug report
  async deleteBugReport(reportId) {
    try {
      const { error } = await supabase
        .from('bug_reports')
        .delete()
        .eq('id', reportId);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to delete bug report' };
    }
  }

  // Get bug reports statistics
  async getBugReportsStats() {
    try {
      const { data, error } = await supabase
        .from('bug_reports')
        .select('status, created_at');

      if (error) {
        return { success: false, error: error.message };
      }

      const stats = {
        total: data?.length || 0,
        open: data?.filter(report => report.status === 'open')?.length || 0,
        in_progress: data?.filter(report => report.status === 'in_progress')?.length || 0,
        resolved: data?.filter(report => report.status === 'resolved')?.length || 0,
        closed: data?.filter(report => report.status === 'closed')?.length || 0,
        recent: data?.filter(report => {
          const reportDate = new Date(report.created_at);
          const weekAgo = new Date();
          weekAgo.setDate(weekAgo.getDate() - 7);
          return reportDate >= weekAgo;
        })?.length || 0
      };

      return { success: true, data: stats };
    } catch (error) {
      return { success: false, error: 'Failed to get bug reports statistics' };
    }
  }

  // Upload screenshot to Supabase Storage
  async uploadScreenshot(file, userId) {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}/${Date.now()}.${fileExt}`;

      const { data, error } = await supabase.storage
        .from('bug_screenshots')
        .upload(fileName, file);

      if (error) {
        return { success: false, error: error.message };
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('bug_screenshots')
        .getPublicUrl(fileName);

      return { success: true, data: { path: data.path, url: urlData.publicUrl } };
    } catch (error) {
      return { success: false, error: 'Failed to upload screenshot' };
    }
  }
}

const bugReportsService = new BugReportsService();
export default bugReportsService;