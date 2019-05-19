import React, { Component } from 'react';


export default class Conexiones extends Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <span>{this.props.nodo}-{this.props.conex}, </span>
    );
  }

}
