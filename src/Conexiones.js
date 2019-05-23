import React, { Component } from 'react';


export default class Conexiones extends Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }
  eliminar=()=>{
    this.props.eliminarConex(this.props.nodoP, this.props.nodo)
  }

  render() {
    return (
      <table>
        <tbody>
          <tr className="ptconex">
            <td className="tconex">{this.props.nodo}</td>
            <td className="tconex">{this.props.conex}</td>
            <td className="tconex"><button className="btnRed" onClick={this.eliminar}>X</button></td>
          </tr>
        </tbody>
      </table>
    );
  }

}
