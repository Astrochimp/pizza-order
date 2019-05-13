import React from 'react'
import { connect } from 'react-redux';
import { selectSize } from '../actions/index'

const List = ({ pizzaSizes, selectSize }) => {
  const pizzaList = pizzaSizes.map((pizza, ind) => {
    return (
      <div key={ind}>
        <h1>{pizza.name} - ${pizza.basePrice}</h1>
        <div>Max Toppings: {pizza.maxToppings}</div>
        <button onClick={() => selectSize(pizza)}>Choose Size</button>
      </div>
    )
  })

  return (
    <div>
      {pizzaList}
    </div>
  )
}

export default connect(
  (state) => ({
    selectSize: state.selectSize
  }),
  { selectSize }
)(List);
