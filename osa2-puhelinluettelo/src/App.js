import React from 'react';

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			persons: [
				{ name: 'Arto Hellas' }
			],
			newName: ''
		}
	}

	lisaaNimi = (event) => {
		event.preventDefault()
		let name = this.state.newName
		let persons = [...this.state.persons]
		persons.push({ name })
		this.setState({ newName: '', persons })
	}

	handleNameChange = (event) => {
		this.setState({ newName: event.target.value })
	}
	
	render() {
		return (
			<div>
				<h2>Puhelinluettelo</h2>
				<form onSubmit={this.lisaaNimi}>
					<div>
						nimi: <input value={this.state.newName} 
									onChange={this.handleNameChange}/>
					</div>
					<div>
						<button type="submit">lisää</button>
					</div>
				</form>
				<h2>Numerot</h2>
				{this.state.persons.map(person => <div key={person.name}>{person.name}</div>)}
			</div>
		)
	}
}

export default App