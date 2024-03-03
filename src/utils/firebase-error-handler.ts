import { FirebaseError } from 'firebase/app';

export default function firebaseErrorHandler(err: Error) {
  if (err instanceof FirebaseError) {
    console.error('Firebase error', err);
  } else {
    console.error('Unknown error', err);
  }
}
