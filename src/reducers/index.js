import * as actions from '../actions/index'


const initialState = {
  cart: [

  ],
  toppings: []
}

export default( state=initialState, action) => {
  switch (action.type) {
    case actions.ADD_TOPPING:
      return {
        ...state,
        toppings: [...state.toppings, action.payload]
      }
    case actions.REMOVE_TOPPING:
      return {
        ...state,
        toppings: [...state.toppings, action.payload]
      }
    default:
      return state
  }
}
