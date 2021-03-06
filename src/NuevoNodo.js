import React, { Component } from 'react';


export default class NuevoNodo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nombre: '',
      heuristica: '',
      esInicial: false,
      esFinal: false,
    };
  }
  componentWillMount(){
    this.setState(()=>{
      if(this.props.editar)
      return {nombre: this.props.editar.nombre,
              heuristica: this.props.editar.heuristica}
    })
  }
  componentDidMount(){
    if(this.props.mostrar){
      this.nombreInput.focus();
    }
  }
  handleNombre = e=>{
    let nombre = e.target.value.toUpperCase();
    this.setState(()=>{
      return {nombre: nombre}
    })
  }
  handleHeuristica = e=>{
    let heuristica = e.target.value;
    if (isNaN(heuristica)){
      heuristica = '';
    }
    this.setState(()=>{
      return {heuristica: heuristica}
    })
  }
  handleCheckboxInicial = e=>{
    var check = document.getElementById("checkFin");
    if(check !== null){
      if(this.state.esInicial){
        check.classList.remove("ocultar");
      }else{
        check.classList.add("ocultar");
      }
    }
    this.setState(()=>{
      return {esInicial: !this.state.esInicial}
    })

  }
  handleCheckboxFinal = e=>{
    var check = document.getElementById("checkIni");
    if(check !== null){
      if(this.state.esFinal){
        check.classList.remove("ocultar");
      }else{
        check.classList.add("ocultar");
      }
    }
    this.setState(()=>{
      return {esFinal: !this.state.esFinal}
    })

  }
  datosForm = e =>{
    e.preventDefault();
    var divErrorNodo = document.getElementById("errorNodo");
    if(this.state.nombre !== ''){
      divErrorNodo.innerHTML = '';
      divErrorNodo.classList.add("ocultar");
      this.props.nuevosDatosNodo(this.state)
      this.setState(()=>{
        return {nombre: '',
        heuristica: '',
        esInicial: false,
        esFinal: false
        }
      })
    }else{
      divErrorNodo.innerHTML = "El nombre del nodo no puede estar vacio";
      divErrorNodo.classList.remove("ocultar");
    }
  }
  cancelar = e =>{
    e.preventDefault();
    this.props.cancelarNodo()
    this.setState(()=>{
      return {nombre: '',
              heuristica: '',
              esInicial: false,
              esFinal: false
            }
    })
  }

  render() {
    if (this.props.mostrar){
      var checkIni= "";
      var checkFin = "";
      if(!this.props.hayInicial){
        checkIni = <div className="checkIni" id="checkIni">
          <label className="check"><input type="checkbox"
            id="esIni"
            onChange={this.handleCheckboxInicial}/>
            <span className="checkText">¿Es el Nodo Inicial?</span>
          </label>
        </div>
      }
      if(!this.props.hayFinal){
        checkFin = <div className="checkFin" id="checkFin">
          <label className="check"><input type="checkbox"
            id="esFin"
            onChange={this.handleCheckboxFinal}/>
            <span className="checkText">¿Es el Nodo Final?</span>
          </label>
        </div>
      }
      return (
        <div className="nuevoNodo">
          <div className="titulo">Agrega o Edita un Nodo</div>
          <form action="">
            <input className="inpNodo" ref={(inp)=>{this.nombreInput = inp;}} type="text" placeholder="Nombre del Nodo" onChange={this.handleNombre} value={this.state.nombre} required/>
            <input className="inpNodo" type="text" placeholder="Heuristica del Nodo" onChange={this.handleHeuristica} value={this.state.heuristica}/>
            {checkIni}
            {checkFin}

            <div id="errorNodo" className="error ocultar"></div>
            <div className="botones">
              <button className="btn" onClick={this.datosForm}>Enviar</button>
              <button className="btnRed" onClick={this.cancelar}>Cancelar</button>
            </div>
          </form>
        </div>
      );
    }else {
      return(
        <React.Fragment />
      )
    }
  }

}
