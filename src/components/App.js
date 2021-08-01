import React, { Component } from 'react'
import { BrowserRouter as Router, Route, HashRouter, NavLink } from 'react-router-dom'
import Logo from '../assets/img/pokeapi_logo.png'

// pages
import Home from './home/Index'
import Detail from './detail/Index'

class App extends Component {
	constructor () {
		super()
		this.state = {}
	}

	render () {
		return (
			<HashRouter history={ Router.browserHistory }>
				<div id="app">
					<div id="header" className="box-shadow">
						<div id="header-container">
							<div className="hc-logo" style={{ margin: 'auto' }}>
								<NavLink to={ '/' }>
									<img src={Logo} alt="" style={{ width: '100%' }} />
								</NavLink>
							</div>
						</div>
					</div>
					<div id="body" className="main-screen">
						<Route exact path="/" component={ Home } />
						<Route exact path="/detail/:url" component={ Detail } />
					</div>
				</div>
			</HashRouter>
		)
	}
}

export default App;
