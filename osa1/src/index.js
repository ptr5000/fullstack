import React from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>{text}</button>
)

const Statistic = ({nimi, arvo}) => (
    <tr><td>{nimi}</td><td>{arvo}</td></tr>
)


const Statistics = ({state}) => {
    if(state.hyva + state.huono + state.neutraali > 0) {
    return (
        <div>
            <table>
                <tbody>
                <Statistic nimi="Hyvä" arvo={state.hyva} />
                <Statistic nimi="Neutraali" arvo={state.neutraali} />
                <Statistic nimi="Huono" arvo={state.huono} />

                <Statistic nimi="Keskiarvo" arvo={((state.hyva - state.huono) / 
                    (state.hyva + state.huono + state.neutraali)).toFixed(1)} />
                
                <Statistic nimi="Positiivisia" arvo={((state.hyva) / 
                        (state.hyva + state.huono + state.neutraali)*100).toFixed(2)} />
                </tbody>
            </table>
        </div>
    )}
    else {
        return (
            <div>Ei yhtään palautetta annettu</div>
        )
    }
}

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
                <Button handleClick={this.lisaaPalaute('hyva')} text="Hyvä" />
                <Button handleClick={this.lisaaPalaute('neutraali')} text="Neutraali" />
                <Button handleClick={this.lisaaPalaute('huono')} text="Huono" />

                <h1>Statistiikka</h1>
              
                <Statistics state={this.state} />
            </div>
        )
    }
}
ReactDOM.render(
  <App />,
  document.getElementById('root')
)