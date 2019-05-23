import React, { Component } from 'react';


export default class Resultado extends Component {

  constructor(props) {
    super(props);

    this.state = {
      resultado:{nodos:[],
                 costo: 0}
    };
  }
  error=()=>{
    var divError = document.getElementById("errorRes");
    var divRes = document.getElementById("resultado");
    divError.innerHTML = '';
    var val = 1;
    if(!this.props.hayInicial){
      divError.insertAdjacentHTML('beforeend', `<div>Es necesario agregar un Nodo Inicial</div>`);
      val=0;
    }
    if(!this.props.hayFinal){
      divError.insertAdjacentHTML('beforeend', `<div>Es necesario agregar un Nodo Final</div>`);
      val=0;
    }
    if(!val){
      divError.classList.remove("ocultar");
      divRes.classList.add("ocultar")
    }else {
      divError.classList.add("ocultar");
      divRes.classList.remove("ocultar")
      this.aEstrella();
    }
  }
  componentDidMount(){
    this.error()
  }
  componentDidUpdate(){
    this.error()
  }
  aEstrella=()=>{
    console.log(this.props.nodos);
    console.log(this.props.hayInicial, this.props.hayFinal);
    console.log(this.props.posInicial, this.props.posFinal);
  const nodos = this.props.nodos;
  var listaAbierta = [];
  var listaCerrada = [];
  var posInicial = this.props.posInicial;
  var posFinal = this.props.posFinal;
  var posActual = posInicial;
  listaCerrada.push(posActual);
  console.log("Lista cerrada", listaCerrada);
  Object.keys(nodos[listaCerrada[0]]['conexiones']).map(key =>
    listaAbierta.push([key, posActual])
  )

  posActual = listaAbierta.shift();
  }
  render() {
    return (
      <div className="res">
        <div className="title">Resultado:</div>
        <div id="errorRes" className="error ocultar"></div>
        <div id="resultado" className="contRes">
          Calculando ...
        </div>
      </div>
    );
  }

}
