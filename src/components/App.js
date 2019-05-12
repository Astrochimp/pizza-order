import React, { Component } from 'react';
import '../css/App.css';
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';

class App extends Component {

  state = {
    pizzaMenu: []
  }

  componentDidMount() {
    const client = new ApolloClient({
      uri: 'https://core-graphql.dev.waldo.photos/pizza'
    });

    this.setState({
      client,
      pizzaMenu: []
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
  }

  render() {

    const pizzaList = this.state.pizzaMenu.map((pizza, ind) => {
      return (
        <div key={ind}>
          <h1>{pizza.name}</h1>
          <div>Max Toppings: {pizza.maxToppings}</div>
          <div>Base Price: {pizza.basePrice}</div>
          <div>Toppings</div>
          <button onClick={() => this.chooseSize(pizza.name)}>Choose</button>
        </div>
      )
    })

    return (
      <div>
        Pizza Order
        {pizzaList}
      </div>
    );
    }
}

export default App;
