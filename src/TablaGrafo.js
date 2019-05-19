import React, { Component } from 'react';
import Conexiones from './Conexiones';

export default class TablaGrafo extends Component {

  constructor(props) {
    super(props);

    this.state = {

    };
  }
  eliminar = ()=>{
    this.props.eliminar(this.props.nNodo)
  }

  render() {
    const nNodo = this.props.nNodo;
    const nodo = this.props.nodo;
    return (
      <tr key={nNodo}>
        <td>{nNodo}</td>
        <td>{nodo.heuristica}</td>
        <td>{nodo.esInicial ? "si" : ""}</td>
        <td>{nodo.esFinal ? "si" : ""}</td>
        <td>
          {Object.keys(nodo.conexiones).map(conex => <Conexiones key={conex} nodo={conex} conex={nodo.conexiones[conex]}/>)}
        </td>
        <td><button ref={nNodo} className="btnRed" onClick={this.eliminar}>X</button></td>
      </tr>
    );
  }

}
