import React, { Component } from 'react';
import '../css/App.css';
import { ApolloProvider } from "react-apollo";
import Toppings from './Toppings';
import Menu from './Menu';
import { client } from './config';

class App extends Component {

  state = {
    selectedSize: ''
  }


  updateSize = (size) => {
    const pizzaSize = size.toUpperCase();

    this.setState({
      selectedSize: pizzaSize
    })
  }

  render() {

    return (
      <ApolloProvider client={client}>
        <div className='pizza-app'>
          <h1>
            <span role='img' aria-label='pizza'>🍕</span> 
            Pizza Order
            <span role='img' aria-label='pizza'>🍕</span> 
          </h1>

          <div className='pizza-size'>
            <Menu updateSize={this.updateSize} />

            {this.state.selectedSize !== '' && 
              <Toppings size={this.state.selectedSize} />
            }
          </div>
        </div>
      </ApolloProvider>
    );
    }
}

export default App;
