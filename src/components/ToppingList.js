import React, { Component } from 'react'

class ToppingList extends Component {
  state = {
    topcheckbox: this.props.toppings
  }

  clearCheckboxes = () => {
    const updatedChecks = this.state.topcheckbox.map((chk) => {
      return {
        topping: {
          ...chk.topping,
          isChecked: false
        }
      };
    })

    this.setState({
      topcheckbox: updatedChecks
    })
  }

  render() {

    const toppItems = this.state.topcheckbox.map((top, ind) => {
      const topChecked = top.topping.isChecked;
      return (<div key={ind}>
        <label htmlFor={`topping-${ind}`}>
          <input type='checkbox'
            id={`topping-${ind}`}
            checked={topChecked}
            onChange={(e) => this.props.addTopping(e, top.topping)} />
          {top.topping.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
          {` `}
          {top.topping.name}
        </label>
      </div>)
    })

    return (
      <div className='topping-menu'>
        {toppItems}
      </div>
    )
  }
}

export default ToppingList;
