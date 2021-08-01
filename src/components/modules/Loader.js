import React, { Component } from 'react'

class App extends Component {
	constructor () {
		super()
		this.state = {}
	}

    render () {
        return (
            <div className="display-flex align-center center" style={{ paddingTop: 15, paddingBottom: 15 }}>
                <i className="fa fa-lw fa-spin fa-spinner" />
                <div className="fonts fonts-11 semibold black" style={{ marginLeft: 10 }}>Please Wait ..</div>
            </div>
        )
    }
}

export default App