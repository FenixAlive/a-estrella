import React, { Component } from 'react';


export default class Resultado extends Component {

  constructor(props) {
    super(props);

    this.state = {
      resultado: [],
      Facum: {},
      GAcum: {}
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
  componentDidUpdate(prevProps, PrevState){
    if(prevProps.nodos !== this.props.nodos || prevProps.hayFinal !== this.props.hayFinal || prevProps.hayInicial !== this.props.hayInicial){
      this.error()
    }
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
    divRes.innerHTML="";
    console.log(this.props.nodos);
    console.log(this.props.posInicial, this.props.posFinal);
    const nodos = this.props.nodos;

    //Algoritmo
    var listaAbierta = [];
    var listaCerrada = [];
    var camino = {};
    var GAcum = {};
    var FAcum = {};
    var count = 0;
    var posInicial = this.props.posInicial;
    var posFinal = this.props.posFinal;

    //datos de la posicion inicial
    var posActual = posInicial;
    listaAbierta.push(posActual);
    FAcum[posInicial] = nodos[posInicial]['heuristica'];
    GAcum[posInicial] = 0;

    //imprimir datos hasta ahora
    divRes.insertAdjacentHTML('beforeend', `<div class="titRes">Detalle del resultado por Iteración: </div>`);
    divRes.insertAdjacentHTML('beforeend', `<div class="proRes">Posición inicial de Busqueda: <code>(Nodo ${posInicial})</code>, Posición Final: <code>(Nodo ${posFinal})</code></div>`);
    divRes.insertAdjacentHTML('beforeend', `<div class="titRes">--- Iteración ${count} ---</div>`);
    divRes.insertAdjacentHTML('beforeend', `<div class="proRes">Lista Abierta: <code>[${listaAbierta}]</code></div>`);
    //comienza while
    while(listaAbierta.length){
      posActual = listaAbierta.shift();
      listaCerrada.push(posActual);
      divRes.insertAdjacentHTML('beforeend', `<div class="proRes">Posición Actual: <code>(nodo: ${posActual})</code></div>`);
      divRes.insertAdjacentHTML('beforeend', `<div class="proRes">Lista Cerrada: <code>[${listaCerrada}]</code></div>`);
      divRes.insertAdjacentHTML('beforeend', `<div class="proRes">Lista Abierta Restante antes de agregar nuevos: <code>[${listaAbierta}]</code></div>`);
      console.log("Abierta", listaAbierta)
      console.log("Cerrada", listaCerrada)
      //si el actual es el final
      if(posActual === posFinal){
        //llamar a función que reconstruya el camino hasta ahi
        var caminoFinal = this.encontrarCamino(camino, posActual);
        //sacar costos para mostrarlos
        this.setState(()=>{
          return {
            FAcum: FAcum,
            GAcum: GAcum,
            resultado: caminoFinal
          }
        },()=>{
        //enviar resultado a stateGeneral
        if(this.props.res !== caminoFinal){
          this.props.setRes(caminoFinal);
        }
        this.mostrarResultado(caminoFinal)
        })
        //imprimir resultados
        divRes.insertAdjacentHTML('beforeend', `<div class="resFin">Encontre Camino: <code>[${caminoFinal}]</code></div>`);
        return;
      }
      Object.keys(nodos[posActual]['conexiones']).map(keyVecino =>{
        //revisar la lista  a ver si no esta ya en ella
        if(!listaCerrada.includes(keyVecino)){
          var continuar = true;
          //calcular nuevo G total del nodo
          let gCalc = GAcum[posActual]+parseFloat(nodos[posActual]['conexiones'][keyVecino]);
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
            FAcum[keyVecino] = GAcum[keyVecino] + parseFloat(nodos[keyVecino]['heuristica']);
            divRes.insertAdjacentHTML('beforeend', `<div class="proRes">Nuevo Camino a <code>(nodo: ${keyVecino})</code> desde <code>(nodo: ${posActual})</code> con <code>(F Acumulado =${FAcum[keyVecino]})</code>, <code>(G Acumulado = ${gCalc})</code></div>`);
          }
        }
      })
      if(listaAbierta.length){
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
        divRes.insertAdjacentHTML('beforeend', `<div class="proRes">Nueva Lista Abierta: <code>[${listaAbierta}]</code></div>`);
        console.log("nueva abierta", listaAbierta);
        count++;
        divRes.insertAdjacentHTML('beforeend', `<div class="titRes">--- Iteración ${count} ---</div>`);
      }else{
        divRes.insertAdjacentHTML('beforeend', `<div class="proRes">Nueva Lista Abierta: <code>[${listaAbierta}]</code></div>`);
      }
    }
    divRes.insertAdjacentHTML('beforeend', `<div class="proRes">--- Se acabo el Algoritmo sin exito ---</div>`);
    divRes.insertAdjacentHTML('afterBegin', `<div class="error">No existe una conexión entre el nodo Inicial y el Final<div> No hay Solución</div></div>`);
  }
  mostrarResultado = caminoFinal =>{
        var divRes = document.getElementById("resultado");
        divRes.insertAdjacentHTML('afterBegin', `<div class="resFin">
        El orden del resultado final es:  ${caminoFinal.map(val => `
          <div>(Nodo ${val}):  Costo Acumulado: ${this.state.GAcum[val]}</div>
          `).join('')}
        </div>`);
  }
  render() {
    return (
      <div className="res">
        <div className="title">Resultado:</div>
        <div id="errorRes" className="error ocultar"></div>
        <div id="resultado" className="contRes">
        </div>
      </div>
    );
  }

}
