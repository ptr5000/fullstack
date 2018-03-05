import React from 'react'
import PropTypes from 'prop-types'
import {setFilter} from '../reducers/filterReducer.js'

class Filter extends React.Component {
    handleChange = (event) => {
      // input-kentän arvo muuttujassa event.target.value
      const {store} = this.context

      store.dispatch(setFilter(event.target.value))
    }
    render() {
      const style = {
        marginBottom: 10
      }
  
      return (
        <div style={style}>
          filter <input onChange={this.handleChange}/>
        </div>
      )
    }
  }

  Filter.contextTypes = {
    store: PropTypes.object
  }

  export default Filter