import React, { Component } from 'react';
import NuevoNodo from './NuevoNodo'
import NuevaConexion from './NuevaConexion'
import Grafo from './Grafo'
import Resultado from './Resultado'
import './App.css';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      nNodo: false,
      nConexion: false,
      hayInicial: false,
      hayFinal: false,
      posInicial: '',
      posFinal: '',
      nodos: {},
      resultado : []
    };
  }
  componentDidMount(){
    //tomar datos de localStorage
    var nodos = JSON.parse(localStorage.getItem("nodos"));
    console.log("nodos ", nodos);
    if(nodos){
      this.setState(()=>{
        return {
          posInicial: localStorage.getItem("posInicial"),
          hayInicial: localStorage.getItem("hayInicial") === "true",
          posFinal: localStorage.getItem("posFinal"),
          hayFinal: localStorage.getItem("hayFinal") === "true",
          nodos: nodos,
          resultado: localStorage.getItem("resultado")
        }
      },()=>{
      })
    }
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
    }else{
      //si ya existia y era inicial o Final
      if(nodos[datos.nombre].esInicial && datos.esFinal){
          this.setState(()=>{
            return {
              hayInicial: false,
              posInicial: ''
            }
          }, ()=>{
            //localStorage
            localStorage.removeItem("hayInicial");
            localStorage.setItem("hayInicial", this.state.hayInicial);
            localStorage.removeItem("posInicial");
            localStorage.setItem("posInicial", this.state.posInicial);
          })
      }else if(nodos[datos.nombre].esFinal && datos.esInicial){
        this.setState(()=>{
          return {
            hayFinal: false,
            posFinal: ''
          }
        }, ()=>{
          //localStorage
          localStorage.removeItem("hayFinal");
          localStorage.setItem("hayFinal", this.state.hayFinal);
          localStorage.removeItem("posFinal");
          localStorage.setItem("posFinal", this.state.posFinal);
        })
      }
    }
    if(datos.esInicial){
      this.setState(()=>{
        return {
          hayInicial: true,
          posInicial: datos.nombre

        }
      }, ()=>{
        //localStorage
        localStorage.removeItem("hayInicial");
        localStorage.setItem("hayInicial", this.state.hayInicial);
        localStorage.removeItem("posInicial");
        localStorage.setItem("posInicial", this.state.posInicial);
      })
    }else if(datos.esFinal){
      this.setState(()=>{
        return {
          hayFinal: true,
          posFinal: datos.nombre
        }
      }, ()=>{
        //localStorage
        localStorage.removeItem("hayFinal");
        localStorage.setItem("hayFinal", this.state.hayFinal);
        localStorage.removeItem("posFinal");
        localStorage.setItem("posFinal", this.state.posFinal);
      })
    }
    nodos[datos.nombre]['heuristica'] = parseFloat(datos.heuristica);
    nodos[datos.nombre]['esInicial'] = datos.esInicial;
    nodos[datos.nombre]['esFinal'] = datos.esFinal;

    // console.log("Nuevo nodo: ", nodos);
    this.setState(()=>{
      return {
        nodos: nodos
      }
    }, ()=>{
      //guardar state en localStorage
      localStorage.removeItem("nodos")
      localStorage.setItem("nodos", JSON.stringify(this.state.nodos));
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
      nodosConex[datos.nodoUno]['conexiones'][datos.nodoDos] = parseFloat(datos.peso);
      nodosConex[datos.nodoDos]['conexiones'][datos.nodoUno] = parseFloat(datos.peso);
      divError.classList.add("ocultar");
      this.setState(()=>{
        return {
          nodos: nodosConex
        }
      }, ()=>{
        //guardar state en localStorage
        localStorage.removeItem("nodos")
        localStorage.setItem("nodos", JSON.stringify(this.state.nodos));
      })
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
      }, ()=>{
        //guardar state en localStorage
        localStorage.removeItem("hayInicial")
        localStorage.setItem("hayInicial", this.state.hayInicial);
      })
    }
    if(nodosCopy[nodo].esFinal){
      this.setState(()=>{
        return {
          hayFinal: false
        }
      }, ()=>{
        //guardar state en localStorage
        localStorage.removeItem("hayFinal")
        localStorage.setItem("hayFinal", this.state.hayFinal);
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
    }, ()=>{
      //guardar state en localStorage
      localStorage.removeItem("nodos")
      localStorage.setItem("nodos", JSON.stringify(this.state.nodos));
    })
  }
  eliminarConex = (nodoP, nodoC)=>{
    var nodosCopy = Object.assign({}, this.state.nodos);
    delete nodosCopy[nodoP]['conexiones'][nodoC];
    delete nodosCopy[nodoC]['conexiones'][nodoP];
    this.setState(()=>{
      return {
        nodos: nodosCopy
      }
    }, ()=>{
      //guardar state en localStorage
      localStorage.removeItem("nodos")
      localStorage.setItem("nodos", JSON.stringify(nodosCopy));
    })
  }
  setResultado = (res)=>{
    this.setState(()=>{
      return {
        resultado: res
      }
    }, ()=>{
      //guardar state en localStorage
      localStorage.removeItem("resultado")
      localStorage.setItem("resultado", JSON.stringify(this.state.resultado));
    })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Algoritmo A estrella</h1>

        </header>
        <main className="App-main">
          <div id="errorConex" className="error ocultar"></div>
          <div className="buttons">
            <button
              className={this.state.nNodo ? "btnNone" : "btn"}
              onClick={this.crearNodo}>
                Agregar o Editar Nodo
              </button>
            <button
              className={this.state.nConexion ? "btnNone" : "btn"}
              onClick={this.crearConexion}>
                Agregar o Editar Conexión
            </button>
          </div>
          <NuevoNodo
            mostrar={this.state.nNodo}
            nuevosDatosNodo={this.nuevosDatosNodo}
            cancelarNodo={this.crearNodo}
            hayInicial={this.state.hayInicial}
            hayFinal={this.state.hayFinal}
          />
          <NuevaConexion
            mostrar={this.state.nConexion}
            nuevosDatosConexion={this.nuevosDatosConexion}
            cancelarConexion={this.crearConexion}
          />
          <Grafo
            nodos={this.state.nodos}
            eliminar={this.eliminarNodo}
            eliminarConex={this.eliminarConex}
          />
          <Resultado
            hayInicial={this.state.hayInicial}
            posInicial={this.state.posInicial}
            hayFinal={this.state.hayFinal}
            posFinal={this.state.posFinal}
            nodos={this.state.nodos}
            setRes={this.setResultado}
            res = {this.state.resultado}
          />
          <footer className="nuevoNodo">
            <div className="title">Sistemas Inteligentes I</div>
            <div className="title">Profesor: Dr. Jorge Daniel Rios Arrañaga</div>
            <div>
              <h3 className="title">Alumnos:</h3>
              <span className="name">Amina Noemi Franco Maldonado</span>
              <span className="name">Luis Angel Muñoz Franco</span>
              <span className="name">Carlos de Jesus Sandoval Ochoa</span>
            </div>
          </footer>
        </main>
      </div>
    );
  }
}
