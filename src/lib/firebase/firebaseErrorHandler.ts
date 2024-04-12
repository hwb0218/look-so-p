import { FirebaseError } from 'firebase/app';

export default function firebaseErrorHandler(error: unknown) {
  if (error instanceof FirebaseError) {
    console.error('Firebase error', error);
  } else {
    console.error('Unknown error', error);
  }
}
