import React from 'react'
import PropTypes from 'prop-types'
import {setNotification} from '../reducers/notificationReducer.js'
import { connect } from 'react-redux'

let timer = null

class Notification extends React.Component {
  
 

  render() {
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }

    const {store} = this.context

    if(this.props.message) {
      if(timer) {
        clearTimeout(timer)
      }
  
      timer = setTimeout(() => store.dispatch(setNotification(null)), 5000);
    }
  
    
    return (
      <div style={style}>
        {this.props.message}
      </div>
    )
  }
}

Notification.contextTypes = {
  store: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    message: state.notifications.message,
  }
}

const NotificationConnected = connect(mapStateToProps)(Notification)

export default NotificationConnected
