import * as actions from '../actions/index'


const initialState = {
  cart: [

  ],
  toppings: [],
  selectedSize: '',
  pizzaCost: 0,
  pizzaInfo: {}
}

export default( state=initialState, action) => {
  switch (action.type) {
    case actions.REMOVE_IEM:
      const cartUpdate = state.cart.filter((ct) => ct.cost !== action.payload.cost)

      return {
        ...state,
        cart: [...cartUpdate]
      }
    case actions.ADD_TO_CART:
      const pizzaOrder = {
        cost: state.pizzaCost,
        toppings: state.toppings,
        name: state.pizzaInfo.name
      }

      return {
        ...state,
        cart: [...state.cart, pizzaOrder]
      }

    case actions.ADD_TOPPING:
      return {
        ...state,
        toppings: [...state.toppings, action.payload],
        pizzaCost: action.updatedCost
      }
    case actions.REMOVE_TOPPING:

      const toppFilter = state.toppings.filter((top) => top.name !== action.payload.name)
      return {
        ...state,
        toppings: [...toppFilter],
        pizzaCost: action.updatedCost
      }
    case actions.SELECT_SIZE:
      return {
        ...state,
        selectedSize: action.payload,
        pizzaInfo: action.pizzaInfo,
        toppings: []
      }
    default:
      return state
  }
}
