import React, { Component } from 'react'

export default class Loading extends Component {
  render() {
    return (
        <div className="text-center">
            <div className="spinner-grow spinner-grow-sm text-dark" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>&nbsp;
            <div className="spinner-grow spinner-grow-sm text-dark" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>&nbsp;
            <div className="spinner-grow spinner-grow-sm text-dark" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
  }
}
