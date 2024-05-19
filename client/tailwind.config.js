/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "soft-brown": "var(--soft-brown)",
        "dark-brown": "var(--dark-brown)",
        "gradient-color": "var(--gradient-color)",
      },
    },
  },
  plugins: [],
}

