import React, { Component } from 'react'
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { addTopping, removeTopping, addToCart, clearList } from '../actions/index'
import ToppingList from './ToppingList';

class Toppings extends Component {

  state = {
    toppingDetails: [],
    maxToppings: 0,
    pizzaCost: this.props.pizzaInfo.basePrice,
    toppingsMessage: '',
    pizzaOrder: {},
    toppings: [],
    size: this.props.size
  }

  addTopping = (e, top) => {
    let updatedCost = this.state.pizzaCost;
    const mxTop = this.props.pizzaInfo.maxToppings || this.props.pizzaInfo.toppings.length;

    if (e.target.checked) {
      if (this.props.toppings.length < mxTop) {
        updatedCost = this.state.pizzaCost + top.price;
        this.props.addTopping(top, updatedCost);
      } else {
        e.target.checked = false;
        this.setState({
          toppingsMessage: 'Max Amount Of Toppings Reached!'
        })
      }
    } else {
      updatedCost = this.state.pizzaCost - top.price;
      this.props.removeTopping(top, updatedCost);
      this.setState({
        toppingsMessage: ''
      })
    }

    this.setState({
      pizzaCost: updatedCost
    })
  }

  clearList = () => {
    this.setState({
      maxToppings: 0,
      pizzaCost: this.props.pizzaInfo.basePrice,
      toppingsMessage: '',
      pizzaOrder: {},
      toppings: [],
    })

    this.props.clearList();
  }

  addPizzaToCart = () => {
    // reset checkbox items
    this.props.addToCart()
    this.clearList()
  }

  static getDerivedStateFromProps(props, state) {
    if ((props.size !== state.size) || (props.toppings.length === 0)) {
      return {
        pizzaCost: props.pizzaInfo.basePrice,
        toppings: [],
        size: props.size,
        maxToppings: props.pizzaInfo.maxToppings,
        pizzaOrder: {}
      }
    }

    return null;
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

            const formatCost = this.state.pizzaCost.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

            return (
              <div>{data.pizzaSizeByName.name}
                <h3>Pizza Toppings</h3>
                <div>{ this.state.toppingsMessage }</div>
                <div>
                  {formatCost}
                </div>
                <div>Max: {data.pizzaSizeByName.maxToppings}</div>
                <div>
                  <ToppingList
                    clearList={this.clearList}
                    addTopping={this.addTopping}
                    toppings={data.pizzaSizeByName.toppings} />
                </div>

                <button onClick={this.addPizzaToCart}>Add to Cart</button>
              </div>
            )
          }}
        </Query>
      </div>
    )
  }
}

export default connect(
  (state) => ({
    toppings: state.toppings,
    pizzaInfo: state.pizzaInfo
  }),{
    addToCart,
    addTopping,
    removeTopping,
    clearList
  }
)(Toppings);
