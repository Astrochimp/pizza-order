import React, { Component } from 'react';
import '../css/App.css';
import { ApolloProvider } from "react-apollo";
import Toppings from './Toppings';
import Menu from './Menu';
import Cart from './Cart';
import { client } from './config';
import { connect } from 'react-redux';
import { selectSize } from '../actions/index'

class App extends Component {
  updateSize = (size) => {
    this.props.selectSize(size);
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
            <Menu />

            {this.props.selectedSize !== '' && 
              <Toppings size={this.props.selectedSize} />
            }

            <Cart />
          </div>
        </div>
      </ApolloProvider>
    );
  }
}

export default connect(
  (state) => ({
    selectedSize: state.selectedSize
  }),
  { selectSize }
)(App);
