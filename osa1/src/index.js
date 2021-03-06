import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      votes: []
    }

    for(let i=0;i<anecdotes.length;i++) {
        this.state.votes[i] = 0
    }
  }

  vote = () => {
    return () => {
        const votes = [...this.state.votes]
        votes[this.state.selected]++;
        this.setState({votes: votes})
    }
}
  randomoi = () => {
        return () => {
            this.setState({selected: Math.floor(Math.random()*anecdotes.length)})
        }
    }

  render() {
    let best = this.state.votes.indexOf(
        Math.max(...this.state.votes));

    return (
      <div>
        <button onClick={this.randomoi()}>Next anecdote</button>
        <button onClick={this.vote()}>Vote</button>
        {this.props.anecdotes[this.state.selected]}
        <p>has {this.state.votes[this.state.selected]} votes</p>

        <h1>Anecdote with motes votes:</h1>
        {this.props.anecdotes[best]}
        <p>has {this.state.votes[best]} votes</p>

      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)


