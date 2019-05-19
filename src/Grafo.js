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
      <TablaGrafo key={nNodo} nNodo={nNodo} nodo={rawNodos[nNodo]} eliminar={this.props.eliminar} eliminarConex={this.props.eliminarConex}/>
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
                  <th>
                    <table>
                      <thead>
                        <tr className="ptconex"><th>Conexiones</th></tr>
                        <tr className="ptconex">
                            <th className="tconex">Nodo</th>
                            <th className="tconex">Peso</th>
                            <th className="tconex">f=g+h</th>
                            <th className="tconex">Eliminar</th>
                        </tr>
                      </thead>
                    </table>
                  </th>
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
