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
  encontrarCamino = (camino, posActual)=>{
    var caminoTotal = [posActual];
    while(posActual in camino){
      posActual = camino[posActual];
      caminoTotal.push(posActual);
    }
    caminoTotal.reverse()
    console.log("Llegaste", caminoTotal);
    return caminoTotal;
  }
  aEstrella=()=>{
    var divRes = document.getElementById("resultado");
    console.log(this.props.nodos);
    console.log(this.props.posInicial, this.props.posFinal);
    const nodos = this.props.nodos;

    //Algoritmo
    var listaAbierta = [];
    var listaCerrada = [];
    var camino = {};
    var GAcum = {};
    var FAcum = {};

    var posInicial = this.props.posInicial;
    var posFinal = this.props.posFinal;

    //datos de la posicion inicial
    var posActual = posInicial;
    listaAbierta.push(posActual);
    FAcum[posInicial] = nodos[posInicial]['heuristica'];
    GAcum[posInicial] = 0;

    //comienza while
    while(listaAbierta.length){
      posActual = listaAbierta.shift();
      listaCerrada.push(posActual);
      console.log("Abierta", listaAbierta)
      console.log("Cerrada", listaCerrada)
      //si el actual es el final
      if(posActual === posFinal){
        //llamar a función que reconstruya el camino hasta ahi
        var caminoFinal = this.encontrarCamino(camino, posActual);
        return this.mostrarResultado(caminoFinal)
      }
      Object.keys(nodos[posActual]['conexiones']).map(keyVecino =>{
        //revisar la lista  a ver si no esta ya en ella
        if(!listaCerrada.includes(keyVecino)){
          var continuar = true;
          //calcular nuevo G total del nodo
          let gCalc = GAcum[posActual]+nodos[posActual]['conexiones'][keyVecino];
          //revisar si no estaba antes en la lista abierta
          if(!listaAbierta.includes(keyVecino)){
            listaAbierta.push(keyVecino);
          }
          else if(gCalc >= GAcum[keyVecino]){
            continuar = false;
          }
          if(continuar){
            camino[keyVecino] = posActual;
            GAcum[keyVecino] = gCalc;
            FAcum[keyVecino] = GAcum[keyVecino] + nodos[keyVecino]['heuristica'];
          }
        }
      })
      console.log("nueva abierta", listaAbierta);
      //ordenar la lista abierta de menor a mayor
      listaAbierta.sort((a,b)=>{
        if(FAcum[a]>FAcum[b]){
          return 1;
        }
        if(FAcum[a]<FAcum[b]){
          return -1;
        }
        return 0;
      })
    }
    divRes.innerHTML = `<div>No existe una conexión entre el nodo inicial y el final, no hay solución.</div>`
  }
  mostrarResultado = caminoFinal =>{
        var divRes = document.getElementById("resultado");
        divRes.innerHTML = `<div>El resultado final es: ${caminoFinal.map(val=> val)}</div>`
        //divRes.insertAdjacentHTML('beforeend', `<div>Es necesario agregar un Nodo Final</div>`);

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
