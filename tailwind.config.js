import scrollbar from "tailwind-scrollbar"
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
    "./app/**/*.{ts,tsx,js,jsx}",
    "./src/**/*.{ts,tsx,js,jsx}"
  ],

  theme: {
    container: {
      center: true,
      padding: "3rem",
      screens: {
        "2xl": "1400px"
      }
    },
    extend: {
      fontFamily:{
        Messiri:["El Messiri", "sans-serif"],
        outfit:["Outfit", "sans-serif"]
      },
      colors:
      {
        primary: {
          DEFAULT: "hsl(var(--primary-color))",
          input:"hsl(var(--primary-input))",
          50:"hsl(var(--primary50))",
          100:"hsl(var(--primary100))",
          200:"hsl(var(--primary200))",
          300:"hsl(var(--primary300))",
          400:"hsl(var(--primary400))",
          500:"hsl(var(--primary500))",
          600:"hsl(var(--primary600))",
          700:"hsla(var(--primary700))",
          800:"hsl(var(--primary800))",


        
         
         
        
        },
        secondary:{
          DEFAULT: "hsl(var(--secondary))",
          400:"hsla(var(--secondary400))",
          500:"hsla(var(--secondary500))",
          600:"hsla(var(--secondary600))",
          700:"hsl(var(--secondary700))"
         
        },
        
          neutral:{
            400:"hsl(var(--neutral400))",
            600:"hsl(var(--neutral600))",
            700:"hsl(var(--neutral700))"
          },
          sucess:{
            DEFAULT:"hsl(var(--success))",
            500:"hsla(var(--sucess500))",
            600:"hsla(var(--sucess600))",
            700:"hsla(var(--sucess700))",
            
          },
          primary_yellow:{
           DEFAULT:"hsl(var( --primary-yellow))",
           200:"hsl(var(--primary-yellow200))" 
          
          },
          warning:{
            DEFAULT:"hsl(var(--warning))",
            500:"hsl(var( --warning500))",
            600:"hsl(var( --warning600))",
            700:"hsl(var( --warning700))",
            800:"hsl(var( --warning800))",

          }

        
      }
    },
  },
  
    
    plugins: [ scrollbar ({ nocompatible: true }),
      ("tailwindcss/line-clamp")
      
      
  ],


};


   
