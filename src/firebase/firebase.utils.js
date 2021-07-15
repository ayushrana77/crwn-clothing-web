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
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) {
    return
  }

  const userRef = firestore.doc(`users/${userAuth.uid}`)
  const snapShot = await userRef.get()

  if (!snapShot.exists) {
    const { displayName, email } = userAuth
    const createdAt = new Date()
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      })
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }
  return userRef
}
firebase.initializeApp(config)

export const addCollectionAndDocuments = async (collectionKey, objectToAdd) => {
  const collectionRef = firestore.collection(collectionKey)
  console.log(collectionRef)

  const batch = firestore.batch()
  objectToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc()
    batch.set(newDocRef, obj)
  })
  return await batch.commit()
}

export const convertCollectionsSnapsortToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data()
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    }
  })

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection
    return accumulator
  }, {})
}

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe()
      resolve(userAuth)
    }, reject)
  })
}

export const auth = firebase.auth()
export const firestore = firebase.firestore()

export const googleProvider = new firebase.auth.GoogleAuthProvider()
googleProvider.setCustomParameters({ prompt: 'select_account' })

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider)

export default firebase
