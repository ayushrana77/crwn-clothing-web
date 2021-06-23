import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: 'AIzaSyCN1WkgkgF9EnPN7-McZEA_Pk_LvoyP7k8',
  authDomain: 'colth-db.firebaseapp.com',
  projectId: 'colth-db',
  storageBucket: 'colth-db.appspot.com',
  messagingSenderId: '101073997003',
  appId: '1:101073997003:web:c34457a546796717235f4e',
  measurementId: 'G-XKDPVE8M2K',
}
export const createUserProfileDocument =  async (userAuth,additionalData) => {
  if(!userAuth){ 
    return
  }
  
  const userRef = firestore.doc(`users/${userAuth.uid}`)
  const snapShot = await userRef.get();
  
  if(!snapShot.exists){
    const{displayName,email} = userAuth;
    const createdAt = new Date()
    try{
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    }catch(error){
      console.log('error creating user',error.message)
    }
  }
  return userRef
}
firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase
