import React, {Component} from 'react';
import axios from 'axios'

import './App.css';

class CountryList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            countries: [],
            filter: "",
            selectedCountry: null
        }
    }

    setCountry = (selectedCountry) => {
        return () => {
            this.setState({selectedCountry})
        }
    }

    render() {
        let {filtered} = this.props

        if (filtered.length > 10) {
            return (
                <p>too many matches, please specify another filter</p>
            )
        } else {
            return (
                <div>
                    {filtered.map(country => <div key={country.alpha2Code} onClick={this.setCountry(country.alpha2Code)}>
                        <p >{country.name}</p>

                        <div
                            style={this.state.selectedCountry === country.alpha2Code? {}: {
                                display: 'none'
                            }}>
                                Population: {country.population}
                            </div>

                    </div>)}
                </div>
            )
        }
    }
}

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            countries: [],
            filter: ""
        }
    }
    componentWillMount() {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                this.setState({countries: response.data})
                console.log(response.data)
            })
    }

    handleFilterChange = (event) => {
        this.setState({filter: event.target.value})
    }

    render() {
        let filtered = this
            .state
            .countries
            .filter(country => country.name.toLowerCase().indexOf(this.state.filter.toLowerCase()) !== -1)

        return (
            <div>
                Filter
                <input value={this.state.filter} onChange={this.handleFilterChange}/>
                <CountryList filtered={filtered}/>
            </div>
        );
    }
}

export default App;
