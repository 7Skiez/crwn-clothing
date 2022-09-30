import { useState } from 'react'
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase.utils'
import Button from '../button/button.component'
import FormInput from '../form-input/form-input.component'
import './sign-up-form.styles.scss'

const SignUpForm = () => {
  const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
  }
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { displayName, email, password, confirmPassword } = formFields
  const handleChange = async ({ target }) => {
    setFormFields({ ...formFields, [target.name]: target.value })
  }

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }
  const handleSubmit = async (event) => {
    event.preventDefault()

    if (password !== confirmPassword) {
      alert('Passwords do not match!')
      return
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password)
      await createUserDocumentFromAuth(user, { displayName })
      resetFormFields()
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Email already in use!')
      } else {
        console.log('User creation encountered an error', error)
      }
    }
  }

  return (
    <div className='sign-up-container'>
        <h2>Don't have an account?</h2>
      <span>Sign Up With Your Email and Password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          inputOptions={{
            type: 'text',
            name: 'displayName',
            onChange: handleChange,
            value: displayName,
            required: true,
          }}
        />
        <FormInput
          inputOptions={{
            type: 'email',
            name: 'email',
            onChange: handleChange,
            value: email,
            required: true,
          }}
        />
        <FormInput
          inputOptions={{
            type: 'password',
            name: 'password',
            onChange: handleChange,
            value: password,
            required: true,
          }}
        />
        <FormInput
          inputOptions={{
            type: 'password',
            name: 'confirmPassword',
            onChange: handleChange,
            value: confirmPassword,
            required: true,
          }}
        />

        <Button type="submit">Sign Up</Button>

        {/* <label htmlFor='displayName'>Display Name</label>
        <input type='text' name='displayName' onChange={handleChange} value={displayName} required />

        <label htmlFor='email'>Email</label>
        <input type='email' name='email' onChange={handleChange} value={email} required />

        <label htmlFor='password'>Password</label>
        <input type='password' name='password' onChange={handleChange} value={password} required />

        <label htmlFor='confirmPassword'>Confirm password</label>
        <input type='password' name='confirmPassword' onChange={handleChange} value={confirmPassword} required /> */}

        {/* <button type='submit'>Sign Up</button> */}
      </form>
    </div>
  )
}

export default SignUpForm
