import React, { useState } from 'react'
import { connect } from 'react-redux'
import FormInput from '../form-input/form-input'
import './sign-in.style.scss'
import CustomButton from '../custom-button/custom-button'

import {
  googleSignInStart,
  emailSignInStart,
} from '../../redux/user/user.actions'

const SignIn = ({ emailSignInStart, googleSignInStart }) => {
  const [userCredentials, setCredentials] = useState({
    email: '',
    password: '',
  })
  const { email, password } = userCredentials
  const handleChange = (event) => {
    const { value, name } = event.target
    setCredentials({ ...userCredentials, [name]: value })
  }
  const handleSubmit = async (event) => {
    event.preventDefault()

    emailSignInStart(email, password)
  }

  return (
    <div className="sign-in">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          name="email"
          type="email"
          value={email}
          label="email"
          handleChange={handleChange}
          required
        />

        <FormInput
          name="password"
          type="password"
          value={password}
          label="password"
          handleChange={handleChange}
          required
        />
        <div className="buttons">
          <CustomButton type="submit" value="submit From">
            SIGN IN
          </CustomButton>
          <CustomButton
            type="button"
            onClick={googleSignInStart}
            isGoogleSignIn
          >
            SIGN IN WITH GOOGLE
          </CustomButton>
        </div>
      </form>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password })),
})
export default connect(null, mapDispatchToProps)(SignIn)
