import React from 'react';

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			persons: [
				{ name: 'Arto Hellas', number: '123' }
			],
			newName: '',
			newNumber: '',
			searchField: ''
		}
	}

	lisaaNimi = (event) => {
		event.preventDefault()

		let name = this.state.newName
		let number = this.state.newNumber
		let persons = [...this.state.persons]

		if (persons.filter(p => p.name === name).length === 0) {
			persons.push({ name, number })
			this.setState({ newName: '', newNumber: '', persons })
		}
	}

	handleNameChange = (event) => {
		this.setState({ newName: event.target.value })
	}

	handleNumberChange = (event) => {
		this.setState({ newNumber: event.target.value })
	}

	handleSearchChange = (event) => {
		this.setState({ searchField: event.target.value })
	}

	render() {
		return (
			<div>
				<h2>Puhelinluettelo</h2>

				<div>
				<p>rajaa näytettäviä: <input value={this.state.searchField}
							onChange={this.handleSearchChange} /></p>
				</div>

				<h1>Lisää uusi</h1>
				<form onSubmit={this.lisaaNimi}>
					<div>
						nimi: <input value={this.state.newName}
							onChange={this.handleNameChange} />

						numero: <input value={this.state.newNumber}
							onChange={this.handleNumberChange} />
					</div>
					<div>
						<button type="submit">lisää</button>
					</div>
				</form>
				<h2>Numerot</h2>
				<table>
					<tbody>
						{this.state.persons.filter(p => p.name.startsWith(this.state.searchField))
							.map(person => <tr key={person.name}><td>{person.name}</td><td>{person.number}</td></tr>)}
					</tbody>
				</table>
			</div>
		)
	}
}

export default App