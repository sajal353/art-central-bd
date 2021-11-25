import { initializeApp } from "firebase/app";
import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export async function emailSignUp(name, email, password) {
  let msg = "";
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      msg = `Welcome, ${userCredential.user.email}`;
    })
    .catch((error) => {
      msg = error.code.slice(5).replaceAll("-", " ").toUpperCase();
    });
  return msg;
}

export async function emailSignIn(email, password) {
  let msg = "";
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      msg = `Welcome, ${userCredential.user.email}`;
    })
    .catch((error) => {
      msg = error.code.slice(5).replaceAll("-", " ").toUpperCase();
    });
  return msg;
}

export function signOutUser() {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      return error.message;
    });
}
