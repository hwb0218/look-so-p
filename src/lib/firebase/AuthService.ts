import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, firestore } from '@src/lib/firebase/config';

import { type SignUpFormSchema } from '@src/lib/zod/sign-up-schema';

class AuthService {
  async signUp(email: string, password: string) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    return userCredential.user.uid;
  }

  async login(email: string, password: string) {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    return userCredential.user.uid;
  }

  async logout() {
    try {
      if (auth.currentUser) {
        await signOut(auth);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async createUser(values: SignUpFormSchema) {
    try {
      const { email, password } = values;
      const uid = await this.signUp(email, password);

      const documentRef = doc(firestore, 'users', uid);
      const userRef = await setDoc(documentRef, {
        ...values,
        uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      return userRef;
    } catch (err) {
      console.error(err);
    }
  }

  async getUser(email: string, password: string) {
    try {
      const uid = await this.login(email, password);

      const userRef = doc(firestore, 'users', uid);
      const userSanp = await getDoc(userRef);

      if (userSanp.exists()) {
        return userSanp.data();
      }
      return null;
    } catch (err) {
      console.error(err);
    }
  }
  //TODO: 유저 정보 수정
  async editUser() {}
}

export const authService = new AuthService();
