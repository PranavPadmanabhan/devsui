/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // background
        primaryBG: "rgba(18, 18, 18, 0.5)",
        secondaryBG: "#121212",
        searchBG: "rgba(18, 18, 18, 0.6)",
        searchPanelItemBG: "#131313",
        replyHeaderBG: "#1F1F1F",
        warmingBlockBG:'rgba(229, 178, 58, 0.15)',
        modalContainerBG:'rgba(0,0,0,0.5)',
        modalBG:'#141414',
        lightGrey:'#2C2C2C',
        bottomTabBG:'#0B0B0B',
        messageBoxBG:'#1D1D1D',
        greyBG:"#1E1E1E",
      

        // button background
        search_button: "#404040",
        
        postTypeActive:'rgba(64, 64, 64, 0.5)',
        media:'#202020',

        // text color
        white_half_opacity: "rgba(255,255,255,0.5)",

        // border
        primaryBorder: "rgba(255, 255, 255, 0.07)",
        successBorder:'#008000',
        errorBorder:'rgba(255, 0, 0, 0.6)',


        // Gradients

        primaryGradient1: "#14D3DB",
        primaryGradient2: "#0057FF"

      },
      screens: {
        sm400: "400px",
        sm450: "450px",
        sm500: "500px",
        sm550: "550px",
        sm600: "600px",
        sm650: "650px",
        sm700: "700px",
        sm750: "750px",
        md800: "800px",
        md850: "850px",
        md900: "900px",
        md950: "950px",
        md1000: "1000px",
        md1050: "1050px",
        lg1100: "1100px",
        lg1150: "1150px",
        lg1200: "1200px",
        lg1250: "1250px",
        lg1300: "1300px",
        lg1350: "1350px",
        xl1400: "1400px",
        xl1450: "1450px",
        xl1500: "1500px",
        xl1550: "1550px",
        xl1600: "1600px",
        xl1650: "1650px",
        xl1700: "1700px",
        xl1750: "1750px",
        xl1800: "1800px",
        xl1850: "1850px",
        xl1900: "1900px",
        xl1950: "1950px",
        xl2000: "2000px",
        xl2050: "2050px",
        xl2100: "2100px",
        xl2150: "2150px",
        xl2200: "2200px",
        xl2250: "2250px",
        xl2300: "2300px",
        xl2350: "2350px",
        xl2400: "2400px",
        xl2450: "2450px",
        xl2500: "2500px",
        xl2550: "2550px",
        xl2600: "2600px",
        xl2650: "2650px",
        xl2700: "2700px",
        xl2750: "2750px",
        xl2800: "2800px",
        xl2850: "2850px",
        xl2900: "2900px",
        xl2950: "2950px",
        xl3000: "3000px",
        xl3050: "3050px",
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        oswald: ['Oswald', 'sans-serif'],
        averia:['Averia Sans Libre', "cursive"]
      },
      backgroundImage:{
        testAvatar:`url(https://imgs.search.brave.com/C8RHG4Fe1_hAWrg2uRsP5S653ma89uMjKkHHfQb4POA/rs:fit:1200:1200:1/g:ce/aHR0cDovL3d3dy5i/dXNpbmVzc3B1bmRp/dC5jb20vd3AtY29u/dGVudC91cGxvYWRz/LzIwMTYvMDYvRWxv/bi1NdXNrLWFuZC1D/aG9yZS1GaXhpbmct/Um9ib3RzLmpwZw)`,
        signuCover:`url(/assets/svg/bg.svg)`
      },
      keyframes: {
        flicker: {
          "0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%": {
            opacity: 0.99,
            filter:
              "drop-shadow(0 0 1px rgba(252, 211, 77)) drop-shadow(0 0 15px rgba(245, 158, 11)) drop-shadow(0 0 1px rgba(252, 211, 77))",
          },
          "20%, 21.999%, 63%, 63.999%, 65%, 69.999%": {
            opacity: 0.4,
            filter: "none",
          },
        },
        shimmer: {
          "0%": {
            backgroundPosition: "-500px 0",
          },
          "100%": {
            backgroundPosition: "500px 0",
          },
        },
        rotate: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "25%": {
            transform: "rotate(90deg)",
          },
          "50%": {
            transform: "rotate(180deg)",
          },
          "75%": {
            transform: "rotate(270deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
      },
      animation: {
        flicker: "flicker 3s linear infinite",
        shimmer: "shimmer 1.3s linear infinite",
        rotate: "rotate 1.3s linear infinite",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide")
  ],
}