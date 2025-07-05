import { supabase } from './supabase';

class SubmissionsService {
  // Submit a new tool for review
  async submitTool(submissionData) {
    try {
      const { data, error } = await supabase
        .from('submissions')
        .insert([{
          submitter_name: submissionData.submitter_name,
          submitter_email: submissionData.submitter_email,
          tool_name: submissionData.tool_name,
          tool_description: submissionData.tool_description,
          tool_category: submissionData.tool_category,
          tool_url: submissionData.tool_url,
          referral_url: submissionData.referral_url || submissionData.tool_url,
          logo_url: submissionData.logo_url,
          features: submissionData.features || [],
          pricing_info: submissionData.pricing_info
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
      return { success: false, error: 'Failed to submit tool for review' };
    }
  }

  // Admin: Get all submissions with optional filters
  async getSubmissions(filters = {}) {
    try {
      let query = supabase
        .from('submissions')
        .select(`
          *,
          reviewed_by_profile:user_profiles!submissions_reviewed_by_fkey (
            full_name,
            email
          )
        `)
        .order('created_at', { ascending: false });

      if (filters.status) {
        query = query.eq('status', filters.status);
      }

      if (filters.category) {
        query = query.eq('tool_category', filters.category);
      }

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
      return { success: false, error: 'Failed to load submissions' };
    }
  }

  // Admin: Get pending submissions count
  async getPendingSubmissionsCount() {
    try {
      const { count, error } = await supabase
        .from('submissions')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, count: count || 0 };
    } catch (error) {
      return { success: false, error: 'Failed to get pending submissions count' };
    }
  }

  // Admin: Review a submission (approve/reject)
  async reviewSubmission(submissionId, reviewData) {
    try {
      const { data, error } = await supabase
        .from('submissions')
        .update({
          status: reviewData.status,
          admin_notes: reviewData.admin_notes || null,
          reviewed_by: reviewData.reviewed_by,
          reviewed_at: new Date().toISOString()
        })
        .eq('id', submissionId)
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'Failed to review submission' };
    }
  }

  // Admin: Approve submission and create tool
  async approveAndCreateTool(submissionId, toolData, reviewedBy) {
    try {
      // Start a transaction by using multiple operations
      
      // First, get the submission details
      const { data: submission, error: fetchError } = await supabase
        .from('submissions')
        .select('*')
        .eq('id', submissionId)
        .single();

      if (fetchError) {
        return { success: false, error: fetchError.message };
      }

      // Create the tool
      const { data: newTool, error: toolError } = await supabase
        .from('tools')
        .insert([{
          name: toolData.name || submission.tool_name,
          slug: toolData.slug || submission.tool_name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').trim('-'),
          category: toolData.category || submission.tool_category,
          description: toolData.description || submission.tool_description,
          features: toolData.features || submission.features || [],
          logo_url: toolData.logo_url || submission.logo_url,
          referral_url: toolData.referral_url || submission.referral_url || submission.tool_url,
          pricing_type: toolData.pricing_type || 'freemium',
          price_info: toolData.price_info || submission.pricing_info,
          is_featured: toolData.is_featured || false,
          created_by: reviewedBy
        }])
        .select()
        .single();

      if (toolError) {
        return { success: false, error: toolError.message };
      }

      // Update the submission status
      const { data: updatedSubmission, error: updateError } = await supabase
        .from('submissions')
        .update({
          status: 'approved',
          reviewed_by: reviewedBy,
          reviewed_at: new Date().toISOString(),
          admin_notes: `Approved and created as tool: ${newTool.name}`
        })
        .eq('id', submissionId)
        .select()
        .single();

      if (updateError) {
        return { success: false, error: updateError.message };
      }

      return { 
        success: true, 
        data: { 
          tool: newTool, 
          submission: updatedSubmission 
        } 
      };
    } catch (error) {
      return { success: false, error: 'Failed to approve submission and create tool' };
    }
  }

  // Get submission by ID
  async getSubmission(submissionId) {
    try {
      const { data, error } = await supabase
        .from('submissions')
        .select(`
          *,
          reviewed_by_profile:user_profiles!submissions_reviewed_by_fkey (
            full_name,
            email
          )
        `)
        .eq('id', submissionId)
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'Failed to get submission' };
    }
  }

  // Delete a submission (admin only)
  async deleteSubmission(submissionId) {
    try {
      const { error } = await supabase
        .from('submissions')
        .delete()
        .eq('id', submissionId);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to delete submission' };
    }
  }

  // Get submission statistics
  async getSubmissionStats() {
    try {
      const { data, error } = await supabase
        .from('submissions')
        .select('status, tool_category, created_at');

      if (error) {
        return { success: false, error: error.message };
      }

      // Calculate statistics
      const stats = {
        total: data?.length || 0,
        pending: data?.filter(s => s.status === 'pending')?.length || 0,
        approved: data?.filter(s => s.status === 'approved')?.length || 0,
        rejected: data?.filter(s => s.status === 'rejected')?.length || 0,
        byCategory: {},
        recent: data?.filter(s => {
          const submissionDate = new Date(s.created_at);
          const weekAgo = new Date();
          weekAgo.setDate(weekAgo.getDate() - 7);
          return submissionDate >= weekAgo;
        })?.length || 0
      };

      // Group by category
      data?.forEach(submission => {
        if (stats.byCategory[submission.tool_category]) {
          stats.byCategory[submission.tool_category]++;
        } else {
          stats.byCategory[submission.tool_category] = 1;
        }
      });

      return { success: true, data: stats };
    } catch (error) {
      return { success: false, error: 'Failed to get submission statistics' };
    }
  }
}

const submissionsService = new SubmissionsService();
export default submissionsService;