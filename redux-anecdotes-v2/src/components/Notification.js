import React from 'react'
import {setNotification} from '../reducers/notificationReducer.js'

let timer = null

class Notification extends React.Component {
  
  componentDidMount() {
    const { store } = this.props
    
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate()

      if(store.getState().notifications.message) {
          if(timer) {
            clearTimeout(timer)
          }
      
          timer = setTimeout(() => store.dispatch(setNotification(null)), 5000);
        }
      }
    )
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }

    return (
      <div style={style}>
        {this.props.store.getState().notifications.message}
      </div>
    )
  }
}

export default Notification
