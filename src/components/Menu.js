import React from 'react'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import List from './List';

const GET_PIZZA_MENU = gql`
{
  pizzaSizes {
    name,
    maxToppings,
    basePrice,
    toppings {
      pizzaSize {
        maxToppings
      },
      topping {
        name,
        price
      }
      defaultSelected
    }
  }
}
`

const Menu = (props) => {
  return (
    <div className='menu'>
      <Query query={GET_PIZZA_MENU}>
        {({ loading, error, data }) => {
          if (loading) return null;
          if (error) return `Error! ${error}`;

          return(
            <List pizzaSizes={data.pizzaSizes} 
              chooseSize={props.updateSize} />
          )
        }}
      </Query>
    </div>
  )
}

export default Menu
