module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'color-1': 'var(--color-1)',
        'color-2': 'var(--color-2)',
        'color-3': 'var(--color-3)',
        'color-4': 'var(--color-4)',
        'color-5': 'var(--color-5)',
        'color-6': 'var(--color-6)',
        'bg-color': 'var(--bg-color)',
      },
      fontFamily: {
        'sans': ['Poppins', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}
