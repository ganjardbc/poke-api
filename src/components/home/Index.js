import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import Loader from '../modules/Loader'

class App extends Component {
	constructor () {
		super()
		this.state = {
            datas: [],
            count: 0,
            visibleLoader: false,
            visibleLoaderMore: false,
            limit: 45,
            offset: 0
        }
	}

    componentDidMount () {
        const {limit, offset} = this.state
        this.getData(limit, offset)
    }

    getData (limit, offset) {
        this.setState({ visibleLoader: true, visibleLoaderMore: false })

        const limitOffset = 'limit=' + limit + '&offset=' + offset

        let data = []
        if (offset > 0) {
            data = Object.assign([], this.state.datas)
        } else {
            data = []
        }


        axios.get('https://pokeapi.co/api/v2/pokemon?' + limitOffset).then((res) => {
            console.log('res', res.data)

            let currentData = res.data.results

            currentData && currentData.map((dt) => {
                return data.push({ ...dt })
            })

            if (currentData.length > 0) {
                let currentOffset = offset + 1

                this.setState({ 
                    datas: data, 
                    count: res.data.count, 
                    visibleLoader: false,
                    offset: currentOffset
                })
            }

            if (currentData.length < limit) {
                this.setState({ visibleLoaderMore: false })
            } else {
                this.setState({ visibleLoaderMore: true })
            }
        }).finally(() => {
            this.setState({ visibleLoader: false, visibleLoaderMore: true })
        })
    }

    loadMore () {
        const {limit, offset} = this.state
        this.getData(limit, offset)
    }

	render () {
        const {datas, visibleLoader, visibleLoaderMore} = this.state 
		return (
			<div style={{ paddingTop: 20, paddingBottom: 15 }}>

				<div className="display-flex wrap">
                    {datas && datas.map((dt, i) => {
                        return (
                            <div key={i} className="width width-row-2">
                                <div style={{margin: 10}}>
                                    <div className="card box-shadow bg-white">
                                        <div className="display-flex">
                                            <div style={{ width: 45, height: 45, marginRight: 15 }}>
                                                <div className="image image-45px bg-grey">
                                                    <i className="post-center icn fa fa-lw fa-vr-cardboard" />
                                                </div>
                                            </div>
                                            <div style={{ width: 'calc(100% - 115px)' }}>
                                                <h2 className="fonts fonts-12 semibold black">{ dt.name }</h2>
                                                <p className="fonts fonts-10 grey word-break">{ dt.url }</p>
                                            </div>
                                            <div style={{ width: 40, height: 40, marginLeft: 15, paddingTop: 2.5 }}>
                                                <NavLink to={ '/detail/' + dt.name }>
                                                    <button className="btn btn-sekunder btn-icon">
                                                        <i className="fa fa-lw fa-arrow-right" />
                                                    </button>
                                                </NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {visibleLoader && (
                    <Loader />
                )}

                {visibleLoaderMore && (
                    <div className="display-flex center" style={{ paddingTop: 10 }}>
                        <button className="btn btn-sekunder" onClick={() => this.loadMore()}>
                            Load More
                        </button>
                    </div>
                )}
			</div>
		)
	}
}

export default App