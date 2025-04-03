/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
  safelist: [
    'bg-blue-500',
    'bg-blue-600',
    'bg-blue-700',
    'bg-blue-100',
    'text-blue-500',
    'text-blue-600',
    'text-blue-700',
    'hover:bg-blue-700',
    'hover:bg-blue-50',
    'focus:ring-blue-500',
    'focus:border-blue-500',
    'from-blue-500',
    'to-blue-700',
    'text-white',
    'text-gray-500',
    'text-gray-700',
    'text-gray-900',
    'bg-white',
    'bg-gray-50',
    'hover:text-gray-700',
    'hover:border-gray-300',
    'border-gray-300',
    'border-blue-500',
    'border-transparent',
    {
      pattern: /^(h|w|p|m|gap|grid|flex|text|font|border|rounded|shadow|focus|hover).*/,
    },
  ]
}

