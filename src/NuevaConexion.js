import React, { Component } from 'react';


export default class NuevaConexion extends Component {

    constructor(props) {
      super(props);
      this.state = {
        nodoUno: '',
        nodoDos: '',
        peso: ''
      };
    }
    componentDidMount(){
      if(this.props.mostrar){
        this.nodoUnoInput.focus();
      }
    }
    handleNodoUno = e=>{
      let nombre = e.target.value.toUpperCase();
      this.setState(()=>{
        return {nodoUno: nombre}
      })
    }
    handleNodoDos = e=>{
      let nombre = e.target.value.toUpperCase();
      this.setState(()=>{
        return {nodoDos: nombre}
      })
    }
    handlePeso = e=>{
      let peso = e.target.value;
      if (isNaN(peso)){
        peso = '';
      }
      this.setState(()=>{
        return {peso: peso}
      })
    }
    datosForm = e =>{
      e.preventDefault();
      var divErrorConex = document.getElementById("errorConex2");
      if(this.state.nodoUno !== '' && this.state.nodoDos !== '' && this.state.peso !== ''){
        divErrorConex.innerHTML = '';
        divErrorConex.classList.add("ocultar");
        this.props.nuevosDatosConexion(this.state)
        this.setState(()=>{
          return {nodoUno: '',
          nodoDos: '',
          peso: ''}
        })
      }else{
        divErrorConex.innerHTML = 'Ningun campo puede estar vacio';
        divErrorConex.classList.remove("ocultar");
      }
    }
    cancelar = e =>{
      e.preventDefault();
      this.props.cancelarConexion()
      this.setState(()=>{
        return {nodoUno: '',
                nodoDos: '',
                peso: ''}
      })
    }

    render() {
      if (this.props.mostrar){
        return (
          <div className="nuevoNodo">
            <div className="titulo">Agrega o Edita una Conexión</div>
            <form action="">
              <input className="inpCon" ref={(inp)=>{this.nodoUnoInput = inp;}} type="text" placeholder="Nombre del Primer Nodo" onChange={this.handleNodoUno} value={this.state.nodoUno}/>
              <input className="inpCon" type="text" placeholder="Nombre del Segundo Nodo" onChange={this.handleNodoDos} value={this.state.nodoDos}/>
              <input className="inpCon" type="text" placeholder="Peso de la Conexión" onChange={this.handlePeso} value={this.state.peso}/>
              <div id="errorConex2" className="error ocultar"></div>
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
