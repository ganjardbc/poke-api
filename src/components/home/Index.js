import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { graphql } from "react-apollo"
import gql from "graphql-tag"
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

    componentDidUpdate (prevProps) {
        if (prevProps.data !== this.props.data) {
            const {data} = this.props
            console.log('props', data)
        }
    }

    componentDidMount () {
        const {data} = this.props
        console.log('props', data)

        const {limit, offset} = this.state
        this.getDataGraphql(limit, offset)
    }

    getDataGraphql (limit, offset) {
        this.setState({ visibleLoader: true, visibleLoaderMore: false })

        let data = []
        if (offset > 0) {
            data = Object.assign([], this.state.datas)
        } else {
            data = []
        }

        let query = `query samplePokeAPIquery($limit: Int, $offset: Int) {
            pokemons: pokemon_v2_pokemon(order_by: {id: asc}, limit: $limit, offset: $offset) {
                id
                is_default
                name
                order
                weight
                height
                base_experience
                pokemon_species_id
            }
        }`

        fetch('https://beta.pokeapi.co/graphql/v1beta/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query,
                variables: { limit, offset }
            })
        })
        .then(r => r.json())
        .then((res) => {
            console.log('res', res.data)

            let currentData = res.data.pokemons

            currentData && currentData.map((dt) => {
                return data.push({ ...dt })
            })

            if (currentData.length > 0) {
                let currentOffset = offset + limit

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
        this.getDataGraphql(limit, offset)
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
                                                <div className="display-flex wrap fonts fonts-10 grey word-break">
                                                    <div style={{width: 80}}>Weight</div>
                                                    <div style={{width: 'calc(100% - 80px)'}}>: { dt.weight }</div>
                                                </div>
                                                <div className="display-flex wrap fonts fonts-10 grey word-break">
                                                    <div style={{width: 80}}>Height</div>
                                                    <div style={{width: 'calc(100% - 80px)'}}>: { dt.height }</div>
                                                </div>
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

const queries = gql`
query samplePokeAPIquery($limit: Int, $offset: Int) {
    gen3_species: pokemon_v2_pokemonspecies(where: {pokemon_v2_pokemons: {}}, order_by: {id: asc}, limit: $limit, offset: $offset) {
        id
        name
    }
    generations: pokemon_v2_generation {
        id
        name
        pokemon_species: pokemon_v2_pokemonspecies_aggregate {
            aggregate {
                count
            }
        }
    }
    pokemons: pokemon_v2_pokemon(limit: $limit, offset: $offset) {
        id
        name
    }
}`

export default graphql(queries, {
    options: {
        variables: {
            limit: 40,
            offset: 40
        }
    }
})(App)
