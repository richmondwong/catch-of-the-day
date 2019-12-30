import React from "react"
import PropTypes from "prop-types"
import { formatPrice } from "../helpers"
import { TransitionGroup, CSSTransition } from "react-transition-group"

class Order extends React.Component{

  static propTypes = {
    fishes: PropTypes.object,
    order: PropTypes.object,
    removeFromOrder: PropTypes.func
  }

  renderOrder = key => {
    var fish = this.props.fishes[key]
    var count = this.props.order[key]
    var isAvailable = fish && fish.status === "available"
    var transitionOptions = {
      classNames: "order",
      key: key,
      timeout: { enter: 500, exit: 500 }
    }


    if (!fish) return null

    if (!isAvailable){
      return (
        <CSSTransition {...transitionOptions}>
            <li key={key}>
              Sorry {fish ? fish.name : "fish"} is no longer available
            </li>
        </CSSTransition>
      )
    }

    return (
      <CSSTransition {...transitionOptions}>
        <li key={key}>
          <span>
            <TransitionGroup component="span" className="count">
              <CSSTransition classNames="count" key={count}
              timeout={{enter: 5000, exit: 5000}}
              >
                <span>{count}</span>
              </CSSTransition>
            </TransitionGroup>

            lbs {fish.name}
            {formatPrice(count * fish.price)}
            <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>
          </span>
          </li>
      </CSSTransition>
    )
  }

  render(){
    var orderIds = Object.keys(this.props.order)
    var total = orderIds.reduce((prevTotal, key) => {
      var fish = this.props.fishes[key]
      var count = this.props.order[key]
      var isAvailable = fish && fish.status === "available"
      if (isAvailable) {
        return prevTotal + (count * fish.price)
      }
      return prevTotal
    }, 0)

    return(
      <div className="order-wrap">
        <h2>Order!!!</h2>

        <TransitionGroup component="ul" className="order">
        { orderIds.map(this.renderOrder) }
        </TransitionGroup>

          <div className="total">
          Total:
            <strong>{formatPrice(total)}</strong>
          </div>
      </div>
    )
  }
}


export default Order
