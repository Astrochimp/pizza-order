import React, { Component } from 'react'
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

class Toppings extends Component {

  state = {
    toppingDetails: [],
    maxToppings: 0,
    pizzaCost: 0
  }

  addTopping = (top) => {
    console.log('top', top)
    const updatedCost = this.state.pizzaCost + top.price;

    this.setState({
      pizzaCost: updatedCost
    })
  }

  render () {
    const GET_PIZZA_DETAILS = gql`
      query getPizzaDetails($size: PizzaSizes)
      {
        pizzaSizeByName(name: $size) {
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

            const toppings = data.pizzaSizeByName.toppings.map((top, ind) => {
              return (<div key={ind}>
                <label htmlFor={`topping-${ind}`}>
                  <input type='checkbox'
                    id={`topping-${ind}`}
                    value={top.topping.name}
                    onClick={() => this.addTopping(top.topping)} />
                  {top.topping.name} {top.topping.price}
                </label>
              </div>)
            })

            const formatCost = this.state.pizzaCost.toLocaleString('en-US', { style: 'currency', currency: 'USD' })

            return (
              <div>{data.pizzaSizeByName.name} Pizza Toppings
                <div>
                  {formatCost}
                </div>
                <div>
                  {toppings}
                </div>
              </div>
            )
          }}
        </Query>
      </div>
    )
  }
}

export default Toppings
