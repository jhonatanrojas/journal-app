import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword, 
  updateProfile, 
  signInWithEmailAndPassword 
} from "firebase/auth";
import { FirebaseAuth } from "./config";

export const singInWithGoogle = async () => {
  try {

    const googleProvider = new GoogleAuthProvider();
    const resp =  await signInWithPopup(FirebaseAuth, googleProvider);
    //const credentials = GoogleAuthProvider.credentialFromResult(resp);

    const { displayName, email, photoURL, uid } = resp.user;
   

    return { ok: true, displayName, email, photoURL, uid };
  } catch (error) {

    console.log(error);

    return { ok: false, errorMessage: error.message };

  }
};

export const  registerWithEmail =  async({email, password,name}) => { 
  try {
      
    const resp = await  createUserWithEmailAndPassword(FirebaseAuth, email, password);
    
    // Update the user's display name after creation
    await updateProfile(FirebaseAuth.currentUser, { displayName: name })


    const { uid, photoURL } = resp.user;

    console.log(resp);
    return { ok: true, uid, photoURL, email, displayName: name };


  } catch (error) {

      return { ok: false, errorMessage: error.message };
      
  }
}

export const  loginWithEmail =  async({email, password}) => {

  try {
      
    const resp = await  signInWithEmailAndPassword(FirebaseAuth, email, password);

    const { uid, photoURL, displayName } = resp.user;

  
    return { ok: true, uid, photoURL, email, displayName };


  } catch (error) {

      return { ok: false, errorMessage: error.message };
      
  }
}

export const logoutFirebase = async() => {

  return await FirebaseAuth.signOut();
}