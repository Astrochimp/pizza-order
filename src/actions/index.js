
export const ADD_TOPPING = 'ADD_TOPPING';
export const REMOVE_TOPPING = 'REMOBVE_TOPPING';

export const addTopping = (topping) => {
  return({
    type: ADD_TOPPING,
    payload: topping
  })
}

export const removeTopping = (topping) => {
  return({
    type: REMOVE_TOPPING,
    payload: topping
  })
}
