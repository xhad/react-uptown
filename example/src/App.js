import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


import Uptown, { changeMessage } from './uptown'
import Example, { ExampleState } from './uptown/example'

class App extends Component {

  constructor(props) {
    super(props)

    this.uptown = Uptown
    this.example = new Example(Uptown)
    this.state = { ExampleState }

    this.App_example_L1 = (ctx) => this.setState({ExampleState: ctx})
  }

  componentWillMount() {
    this.uptown.addListener('example-state', this.App_example_L1, this)
  }

  componentWillUnmount() {
    this.uptown.removeListener('example-state', this.App_example_L1)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
          <h3>{this.state.ExampleState.message}</h3>
          <button onClick={() => changeMessage('EaglePig upends common thinking.')}>Msg 1</button>
          <button onClick={() => changeMessage('MooseBeaver rages down the mountain.')}>Msg 2</button>
      </div>
    );
  }
}

export default App;
