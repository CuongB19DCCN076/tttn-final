/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
   darkMode: 'class',
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
      "./node_modules/flowbite/**/*.js"
	],
	theme: {
      
		extend: {
         fontFamily: {
           sans: ['Inter var', ...defaultTheme.fontFamily.sans],
         },
       },
		colors: { // Configure your color palette here
      whiteBoder: 'rgb(221, 221, 227)',
      colorSearch: 'rgb(10, 104, 255)',
      colorMenuItem: 'rgb(128, 128, 137)',
      graye5: '#e5e5e5',
      graycb : '#cbcbcc',
      yellowff : '#FFE880',
      grayf5 : '#f5f5fa',
      blackNav : 'rgb(39, 39, 42)',
      white: '#fff',
      
		}
	},
	plugins: [require('flowbite/plugin'),]
}
