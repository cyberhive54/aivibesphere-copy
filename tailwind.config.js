/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#6366F1', // indigo-500
        'primary-foreground': '#F9FAFB', // gray-50
        
        // Secondary Colors
        'secondary': '#8B5CF6', // violet-500
        'secondary-foreground': '#F9FAFB', // gray-50
        
        // Accent Colors
        'accent': '#10B981', // emerald-500
        'accent-foreground': '#F9FAFB', // gray-50
        
        // Background Colors
        'background': '#0A0A0A', // black
        'surface': '#1A1A1A', // gray-900
        'surface-hover': '#262626', // gray-800
        
        // Text Colors
        'text-primary': '#F9FAFB', // gray-50
        'text-secondary': '#9CA3AF', // gray-400
        'text-muted': '#6B7280', // gray-500
        
        // Status Colors
        'success': '#059669', // emerald-600
        'success-foreground': '#F9FAFB', // gray-50
        'warning': '#D97706', // amber-600
        'warning-foreground': '#F9FAFB', // gray-50
        'error': '#DC2626', // red-600
        'error-foreground': '#F9FAFB', // gray-50
        
        // Border Colors
        'border': 'rgba(255, 255, 255, 0.1)', // white with opacity
        'border-hover': 'rgba(255, 255, 255, 0.2)', // white with opacity
      },
      fontFamily: {
        'heading': ['Inter', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
        'caption': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      fontWeight: {
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      boxShadow: {
        'neumorphic': 'inset 0 1px 2px rgba(255, 255, 255, 0.1), 0 4px 12px rgba(0, 0, 0, 0.4)',
        'neumorphic-hover': 'inset 0 1px 2px rgba(255, 255, 255, 0.15), 0 6px 16px rgba(0, 0, 0, 0.5)',
        'card': '0 2px 8px rgba(255, 255, 255, 0.05)',
        'elevated': '0 8px 24px rgba(0, 0, 0, 0.6)',
        'glass': '0 4px 16px rgba(0, 0, 0, 0.3)',
      },
      backdropBlur: {
        'xs': '2px',
        'glass': '12px',
      },
      animation: {
        'fade-in': 'fadeIn 200ms ease-out',
        'slide-down': 'slideDown 200ms ease-out',
        'scale-in': 'scaleIn 150ms ease-out',
        'shimmer': 'shimmer 2s infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideDown: {
          '0%': { 
            opacity: '0',
            transform: 'translateY(-8px)',
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        scaleIn: {
          '0%': { 
            opacity: '0',
            transform: 'scale(0.95)',
          },
          '100%': { 
            opacity: '1',
            transform: 'scale(1)',
          },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
        '250': '250ms',
        '300': '300ms',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
        '1000': '1000',
        '1010': '1010',
        '1020': '1020',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      screens: {
        'xs': '475px',
        '3xl': '1600px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
  ],
}