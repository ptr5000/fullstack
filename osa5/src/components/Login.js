import React from 'react'

const LoginForm = (props) => {
    return (
        <div>
            <form onSubmit={props.handleLogin}>
            <div>
                käyttäjätunnus
                <input
                value={props.username}
                onChange={props.handleUsernameChange}
                name="username"
                />

                <input
                value={props.password}
                type="password"
                onChange={props.handlePasswordChange}
                name="password"
                />
            </div>
            <button type="submit">kirjaudu</button>
            </form>
        </div>
    )
  }


  export default LoginForm 