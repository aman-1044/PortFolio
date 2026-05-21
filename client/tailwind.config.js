/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', 'Salesforce Sans', 'Arial', 'sans-serif'],
      },
      colors: {
        sf: {
          bg:       '#0E1B2E',
          card:     '#16263F',
          card2:    '#1B2E4A',
          blue:     '#0176D3',
          bluelt:   '#1B96FF',
          green:    '#2E844A',
          yellow:   '#FFB75D',
          red:      '#C23934',
          text:     '#FFFFFF',
          muted:    '#8A9BB0',
          border:   '#1E3A5F',
          shimmer:  '#1F3554',
          header:   '#080F1A',
          nav:      '#0176D3',
        },
      },
      boxShadow: {
        'sf-glow':    '0 0 0 3px rgba(1, 118, 211, 0.25)',
        'sf-glow-lt': '0 0 16px rgba(27, 150, 255, 0.3)',
        'sf-card':    '0 2px 12px rgba(0, 0, 0, 0.4)',
        'sf-card-hover': '0 8px 32px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(1,118,211,0.2)',
      },
      keyframes: {
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseRing: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%':      { opacity: '0',   transform: 'scale(1.4)' },
        },
      },
      animation: {
        shimmer:    'shimmer 1.5s ease-in-out infinite',
        pulseRing:  'pulseRing 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
