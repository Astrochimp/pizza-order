import React, { Component } from 'react'

class ToppingList extends Component {
  state = {
    topcheckbox: this.props.toppings
  }

  clearCheckboxes = () => {
    const updatedChecks = this.state.topcheckbox.map((chk) => {
      return {
        topping: chk.topping,
        isChecked: false
      };
    })

    this.setState({
      topcheckbox: updatedChecks,
      toppings: []
    })

    this.props.clearList()
  }

  addTopping = (e, topping) => {
    /*
    const listCheck = this.state.topcheckbox.map((top) => {
      if (topping === top.topping) {
        return {
          topping: top.topping,
          isChecked: true
        }
      } else {
        return {
          topping: top.topping,
          isChecked: top.isChecked
        }
      }
    })

    this.setState({
      topcheckbox: listCheck
    })
    */

    this.props.addTopping(e, topping)
  }

  render() {

    const toppItems = this.state.topcheckbox.map((top, ind) => {
      const topChecked = top.isChecked;

      return (<div key={ind}>
        <label htmlFor={`topping-${ind}`}>
          <input type='checkbox'
            id={`topping-${ind}`}
            checked={topChecked}
            onChange={(e) => this.addTopping(e, top.topping)} />
          {top.topping.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
          {` `}
          {top.topping.name}
        </label>
      </div>)
    })

    return (
      <div className='topping-menu'>
        {toppItems}
        <button onClick={this.clearCheckboxes}>clear</button>
      </div>
    )
  }
}

export default ToppingList;
