/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],

  daisyui: {
    themes: ["nord","wireframe","dark"],
  }
}


// daisyui: {
//   themes: [
//     {
//       mytheme: {
        
// "primary": "#00a8bf",
        
// "secondary": "#009eff",
        
// "accent": "#0018ff",
        
// "neutral": "#03040f",
        
// "base-100": "#eafff7",
        
// "info": "#0094ff",
        
// "success": "#008865",
        
// "warning": "#e16500",
        
// "error": "#ffa5af",
//         },
//       },
//     ],
//   },