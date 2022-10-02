import { useEffect } from 'react'
import { useState } from 'react'
import {
  createUserDocumentFromAuth,
  getRedirectResults,
  signInUsingEmailAndPassword,
  signInWithGoogle,
} from '../../utils/firebase.utils'
import Button from '../button/button.component'
import FormInput from '../form-input/form-input.component'
import './sign-in-form.styles.scss'

const SignInForm = () => {
  useEffect(() => {
    const GRR = async (response) => {
      if (response) {
        createUserDocumentFromAuth(response.user)
      }
    }
    GRR(getRedirectResults())
  }, [])

  const defaultFormFields = {
    email: '',
    password: '',
  }

  const [formFields, setFormFields] = useState(defaultFormFields)
  const { email, password } = formFields

  const handleChange = async ({ target }) => {
    setFormFields({ ...formFields, [target.name]: target.value })
  }

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      await signInUsingEmailAndPassword(email, password)
      resetFormFields()
    } catch (error) {
      switch (error.code) {
        case 'auth/user-not-found':
          alert('User Not Found')
          break
        case 'auth/wrong-password':
          alert('Wrong Password')
          break
        default:
          alert('Something Went Wrong')
      }
    }
  }

  return (
    <div className='sign-up-container'>
      <h2>Already have an account?</h2>
      <span>Sign In With Your Email and Password</span>
      <form onSubmit={handleSubmit}>
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
        <div className='submit-buttons-container'>
          <Button type='submit'>Sign In</Button>
          <Button
            onClick={async() => {
              console.log(await signInWithGoogle('Popup'))
            }}
            buttonType='google'
            type='button'
          >
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  )
}

export default SignInForm
