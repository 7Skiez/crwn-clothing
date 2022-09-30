import { getRedirectResult } from "firebase/auth"
import { useEffect } from "react"
import {
  auth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  createUserDocumentFromAuth,
} from "../../utils/firebase.utils"
import SignUpForm from "../../components/sign-up-form/sign-up-form.component"

const SignIn = () => {
  useEffect(() => {
    const GRR = async () => {
      const response = await getRedirectResult(auth)
      if (response) {
        createUserDocumentFromAuth(response.user)
      }
    }
    GRR()
  }, [])

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup()
    createUserDocumentFromAuth(user)
  }

  //   const logGoogleUserWithRedirect = () => {
  //     const { user }
  //   }
  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign In With Google Popup</button>
      <button onClick={signInWithGoogleRedirect}>Sign In With Google Redirect</button>
      <SignUpForm />
    </div>
  )
}

export default SignIn
