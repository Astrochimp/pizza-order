import React, { Component } from 'react';
import '../css/App.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from "react-apollo";
import gql from 'graphql-tag';
import Toppings from './Toppings';
class App extends Component {

  state = {
    pizzaMenu: [],
    selectedSize: ''
  }

  componentDidMount() {
    const client = new ApolloClient({
      uri: 'https://core-graphql.dev.waldo.photos/pizza'
    });

    this.setState({
      client
    })

    client.query({
      query: gql`{
        pizzaSizes {
          name,
          maxToppings,
          basePrice,
          toppings {
            pizzaSize {
              maxToppings
            },
            topping {
              name,
              price
            }
            defaultSelected
          }
        }
      }
      `
    }).then(data => {
        console.log('data', data.data.pizzaSizes)
        this.setState({
          pizzaMenu: data.data.pizzaSizes
        })
      }
    )
    .catch(error => console.error(error));
  }

  chooseSize = (pizza) => {
    console.log('e', pizza)

    const pizzaSize = pizza.toUpperCase();

    this.setState({
      selectedSize: pizzaSize
    })
  }

  render() {

    const pizzaList = this.state.pizzaMenu.map((pizza, ind) => {
      return (
        <div key={ind}>
          <h1>{pizza.name}</h1>
          <div>Max Toppings: {pizza.maxToppings}</div>
          <div>Base Price: {pizza.basePrice}</div>
          <div>Toppings</div>
          <button onClick={() => this.chooseSize(pizza.name)}>Choose Size</button>
        </div>
      )
    })

    const client = new ApolloClient({
      uri: 'https://core-graphql.dev.waldo.photos/pizza'
    });

    return (
      <ApolloProvider client={client}>
        <div className='pizza-size'>
          <h1>
            <span role='img' aria-label='pizza'>🍕</span> 
            Pizza Order 
            <span role='img' aria-label='pizza'>🍕</span> 
          </h1>
          {pizzaList}

          {this.state.selectedSize !== '' && 
            <Toppings size={this.state.selectedSize} />
          }
        </div>
      </ApolloProvider>
    );
    }
}

export default App;
