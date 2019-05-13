import React, { Component } from 'react'
import { connect } from 'react-redux';

class Cart extends Component {
  render () {
    let ordertotal = 0;

    return (
      <div>
        <h1>Order</h1>
        <div>Pizza Order</div>
        {this.props.cart.map((cart, ind) => {
          const cost = cart.cost.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
          ordertotal += cart.cost;

          return (
            <div key={ind} className='cart-item'>
              <h3>{cart.name} {cost}</h3>
              <ul>
                {cart.toppings.map((top, ind) => <li key={ind}>{top.name}</li>)}
              </ul>
            </div>
          )
        })}

        <div>
          <h1>Total: {ordertotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} </h1>
        </div>
      </div>
    )
  }
}

export default connect(
  (state) => ({
    cart: state.cart
  })
)(Cart);
