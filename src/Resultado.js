import React, { Component } from 'react';


export default class Resultado extends Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }
  error=()=>{
    var divError = document.getElementById("errorRes");
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
    }else {
      divError.classList.add("ocultar");
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
  }
  render() {
    return (
      <div className="res">
        <div className="title">Resultado:</div>
        <div id="errorRes" className="error ocultar"></div>
        <div className="contRes">Hola {this.state.count}</div>
      </div>
    );
  }

}
