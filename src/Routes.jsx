import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import Homepage from "pages/homepage";
import ToolDetailPage from "pages/tool-detail-page";
import ToolComparisonPage from "pages/tool-comparison-page";
import CategoryListingPage from "pages/category-listing-page";
import AdminDashboard from "pages/admin-dashboard";
import ToolSubmissionForm from "pages/tool-submission-form";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<Homepage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/tool-detail-page" element={<ToolDetailPage />} />
        <Route path="/tool-comparison-page" element={<ToolComparisonPage />} />
        <Route path="/category-listing-page" element={<CategoryListingPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/tool-submission-form" element={<ToolSubmissionForm />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;