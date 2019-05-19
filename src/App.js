import React, { Component } from 'react';
import NuevoNodo from './NuevoNodo'
import NuevaConexion from './NuevaConexion'
import Grafo from './Grafo'
import './App.css';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      nNodo: false,
      nConexion: false,
      hayInicial: false,
      hayFinal: false,
      nodos: {}
    };
  }
  crearNodo = () =>{
    this.setState(()=>{
      return {
        nNodo: !this.state.nNodo
      }
    })
  }
  crearConexion = () =>{
    this.setState(()=>{
      return {
        nConexion: !this.state.nConexion
      }
    })
  }
  nuevosDatosNodo = (datos) =>{
    if (datos.heuristica === ''){
      datos.heuristica = 0;
    }
    var nodos = Object.assign({}, this.state.nodos)
    if(datos.nombre in nodos === false){
      nodos[datos.nombre] = {};
      nodos[datos.nombre]['conexiones'] = {};
    }
    if(datos.esInicial){
      this.setState(()=>{
        return {
          hayInicial: true
        }
      })
    }
    if(datos.esFinal){
      this.setState(()=>{
        return {
          hayFinal: true
        }
      })
    }
    nodos[datos.nombre]['heuristica'] = datos.heuristica;
    nodos[datos.nombre]['esInicial'] = datos.esInicial;
    nodos[datos.nombre]['esFinal'] = datos.esFinal;

    console.log("Nuevo nodo: ", nodos);
    this.setState(()=>{
      return {
        nodos: nodos
      }
    })
    this.crearNodo();
  }
  nuevosDatosConexion = (datos) =>{
    var nodosConex = Object.assign({}, this.state.nodos)
    var ok = true;
    var divError = document.getElementById("errorConex");
    divError.innerHTML = '';
    if(datos.nodoUno in nodosConex === false){
      ok = false;
      divError.insertAdjacentHTML('beforeend', `<div>No se puede crear conexión en el nodo: ${datos.nodoUno}</div>`);
      console.log("No se puede crear conexión en el nodo: ", datos.nodoUno);
    }
    if(datos.nodoDos in nodosConex === false){
      ok = false;
      divError.insertAdjacentHTML('beforeend', `<div>No se puede crear conexión en el nodo: ${datos.nodoDos}</div>`);
      console.log("No se puede crear conexión en el nodo: ", datos.nodoDos);
    }
    if(ok){
      nodosConex[datos.nodoUno]['conexiones'][datos.nodoDos] = datos.peso;
      nodosConex[datos.nodoDos]['conexiones'][datos.nodoUno] = datos.peso;
      divError.classList.add("ocultar");
      this.setState(()=>{
        return {
          nodos: nodosConex
        }
      })
      console.log(this.state);
    }else{
      divError.classList.remove("ocultar");
    }
    //limpiar form conexiones
    this.crearConexion();
  }
  eliminarNodo= nodo =>{
    var nodosCopy = Object.assign({}, this.state.nodos)
    if(nodosCopy[nodo].esInicial){
      this.setState(()=>{
        return {
          hayInicial: false
        }
      })
    }
    if(nodosCopy[nodo].esFinal){
      this.setState(()=>{
        return {
          hayFinal: false
        }
      })
    }

    delete nodosCopy[nodo];
    Object.keys(nodosCopy).map(nNodo=>
      delete nodosCopy[nNodo]['conexiones'][nodo]
    )
    this.setState(()=>{
      return {
        nodos: nodosCopy
      }
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Algoritmo A estrella</h1>
          <h3>Alumnos:</h3>
          <h5>Amina Noemi Franco Maldonado</h5>
          <h5>Luis Angel Muñoz Franco</h5>
          <h5>Carlos de Jesus Sandoval Ochoa</h5>
        </header>
        <main className="App-main">
          <div id="errorConex" className="error ocultar"></div>
          <div className="buttons">
            <button className={this.state.nNodo ? "btnNone" : "btn"} onClick={this.crearNodo}>Agregar o Editar Nodo</button>
            <button className={this.state.nConexion ? "btnNone" : "btn"} onClick={this.crearConexion}>Agregar o Editar Conexión</button>
          </div>
          <NuevoNodo mostrar={this.state.nNodo} nuevosDatosNodo={this.nuevosDatosNodo} cancelarNodo={this.crearNodo} hayInicial={this.state.hayInicial} hayFinal={this.state.hayFinal} />
          <NuevaConexion mostrar={this.state.nConexion} nuevosDatosConexion={this.nuevosDatosConexion} cancelarConexion={this.crearConexion} />
          <Grafo nodos={this.state.nodos} eliminar={this.eliminarNodo}/>
          <div className="res">Resultado:</div>
        </main>
      </div>
    );
  }
}
