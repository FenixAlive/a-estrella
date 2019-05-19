import React, { Component } from 'react';
import TablaGrafo from './TablaGrafo'

export default class Grafo extends Component {

  constructor(props) {
    super(props);

    this.state = {

    };
  }
  render() {
    const rawNodos = this.props.nodos;
    const nodos = Object.keys(rawNodos).map(nNodo =>
      <TablaGrafo key={nNodo} nNodo={nNodo} nodo={rawNodos[nNodo]} eliminar={this.props.eliminar}/>
    )
    return (
      <div className="grafo">
        <div className="titulo">Grafo</div>
        <div className="tablaCont">
            <table>
              <thead>
                <tr>
                  <th>Nodo</th>
                  <th>Heuristica</th>
                  <th>¿Es Inicial?</th>
                  <th>¿Es Final?</th>
                  <th>Conexiones</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
              {nodos}
            </tbody>
            </table>
        </div>
      </div>
    );
  }

}
