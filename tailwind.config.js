module.exports = {
  darkMode: 'class',
  content: [
    "./src/index.js",
    
    "./src/pages/Home.js",
    "./src/pages/JogoDaVelha.js",
    "./src/pages/Forca.js",
    "./src/pages/Wordle.js",
    "./src/pages/CombineTres.js",
    "./src/pages/Main.js",

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
