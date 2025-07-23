/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        // Magical Harry Potter colors
        textSecondary: 'hsl(var(--textSecondary))',
        surface: 'hsl(var(--surface))',
        success: 'hsl(var(--success))',
        warning: 'hsl(var(--warning))',
        error: 'hsl(var(--error))',
        magicalBlue: 'hsl(var(--magical-blue))',
        ravenclawBlue: 'hsl(var(--ravenclaw-blue))',
        slytherinGreen: 'hsl(var(--slytherin-green))',
        gryffindorRed: 'hsl(var(--gryffindor-red))',
        hufflepuffYellow: 'hsl(var(--hufflepuff-yellow))',
      },
      fontFamily: {
        'magical': ['Uncial Antiqua', 'Cinzel', 'serif'],
        'medieval': ['MedievalSharp', 'Cinzel', 'serif'],
        'cinzel': ['Cinzel', 'serif'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        // Magical animations
        'sparkle': {
          '0%, 100%': { opacity: '0', transform: 'scale(0)' },
          '50%': { opacity: '1', transform: 'scale(1)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'magical-glow': {
          '0%, 100%': { boxShadow: '0 0 5px hsl(var(--primary) / 0.3)' },
          '50%': { boxShadow: '0 0 20px hsl(var(--primary) / 0.6), 0 0 30px hsl(var(--primary) / 0.4)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'slide-in-top': {
          from: { transform: 'translateY(-20px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-in-bottom': {
          from: { transform: 'translateY(20px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-in-left': {
          from: { transform: 'translateX(-20px)', opacity: '0' },
          to: { transform: 'translateX(0)', opacity: '1' },
        },
        'slide-in-right': {
          from: { transform: 'translateX(20px)', opacity: '0' },
          to: { transform: 'translateX(0)', opacity: '1' },
        },
        'zoom-in': {
          from: { transform: 'scale(0.95)', opacity: '0' },
          to: { transform: 'scale(1)', opacity: '1' },
        },
        'magical-pulse': {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.8' },
        },
        'wand-wave': {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(10deg)' },
          '75%': { transform: 'rotate(-10deg)' },
        },
        'cauldron-bubble': {
          '0%, 100%': { transform: 'translateY(0px) scale(1)' },
          '50%': { transform: 'translateY(-5px) scale(1.1)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        // Magical animations
        'sparkle': 'sparkle 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'magical-glow': 'magical-glow 2s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'fade-in': 'fade-in 0.6s ease-out forwards',
        'fade-in-delay': 'fade-in 0.8s ease-out 0.3s forwards',
        'fade-in-up': 'slide-in-bottom 0.8s ease-out forwards',
        'fade-in-left': 'slide-in-left 0.8s ease-out forwards',
        'fade-in-right': 'slide-in-right 0.8s ease-out forwards',
        'slide-in-top': 'slide-in-top 0.8s ease-out forwards',
        'slide-in-bottom': 'slide-in-bottom 0.6s ease-out forwards',
        'slide-in-right': 'slide-in-right 0.6s ease-out forwards',
        'zoom-in': 'zoom-in 0.6s ease-out forwards',
        'magical-pulse': 'magical-pulse 2s ease-in-out infinite',
        'wand-wave': 'wand-wave 1s ease-in-out',
        'cauldron-bubble': 'cauldron-bubble 1.5s ease-in-out infinite',
      },
      backgroundImage: {
        'magical-gradient': 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 50%, hsl(var(--accent)) 100%)',
        'parchment': 'linear-gradient(45deg, hsl(var(--card)) 0%, hsl(var(--surface)) 100%)',
        'hogwarts': 'linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--surface)) 100%)',
      },
      boxShadow: {
        'magical': '0 8px 32px hsl(var(--primary) / 0.15), 0 0 20px hsl(var(--primary) / 0.1)',
        'magical-lg': '0 12px 40px hsl(var(--primary) / 0.2), 0 0 30px hsl(var(--primary) / 0.15)',
        'glow': '0 0 20px hsl(var(--primary) / 0.4)',
        'glow-lg': '0 0 30px hsl(var(--primary) / 0.5), 0 0 60px hsl(var(--primary) / 0.3)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};