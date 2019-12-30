import React from "react"
import PropTypes from "prop-types"
import Header from "./Header"
import Inventory from "./Inventory"
import Order from "./Order"
import sampleFishes from "../sample-fishes"
import Fish from "./Fish"
import base from "../base"

class App extends React.Component{

  state = {
    fishes: {},
    order: {}
  }

  static propTypes = {
    match: PropTypes.object
  }

  componentDidMount(){
    var { params } = this.props.match

    var localStorageRef = localStorage.getItem(params.storeId)
    if (localStorageRef){
      this.setState({ order: JSON.parse(localStorageRef) })
    }

    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes"
    })
  }

  componentDidUpdate(){
    console.log(this.state.order)
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    )
    console.log("Component updated!!!")
  }

  componentWillUnmount(){
    base.removeBinding(this.ref)
  }

  addFish = fish => {
    var fishes = {...this.state.fishes}
    fishes[`fish${Date.now()}`] = fish
    this.setState({ fishes: fishes })
  }

  updateFish = (key, updatedFish) => {
    var fishes = {...this.state.fishes}
    fishes[key] = updatedFish
    this.setState({fishes: fishes})
  }

  deleteFish = (key) => {
    var fishes = { ...this.state.fishes }
    fishes[key] = null
    this.setState({ fishes })
  }

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes})
  }

  addToOrder = (key) => {
    var order = {...this.state.order}
    order[key] = order[key] + 1 || 1
    this.setState({ order: order })
  }

  removeFromOrder = key => {
    var order = { ...this.state.order}
    delete order[key]
    this.setState({order})
  }


  render(){
    return(
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <Header tagline="Testing" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
          ))}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
          />
        <Inventory
          addFish={this.addFish}
          updateFish = {this.updateFish}
          deleteFish = {this.deleteFish}
          loadSampleFishes = {this.loadSampleFishes}
          fishes = { this.state.fishes }
          storeId = {this.props.match.params.storeid}
        />
      </div>
    )
  }
}

export default App
