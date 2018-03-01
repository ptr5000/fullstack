import React from 'react'

const Statistiikka = ({store}) => {
  const palautteita = store.getState().good + store.getState().ok + store.getState().bad

  if (palautteita === 0) {
    return (
      <div>
        <h2>stataistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )
  }

  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{store.getState().good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{store.getState().ok}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{store.getState().bad}</td>
          </tr>
          <tr>
            <td>hyviä</td>
            <td></td>

             {((store.getState().good) / palautteita * 100).toFixed(1)}% 
             
          </tr>
       
        </tbody>
      </table>

      <button onClick={(e)=>{store.dispatch({type: "ZERO"})}}>nollaa tilasto</button>
    </div >
  )
}

class App extends React.Component {
  klik = (nappi) => () => {
    this.props.store.dispatch({type:nappi})
  }

  render() {
    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={this.klik('GOOD')}>hyvä</button>
        <button onClick={this.klik('OK')}>neutraali</button>
        <button onClick={this.klik('BAD')}>huono</button>
        <Statistiikka store={this.props.store} />
      </div>
    )
  }
}

export default App