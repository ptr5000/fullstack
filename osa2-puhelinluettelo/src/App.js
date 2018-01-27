import React from 'react';
import Client from './client.js'

const Notification = ({ message }) => {
	if (message === null) {
	  return null
	}
	return (
	  <div className="notification">
		{message}
	  </div>
	)
}

const Numbers = ({persons, filter, deleteContact}) => (
	<table>
		<tbody>
			{persons.filter(p => p.name.startsWith(filter))
				.map(person => 
					<tr key={person.name}>
						<td>{person.name}</td>
						<td>{person.number}</td>
						<td><button onClick={deleteContact(person)}>Delete</button></td>
					</tr>
				)}
		</tbody>
	</table>
)

const AddForm = ({handleSubmit, handleNameChange, handleNumberChange, newName, newNumber}) => (
	<form onSubmit={handleSubmit}>
		<div>
			nimi: <input value={newName}
				onChange={handleNameChange} />

			numero: <input value={newNumber}
				onChange={handleNumberChange} />
		</div>
		<div>
			<button type="submit">lisää</button>
		</div>
	</form>
)

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			persons: [
				{ name: 'Arto Hellas', number: '123' }
			],
			newName: '',
			newNumber: '',
			searchField: '',
			message: null
		}
	}

	componentWillMount() {
		Client.getPhonebook()
		  .then(response => {
			this.setState({ persons: response.data })
		  })
	  }
	

	lisaaNimi = (event) => {
		event.preventDefault()

		let name = this.state.newName
		let number = this.state.newNumber
		let persons = [...this.state.persons]

		let existingContacts = persons.filter(p => p.name === name)
		if (existingContacts.length === 0) {
			persons.push({ name, number })
			this.setState({ newName: '', newNumber: '', persons })

			Client.sendContact({name, number})
				.then(response => {
					this.setNotification(name + " lisätty")
				})
		} else {
			let person = existingContacts[0]
			console.log(person);

			if(window.confirm("Korvataanko " + person.name + "?")) {
				Client.sendContact({name, number})
				.then(response => {
					Client.deleteContact(person.id)
					.then(response => {
						// Älä välitä jos delete ei onnistu.
					})

					let persons = this.state.persons.filter(contact=>contact.id !== person.id)
					persons.push({ name, number })
					this.setState({ newName: '', newNumber: '', persons })
					this.setNotification(person.name + " numero muutettu")
				})
				
			}
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

	setNotification = (message) => {
		this.setState({message})
		setTimeout(() => { this.setState({message: null}) }, 2000)
	}

	deleteContact = (person) => {
		return () => {

			if(window.confirm("Poistetaanko " + person.name + "?")) {
				Client.deleteContact(person.id)
					.then(response => {
						let persons = this.state.persons.filter(contact=>contact.id !== person.id)
						this.setState({ persons })

						this.setNotification(person.name + " poistettu")
					})
			}
			
		}
	}

	render() {
		return (
			<div>
				<h2>Puhelinluettelo</h2>

				<Notification message={this.state.message} />

				<div>
				<p>rajaa näytettäviä: <input value={this.state.searchField}
							onChange={this.handleSearchChange} /></p>
				</div>

				<h1>Lisää uusi</h1>
				<AddForm handleSubmit={this.lisaaNimi} 
						handleNumberChange={this.handleNumberChange}
						handleNameChange={this.handleNameChange}
						newName={this.state.newName}
						newNumber={this.state.newNumber} />

				<h2>Numerot</h2>
				<Numbers persons={this.state.persons} 
						filter={this.state.searchField}
						deleteContact={this.deleteContact} />
			</div>
		)
	}
}

export default App