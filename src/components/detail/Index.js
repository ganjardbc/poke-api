import React, { Component } from 'react'
import Loader from '../modules/Loader'
import BarChart from '../modules/BarChart'

class App extends Component {
	constructor () {
		super()
		this.state = {
            data: null,
            visibleLoader: false 
        }
    }

    componentDidMount () {
        let { url } = this.props.match.params
        this.getDataGraphql(url)
    }

    getDataGraphql (url) {
        this.setState({ visibleLoader: true  })

        let query = `query samplePokeAPIquery($url: String) {
            pokemons: pokemon_v2_pokemon(where: {name: {_eq: $url}}) {
                id
                is_default
                name
                order
                height
                base_experience
                pokemon_species_id
                weight
                species: pokemon_v2_pokemonspecy {
                    name
                    id
                }
                abilities: pokemon_v2_pokemonabilities(distinct_on: id) {
                    id
                    ability_id
                    ability: pokemon_v2_ability {
                        name
                        id
                    }
                }
                types: pokemon_v2_pokemontypes(distinct_on: id) {
                    id
                    type_id
                    type: pokemon_v2_type {
                        name
                        id
                    }
                }
                moves: pokemon_v2_pokemonmoves(distinct_on: level) {
                    level
                    id
                    move: pokemon_v2_move {
                        name
                        id
                    }
                }
                stats: pokemon_v2_pokemonstats(distinct_on: id) {
                    id
                    base_stat
                    effort
                    stat_id
                    stat: pokemon_v2_stat {
                        name
                        id 
                    }
                }
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
                variables: { url }
            })
        })
        .then(r => r.json())
        .then((res) => {
            console.log('res', res.data.pokemons[0])
            const data = res.data.pokemons[0]

            this.setState({ 
                visibleLoader: false,
                data: data 
            })
        })
        .finally(() => {
            this.setState({ visibleLoader: false })
        })
    }

    render () {
        const { visibleLoader, data } = this.state 
        let { url } = this.props.match.params
        let dataStats = data && data.stats.map((dt) => {
            return {
                name: dt.stat && dt.stat.name,
                base_stat: dt.base_stat,
                effort: dt.effort,
            }
        })
        return (
            <div style={{ paddingTop: 20, paddingBottom: 15 }}>
                <div id="navbar">
					<div id="navbar-container" className="display-flex left align-center">
						<div>
                            <button className="btn btn-icon btn-white" onClick={() => this.props.history.goBack()}>
                                <i className="fa fa-lw fa-arrow-left" />
                            </button>
                        </div>
                        <div className="fonts fonts-12 semibold black" style={{ marginLeft: 10 }}>{ url }</div>
					</div>
				</div>

                {visibleLoader ? (
                    <Loader />
                ) : (
                    <div className="main-detail" style={{ paddingTop: 15, paddingBottom: 15 }}>
                        <div className="left">
                            <div className="image image-130px">
                                <i className="post-center icn fa fa-lw fa-vr-cardboard" />
                            </div>
                        </div>
                        <div className="right">
                            
                            <div className="card box-shadow" style={{ marginBottom: 15 }}>
                                <div style={{ marginBottom: 10 }}>
                                    <div className="fonts fonts-12 semibold black">General Info</div>
                                </div>
                                <div className="main-info" style={{ marginBottom: 5 }}>
                                    <div className="mi-left fonts fonts-11 grey">ID</div>
                                    <div className="mi-right fonts fonts-11 black">: { data && data.id }</div>
                                </div>
                                <div className="main-info" style={{ marginBottom: 5 }}>
                                    <div className="mi-left fonts fonts-11 grey">Name</div>
                                    <div className="mi-right fonts fonts-11 black">: { data && data.name }</div>
                                </div>
                                <div className="main-info" style={{ marginBottom: 5 }}>
                                    <div className="mi-left fonts fonts-11 grey">Base Experience</div>
                                    <div className="mi-right fonts fonts-11 black">: { data && data.base_experience }</div>
                                </div>
                                <div className="main-info" style={{ marginBottom: 5 }}>
                                    <div className="mi-left fonts fonts-11 grey">Weight</div>
                                    <div className="mi-right fonts fonts-11 black">: { data && data.weight }</div>
                                </div>
                                <div className="main-info" style={{ marginBottom: 5 }}>
                                    <div className="mi-left fonts fonts-11 grey">Height</div>
                                    <div className="mi-right fonts fonts-11 black">: { data && data.height }</div>
                                </div>
                                <div className="main-info" style={{ marginBottom: 10 }}>
                                    <div className="mi-left fonts fonts-11 grey">Species</div>
                                    <div className="mi-right fonts fonts-11 black">: { data && data.species && data.species.name }</div>
                                </div>
                                <div className="main-info" style={{ marginBottom: 5 }}>
                                    <div className="mi-left fonts fonts-11 grey">Types</div>
                                    <div className="mi-right display-flex">
                                        <span className="fonts fonts-11 black">: </span> 
                                        <span className="display-flex wrap" style={{marginLeft: 3}}>
                                            {data && data.types.map((dt, i) => {
                                                return (
                                                <div key={i} className="display-flex" style={{ margin: '2px 2px' }}>
                                                    <div className="card-value main">
                                                        { dt.type && dt.type.name }
                                                    </div>
                                                </div>
                                            )})}
                                        </span>
                                    </div>
                                </div>
                                <div className="main-info" style={{ marginBottom: 0 }}>
                                    <div className="mi-left fonts fonts-11 grey">Abilities</div>
                                    <div className="mi-right display-flex">
                                        <span className="fonts fonts-11 black">: </span> 
                                        <span className="display-flex wrap" style={{marginLeft: 3}}>
                                            {data && data.abilities.map((dt, i) => {
                                                return (
                                                <div key={i} className="display-flex" style={{ margin: '2px 2px' }}>
                                                    <div className="card-value main">
                                                        { dt.ability && dt.ability.name }
                                                    </div>
                                                </div>
                                            )})}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="card box-shadow" style={{ marginBottom: 15 }}>
                                <div style={{ marginBottom: 10 }}>
                                    <div className="fonts fonts-12 semibold black">Moves</div>
                                </div>
                                <div className="display-flex wrap">
                                    {data && data.moves.map((dt, i) => {
                                        return (
                                            <div key={i} className="display-flex" style={{ margin: '2px 2px' }}>
                                                <div className="card-value main">
                                                    { dt.move && dt.move.name }
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                            <div className="card box-shadow">
                                <div style={{ marginBottom: 15 }}>
                                    <div className="fonts fonts-12 semibold black">Stats</div>
                                </div>
                                <div style={{ width: '100%', height: 400 }} className="fonts fonts-11 black">
                                    <BarChart data={dataStats ? dataStats : []} />
                                </div>
                            </div>

                        </div>
                    </div>
                )}

            </div>
        )
    }
}

export default App 