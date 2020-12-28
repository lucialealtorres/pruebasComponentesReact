import React from 'react';
import MenuBurguer from './components/MenuBurguer.jsx';
import "./styles.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Formulario from './components/Formulario';
import DataTable from './components/DataTable';
import Adjuntos from './components/Adjuntos';
import EditorTexto from './components/EditorTexto';

function App() {
  return (

    <div id="App" className="mt-4">
      <div id="page-wrap">
        <h1>Pruebas Componentes React</h1>
      </div>
      <MenuBurguer pageWrapId={"page-wrap"} outerContainerId={"App"} />
      <Router>
        <div className="container mt-3">
          <Switch>
            <Route component={Adjuntos} path="/adjuntos" exact />
            <Route component={EditorTexto} path="/editorTexto" exact />
            <Route component={Formulario} path="/formulario" exact />
            <Route component={DataTable} path="/dataTable" exact />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;

