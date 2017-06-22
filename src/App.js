import React, { Component } from 'react';
import { SurvivalPlot } from '@oncojs/react-survivalplot'
import sampleData from './sampleData.json'

import logo from './logo.svg';
import './App.css';
import './survivalplot.css';

class App extends Component {

  state = {
    tooltip: {
      donor: {},
      x: 0,
      y:0,
      isVisible: false,
    },
  }

  handleMouseEnterDonor = (event, donor) => {
    console.log(event)
    this.setState({tooltip: {
      ...this.state.tooltip,
      isVisible: true,
      donor: donor,
      x: event.x,
      y: event.y,
    }})
  }

  handleMouseLeaveDonor = () => {
    this.setState({
      tooltip: {
        ...this.state.tooltip,
        isVisible: false,
      },
    })
  }

  render() {
    const tooltip = this.state.tooltip
    const donor = tooltip.donor
    const tooltipStyle = {
      position: 'absolute',
      top: tooltip.y,
      left: tooltip.x,
      display: tooltip.isVisible ? 'block' : 'none',
      pointerEvents: 'none',
    }
    return (
      <div className="App">
        <SurvivalPlot
          className="survivalplot"
          dataSets={sampleData}
          onMouseEnterDonor={this.handleMouseEnterDonor}
          onMouseLeaveDonor={this.handleMouseLeaveDonor}
        />
        <div style={tooltipStyle}>
          <strong>{ donor.id }</strong>
          <div>: { (donor.survivalEstimate * 100).toFixed(2) }%</div>
          {
            donor.isCensored
              ? <div>Censored Survival Time: { donor.time } days (censored)</div>
              : <div>Survival Time: { donor.time } days </div>
          }
        </div>
      </div>
    )
  }
}

export default App;
