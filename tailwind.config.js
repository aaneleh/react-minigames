module.exports = {
  content: [
    "./src/index.js",
    
    "./src/pages/Home.js",
    "./src/pages/JogoDaVelha.js",
    "./src/pages/Forca.js",

    "./src/components/Footer.js",
    "./src/components/Header.js",
    "./src/components/SidebarLinks.js"
  ],
  theme: {
    extend: {
      height: {
        'main': '88vh',
      }
    },
  },
  plugins: [],
}
