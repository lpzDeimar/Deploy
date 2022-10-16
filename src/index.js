import Template from "@templates/Template.js";
// Se llaman los estilos desde js para que los lea webpack
import "@styles/main.css";
import "@styles/main.scss";

// evitar esto con los alias
// import '../../../../../../'

(async function App() {
  const main = null || document.getElementById("main");
  main.innerHTML = await Template();
})();

console.log(process.env.DB_HOST);
