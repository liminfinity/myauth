/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'
export default {
  content: [
    "./src/**/*.{tsx,jsx,js,ts}"
  ],
  theme: {
    extend: {
      padding: {
        '128': '32rem'
      },
      colors: {
        title: '#151450',
        text_mainColor: '#9ea1b7',
        blue: '#4694f9',
        blueHover: '#6EADFF',
        blueDisabled: '#428ae886',
        mainColor: '#FFF',
        secondColor: '#f5f6fa',
        error: '#ea5656',
        success: '#99ECA6'
      },
      
      transitionDuration: {
        DEFAULT: '.5s'
      },
      transitionTimingFunction: {
        DEFAULT: 'ease-in-out'
      },
      keyframes: {
        error: {
          "0%": {
            transform: "translateY(-125%)",
            opacity: 0
          },
          "50%": {
            transform: "translateY(0)",
            opacity: 1
          },
          "100%": {
            transform: "translateY(0)",
            opacity: 0
          }
        },
        open: {
          "0%": {
            opacity: 0
          },
          "100%": {
            opacity: 1
          }
        },
      },
      animation: {
        openError: "error 6s cubic-bezier(.07,.14,.14,.99) forwards",
        openModal: 'open .5s cubic-bezier(.07,.14,.14,.99) forwards'
      }

    },
    screens: {
      ...defaultTheme.screens,
    },
  },
  plugins: [],
}

