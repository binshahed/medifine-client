import React, { useEffect, useState } from 'react'
import initializeFirebase from '../Pages/Login/firebase/firebase.init'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  getIdToken
} from 'firebase/auth'

initializeFirebase()
const useFirebase = () => {
  const [user, setUser] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [authError, setAuthError] = useState('')
  const [admin, setAdmin] = useState(false)
  const [token, setToken] = useState('')

  const auth = getAuth()

  const googleProvider = new GoogleAuthProvider()

  const registerUser = (email, password, name, history) => {
    setIsLoading(true)
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user
        setAuthError('')
        const newUser = { email, displayName: name }
        saveUser(email, name, 'POST')
        setUser(newUser)

        updateProfile(auth.currentUser, {
          displayName: name
        })
          .then(() => {
            // Profile updated!
            // ...
          })
          .catch(error => {
            // An error occurred
            // ...
          })
        history.replace('/')
        // ...
      })
      .catch(error => {
        const errorCode = error.code
        setAuthError(error.message)
        // ..
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const loginUser = (email, password, location, history) => {
    setIsLoading(true)
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const destination = location?.state?.from || '/'
        history.replace(destination)
        // Signed in
        const user = userCredential.user
        setAuthError('')

        // ...
      })
      .catch(error => {
        const errorCode = error.code
        setAuthError(error.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const googleSignIn = (location, history) => {
    setIsLoading(true)
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const destination = location?.state?.from || '/'
        history.replace(destination)
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential.accessToken
        // The signed-in user info.
        const user = result.user
        saveUser(user.email, user.displayName, 'PUT')
        // ...
      })
      .catch(error => {
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message
        setAuthError(error.message)

        // The email of the user's account used.
        const email = error.email
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error)
        // ...
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user)
        getIdToken(user).then(idToken => {
          setToken(idToken)
        })
        // ...
      } else {
        setUser({})
      }
      setIsLoading(false)
    })

    return () => unsubscribe
  }, [])

  // sign out want
  const logOut = () => {
    setIsLoading(true)
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setAuthError('')
      })
      .catch(error => {
        // An error happened.
      })
      .finally(() => {
        setIsLoading(false)
        setAuthError('')
      })
  }
  // load admin
  useEffect(() => {
    fetch(`http://localhost:5000/users/${user?.email}`)
      .then(res => res.json())
      .then(data => setAdmin(data.admin))
  }, [user?.email])

  // save user to DB
  const saveUser = (email, displayName, method) => {
    const user = { email, displayName }

    fetch('http://localhost:5000/users', {
      method: method,
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
  }

  return {
    user,
    admin,
    token,
    registerUser,
    logOut,
    loginUser,
    isLoading,
    authError,
    googleSignIn
  }
}

export default useFirebase
