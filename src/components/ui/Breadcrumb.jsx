import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = ({ customItems = null }) => {
  const location = useLocation();
  
  const routeMap = {
    '/homepage': { label: 'Home', icon: 'Home' },
    '/category-listing-page': { label: 'Categories', icon: 'Grid3X3' },
    '/tool-detail-page': { label: 'Tool Details', icon: 'Info' },
    '/tool-comparison-page': { label: 'Compare Tools', icon: 'GitCompare' },
    '/tool-submission-form': { label: 'Submit Tool', icon: 'Plus' },
    '/admin-dashboard': { label: 'Admin Dashboard', icon: 'Settings' },
  };

  const generateBreadcrumbs = () => {
    if (customItems) {
      return customItems;
    }

    const pathSegments = location.pathname.split('/').filter(segment => segment);
    const breadcrumbs = [{ label: 'Home', path: '/homepage', icon: 'Home' }];

    if (pathSegments.length === 0 || location.pathname === '/homepage') {
      return breadcrumbs;
    }

    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const routeInfo = routeMap[currentPath];
      
      if (routeInfo) {
        breadcrumbs.push({
          label: routeInfo.label,
          path: currentPath,
          icon: routeInfo.icon,
          isLast: index === pathSegments.length - 1
        });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbs.map((item, index) => (
          <li key={item.path || index} className="flex items-center">
            {index > 0 && (
              <Icon 
                name="ChevronRight" 
                size={16} 
                className="text-text-muted mx-2" 
              />
            )}
            
            {item.isLast || !item.path ? (
              <span className="flex items-center space-x-1.5 text-text-primary font-medium">
                <Icon name={item.icon} size={16} />
                <span className="hidden sm:inline">{item.label}</span>
              </span>
            ) : (
              <Link
                to={item.path}
                className="flex items-center space-x-1.5 text-text-secondary hover:text-text-primary smooth-transition focus-ring rounded px-2 py-1 -mx-2 -my-1"
              >
                <Icon name={item.icon} size={16} />
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;