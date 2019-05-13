import React, { Component } from 'react'
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { ApolloConsumer } from 'react-apollo';

class Toppings extends Component {

  state = {
    pizzaDetails: []
  }

  render () {
    const GET_PIZZA_DETAILS = gql`
      {
        pizzaSizeByName(name: LARGE) {
          name,
          maxToppings,
          toppings {
            topping{
              name,
              price
            }
          }
          basePrice
        }
      }
    `
    const size = this.props.size
    return (
      <div className='toppings'>

        <Query query={GET_PIZZA_DETAILS} variables={{ size }}>
          {({ loading, error, data }) => {
            if (loading) return null;
            if (error) return `Error! ${error}`;

            console.log('pizza', data)
            return (
              <div>Pizza Toppings</div>
            )
          }}
        </Query>
      </div>
    )
  }
}

export default Toppings
