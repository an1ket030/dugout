/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Graphic Novel Noir Palette
        noir: {
          950: '#070908',
          900: '#0c0f0d',
          850: '#121614',
          800: '#191f1b',
          700: '#232b26',
          600: '#343f38',
        },
        pitch: {
          950: '#060a07',
          900: '#0d140e',
          800: '#152117',
          700: '#1f3022',
        },
        amber: {
          dugout: '#d4882b',
          gold: '#f0ad35',
          warm: '#ffc15e',
          glow: '#e07a1e',
        },
        slate: {
          foggy: '#7f8c85',
          mist: '#c6d1cb',
          steel: '#4b5550',
        },
        red: {
          siren: '#bd2b26',
          blood: '#821714',
        },
        parchment: {
          DEFAULT: '#eee4d1',
          light: '#fbf7ee',
          dark: '#d6c6a8',
          stain: '#b8a17d',
        },
      },
      fontFamily: {
        headline: ['"Bebas Neue"', 'Impact', 'sans-serif'],
        display: ['"Newsreader"', 'Georgia', 'serif'],
        serif: ['"Newsreader"', 'Georgia', 'serif'],
        dossier: ['"Courier Prime"', 'Courier', 'monospace'],
        mono: ['"Courier Prime"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'dossier': '0 20px 45px -15px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(255, 255, 255, 0.07)',
        'amber-glow': '0 0 35px -5px rgba(212, 136, 43, 0.35)',
        'red-glow': '0 0 30px -5px rgba(189, 43, 38, 0.4)',
        'comic': '4px 4px 0px 0px rgba(0,0,0,0.9)',
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
}
