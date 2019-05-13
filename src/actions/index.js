
export const ADD_TOPPING = 'ADD_TOPPING';
export const REMOVE_TOPPING = 'REMOVE_TOPPING';
export const SELECT_SIZE = 'SELECT_SIZE';
export const UPDATE_COST = 'UPDATE_COST';
export const ADD_TO_CART = 'ADD_TO_CART';

export const addToCart = (pizzaOrder) => {
  return ({
    type: ADD_TO_CART,
    payload: pizzaOrder
  })
}

export const addTopping = (topping, updatedCost) => {
  return ({
    type: ADD_TOPPING,
    payload: topping,
    updatedCost
  })
}

export const removeTopping = (topping, updatedCost) => {
  return ({
    type: REMOVE_TOPPING,
    payload: topping,
    updatedCost
  })
}

export const updateCost = (pizzacost) => {
  return ({
    type: UPDATE_COST,
    payload: pizzacost
  })
}

export const selectSize = (pizzaInfo) => {
  const formatSize = pizzaInfo.name.toUpperCase();

  return ({
    type: SELECT_SIZE,
    payload: formatSize,
    pizzaInfo: pizzaInfo
  })
}
