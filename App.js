import profile from "./profile.jpeg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={profile} className="App-logo" alt="logo" />
        <p>EVALUACIÓN PARCIAL 1</p>
        <p>Alumno: Miranda Leyva Juan Manuel</p>
        <a
          className="App-link"
          href="https://www.linkedin.com/in/juan-manuel-miranda-leyva-a792423a4/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visitar mi perfil de Linkedin
        </a>
        <a
          className="App-link2"
          href="file:///C:/Users/Juan/OneDrive/Documents/miranda/miranda_parcial1/src/Descargas.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          Documentación Parcial 1
        </a>
      </header>
    </div>
  );
}

export default App;
