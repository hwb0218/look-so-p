import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '@src/firebase/config';

class AuthService {
  async signUp(email: string, password: string) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    return userCredential;
  }

  async login(email: string, password: string) {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    return userCredential;
  }

  async logout() {
    if (auth.currentUser) {
      signOut(auth);
    }
  }
}

export const authService = new AuthService();
