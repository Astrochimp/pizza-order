import React from 'react'

const List = ({ pizzaSizes, chooseSize }) => {
  const pizzaList = pizzaSizes.map((pizza, ind) => {
    return (
      <div key={ind}>
        <h1>{pizza.name} - ${pizza.basePrice}</h1>
        <div>Max Toppings: {pizza.maxToppings}</div>
        <button onClick={() => chooseSize(pizza.name)}>Choose Size</button>
      </div>
    )
  })

  return (
    <div>
      {pizzaList}
    </div>
  )
}

export default List
