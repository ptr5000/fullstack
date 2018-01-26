import React from 'react'
import ReactDOM from 'react-dom'


class App extends React.Component {
    constructor() {
        super()

        this.state = {
            hyva: 0,
            neutraali: 0,
            huono: 0
         }
    }

    lisaaPalaute = (p) => {
        return () => {
            let s = {}
            s[p] = this.state[p] + 1
            this.setState(s)
        }
    }

    render() {


        return (
            <div>
                <h1>Anna palautetta</h1>
                <button onClick={this.lisaaPalaute('hyva')}>Hyvä</button>
                <button onClick={this.lisaaPalaute('neutraali')}>Neutraali</button>
                <button onClick={this.lisaaPalaute('huono')}>Huono</button>

                <h1>Statistiikka</h1>
                <p>Hyvä {this.state.hyva}</p>
                <p>Neutraali {this.state.neutraali}</p>
                <p>Huono {this.state.huono}</p>
                
            </div>
        )
    }
}
ReactDOM.render(
  <App />,
  document.getElementById('root')
)