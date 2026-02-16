import {useState} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showSubmitError, setShowSubmitError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)

  const onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    window.location.href = '/' // Full page reload to register auth
  }

  const onSubmitFailure = errorMsg => {
    setShowSubmitError(true)
    setErrorMessage(errorMsg)
  }

  const apiLoginWithDefaultCreds = async () => {
    const userDetails = {username: 'rahul', password: 'rahul@2021'}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      onSubmitSuccess(data.jwt_token)
    } else {
      onSubmitFailure(data.error_msg)
    }
  }

  const onChangeUsername = event => {
    setUsername(event.target.value)
  }

  const onChangePassword = event => {
    setPassword(event.target.value)
  }

  const toggleMode = () => {
    setIsSignUp(!isSignUp)
    setShowSubmitError(false)
    setErrorMessage('')
  }

  const getLocalUsers = () => {
    const rawUsers = localStorage.getItem('nxt_trendz_users')
    if (!rawUsers) {
      return []
    }
    try {
      const parsed = JSON.parse(rawUsers)
      return Array.isArray(parsed) ? parsed : []
    } catch (error) {
      return []
    }
  }

  const saveLocalUsers = users => {
    localStorage.setItem('nxt_trendz_users', JSON.stringify(users))
  }

  const submitForm = event => {
    event.preventDefault()

    if (username.trim() === '' || password.trim() === '') {
      onSubmitFailure('Please enter username and password')
      return
    }

    if (isSignUp) {
      const localUsers = getLocalUsers()
      const userExists = localUsers.some(
        user => user.username.toLowerCase() === username.toLowerCase(),
      )

      if (userExists) {
        onSubmitFailure('Account already exists. Please sign in.')
        return
      }

      const nextUsers = [...localUsers, {username, password}]
      saveLocalUsers(nextUsers)

      setPassword('')
      setIsSignUp(false)
      onSubmitFailure('Sign-up successful. Please sign in.')
      return
    }

    const localUsers = getLocalUsers()
    const matchedUser = localUsers.find(
      user =>
        user.username.toLowerCase() === username.toLowerCase() &&
        user.password === password,
    )

    if (matchedUser) {
      apiLoginWithDefaultCreds()
    } else {
      onSubmitFailure('Invalid username or password')
    }
  }

  const renderPasswordField = () => (
    <>
      <label className="input-label" htmlFor="password">
        PASSWORD
      </label>
      <input
        type="password"
        id="password"
        className="password-input-field"
        value={password}
        onChange={onChangePassword}
        placeholder="Enter password"
      />
    </>
  )

  const renderUsernameField = () => (
    <>
      <label className="input-label" htmlFor="username">
        USERNAME
      </label>
      <input
        type="text"
        id="username"
        className="username-input-field"
        value={username}
        placeholder="Enter username"
        onChange={onChangeUsername}
      />
    </>
  )

  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) {
    return <Redirect to="/" />
  }

  return (
    <div className="login-form-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
        className="login-website-logo-mobile-image"
        alt="website logo"
      />
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
        className="login-image"
        alt="website login"
      />
      <form className="form-container" onSubmit={submitForm}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          className="login-website-logo-desktop-image"
          alt="website logo"
        />
        <div className="input-container">{renderUsernameField()}</div>
        <div className="input-container">{renderPasswordField()}</div>
        <button type="submit" className="login-button">
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </button>
        <button
          type="button"
          className="login-toggle-button"
          onClick={toggleMode}
        >
          {isSignUp ? 'Already have an account? Sign In' : 'New user? Sign Up'}
        </button>
        {showSubmitError && <p className="error-message">*{errorMessage}</p>}
      </form>
    </div>
  )
}

export default LoginForm
